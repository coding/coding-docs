---
title: 默认节点环境 - CODING 帮助中心
pageTitle: 默认节点环境
pagePrevTitle: 构建节点类型
pagePrev: ci/node/type.html
pageNextTitle: 自定义节点
pageNext: ci/node/customize.html
alias: 
-   devops/ci/ways.html
-   ci/ways.html
-   common/ci.html
---

### [功能介绍](#intro)

构建任务由构建节点执行，而构建环境指的便是构建节点中内置的系统底层环境，预装了开发语言 SDK、命令行工具等服务。

构建环境有以下两类：

-   [默认环境](#default)
-   [自定义版本](#customize)
-   [Docker 环境](#docker)

> *若开发项目对运行环境有特定要求，如 swift 项目需要在 macOS 环境下运行，可以参考[自定义构建节点](/docs/ci/node/overview.html)自行接入构建节点。*

### [默认环境](#default)

在构建计划的开始环节中选择构建环境。

![](https://help-assets.codehub.cn/enterprise/20210302144236.png)

对应的 `Jenkinsfile` 为 `agent any`：

```groovy
pipeline {
  agent any
  stages  {
    stage("检出") {...}
    stage("检查代码规范") {...}
  }
}
```

「CODING 云主机」为 Ubuntu 系统，预装了以下 SDK 和命令行工具：

| SDK | 命令行工具 |
|------|--------|
| android-sdk: 26.1.1    | bundler: 1.17.2 |
| build-essential    | cmake: 3.5.1  |
| dotnet-core: 2.2    | composer：1.10.8 |
| elixir: 1.8.1    | coscmd：1.8.5.36  |
| erlang: Erlang/OTP 21    | docker-compose: 1.26.0  |
| go: 1.14.4    | docker：20.10.6   |
| java: 1.8.0_191    | git-lfs: 2.7.2 |
| nodejs: 10    | git：2.28.0  |
| php: 8.0、7.4、7.3    | gradle: 4.10.2 |
| python3/pip3: 3.9、3.8、3.7  | helm: 2.13.1 |
| python: 2.7.12    | jq: 1.5-1-a5b5cbe  |
| ruby: 2.6.0    | kubectl: 1.18.4  |
| | maven: 3.6.3  |
| | mercurial: 3.7.3|
| | pigz: 2.3.1 |
| | rancher: 2.2.0 |
| | rvm: 1.29.7 |
| | sshpass: 1.05 |
| | svn: 1.9.3 |
| | tccli: 3.0.67.1 |
| | vsftpd: 3.0.3 |
| | yarn: 1.15.2 |
| | axcl: 2.5 |

> ⚠️ 预装的软件版本有限且定期升级，而各个项目所需要的版本可能不同。

### [自定义版本](#customize)

在持续集成中可自行下载安装软件的各种版本，如果官网下载较慢，我们亦提供了[镜像服务](https://coding-public.coding.net/public-artifacts/public/downloads/packages)以供下载。如需增加制品，欢迎提交至[开源项目](https://github.com/Coding/coding-download-center)。

#### Go

```groovy
stage('Go') {
  steps {
    // 建议设置「缓存目录」 /root/.cache/downloads
    sh 'rm -rf /root/programs/go'
    dir ('/root/.cache/downloads') {
      sh 'wget -nc "https://coding-public-generic.pkg.coding.net/public/downloads/go-linux-amd64.tar.gz?version=1.17.3" -O go-linux-amd64-1.17.3.tar.gz | true'
      sh 'tar -zxvf go-linux-amd64-1.17.3.tar.gz -C /root/programs'
    }
    sh 'go version'
  }
}
```

#### Helm

```groovy
stage('Helm') {
  steps {
    dir ('/root/.cache/downloads') {
      sh 'wget -nc "https://coding-public-generic.pkg.coding.net/public/downloads/helm-linux-amd64.tar.gz?version=v3.7.1" -O helm-linux-amd64-v3.7.1.tar.gz | true'
      sh "tar -zxvf helm-linux-amd64-v3.7.1.tar.gz -C \$HELM_BIN linux-amd64/helm --strip-components 1"
    }
    sh 'helm version'
  }
}
```

#### kubectl

```groovy
stage('kubectl') {
  steps {
    dir ('/root/.cache/downloads') {
      sh 'wget -nc "https://coding-public-generic.pkg.coding.net/public/downloads/kubectl-linux-amd64?version=v1.22.4" -O kubectl-linux-amd64-v1.22.4 | true'
      sh 'cp kubectl-linux-amd64-v1.22.4 /usr/local/bin/kubectl'
    }
    sh 'chmod +x /usr/local/bin/kubectl'
    sh 'kubectl version --client'
  }
}
```

#### Node.js
 
```groovy
stage('Node.js') {
  steps {
    sh 'rm -rf /usr/lib/node_modules/npm/'
    dir ('/root/.cache/downloads') {
      sh 'wget -nc "https://coding-public-generic.pkg.coding.net/public/downloads/node-linux-x64.tar.xz?version=v16.13.0" -O node-v16.13.0-linux-x64.tar.xz | true'
      sh 'tar -xf node-v16.13.0-linux-x64.tar.xz -C /usr --strip-components 1'
      // sh 'wget -nc "https://coding-public-generic.pkg.coding.net/public/downloads/node-linux-x64.tar.xz?version=v14.18.2" -O node-v14.18.2-linux-x64.tar.xz | true'
      // sh 'tar -xf node-v14.18.2-linux-x64.tar.xz -C /usr --strip-components 1'
      // 更多版本：v12.22.7、v17.2.0
    }
    sh 'node -v'
  }
}
```
 
#### PHP

```groovy
pipeline {
  agent {
    docker {
      reuseNode 'true'
      registryUrl 'https://coding-public-docker.pkg.coding.net'
      image 'public/docker/php:8.0'
      // image 'public/docker/php:7.4' 以及 7.3、7.2、7.1、5.6
      args '-v /var/run/docker.sock:/var/run/docker.sock -v /usr/bin/docker:/usr/bin/docker'
    }
  }
  stages {
    stage('安装依赖') {
      steps {
        // Possible values for ext-name:
        // bcmath bz2 calendar ctype curl dba dom enchant exif fileinfo filter ftp gd gettext gmp
        // hash iconv imap interbase intl json ldap mbstring mysqli oci8 odbc opcache pcntl pdo
        // pdo_dblib pdo_firebird pdo_mysql pdo_oci pdo_odbc pdo_pgsql pdo_sqlite pgsql phar posix pspell
        // readline recode reflection session shmop simplexml snmp soap sockets sodium spl standard
        // sysvmsg sysvsem sysvshm tidy tokenizer wddx xml xmlreader xmlrpc xmlwriter xsl zend_test zip
        sh 'apt-get update && apt-get install -y libbz2-dev'
        sh 'docker-php-ext-install bz2'
        sh 'php -i | grep bz2'
      }
    }
  }
}
```

### [Docker 环境](#docker)

CODING 持续集成为您提供了默认构建环境，若默认环境中预装的 SDK 版本和命令行工具无法满足您的要求，还可以通过在持续集成中使用 Docker 构建环境来解决。你可以通过以下方式使用 Docker 构建环境：

-   CODING 官方提供的镜像
-   使用已托管至项目级制品库的 Docker 镜像
    适用于项目层级的标准构建环境，保障项目内镜像安全，方便管理，通过项目令牌您也可以拉取其他项目的镜像。
-   使用指定 Registry 地址（默认为 Docker Hub）的 Docker 镜像
-   使用 Dockerfile 脚本构建环境

#### [CODING Docker 镜像](#coding-docker)

在【持续集成计划设置】->【流程配置】->【基础配置】->【图形化编辑器】中，选择 「使用 CODING 官方提供的 Docker 镜像」，比如 Node.js 14：

![](https://help-assets.codehub.cn/enterprise/20210302143038.png)

对应的 `Jenkinsfile` 参考：

```groovy
pipeline {
  agent {
    docker {
      reuseNode 'true'
      registryUrl 'https://coding-public-docker.pkg.coding.net'
      image 'public/docker/nodejs:14'
    }
  }
  stages {
    stage('Test') {
      steps {
        sh 'node --version'
      }
    }
  }
}
```

#### [项目制品库 Docker 镜像](#docker-in-artifacts)

本章节以装有进程管理工具 pm2 的 node.js 12 环境为例，分步骤演示如何将自建镜像推送至制品仓库 → 使用自建镜像作为构建环境。

**步骤一：构建 Docker 镜像**

1.  新建目录，创建 Dockerfile 如下：

```Dockerfile
# 指定 node.js 版本为 node 12，默认从 Docker Hub 上拉取
FROM node:12

# 安装 pm2
RUN npm install pm2 -g

COPY . .

# 设置容器启动时的命令
CMD [ "pm2-runtime", "start" ]
```

2.  运行指令 `docker build -t pm2-test .`；`-t` 指定镜像名称；

```bash
Step 1/4 : FROM node:12
...
Step 2/4 : RUN npm install pm2 -g
...
Step 3/4 : COPY . .
...
Step 4/4 : CMD [ "pm2-runtime", "start" ]
 ---> Running in 46cc5081cb4f
Removing intermediate container 46cc5081cb4f
 ---> 5f8335fa91d4
Successfully built 5f8335fa91d4
Successfully tagged pm2-test:latest
```

**步骤二：推送镜像到 CODING 制品库**

1.  进入 CODING 制品库，选择已有制品库或新建制品库，输入密码后点击“生成个人令牌访问令牌生成配置”。

![](https://help-assets.codehub.cn/enterprise/20211215102833.png)

2.  复制后在终端输入命令进行登录。

3.  按照操作指引提示，为本地镜像打标签。

```bash
docker tag pm2-test ******/test-dd/test/pm2-test
```

4.  推送您的 docker 镜像到 CODING 制品库

```bash
docker push ******/test-dd/test/pm2-test
The push refers to repository [******************/test-dd/test/pm2-test]
809e73e276b8: Pushed 
9159d4abedcd: Pushed 
...
latest: digest: sha256:ccecda5071e60593d1be44ea27d4ec5b35f6a5f6872fb9 size: 2634
```

推送成功后可以在镜像列表找到您的镜像。

**步骤三：在持续集成中使用镜像作为构建环境**

进入【持续集成设置】->【流程配置】，选择 “使用项目内的 Docker 镜像”，选择对应制品库和镜像。

![](https://help-assets.codehub.cn/enterprise/20200721145157.png)

#### [指定地址的 Docker 镜像](#docker-registry)

「Docker 镜像」为必填项，需要填入您的镜像名称。「Registry 地址」需填写的格式为不带路径的 URL 地址，例如：

-   `https://codes-farm-docker.pkg.coding.net` ✅
-   `https://codes-farm-docker.pkg.coding.net/laravel-demo/laravel-docker/` ❌

![](https://help-assets.codehub.cn/enterprise/20210302142753.png)

若拉取私有镜像，需[录入凭据](/docs/ci/credential.html)后填写 「Registry 认证凭据 ID」。

对应的 `Jenkinsfile`：

```groovy
pipeline {
  agent {
    docker {
      image 'node:14-alpine'
      reuseNode 'true'
    }
  }
  stages {
    stage('Test') {
      steps {
        sh 'node --version'
      }
    }
  }
}
```

**Dockerfile 构建环境**

若项目已经使用 Docker，建议将 `Dockerfile` 提交到代码库，用它作为持续集成构建环境。`Dockerfile` 示例代码：

```dockerfile
FROM php:8.0-apache

RUN apt-get update \
  && apt-get install -y unzip
```

`Jenkinsfile`：

```groovy
pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        checkout([
          $class: 'GitSCM', 
          branches: [[name: env.GIT_BUILD_REF]], 
          userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]
        ])
      }
    }
    stage('Use Docker') {
      agent {
        dockerfile {
          filename 'Dockerfile' // 可选，自定义 Dockerfile 文件名
          dir 'build' // 可选，Dockerfile 所在目录
          additionalBuildArgs  '--build-arg version=1.0.2' // 可选，docker build 自定义参数
        }
      }
      stages {
        stage('Test') {
          steps {
            sh 'php -v'
            sh 'unzip -v'
          }
        }
      }
    }
  }
}
```

若构建次数频繁，而不想将时间浪费在 `docker build` 过程上，那么可以通过使用 Jenkins Dockerfile 保存镜像用于下次构建，从而节省大量时间，详情请[点击了解](/docs/ci/practice/jenkins-dockerfile.html)。

#### [在阶段中使用 Docker](#one-stage-one-docker)

Jenkinsfile 参考：

```groovy
pipeline {
  agent none
  stages {
    stage('Back-end') {
      agent {
        docker {
          image 'maven:3-alpine'
          reuseNode 'true'
        }
      }
      steps {
        sh 'mvn --version'
      }
    }
    stage('Front-end') {
      agent {
        docker {
          image 'node:14-alpine'
          reuseNode 'true'
        }
      }
      steps {
        sh 'node --version'
      }
    }
  }
}
```

#### [多个 Docker 后台](#multi-docker-background)

自动化测试往往需要临时的基础设施（比如 MySQL、Redis、[Elasticsearch](https://www.elastic.co/cn/cloud/)）。那么创建一个桥接网络，在其中启动多个 Docker 后台，测试完毕自动删除。

```groovy
node {
  stage("检出") {
    checkout([
      $class: 'GitSCM',
      branches: [[name: GIT_BUILD_REF]],
      userRemoteConfigs: [[
        url: GIT_REPO_URL,
        credentialsId: CREDENTIALS_ID
    ]]])
  }
  stage('准备数据库') {
    sh 'docker network create bridge1'
    sh(script:'docker run --net bridge1 --name mysql -d -e "MYSQL_ROOT_PASSWORD=my-secret-pw" -e "MYSQL_DATABASE=test_db" mysql:5.7', returnStdout: true)
    sh(script:'docker run --net bridge1 --name redis -d redis:5', returnStdout: true)
  }
  docker.image('ecoding/php:8.0').inside("--net bridge1 -v \"${env.WORKSPACE}:/root/code\" -e 'APP_ENV=testing' -e 'DB_DATABASE=test_db'" +
      " -e 'DB_USERNAME=root' -e 'DB_PASSWORD=my-secret-pw' -e 'DB_HOST=mysql' -e 'REDIS_HOST=redis'" +
      " -e 'APP_KEY=base64:tbgOBtYci7i7cdx5RiFE3KZzUkRtJfbU3lbj5uPdL8U='") {
    sh 'composer install'

    stage('单元测试') {
      sh 'XDEBUG_MODE=coverage ./vendor/bin/phpunit --coverage-html storage/reports/tests/ --log-junit storage/test-results/junit.xml --coverage-text tests/'
      junit 'storage/test-results/junit.xml'
      codingHtmlReport(name: '测试覆盖率报告', path: 'storage/reports/tests/')
    }
  }
}
```

#### [根节点工作空间](#reuse-node)

将自定义 Docker 用作构建环境时，可以选择是否使用根节点的工作空间。勾选该选项后，当前阶段的 Docker 容器会和流水线在同一台构建节点中运行，当前阶段在运行时便可以获取流水线工作空间下根目录保存的所有文件。

![](https://help-assets.codehub.cn/enterprise/20200720142316.png)

对应的 `Jenkinsfile` 参数为 `reuseNode` ，类型：Boolean，默认为 false：

```groovy
pipeline {
  agent {
    docker {
      registryUrl 'https://coding-public-docker.pkg.coding.net'
      image 'public/docker/android:29'
    }
  }
  stages {
    // 代码被检出到 pipeline agent 的工作空间根目录下
    stage('检出代码') {
      steps {
        checkout([
          $class: 'GitSCM', 
          branches: [[name: env.GIT_BUILD_REF]], 
          userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]
        ])
      }
    }
    stage('单元测试') {
      agent {
        dockerfile {
          // 默认在当前节点工作空间根目录下找名为 「Dockerfile」的文件构建环境
          filename 'Dockerfile'
          // 如果 reuseNode 为 false，则无法找到之前检出到 pipeline agent 的工作空间根目录下的 Dockerfile
          reuseNode true
        }
      }
      steps {
        sh 'npm run test:ci'
        junit '*.xml'
        
      }
    }
  }
}
```

#### [执行 Docker 命令](#jenkins-docker-in-docker)

在 Jenkins Docker 环境中执行 `docker` 命令时，需要挂载外部虚拟机的 docker socket，否则会报错：`docker: command not found`

```groovy
pipeline {
  agent {
    docker {
      image 'ecoding/php:8.0'
      reuseNode 'true'
      // 挂载外部虚拟机的 docker socket
      args '-v /var/run/docker.sock:/var/run/docker.sock -v /usr/bin/docker:/usr/bin/docker'
    }
  }
  stages {
    stage('自定义阶段') {
      steps {
        sh 'php -v'
      }
    }
    stage('构建 Docker 镜像') {
      steps {
        sh 'docker -v'
        script {
          docker.withRegistry("https://${env.CCI_CURRENT_TEAM}-docker.pkg.coding.net", "${env.CODING_ARTIFACTS_CREDENTIALS_ID}") {
            //docker.build("foo:bar").push()
          }
        }
      }
    }
  }
}
```

若希望在自定义构建节点中运行 Docker 命令，在节点中先行安装 Docker 服务即可开始使用。

### [参考资料](#ref)

[Jenkins 官方文档——在流水线中使用 Docker 的 agent 语法说明](https://jenkins.io/zh/doc/book/pipeline/syntax/#agent)


==== 2021/05/28 ====
