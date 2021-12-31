---
title: Generic - CODING 帮助中心
pageTitle: Generic
pagePrevTitle: 构建 Docker 类型制品
pagePrev: ci/artifacts/docker.html
pageNextTitle: 构建 Maven 类型制品
pageNext: ci/artifacts/maven.html
alias: ci/artifacts/generic.html
---

持续集成生成的文件可保存到文件制品库，适合 React/VUE 等前端项目、Android/iOS/C++ 等客户端项目。

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
    stage('构建') {
      steps {
        sh 'npm install'
        sh 'npm run build'
        sh 'tar -zcvf shop-web.tar.gz dist'
      }
    }
    stage('保存到制品库') {
      steps {
        codingArtifactsGeneric(files: 'shop-web.tar.gz', repoName: 'my-generic', version: '1.0.0')
      }
    }
  }
}
```

### [截图](#screenshots)

![](https://help-assets.codehub.cn/enterprise/20210924162937.png)
![](https://help-assets.codehub.cn/enterprise/20210924163050.png)

### 常见问题

1.  如何自动生成版本号？

请阅读：[自动生成版本号](/docs/ci/artifacts/version.html)
