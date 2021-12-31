---
title: 在持续集成中使用凭据 - CODING 帮助中心
pageTitle: 在持续集成中使用凭据
pagePrevTitle: 快速上手 Serverless 应用
pagePrev: ci/credential.html
pageNextTitle: 在持续集成中使用 Docker
pageNext: ci/practice/docker.html
alias: devops/ci/credential.html
---

### 功能介绍

在持续集成中您可以通过凭据 ID 来代替明文配置账号密码、密钥等认证信息，从而更加安全地进行拉取代码、推送制品等操作。

在了解如何在持续集成中使用凭据之前，请确保您已初步了解 CODING 的[《凭据管理》](/docs/project/features/credential.html)功能，如何创建凭据、查看凭据、更新凭据均请参考上述文档链接。


### 使用凭据 ID

在持续集成的 Jenkinsfile 文件里，通 credentialsId 来引用凭据 ID 。

#### 凭据授权

在您创建好凭据后，您需要先给构建任务（Job）进行授权。在项目中，点击【项目设置】->【开发者选项】->【凭据管理】->【详情】，勾选需要授权的持续集成任务，则此任务拥有权限使用该凭据 ID。
> 如果您此时还未创建持续集成任务，也记得在稍后创建完任务后，去凭据管理中进行授权。

![](https://help-assets.codehub.cn/enterprise/20191122141426.png)



#### 使用【 SSH 私钥】类型的凭据 ID

譬如，我想通过 SSH 方式检出另外一个代码仓库的代码，我创建了一个 SSH 私钥类型的凭据 ID。在 Jenkinsfile 里即可在需要的地方通过该凭据 ID 检出仓库代码。

![](https://help-assets.codehub.cn/enterprise/20191122145509.png)

在 Jenkinsfile 中，按照如下格式填写 `branches`、SSH 形式的仓库地址 `url` 等信息对这个代码仓库进行检出，其中通过 `credentialsId` 来引用凭据 ID ：

```groovy
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]], userRemoteConfigs: [[url: 'git@e.coding.net:anywhere/helloworld.git', credentialsId: 'db78fb2c-b146-xxxx-xxxx-xxxxxxxxxxxx']]])
      }
    }
  }
}
```

执行持续集成构建后，可以看到输出日志成功：

![](https://help-assets.codehub.cn/enterprise/20191122145020.png)



#### 使用【用户名 + 密码】类型的凭据 ID

譬如，我想通过【用户名 + 密码】的方式检出另外一个代码仓库的代码，我创建了一个用户名密码类型的凭据 ID。在 Jenkinsfile 里即可在需要的地方通过凭据 ID 检出仓库代码。

![](https://help-assets.codehub.cn/enterprise/20191122151727.png)

在 Jenkinsfile 中，按照如下格式填写 `branches`、HTTP 形式的仓库地址 `url` 等信息对这个代码仓库进行检出，其中通过 `credentialsId` 来引用凭据 ID ：

```groovy
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]], userRemoteConfigs: [[url: 'https://e.coding.net/anywhere/helloworld.git', credentialsId: 'd14d6c1c-44fa-xxxx-xxxx-xxxxxxxxxxxx']]])
      }
    }
  }
}
```

执行持续集成构建后，可以看到输出日志成功：

![](https://help-assets.codehub.cn/enterprise/20191122152027.png)


==== 2020/08/13 ====
