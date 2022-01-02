---
title: 缓存目录 - CODING 帮助中心
pageTitle: 缓存目录
pagePrevTitle: 构建快照
pagePrev: ci/configuration/snapshot.html
pageNextTitle: 构建节点类型
pageNext: ci/node/type.html
alias: 
-   devops/ci/cache.html
-   ci/cache.html
-   practice/jenkins-dockerfile.html
---

### [功能介绍](#intro)

本地项目在按安装依赖包时会把下载的文件缓存起来，以供下次安装使用。比如使用 `npm install` 命令后会在项目中生成 `./node_modules`，缓存储存在 `~/.npm` 目录，后者体积更小，更通用。

-   默认构建节点

    CODING 会为每个构建计划自动分配计算资源，构建完毕即销毁，每次构建都会自动重新分配一台构建节点，因此需要指定「缓存目录」用于加速下次构建。

-   自定义构建节点

    若选择自行接入计算资源，并在构建计划中选择通过自定义构建节点执行任务，那么构建完毕不会销毁服务器，故无需指定「缓存目录」。

如果使用在持续集成中使用 Docker 时需要把「缓存目录」挂载至 Docker 中。

### [默认构建节点](#default)

CODING 为构建计划提供基础的任务计算资源，每次任务都会分配一台云主机，构建环境为 Linux 系统、分配 root 用户权限，缓存目录如下：

包管理工具 | 缓存目录
---------|--------------
Maven    | /root/.m2/
Gradle   | /root/.gradle/
npm      | /root/.npm/
composer | /root/.cache/composer/
pip3     | /root/.cache/pip/
yarn     | /usr/local/share/.cache/yarn/

你可以在构建计划设置中的「变量与缓存」中勾选缓存目录，如果未找到目标目录还支持自行录入。

![](https://help-assets.codehub.cn/enterprise/20210917164846.png)

### [Docker 构建环境](#build-in-docker)

若在构建计划中使用 Docker 环境，那么需先行前往「变量与缓存」中勾选缓存目录，再挂载至 Docker 中。

#### Jenkinsfile

```groovy
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: env.GIT_BUILD_REF]], 
          userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]
        ])
      }
    }
    stage('Java 缓存') {
      agent {
        docker {
          image 'adoptopenjdk:11-jdk-hotspot'
          args '-v /root/.gradle/:/root/.gradle/ -v /root/.m2/:/root/.m2/'
          reuseNode true
        }
      }
      steps {
        sh './gradlew test'
      }
    }
    stage('npm 缓存') {
      steps {
        script {
          docker.image('node:14').inside('-v /root/.npm/:/root/.npm/') {
            sh 'npm install'
          }
        }
      }
    }
  }
}
```

#### [自定义构建节点](#customize)

在自定义构建节点中使用 Docker 环境时需按照服务器用户名找到对应的缓存目录，例如当 Ubuntu 服务器的默认用户名为 ubuntu 时，缓存目录为 `/home/ubuntu/.npm/`，那么对应的代码为：

```groovy
docker.image('node:14').inside('-v /home/ubuntu/.npm/:/root/.npm/') {
  sh 'npm install'
}
```

### [缓存 Docker 基础镜像](#docker-image)

如果每次构建都需要拉取 Docker 基础镜像，例如 `Dockerfile` 基础镜像、 CI agent 镜像，那么通常会耗费大量时间，此时就可以通过缓存进行加速。

参考以下 `Jenkinsfile`，修改镜像名称即可复用：

```groovy
pipeline {
  agent any
  environment{
    DOCKER_CACHE_EXISTS = fileExists '/root/.cache/docker/php-8.0-cli.tar'
  }
  stages {
    stage('加载缓存') {
      when { expression { DOCKER_CACHE_EXISTS == 'true' } }
      steps {
        sh 'docker load -i /root/.cache/docker/php-8.0-cli.tar'
      }
    }
    stage('使用镜像（请修改此段）') {
      agent {
        docker {
          image 'php:8.0-cli'
          args '-v /root/.cache/:/root/.cache/'
          reuseNode 'true'
        }
      }
      steps {
        sh "php -v"
      }
    }
    stage('生成缓存（仅运行一次）') {
      when { expression { DOCKER_CACHE_EXISTS == 'false' } }
      steps {
        sh 'mkdir -p /root/.cache/docker/'
        sh 'docker save -o /root/.cache/docker/php-8.0-cli.tar php:8.0-cli'
      }
    }
  }
}
```

在缓存目录处增加 `/root/.cache/` 路径，此时第二次的构建耗时明显更短，说明缓存已生效：

![](https://help-assets.codehub.cn/enterprise/20210917174342.png)

> ⚠️  缓存镜像会逐渐过时，建议定时清除，与官方更新保持一致。

### [保存 Dockerfile](#dockerfile)
 
在持续集成中使用 `Dockerfile` 作为构建环境，需要运行 `docker build` 命令用以初始化，较为不便。可以将已构建的 Docker 镜像保存到仓库，方便二次拉取复用。

#### Jenkinsfile

```groovy
// 创建 CODING Docker 制品库，获取用户名、密码和仓库地址
sh "docker login -u $DOCKER_USER -p $DOCKER_PASSWORD my-team-docker.pkg.coding.net"

// 使用 Dockerfile 的 md5 做 tag
md5 = sh(script: "md5sum Dockerfile | awk '{print \$1}'", returnStdout: true).trim()
imageFullName = "my-team-docker.pkg.coding.net/my-project/my-repo/my-app:dev-${md5}"

// 检查镜像是否已存在远端仓库
dockerNotExists = sh(script: "docker manifest inspect $imageFullName > /dev/null", returnStatus: true)
def testImage = null
if (dockerNotExists) {
    testImage = docker.build("$imageFullName", "--build-arg APP_ENV=testing ./")
    sh "docker push $imageFullName"
} else {
    testImage = docker.image(imageFullName)
}

// 使用镜像进行自动化测试
testImage.inside("-e 'APP_ENV=testing'") {
    stage('test') {
        echo 'testing...'
        sh 'ls'
        echo 'test done.'
    }
}
```

代码解释：在 shell 中执行下列命令，通过返回值可以判断「镜像是否已存在」。

```shell
$ docker manifest inspect ecoding/foo:bar
no such manifest
$ echo $?
1
```

==== 2021/09/17 ====
