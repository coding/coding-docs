---
title: 持续集成的插件 - CODING 帮助中心
pageTitle: 持续集成的插件
pagePrevTitle: 持续集成的构建快照
pagePrev: ci/snapshot.html
pageNextTitle: 图形化编辑器介绍
pageNext: ci/visual-editor.html
alias: devops/ci/plugins.html
---


### 功能介绍

在实际的生产环境中，有着许多重复性较强的工作。CODING 持续集成具备插件功能，它能够帮助您高效处理繁琐重复的工作，并且还可以通过自定义参数来解决个性化需求。CODING 即将支持更多的内置插件。

### 使用插件上传 Generic 类型制品

在 CODING 持续集成任务构建过程当中，您可以选择将构建物上传至 CODING 制品库。Generic 制品上传插件能够让您更方便地在持续集成当中上传 Generic 类型构建物，目前单文件大小最高支持 5GB。在使用该功能之前，请确保您对 Generic 类型制品库有初步了解，您可以点击阅读[在 CODING 中使用 Generic 制品库](/docs/artifacts/quick-start/generic.html)了解更多。

### 快速开始

您可以选择使用固定模板或 Jenkinsfile 配置两种方式来上传 Generic 类型制品。

#### 固定模板

1.  在使用插件上传前，请确保您已经创建了 [Generic 类型制品库](/docs/ci/artifacts/generic.html) ，下方的演示将会以 test 制品库为例。

![](https://help-assets.codehub.cn/enterprise/20200306161940.png)

2.  在构建中点选新建构建计划配置。

![](https://help-assets.codehub.cn/enterprise/20200306162453.png)

3.  在配置来源中选择查看更多，选择 Generic 制品上传。

![](https://help-assets.codehub.cn/enterprise/20200306163318.png)

![](https://help-assets.codehub.cn/enterprise/20200306163514.png)

4.  在默认值选中刚刚创立的 test 制品库，您也可以在代码中填写您的制品库地址。

![](https://help-assets.codehub.cn/enterprise/20200306164938.png)

5.  点击保存并构建。

![](https://help-assets.codehub.cn/enterprise/20200306165355.png)

6.  构建完成后在制品库中会出现刚刚上传的文件。

![](https://help-assets.codehub.cn/enterprise/20200306165730.png)

#### Jenkinsfile 配置

1.  在选择代码仓库的时候，请确保代码仓库中已含有如下配置的 Jenkinsfile 文件。

```groovy
pipeline {
    agent any
    stages {
        stage(' 上传到 generic 仓库') {
            steps {
                // 使用 fallcate 命令创建 10M 大小的文件 (持续集成默认的工作目录为 /root/workspace)
                sh 'fallocate -l 10m my-generic-file'

                codingArtifactsGeneric(
                    files: 'my-generic-file',
                    repoName: 'myrepo', //此处填写您的仓库参数，例如${env.GENERIC_REPO_NAME}
                )
            }
        }
    }
}

```

2.  在流程配置中也可以对 Jenkinsfile 配置进行修改。

![](https://help-assets.codehub.cn/enterprise/20200306172328.png)

3.  构建完成后在制品库中会出现刚刚上传的文件。

![](https://help-assets.codehub.cn/enterprise/20200306172155.png)

### 更多参数演示

```groovy
pipeline {
    agent any
    stages {
        stage(' 上传到 generic 仓库') {
            steps {
                // 使用 fallcate 命令创建 10M 大小的文件 (持续集成默认的工作目录为 /root/workspace)
                sh 'fallocate -l 10m my-generic-file'

                codingArtifactsGeneric(
                    files: 'my-generic-file',
                    repoName: 'myrepo',
                )
            }
        }
    }
}

```

### 参数说明

| 参数名称           | 必填                        | 文本参数类型  | 图形化参数类型                            | 默认值                                                                                                             | 说明                                                                                                                                                                                                        |
|----------------|---------------------------|---------|------------------------------------|-----------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| files          | 是                         | \-      | 需要上传的文件列表，支持通配符 build/libs/\*\*/xx |                                                                                                                 |                                                                                                                                                                                                           |
| repoName       | 是 （若单独设置了 repoURL ，则可以不填） | string  | 制品库名称                              | \-                                                                                                              | 该参数决定了制品上传的制品仓库，只需要输入 repoName 即可，默认会上传到当前项目下的制品仓库里。若制品仓库不在当前项目下，请使用 repoURL                                                                                                                              |
| version        | 否                         | string  | string                             | latest                                                                                                          | 制品的版本，默认为 latest                                                                                                                                                                                          |
| version        | 否                         | \-      | string                             | string                                                                                                          | 将所选目录下的制品打包成一个 zip 后，再上传成单独的制品，例: demo\.zip （不设置该参数，多个文件将上传为单独的制品）                                                                                                                                        |
| zip            | 否                         | string  | 凭据（用户名\+密码）                        | env\.CODING\_ARTIFACTS\_CREDENTIALS\_ID                                                                         | 用于上传制品库的凭证（只支持 username \+ password）类型，默认将使用环境变量中的 CODING\_ARTIFACTS\_CREDENTIALS\_ID                                                                                                                     |
| repoURL        | 否                         | string  | string                             | https://<env\.CCI\_CURRENT\_TEAM>\-generic\.<env\.CCI\_CURRENT\_DOMAIN>/<env\.PROJECT\_NAME>/<params\.repoName> | 默认将用 CI 内置的环境变量 CCI\_CURRENT\_TEAM CCI\_CURRENT\_DOMAIN PROJECT\_NAME 和 参数设置的 repoName 组成，如: https://myteam\-generic\.coding\.net/myproject/myrepo/。  用户若想上传到非当前项目的制品库里，可以手动设置该参数。  设置了该参数后，repoName 将失效。 |
| withBuildProps | 否                         | boolean | boolean                            | true                                                                                                            | 设置为 true ，默认会将当前持续集成构建环境与内置制品属性的信息关联，查看具体内容                                                                                                                                                               |



==== 2020/08/13 ====
