---
title: 调取已录入的凭据 - CODING 帮助中心
pageTitle: 调取已录入的凭据
pagePrevTitle: 上传 Generic 类型制品
pagePrev: ci/plugins/generic.html
pageNextTitle: 添加合并请求评审者
pageNext: ci/plugins/reviewer.html
alias: devops/ci/plugins/credentials.html
---


### 功能介绍

在持续部署中，有时候会需要用到第三方供应商所提供的服务，这时候就需要调用相关的凭据来获取权限。目前持续部署功能已集成内置插件，支持快速调取相关凭据。

### 使用插件快速调取已录入的凭据

在 CODING 持续集成任务构建过程当中，如果将 Github 的账号密码等重要信息硬编码在配置文件内，将会有极大的安全隐患。通过 CODING 的[凭据管理](/docs/project/features/credential.html)功能，将凭据 ID 写入配置文件中进行服务调用。在接下来的插件功能使用中，请确保您已将凭据托管至 CODING 中。

#### 快速开始

下面以调取凭据管理中的云 API 密钥为例，演示如何使用 Jenkinsfile 配置快速调取已录入的凭据。

1.  将获取到的 API 密钥上传至 CODING 进行托管以获得凭据 ID。

![](https://help-assets.codehub.cn/enterprise/20200310113938.png)

2.  在变量与缓存中点选增加环境变量→类别选择 CODING 凭据→选择您需调取的凭据。

![](https://help-assets.codehub.cn/enterprise/20200311105652.png)

3.  在构建于部署中新建计划列表，并填写相应的 Jenkinsfile 配置

#### Jenkinsfile 配置

```groovy
pipeline {
    agent any
    stages {
        stage('获取云 API 密钥') {
            steps {

                withCredentials([cloudApi(credentialsId: '此处填写您上传凭据后所生成的凭据 ID', secretIdVariable: 'CLOUD_API_SECRET_ID', secretKeyVariable: 'CLOUD_API_SECRET_KEY')]) {
                       sh 'CLOUD_API_SECRET_ID=${CLOUD_API_SECRET_ID}'
                       sh 'CLOUD_API_SECRET_KEY=${CLOUD_API_SECRET_KEY}'
                 }
                 withCredentials([[$class: 'CloudApiCredentialsBinding', credentialsId: '此处填写您上传凭据后所生成的凭据 ID', secretIdVariable: 'CLOUD_API_SECRET_ID', secretKeyVariable: 'CLOUD_API_SECRET_KEY']]) {
                       sh 'CLOUD_API_SECRET_ID=${CLOUD_API_SECRET_ID}'
                       sh 'CLOUD_API_SECRET_KEY=${CLOUD_API_SECRET_KEY}'
                 }
            }
        }
    }
}

```

4.  构建完成

![](https://help-assets.codehub.cn/enterprise/20200925113410.png)

#### 参数说明

| 参数名称              | 是否必填 | 默认值 | 说明                             |
|-------------------|------|-----|--------------------------------|
| credentialsId     | 是    | \-  | 需要获取的凭据 ID，仅支持云 API 类型的凭据      |
| secretIdVariable  | 是    | \-  | secretId 环境变量的名称，会用配置名称注入环境变量  |
| secretKeyVariable | 是    | \-  | secretKey 环境变量的名称，会用配置名称注入环境变量 |


==== 2020/08/13 ====
