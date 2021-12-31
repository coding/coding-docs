---
title: 制品库认证 -   CODING 帮助中心
pageTitle: 制品库认证
pagePrevTitle: 制品库权限
pagePrev: artifacts/permission.html
pageNextTitle: 制品属性及 REST API 操作说明
pageNext: artifacts/properties.html
alias: 
-   devops/artifacts/auth.html
-   ar/auth.html
-   packages/auth.html
---

### **功能介绍**

当用户访问制品库时，制品库会对用户提供的凭证进行鉴权，以确保用户对制品库拥有操作权限。[了解更多制品库权限](./permission.html)

制品库支持多种鉴权方式：

-   个人访问令牌
-   用户帐号密码
-   项目令牌
  
每种制品库在本地配置凭证的命令会有区别，但逻辑相似，并且在制品库页面都有设置凭证的指引。本文以 Docker 制品库为例，演示用户配置鉴权凭证的三种方式。


### 个人访问令牌

个人访问令牌（Access token）包含了用户的安全认证信息，利用访问令牌可以拥有查看或操作相应资源的权限。**我们推荐使用个人访问令牌进行制品库认证，相比直接配置用户帐号密码更加安全。**

1.  点击制品仓库指引页面的【使用访问令牌生成配置】。

![](https://help-assets.codehub.cn/enterprise/20191015102237.png)

2.  输入认证信息后，即可看到已携带新访问令牌的执行命令，点击【copy】复制命令。

> 请保存好访问令牌信息，如遗失或遗忘可在【个人帐户】->【访问令牌】中重新生成。

![](https://help-assets.codehub.cn/enterprise/20191015104709.png)

3.  在本地 docker 环境中，执行刚刚复制的 docker login 命令，提示登录成功即可进行下一步的推送/拉取操作。

![](https://help-assets.codehub.cn/enterprise/20191015111153.png)

#### 查看个人令牌

1.  点击右上角【个人设置】进入个人帐户页面。

![](https://help-assets.codehub.cn/enterprise/20191015135305.png)

2.  在个人帐户页面，点击【访问令牌】，可以看到上述步骤中通过制品库新建的个人访问令牌信息，在此页面您也可以看到个人访问令牌被使用的记录。

![](https://help-assets.codehub.cn/enterprise/20191015135443.png)

3.  点击令牌后面的【编辑】按钮，可以查看或修改该访问令牌的权限信息。

![](https://help-assets.codehub.cn/enterprise/20191015140017.png)

[了解更多个人访问令牌功能相关信息](/docs/member/tokens.html)

### 用户帐号密码

通过用户帐号（手机号或邮箱）密码也可设置凭证信息。

1.  在制品仓库指引页面，复制【手动配置】当中提供的 docker 命令。

![](https://help-assets.codehub.cn/enterprise/20191015111849.png)

2.  在本地 docker 页面执行命令，输入密码，即可认证成功进行下一步推送或拉取操作。

![](https://help-assets.codehub.cn/enterprise/20191015112130.png)


### 项目令牌

项目令牌更加适用于项目当中的公共场景。例如若您需要把制品库权限开放给某个/若干个其他项目成员，您可以通过给予项目令牌的方式赋予对方访问制品库的权限。

> 项目管理员拥有管理项目令牌的权限。

1.  在项目中，点击【项目设置】->【开发者选项】->【项目令牌】，即可查看、新建、编辑、禁用、删除项目令牌。

![](https://help-assets.codehub.cn/enterprise/20191227150400.png)

2.  点击【新建项目令牌】，填写令牌名称、过期时间、勾选制品库权限，点击新建。

![](https://help-assets.codehub.cn/enterprise/20191015143952.png)

3.  新建成功后，即可看到新项目令牌的用户名、密码等信息，点击【查看密码】可看到完整密码。

![](https://help-assets.codehub.cn/enterprise/20191015144139.png)

4.  使用项目令牌的**用户名**以及**密码**即可通过 docker login 命令进行认证。

> 这里执行的命令与个人访问令牌中的相同，只是用户名和密码不同。

![](https://help-assets.codehub.cn/enterprise/20191015111722.png)

[了解更多项目令牌相关信息](/docs/project/features/deploy-tokens.html)


==== 2020/08/13 ====
