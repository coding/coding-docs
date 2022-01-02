---
title: Maven - CODING 帮助中心
pageTitle: Maven
pagePrevTitle: 构建文件类型制品
pagePrev: ci/artifacts/generic.html
pageNextTitle: 构建 npm 类型制品
pageNext: ci/artifacts/npm.html
alias: 
-   devops/ci/artifacts/maven.html
-   ci/artifacts/maven.html
---

### 功能介绍

本文将给出如何使用持续集成任务构建 Maven 制品的示例 Jenkinsfile。构建完成后可以使用预置插件便捷的上传至 CODING 制品仓库中。在使用该功能之前，请确保您对 Maven 类型制品库有[初步了解](/docs/artifacts/quick-start/maven.html)。

### Jenkinsfile 配置

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
    stage('发布到 maven 制品库') {
      steps {
        withCredentials([
          usernamePassword(
              // CODING 持续集成的环境变量中内置了一个用于上传到当前项目制品库的凭证
              credentialsId: env.CODING_ARTIFACTS_CREDENTIALS_ID,
              usernameVariable: 'CODING_ARTIFACTS_USERNAME',
              passwordVariable: 'CODING_ARTIFACTS_PASSWORD'
          )]) {
              withEnv([
                "CODING_ARTIFACTS_USERNAME=${CODING_ARTIFACTS_USERNAME}",
                "CODING_ARTIFACTS_PASSWORD=${CODING_ARTIFACTS_PASSWORD}"
              ]) {
                  sh 'mvn clean install'
                  sh 'mvn deploy -s ./settings.xml'
              }
          }
      }
    }
  }
}
```

### settings.xml 配置

在代码库里创建 `settings.xml`，按照制品库指引页给出的代码，修改下面的 id：

```xml BRACKET-FILTER
<?xml version="1.0" encoding="UTF-8"?>
<settings>
  <servers>
    <server>
      <id>my-team-maven-demo-maven</id>
      <username>${env.CODING_ARTIFACTS_USERNAME}</username>
      <password>${env.CODING_ARTIFACTS_PASSWORD}</password>
    </server>
  </servers>
</settings>
```

### pom.xml 配置

修改代码库里的 `pom.xml`，按照制品库指引页给出的代码，修改下面的 id、name 和 url：

```xml BRACKET-FILTER
<project>
    <!-- 必要属性 -->
    <groupId>[GROUP_ID]</groupId>
    <artifactId>[ARTIFACT_ID]</artifactId>
    <version>[VERSION]</version>

    <!-- 自定义仓库 -->
    <distributionManagement>
        <repository>
            <!--必须与 settings.xml 的 id 一致-->
            <id>my-team-maven-demo-maven</id>
            <name>maven</name>
            <url>https://my-team-maven.pkg.coding.net/repository/maven-demo/maven/</url>
        </repository>
    </distributionManagement>
</project>
```

### 环境变量配置

如果发布到「本项目」的制品库，无需设置环境变量。如果发布到「其他项目」，请阅读[《外部制品库认证》](/docs/ci/artifacts/outside.html)。

团队成员在进行本地开发时，可以使用自己的账号和密码，在 Linux/macOS 中这样设置：

```shell
export CODING_ARTIFACTS_USERNAME=lilei@example.com
export CODING_ARTIFACTS_PASSWORD=123456
```

### 截图

![](https://help-assets.codehub.cn/enterprise/20201022105031.png)
![](https://help-assets.codehub.cn/enterprise/20201022105314.png)
