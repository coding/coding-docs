---
title: Npm - CODING 帮助中心
pageTitle: Npm
pagePrevTitle: 构建 Maven 类型制品
pagePrev: ci/artifacts/maven.html
pageNextTitle: 外部制品库认证
pageNext: ci/artifacts/outside.html
alias: 
-   devops/ci/artifacts/npm.html
-   ci/artifacts/npm.html
---

### 功能介绍

本文将给出如何使用持续集成任务构建 Npm 制品的示例 Jenkinsfile。构建完成后可以使用预置插件便捷的上传至 CODING 制品仓库中。在使用该功能之前，请确保您对  Npm 类型制品库有[初步了解](/docs/artifacts/quick-start/npm.html)。

### npmrc

创建 `.npmrc` 文件，提交到代码库，参考代码：

```shell
registry=https://my-team-npm.pkg.coding.net/my-project/my-npm-repo/
always-auth=true
//my-team-npm.pkg.coding.net/my-project/my-npm-repo/:username=${CODING_ARTIFACTS_USERNAME}
//my-team-npm.pkg.coding.net/my-project/my-npm-repo/:_password=${CODING_ARTIFACTS_PASSWORD_ENCODED}
//my-team-npm.pkg.coding.net/my-project/my-npm-repo/:email=zhang@example.com
```

### Jenkinsfile

```groovy
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: GIT_BUILD_REF]],
          userRemoteConfigs: [[
            url: GIT_REPO_URL,
            credentialsId: CREDENTIALS_ID
          ]]])
      }
    }
    stage('安装依赖') {
      steps {
        sh 'rm -rf /usr/lib/node_modules/npm/'
        dir ('/root/.cache/downloads') {
          sh 'wget -nc "https://coding-public-generic.pkg.coding.net/public/downloads/node-linux-x64.tar.xz?version=v16.13.0" -O node-v16.13.0-linux-x64.tar.xz | true'
          sh 'tar -xf node-v16.13.0-linux-x64.tar.xz -C /usr --strip-components 1'
        }
        withCredentials([
          usernamePassword(
            // CODING 持续集成的环境变量中内置了一个用于上传到当前项目制品库的凭证
            credentialsId: env.CODING_ARTIFACTS_CREDENTIALS_ID,
            usernameVariable: 'CODING_ARTIFACTS_USERNAME',
            passwordVariable: 'CODING_ARTIFACTS_PASSWORD'
          )]) {
              script {
                sh '''
                CODING_ARTIFACTS_PASSWORD_ENCODED=$(echo -n "${CODING_ARTIFACTS_PASSWORD}" | base64)
                echo "CODING_ARTIFACTS_USERNAME=${CODING_ARTIFACTS_USERNAME}" >> $CI_ENV_FILE
                echo "CODING_ARTIFACTS_PASSWORD_ENCODED=${CODING_ARTIFACTS_PASSWORD_ENCODED}" >> $CI_ENV_FILE
                '''
                readProperties(file: env.CI_ENV_FILE).each {key, value -> env[key] = value }
              }
            }
        sh 'npm install'
      }
    }
    stage('检查代码规范') {
      steps {
        sh 'npm run lint'
      }
    }
    stage('单元测试') {
      steps {
        sh 'npm run test'
      }
    }
    stage('发布私有包 npm') {
      when {
        anyOf {
          tag '*'
        }
      }
      steps {
        sh 'npm publish'
      }
    }
  }
}
```

### 环境变量配置

如果发布到「本项目」的制品库，无需设置环境变量。如果发布到「其他项目」，请阅读[《外部制品库认证》](/docs/ci/artifacts/outside.html)。

团队成员在进行本地开发时，可以使用自己的账号和密码，在 Linux/macOS 中这样设置：

```shell
export CODING_ARTIFACTS_USERNAME=lilei@example.com
export CODING_ARTIFACTS_PASSWORD=123456
```


### 常见问题

1.  如何找到 .npmrc 文件?

```shell
npm config list
```
2.  如何创建凭据?
点击查看：[持续集成——使用凭据进行认证](/docs/ci/credential.html)
