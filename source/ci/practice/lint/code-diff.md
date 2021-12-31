---
title: 增量检查 - CODING 帮助中心
pageTitle: 增量检查
pagePrevTitle: 安装 PHP 依赖包
pagePrev: ci/depend/php.html
pageNextTitle: Git commit message 规范
pageNext: ci/lint/git-commit.html
alias: 
-   devops/ci/lint/jenkins-git-diff.html
-   ci/lint/jenkins-git-diff.html
-   ci/lint/code-diff.html
---

### [功能介绍](#intro)

增量检查机制多用于代码合并请求场景，当有新的代码变更时将自动触发持续集成任务，对代码的变动情况进行规范性检查。

### [开始使用](#start)

1.  在持续集成的触发规则中开启创建合并请求时触发构建；

![](https://help-assets.codehub.cn/enterprise/20210916165341.png)

2.  参考并使用下述 `Jenkinsfile`：

### Jenkinsfile

```groovy
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: '*']],
          userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]
        ])
        script {
          if ( env.MR_SOURCE_BRANCH ==~ /.*/ ) {
            sh "git checkout ${env.MR_TARGET_BRANCH}"
            sh "git checkout ${env.MR_SOURCE_BRANCH}"
          } else {
            sh "git checkout ${env.GIT_COMMIT}"
          }
        }
      }
    }
    stage('安装依赖') {
      steps {
        sh 'npm install -g lint-md-cli'
      }
    }
    stage('增量检查代码规范') {
      when {
        changeRequest()
      }
      steps {
        sh "git diff --diff-filter=d --name-only ${env.MR_TARGET_BRANCH}... | xargs lint-md"
      }
    }
  }
}
```

### [运行结果](#result)

增量代码未通过状态检查，拦截代码合并：

![](https://help-assets.codehub.cn/enterprise/20200709171245.png)

在构建计划的日志中将展示错误记录：

![](https://help-assets.codehub.cn/enterprise/20200709170147.png)

增量代码通过状态检查，允许代码合并：

![](https://help-assets.codehub.cn/enterprise/20200709170346.png)

增量代码通过状态检查：

![CODING CI 检查代码规范：成功](https://help-assets.codehub.cn/enterprise/20200709171032.png)


==== 2020/08/13 ====
