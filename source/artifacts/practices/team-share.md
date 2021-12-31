---
title: 搭建团队级制品库 - CODING 帮助中心
pageTitle: 搭建团队级制品库
pagePrevTitle: 制品扫描——扫描对象
pagePrev: artifacts/scan/demo.html 
pageNextTitle: 使用 npm 仓库管理 Javascript 私有依赖包
pageNext: artifacts/practices/npm-js.html
---

制品仓库的权限范围有两种：

-   每个项目都创建自己的制品库，适合项目内开发协作场景；
-   整个公司/团队共享一个制品库，适合团队开发协作场景；

本文将介绍如何创建「团队级制品仓库」。

### [创建团队共享项目](#create-project)

首先创建一个公司/团队级共享项目，在该项目中创建制品库，并将权限范围选为「团队内」。

![](https://help-assets.codehub.cn/enterprise/20211124113505.png)

### [创建项目令牌](#project-token)

项目令牌可以理解为调取制品仓库资源的一种“钥匙”，通过使用项目令牌就可以在持续集成中或其他场景中拉取制品。若需了解更多，请阅读[详情](/docs/project-settings/deploy-tokens.html)。

> 个人密码与令牌更适用于个人本地开发，而持续集成等团队设置中应使用「项目令牌」。

进入项目后，点击左下角的「项目设置」→「开发者选项」→「项目令牌」，点击「新建项目令牌」后，输入令牌名称、设定过期时间、勾选制品仓库中的读取与读写权限。

![](https://help-assets.codehub.cn/enterprise/20211124134815.png)

创建后可以获取令牌的用户名与密码。

![](https://help-assets.codehub.cn/enterprise/20211124135525.png)

### [使用项目令牌](#use-project-token)

前往「凭据管理」，将令牌的用户名与密码录入其中，需勾选「授权所有持续集成构建计划」。

![](https://help-assets.codehub.cn/enterprise/20211124140843.png)

获取「凭据 ID」。

![](https://help-assets.codehub.cn/enterprise/20211124142219.png)

录入至持续集成中的配置中即可具备访问制品仓库的读写权限。

![](https://help-assets.codehub.cn/enterprise/20211124143340.png)

配置好持续集成后，团队成员触发此任务就能够自动将制品上传至仓库中。若要拉取已上传制品，在首页左侧的「全部制品」中选择制品后进行拉取。

![](https://help-assets.codehub.cn/enterprise/20211124143308.png)

==== 2021/11/24 ====
