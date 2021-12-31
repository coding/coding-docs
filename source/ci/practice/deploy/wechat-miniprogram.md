---
title: 微信小程序 - CODING 帮助中心
pageTitle: 微信小程序
pagePrevTitle: 自动部署到 Linux 服务器
pagePrev: ci/deploy/ssh.html
pageNextTitle: 在持续集成中使用 Docker
pageNext: ci/practice/docker.html
alias: ci/deploy/wechat-miniprogram.html
---

### [功能介绍](#intro)

持续集成可自动上传微信小程序，步骤如下：

1.  在[微信小程序管理后台](https://mp.weixin.qq.com/wxamp/home/guide)生成代码上传密钥，录入 CODING 项目凭据管理；

![](https://help-assets.codehub.cn/enterprise/20210604180023.png)

![](https://help-assets.codehub.cn/enterprise/20210604180141.png)

2.  把 CODING 持续集成的 IP 录入微信小程序管理后台的上传「IP 白名单」；

![](https://help-assets.codehub.cn/enterprise/20210604180246.png)

3.  在持续集成中使用下述 `Jenkinsfile`即可自动上传；

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
    stage('准备依赖') {
      steps {
        sh 'npm install -g miniprogram-ci'
        sh 'npm install'
      }
    }
    stage('预览小程序') {
      steps {
        withCredentials([ sshUserPrivateKey(credentialsId: "$MP_PRIVATE_CREDENTIALS_ID",keyFileVariable:'SSH_PRIVATE_KEY_PATH')
      ]) {
          sh "miniprogram-ci preview --pp ./miniprogram/ --pkp $SSH_PRIVATE_KEY_PATH --appid $MP_APP_ID --uv 1.0.0 --enable-es6 true --qrcode-format image --qrcode-output-dest qrcode.jpg"
          archiveArtifacts(artifacts: 'qrcode.jpg', allowEmptyArchive: false)
        }
      }
    }
    stage('上传小程序') {
      steps {
        withCredentials([ sshUserPrivateKey(credentialsId: "$MP_PRIVATE_CREDENTIALS_ID",keyFileVariable:'SSH_PRIVATE_KEY_PATH')
      ]) {
          sh "miniprogram-ci upload --pp ./miniprogram/ --pkp $SSH_PRIVATE_KEY_PATH --appid $MP_APP_ID --uv 1.0.0 --enable-es6 true"
        }
      }
    }
  }
}
```

### [持续集成环境变量](#ci-env)

变量名              | 含义             | 参考值
-------------------|------------------|---------
MP_PRIVATE_CREDENTIALS_ID  | 小程序上传密钥的凭据 ID  | abcdef00-1234-5678-bc0c-c57eddd2d123
MP_APP_ID | 小程序 App ID | wx886c660da29a1234

### [运行结果截图](#screenshots)

![](https://help-assets.codehub.cn/enterprise/20210604181108.png)

==== 2021/06/04 ====
