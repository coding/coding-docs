---
title: 每日一句小应用 - CODING 帮助中心
pageTitle: 每日一句小应用
pagePrevTitle: Java + Maven + Spring Boot 快速构建并验证代码
pagePrev: ci/practice/quick/maven-spring-boot.html
pageNextTitle: Python + Flask 构建应用
pageNext: ci/practice/quick/python-flask.html
alias: 
-   best-practices/ci/1minute/node-express.html
-   ci/practice/quick/node-express.html
---

本文将介绍如何使用持续集成快速上线一个每日一句小应用。此应用功能主要用于在打开终端时能够自动生成全新的中英文对照语句，或许这些语句可以为你带来哲理的思考，开始全新一天的 CODING 之旅。通过部署这个小应用，你还可以快速掌握如何使用 CODING 持续集成与 Docker 类型制品仓库。

![图片](https://thanksxiaopang-1253923140.cos.ap-shenzhen-fsi.myqcloud.com/tmp-5e7d6ac5-cc6a-4fff-a096-a705c0708e63.png)

### [前值准备](#front-ready)

-   [示例仓库](https://coding-public.coding.net/public/coding-ci-express/coding-ci-express/git/files)
-   本地安装 [Docker 环境](https://www.docker.com/)
-   [Docker 类型制品仓库](/docs/artifacts/quick-start/docker.html)

### [本地运行](#local-run)

将仓库拉取至本地后，运行以下命令：

```bash
# 安装
npm install
# 运行
npm run dev
# 部署
curl localhost:3000
```

本地终端中出现以下效果：

![](https://help-assets.codehub.cn/enterprise/20211124164401.png)

在本地运行无误后，下文将演示如何打包为 Docker 类型制品，上传至制品仓库后供团队其他成员使用。

### [导入示例仓库](#import-example)

在创建代码仓库时选择「导入外部仓库」，粘贴示例仓库地址。

![](https://help-assets.codehub.cn/enterprise/20211124170425.png)

### [创建构建计划](#ci-plan)

因示例仓库中已内置 `Dockerfile` 文件，因此可以直接使用「CODING Docker 镜像推送」模板。

![](https://help-assets.codehub.cn/enterprise/20211124171727.png)

选择已创建的 Docker 仓库，你也可以在「图形化编辑器」中调整目标制品仓库。

![](https://help-assets.codehub.cn/enterprise/20211124172817.png)

#### [Jenkinsfile 参考](#Jenkinsfile)

若希望通过手动编写配置过程，你可以参考下列构建流程文件：

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
    stage('打包镜像') {
      steps {
        sh "docker build -t ${env.DOCKER_IMAGE_NAME}:${env.CI_BUILD_NUMBER} ."
      }
    }
    stage('推送到制品库') {
      steps {
        script {
          docker.withRegistry("https://${env.CODING_DOCKER_REG_HOST}", "${env.CODING_ARTIFACTS_CREDENTIALS_ID}") {
            docker.image("${env.DOCKER_IMAGE_NAME}:${env.CI_BUILD_NUMBER}").push()
          }
        }

      }
    }
  }
  environment {
    CODING_DOCKER_REG_HOST = "${env.CCI_CURRENT_TEAM}-docker.pkg.${env.CCI_CURRENT_DOMAIN}"
    DOCKER_IMAGE_NAME = "${env.PROJECT_NAME.toLowerCase()}/${env.DOCKER_REPO_NAME}/hello-world"
  }
}
```

### 查看制品

在制品仓库中你可以查看已上传的应用制品，团队中的其他成员拉取此制品后即可直接使用了。

![](https://help-assets.codehub.cn/enterprise/20211124173427.png)

### [更多操作](#egg)

我们可以将该应用和终端结合使用，这样就可以在每次启动终端的时候就可以看到 “每日一句” 了。

```sh
# 先启用服务
npm run dev
# 写入终端
echo "curl localhost:3000" >> ~/.zshrc
# or
echo "curl localhost:3000" >> ~/.bashrc
```

==== 2021/11/24 ====
