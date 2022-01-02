---
title: 定时同步开源代码库 - CODING 帮助中心
pageTitle: 定时同步开源代码库
pagePrevTitle: 自定义 Docker 构建环境
pagePrev: ci/practice/customize-build-env.html
pageNextTitle: 定时同步私有代码库
pageNext: ci/practice/sync-private-repo.html
alias: devops/ci/practice/sync-from-github.html
---

有没有一种高效的方法能够实现 GitHub 代码仓库与 CODING 仓库的定时同步？答案是使用持续集成定时触发构建计划，这样便能够避免手动拉取 GitHub 仓库里的代码，而后再推送至 CODING 仓库的繁琐操作，一劳永逸。

下文是具体的操作过程。

### 申请项目令牌

进入项目后，轻点左下角的【项目设置】->【开发者选项】->【项目令牌】，点击「新建项目令牌」，键入令牌名称并勾选文件及持续集成权限。

![](https://help-assets.codehub.cn/enterprise/20200805152107.png)

创建完成后便会获取到一串用户名和密码。请注意该项目令牌的过期时间，以免影响到持续集成构建任务。

![](https://help-assets.codehub.cn/enterprise/20200805152256.png)

### 创建持续集成任务

在项目里的持续集成中新建构建计划，选择自定义构建过程。

![](https://help-assets.codehub.cn/enterprise/20200805152750.png)

键入构建计划名称，代码源选择拟进行同步的 CODING 代码仓库，配置来源勾选使用静态配置的 Jenkinsfile 后前往配置详情。在流程配置中选择文本编辑器，可以参考以下配置文件进行编写。

#### Jenkinsfile

```groovy
pipeline {
  agent any
  stages {
    stage('检出 CODING') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: env.GIT_BUILD_REF]], 
          userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]
        ])
      }
    }
    stage('拉取 GitHub') {
      steps {
        sh "git remote add github https://github.com/phodal/ledge.git" // 此处需替换为您需要同步的 GitHub 代码仓库地址。
        sh "git remote update github"
        sh "git merge github/master"
      }
    }
    stage('推送到 CODING') {
      steps {
        // 使用项目令牌环境变量 PROJECT_TOKEN_GK 和 PROJECT_TOKEN 来作为推送至 CODING 代码仓库所需的用户名和密码。
        // 若希望推送到非本项目的代码仓库或第三方平台的代码仓库，需要自行更换为有效的凭据信息
        sh "git push https://${PROJECT_TOKEN_GK}:${PROJECT_TOKEN}@e.coding.net/coding-public/ledge.git HEAD:master"
      }
    }
  }
}
```

#### 添加环境变量

此步骤的目的是在构建任务中使用项目令牌，以通过代码仓库的账号密码推送验证。可以使用 GIT_USERNAME 和 GIT_PASSWORD 作为变量名称，「默认值」为[上文](#申请项目令牌)中所申请到的用户名和密码。

![](https://help-assets.codehub.cn/enterprise/20200805161626.png)

#### 设置触发规则

在持续集成设置中的触发规则中添加定时触发，您可以按照所需要的频率进行设置，还可以在该页面设置其他的触发规则，将 CI 任务的触发无缝融入至您的工作流之中。

![](https://help-assets.codehub.cn/enterprise/20200805160615.png)

### 触发持续集成任务

完成上述步骤后，点击立即构建便可以看到构建过程。待构建成功后，便可以看到 CODING 代码仓库已和 GitHub 代码仓库保持一致了。

-   GitHub 代码仓库

![](https://help-assets.codehub.cn/enterprise/20200805162308.png)

-   CODING 代码仓库

![](https://help-assets.codehub.cn/enterprise/20200805162212.png)


==== 2020/08/13 ====
