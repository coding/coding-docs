---
title: Serverless - CODING 帮助中心
pageTitle: Serverless
pagePrevTitle: 自动部署到 K8s 集群
pagePrev: ci/deploy/k8s.html
pageNextTitle:  自动部署到 Linux 服务器
pageNext: ci/deploy/ssh.html
alias: ci/deploy/serverless.html
---

### 功能介绍

持续集成可自动部署项目到 Serverless，适用于需要 SEO 的动态网站等场景，步骤如下：

1.  在 Serverless（如「[腾讯云 Serverless](https://cloud.tencent.com/product/ssr)」）中创建一个「应用」，获取名称、区域、密钥；

![](https://help-assets.codehub.cn/enterprise/20201130154339.png)

2.  在持续集成中使用下述 `Jenkinsfile`：执行命令进行部署；

### Jenkinsfile

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
    stage('编译') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('部署') {
      steps {
        sh 'npm install -g serverless'
        sh 'serverless deploy'
      }
    }
  }
}
```

### 持续集成环境变量

变量名              | 含义             | 参考值
-------------------|------------------|---------
SERVERLESS_PLATFORM_VENDOR | Serverless 厂商  | tencent
SERVERLESS_REGION | Serverless 区域  | ap-guangzhou
SERVERLESS_STAGE | Serverless 环境 | dev、test、prod
TENCENT_SECRET_ID | 腾讯云访问密钥 ID | AKIDFooBar
TENCENT_SECRET_KEY | 腾讯云访问密钥 KEY | jgaYd123456

==== 2020/11/30 ====
