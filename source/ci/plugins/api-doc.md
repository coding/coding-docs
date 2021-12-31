---
title: 上传 API 文档 - CODING 帮助中心
pageTitle: 上传 API 文档
pagePrevTitle: 通用报告收集
pagePrev: ci/plugins/html-report.html
pageNextTitle: 在阶段末尾执行插件
pageNext: ci/plugins/post-step.html
alias: devops/ci/plugins/api-doc.html
---

CODING 持续集成插件「读取代码生成 API 文档」可以提取代码中的注释，生成 API 文档并发布。

### 在代码中编写注释

在代码中编写注释，参考 [OpenAPI/Swagger 编写与导入指南](/docs/management/api/import/openapi.html#Code-First)。

并且在本地调试通过，比如 PHP Laravel Swagger 生成文档的命令是：

```shell
php artisan l5-swagger:generate
ls storage/api-docs/api-docs.json
```

### 创建空的 API 文档

在【文档管理】->【API 文档】中创建一个空的 API 文档。

![](https://help-assets.codehub.cn/enterprise/20200826194900.png)

### 使用图形化界面生成并上传 API 文档

使用【持续集成】的图形化编辑器，添加一个步骤「执行 Shell 脚本」，填入生成 API 文档的命令。

![](https://help-assets.codehub.cn/enterprise/20200826194306.png)

再添加一个步骤「读取代码生成 API 文档」，「语言 & 注释库」选择「其他」，填写之前生成的 `json` 文件路径，并且选择之前创建的「API 文档」。

![](https://help-assets.codehub.cn/enterprise/20200826194340.png)

![](https://help-assets.codehub.cn/enterprise/20200907153442.png)

### Jenkinsfile

也可以使用持续集成的「文本编辑器」，填入以下代码：

```groovy
pipeline {
  agent {
    docker {
      image 'sinkcup/laravel-demo:6-dev'
      args '-v /root/.composer:/root/.composer'
      reuseNode true
    }
  }
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]],
        userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]])
      }
    }
    stage('安装依赖') {
      steps {
        sh 'composer install'
      }
    }
    stage('生成 API 文档') {
      steps {
        sh 'php artisan l5-swagger:generate'
        codingReleaseApiDoc(apiDocId: '1', apiDocType: 'specificFile', resultFile: 'storage/api-docs/api-docs.json')
      }
    }
  }  
}
```

手动或自动执行构建计划，成功后，即可通过【文档管理】->【API 文档】中的链接进行访问。

==== 2020/09/07 ====
