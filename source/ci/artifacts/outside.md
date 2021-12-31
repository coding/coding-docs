---
title: 推送至外部仓库 - CODING 帮助中心
pageTitle: 推送至外部仓库
pagePrevTitle: 构建 npm 类型制品
pagePrev: ci/artifacts/npm.html
pageNextTitle: 自动生成版本号
pageNext: ci/artifacts/version.html
alias: ci/artifacts/outside.html
---

本文档将介绍如何将制品推送至其他项目的制品仓库。例如，你希望使用 A 项目的持续集成任务将构建后的制品推送至 B 项目或其他第三方制品仓库中，将分为以下两步：

1.  在 B 项目中新建项目令牌 / 获取第三方制品仓库的用户名与密码
1.  在 A 项目中的持续集成任务中添加环境变量

### [创建项目令牌](#create-token)

在 B 项目的「项目设置」→「开发者选项」中创建「项目令牌」，填写名称后勾选「制品仓库」的「读写」权限。

![](https://help-assets.codehub.cn/enterprise/20211104195810.png)

创建后会获取令牌的用户名与密码。

![](https://help-assets.codehub.cn/enterprise/20211104195908.png)

### [使用令牌](#use-token)

在 A 项目的持续集成任务中，录入环境变量，填写在 B 项目中已创建的令牌用户名与密码或第三方制品仓库的用户名与密码，建议使用两项变量名：

```shell
CODING_ARTIFACTS_USERNAME
CODING_ARTIFACTS_PASSWORD
```

![](https://help-assets.codehub.cn/enterprise/20211102110324.png)

#### [Jenkinsfile 参考](#jenkinsfile)

```groovy
    stage('发布到 maven 制品库') {
      steps {
        echo "${env.CODING_ARTIFACTS_USERNAME}"
        sh 'mvn clean install'
        sh 'mvn deploy -s ./settings.xml'
      }
    }
```

==== 2021/11/05 ====
