---
title: COS 存储桶 - CODING 帮助中心
pageTitle: COS 存储桶
pagePrevTitle: 推送至 TCR 镜像仓库
pagePrev: ci/artifacts/tcr.html
pageNextTitle: 自动部署到 Docker 服务器
pageNext: ci/deploy/docker.html
alias: 
-   devops/ci/deploy/cloud-storage.html
-   ci/deploy/cloud-storage.html
---

### [功能介绍](#intro)

得益于腾讯云存储的自动扩容功能，你可以将需要存储至云端的项目通过持续集成一键发布至 COS 中，适合搭建静态网站、编译文件后供下载等场景。

### [新建存储桶](#new)

在云存储（如「[腾讯云 COS 对象存储](https://cloud.tencent.com/product/cos)」）中创建一个「存储桶」，获取名称、区域、密钥；

![腾讯云存储 COS 创建存储桶](https://help-assets.codehub.cn/enterprise/20200603104841.png)

### Jenkinsfile

在持续集成中参考并写入下述 `Jenkinsfile`，触发构建任务后进行上传；

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
        // Markdown 转成 HTML
        // sh 'pip install mkdocs && mkdocs build'
        // React/VUE SPA 生成 HTML
        // sh 'npm run build'
        // Android 打包
        // sh './gradlew assembleDebug'
      }
    }
    stage('上传到腾讯云 COS 对象存储') {
      steps {
        sh "coscmd config -a ${env.COS_SECRET_ID} -s ${env.COS_SECRET_KEY}" +
           " -b ${env.COS_BUCKET_NAME} -r ${env.COS_BUCKET_REGION}"
        sh "rm -rf .git"
        sh 'coscmd upload -r ./ /'
        //sh 'coscmd upload -r ./dist /'
      }
    }
  }
}
```

### [环境变量](#variable)

变量名              | 含义             | 参考值
-------------------|------------------|---------
COS_SECRET_ID  | 腾讯云访问密钥 ID  | stringLength36stringLength36string36
COS_SECRET_KEY | 腾讯云访问密钥 KEY | stringLength32stringLength323232
COS_BUCKET_NAME | 腾讯云对象存储桶   | devops-host-1257110097
COS_BUCKET_REGION | 腾讯云对象存储区域  | ap-nanjing

==== 2021/09/16 ====
