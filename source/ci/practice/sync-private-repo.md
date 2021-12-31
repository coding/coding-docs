---
title: 定时同步私有代码库 - CODING 帮助中心
pageTitle: 定时同步私有代码库
pagePrevTitle: 定时同步开源代码库
pagePrev: ci/practice/sync-from-github.html
pageNextTitle: Jenkinsfile 相关问题
pageNext: ci/faq/jenkinsfile.html
alias: devops/ci/practice/sync-private-repo.html
---

如果您在使用外部私有代码库（如 GitHub、GitLab.com、自建 GitLab、码云），希望迁移至 CODING，可通过持续集成定时同步。

1.  在 CODING 中创建空代码仓库，把您的代码手动推送一次。

```shell
git pull 
git remote add coding git@e.coding.net:your-team/project/repo.git
git push coding main
```

2.  在 CODING 持续集成中创建「自定义构建过程」，授权绑定您的外部账号，并选择代码仓库；

![](https://help-assets.codehub.cn/enterprise/20200807195648.png)

3.  在 CODING 持续集成中修改「流程配置」，使用下方 `Jenkinsfile` 代码：

```groovy
pipeline {
  agent any
  stages {
    stage('检出 GitHub') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: env.GIT_BUILD_REF]], 
          userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]
        ])
      }
    }
    stage('推送到 CODING') {
      steps {
        // 无需修改 PROJECT_TOKEN_GK 和 PROJECT_TOKEN，它们为 CODING 内置环境变量
        // 请修改为你的代码库链接
        sh "git push https://${PROJECT_TOKEN_GK}:${PROJECT_TOKEN}@e.coding.net/your-team/project/repo.git HEAD:master"
      }
    }
  }
}
```

4.  在 CODING 持续集成中修改「触发规则」，关闭「代码更新时自动执行」，开启「定时触发」，最高频率为 5 分钟一次。

![](https://help-assets.codehub.cn/enterprise/20200807200639.png)


==== 2020/08/13 ====
