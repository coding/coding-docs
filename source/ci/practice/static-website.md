---
title: 自建静态网站 - CODING 帮助中心
pageTitle: 自建静态网站
pagePrevTitle: 在持续集成中使用 dotnet 工具
pagePrev: ci/practice/net-core.html
pageNextTitle: 自定义 Docker 构建环境
pageNext: ci/practice/customize-build-env.html
alias: 
-   devops/cd/static-website-pass.html
-   ci/practice/static-website-pass.html
---

本文将主要介绍如何通过持续集成任务将静态网站发布上线。

### [背景](#intro)

搭建简单的静态网站无需购买昂贵的服务器，通过对象存储即可快速让网站上线。静态网站分为两种类型：

-   无内容的单页应用：VUE/React SPA；
-   有内容的页面：HTML 或「程序生成 HTML」；

VUE/React SPA 难以被搜索引擎收录，不适合作为公司官网、个人博客。如果有 SEO 需求，推荐使用 [MkDocs](https://www.mkdocs.org/)、[Hexo](https://hexo.io/zh-cn/)、[VUE Nuxt](https://zh.nuxtjs.org/)、[React Next](https://nextjs.org/) 框架进行网站开发。

### [前置准备](#prerequisite)

-   [CODING 项目](/docs/start/project.html)

-   腾讯云 COS 存储桶

在腾讯云控制台中购买并开启 [COS 存储桶服务](https://console.cloud.tencent.com/cos5/bucket)，点击创建存储桶并将访问权限设置为「公有读私有写」。

![](https://help-assets.codehub.cn/enterprise/20211122171916.png)

在「基础配置」中开启静态网站功能。

![](https://help-assets.codehub.cn/enterprise/20211122172805.png)

在「访问设置」中获取具备存储桶权限的密钥信息。

![](https://help-assets.codehub.cn/enterprise/20211122173955.png)

### [创建构建任务](#create)

点击项目菜单栏左侧的「持续集成」，选择「自定义构建过程」即可，在持续集成设置中填入如下 `Jenkinsfile` 命令。

![](https://help-assets.codehub.cn/enterprise/20211122180409.png)

```groovy
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: env.GIT_BUILD_REF]], 
          userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]
        ])
      }
    }
    stage('部署到腾讯云存储') {
      steps {
        sh "coscmd config -a ${env.COS_SECRET_ID} -s ${env.COS_SECRET_KEY} -b ${env.COS_BUCKET_NAME} -r ${env.COS_BUCKET_REGION}"
        sh 'rm -rf .git'
        sh 'coscmd upload -r ./ /'
      }
    }
  }
}
```

### [修改环境变量](#env)

在上传至腾讯云 COS 过程中涉及到相关的访问密钥，因此需要以[环境变量](/docs/ci/configuration/env.html)的方式将其注入至构建计划配置中。

![](https://help-assets.codehub.cn/enterprise/20211122181325.png)

在持续集成设置中的变量与缓存中添加以下参数：

变量名              | 含义             | 参考值
-------------------|------------------|---------
COS_SECRET_ID  | 腾讯云访问密钥 ID  | stringLength36stringLength36string36
COS_SECRET_KEY | 腾讯云访问密钥 KEY | stringLength32stringLength323232
COS_BUCKET_NAME | 腾讯云对象存储桶   | devops-host-1257110097
COS_BUCKET_REGION | 腾讯云对象存储区域  | ap-nanjing

其中访问密钥 ID 与 KEY 填写上文中在「腾讯云控制台 - 访问设置」中获取的参数。

### [运行持续集成](#run)

保存持续集成配置后，点击「立即构建」，你可以在构建过程中查看各运行步骤详情。

![](https://help-assets.codehub.cn/enterprise/20211122181721.png)

### [参考命令](#commands)

以下是各个框架生成 HTML 文件的 `Jenkinsfile` 命令参考。

#### MKDocs

```groovy
pipeline {
  agent any
  stages {
    stage('检出') {...}
    stage('构建') {
      steps {
        echo 'Markdown 转成 HTML'
        sh 'pip install --upgrade mkdocs six'
        sh 'mkdocs build --clean'
      }
    }
    stage('部署到云存储') {
      steps {
        sh "coscmd config ..."
        sh 'coscmd upload -r site/ /'
      }
    }
  }
}
```

#### VUE Nuxt

```groovy
pipeline {
  agent any
  stages {
    stage('检出') {...}
    stage('构建') {
      steps {
        echo 'VUE Nuxt 生成 HTML'
        sh 'npm install'
        sh 'npm run generate'
      }
    }
    stage('部署到云存储') {
      steps {
        sh "coscmd config ..."
        sh 'coscmd upload -r dist/ /'
      }
    }
  }
}
```

#### VUE

```groovy
pipeline {
  agent any
  stages {
    stage('检出') {...}
    stage('构建') {
      steps {
        echo 'VUE 生成 HTML'
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('部署到云存储') {
      steps {
        sh "coscmd config ..."
        sh 'coscmd upload -r dist/ /'
      }
    }
  }
}
```

#### React

```groovy
pipeline {
  agent any
  stages {
    stage('检出') {...}
    stage('构建') {
      steps {
        echo 'React 生成 HTML'
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('部署到云存储') {
      steps {
        sh "coscmd config ..."
        sh 'coscmd upload -r build/ /'
      }
    }
  }
}
```

==== 2020/08/13 ====
