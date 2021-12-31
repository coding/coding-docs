---
title: Generic - CODING 帮助中心
pageTitle: Generic
pagePrevTitle: Docker 制品库
pagePrev: artifacts/quick-start/docker.html
pageNextTitle: Maven 制品库
pageNext: artifacts/quick-start/maven.html
alias: 
-   devops/artifacts/quick-start/generic.html
-   ar/quick-start/generic.html
-   packages/quick-start/generic.html
---

该文档介绍如何将通用文件类型的制品存储在 CODING 制品库中。其内容包括创建制品库、推送、拉取和删除制品。

### [创建制品仓库](#create)

参考[基础操作](/artifacts/quick-start/basic.html)，在项目中创建 Generic 类型制品仓库。

### [推送制品](#push)

Generic 类型制品库支持两种方式推送制品：
-   命令行方式
-   通过页面直接上传
  
#### [通过命令行上传](#commands-line-upload)

输入本地路径、制品名称、制品版本后将自动生成推送命令，复制后直接在终端中运行即可。制品上传过程支持断点续传，按照图示的提示命令安装插件后再进行推送。

![](https://help-assets.codehub.cn/enterprise/20210922111505.png)

输入服务密码，认证后完成推送。

![](https://help-assets.codehub.cn/enterprise/20210922114241.png)

#### [通过页面直接上传](#page-upload)

直接将制品文件拖拽至页面按钮也可以完成上传操作。

![](https://help-assets.codehub.cn/enterprise/20210922140701.png)

### [查看制品](#view)

上传成功后，在包列表处即可查看版本号信息。

![](https://help-assets.codehub.cn/enterprise/20210922140922.png)

### [拉取制品](#pull)

点击已上传制品的「操作指引」，输入版本号与名称后自动生成命令，在终端中运行命令进行拉取：

![](https://help-assets.codehub.cn/enterprise/20210922141615.png)

### [删除制品](#delete)

点击页面上的「删除版本」按钮进行制品版本删除。

![](https://help-assets.codehub.cn/enterprise/20210922142422.png)

若需删除制品仓库，点击[基础操作](/docs/artifacts/quick-start/basic.html#delete)进行了解。

==== 2021/09/22 ====
