---
title: Docker 服务器 - CODING 帮助中心
pageTitle: Docker 服务器
pagePrevTitle: COS 存储桶
pagePrev: ci/deploy/cloud-storage.html
pageNextTitle:  自动部署到 K8s 集群
pageNext: ci/deploy/k8s.html
alias: 
-   devops/ci/deploy/docker.html
-   ci/deploy/docker.html
---

### 获取 SSH 密钥对

登录服务器控制台，创建 SSH 密钥对。获取私钥对后将其录入至 CODING 中的[「项目令牌」](/docs/project/features/credential.html)中；将公钥 `id_rsa.pub` 的内容复制到服务器的 `~/.ssh/authorized_keys`中。

![](https://help-assets.codehub.cn/enterprise/20210916200757.png)

### 获取制品仓库信息

按照提示一键获取 Docker 仓库的用户名与密码，并将其录入持续集成的环境变量中。

![](https://help-assets.codehub.cn/enterprise/20210916201308.png)

在构建计划详情中的变量与缓存处填写。

![CODING 持续集成 环境变量 DOCKER_USER](https://help-assets.codehub.cn/enterprise/20200417112623.png)

### Jenkinsfile

在构建计划设置中的流程配置中参考以下配置进行填写。

```groovy
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]],
        userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]])
      }
    }
    stage('构建') {
      steps {
        echo '构建中...'
        script {
          // 请修改 dockerServer、dockerPath、imageName
          dockerServer = 'codes-farm-docker.pkg.coding.net'
          dockerPath = '/laravel-demo/laravel-docker'
          imageName = "${dockerServer}${dockerPath}/laravel-demo:1.0.0"
          def customImage = docker.build(imageName)

          // 推送 Docker 镜像到仓库
          docker.withRegistry("https://${dockerServer}", CODING_ARTIFACTS_CREDENTIALS_ID) {
            customImage.push()
          }
        }
      }
    }
    stage('部署') {
      steps {
        echo '部署中...'
        script {
          // 声明服务器信息
          def remote = [:]
          remote.name = 'web-server'
          remote.allowAnyHosts = true
          remote.host = '106.54.86.239'
          remote.port = 22
          remote.user = 'ubuntu'

          // 把「CODING 凭据管理」中的「凭据 ID」填入 credentialsId，而 id_rsa 无需修改
          withCredentials([sshUserPrivateKey(credentialsId: "c4af855d-402a-4f38-9c83-f6226ae3441c", keyFileVariable: 'id_rsa')]) {
            remote.identityFile = id_rsa

            // SSH 登录到服务器，拉取 Docker 镜像
            // 请在持续集成的环境变量中配置 DOCKER_USER 和 DOCKER_PASSWORD
            sshCommand remote: remote, sudo: true, command: "apt-get install -y gnupg2 pass"
            sshCommand remote: remote, command: "docker login -u ${env.DOCKER_USER} -p ${env.DOCKER_PASSWORD} $DOCKER_SERVER"
            sshCommand remote: remote, command: "docker pull ${imageName}"
            sshCommand remote: remote, command: "docker stop web | true"
            sshCommand remote: remote, command: "docker rm web | true"
            sshCommand remote: remote, command: "docker run --name web -d ${imageName}"
          }
        }
      }
    }
  }
}
```

### Docker Compose

Docker Compose 的代码和上述类似，仅有少许不同：

```groovy
sshCommand remote: remote, sudo: true, command: "apt-get install -y gnupg2 pass"
sshCommand remote: remote, command: "docker login -u ${env.DOCKER_USER} -p ${env.DOCKER_PASSWORD} $DOCKER_SERVER"
sshCommand remote: remote, sudo: true, command: "mkdir -p /var/www/site/"
sshCommand remote: remote, sudo: true, command: "chmod 777 /var/www/site/"
sshPut remote: remote, from: 'docker-compose.yml', into: '/var/www/site/'
sshCommand remote: remote, command: "cd /var/www/site/ && echo IMAGE=${imageName} > .env && echo APP_KEY=${env.APP_KEY} >> .env && echo DB_CONNECTION=sqlite >> .env"
sshCommand remote: remote, command: "cd /var/www/site/ && docker-compose down --remove-orphans"
sshCommand remote: remote, command: "cd /var/www/site/ && docker-compose up -d --no-build"
```

`docker-compose.yml` 代码：

```yaml
version: '2.1'
services:
  web:
    env_file: .env
    build: .
    image: ${IMAGE:-laravel-demo:dev}
    ports:
     - "80:80"
    links:
    - redis
  redis:
    image: "redis:5"
```


==== 2020/08/13 ====
