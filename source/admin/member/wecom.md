---
title: 从企业微信导入成员 - CODING 帮助中心
pageTitle: 通过企业微信导入成员
pagePrevTitle: 管理组织架构成员
pagePrev: admin/member/members-organization.html
pageNextTitle: 通过腾讯云导入成员
pageNext: admin/member/cloud.html
alias: 
-   admin/members/wecom.html
-   admin/members/app.html
-   admin/department/app.html
---

CODING 支持从企业微信导入部门成员数据。选择该类型后不支持在 CODING 中进行部门的创建、删除、移动、重命名，成员移动至其他部门等操作。若需进行上述操作，请前往「企业微信后台」->「通讯录」管理操作，然后在 CODING 部门列表上方点击刷新按钮进行同步。

从企业微信导入部门成员分为以下几步:

1.  [团队管理员绑定企业微信](#1)
1.  [自建企业微信应用](#2)
1.  [管理员授权成员或成员自行绑定](#3)
1.  [接受邀请加入团队](#4)

导入成员之后，您还可以通过[成员自动同步](#sync)实现企业微信通讯录成员被删除后自动退出所在的 CODING 团队。

### [绑定企业微信](#1)

进行绑定操作前，团队管理员需前往「团队设置中心」->「全局设置」->「第三方应用」中提前绑定企业微信，详情请参考[《服务集成——企业微信》](/docs/admin/service-integration/wecom.html)。

![](https://help-assets.codehub.cn/enterprise/20210929163224.png)

### [自建企业微信应用](#2)

CODING 集成了企业微信登录功能，支持企业微信通讯录应用导入。受限于企业微信第三方应用获取部门和成员名称，需要用户在企业微信自建应用并开启通讯录访问权限。完成后 CODING 可通过企业微信自建应用一键同步企业微信部门成员数据。

#### [创建自建应用](#create)

您可阅读企业微信的[官方文档](https://open.work.weixin.qq.com/wwopen/helpguide/detail?t=selfBuildApp)，或阅读本文档创建自建应用。该操作要求拥有企业微信的管理员权限。进入企业微信自建应用页面，然后前往「创建应用」处。

![](https://help-assets.codehub.cn/enterprise/20201116111356.png)

进入自建应用创建填写页面，需要填下如下必要信息：

填写项 | 必须 | 说明
:----------- | :-----------: | -----------:
应用 Logo |	是 |	自定义
应用名称 |	是 |	自定义
应用介绍 |	否 |	自定义
可见范围 |	是 |	选择该应用可见的部门或人员

![](https://help-assets.codehub.cn/enterprise/20201116111649.png)

新建完成应用后，进入应用详情页面。您可以在此页面查看应用的 AgentId 和 Secret、设置应用可见范围、启用/停用应用、删除应用等操作。

![](https://help-assets.codehub.cn/enterprise/20201116111710.png)

#### [查看企业 ID](#view)

您可以访问此处查看企业 ID。**需注意：**应用 AgentId 和 Secret 可以用于 CODING 同步企业微信部门成员数据，请勿随意更改并妥善保管。

![](https://help-assets.codehub.cn/enterprise/20201116112011.png)

完成上述操作后，回到 CODING 页，按照提示输入 AgentId 和 Secret，保存后即可进行同步。

![](https://help-assets.codehub.cn/enterprise/20210708184735.png)

导入开始后可以在页面中查看进度。

![](https://help-assets.codehub.cn/enterprise/20201117175625.png)

### [管理员授权或成员自行关联](#3)

#### [管理员授权成员](#admin)

管理员在导入成员后，需回到团队成员列表进行成员的授权操作。

![](https://help-assets.codehub.cn/enterprise/20210412140401.png)

若团队成员已加入 CODING 团队，管理员可以通过一键匹配将企业微信成员与现有成员进行绑定，绑定后将保留该成员的历史数据。

![](https://help-assets.codehub.cn/enterprise/20211229152354.png)

#### [团队成员自行关联](#member)

如成员已加入团队，也可以前往「个人账户设置」->「绑定设置」中自行关联企业微信完成授权。

![](https://help-assets.codehub.cn/enterprise/20210708192043.png)

### [接受邀请加入团队](#4)

> 若成员已自行前往「个人账户设置」->「绑定设置」中关联企业微信完成授权则不需要此步骤操作。

企业微信成员被授权后，将会在企业微信内收到一条加入团队的邀请链接。

![](https://help-assets.codehub.cn/enterprise/20210708192829.png)

点击该链接，验证账号后即可加入该团队，若成员尚未注册 CODING 账号，可先注册后加入。

![](https://help-assets.codehub.cn/enterprise/20210708192945.png)

### [成员自动同步](#sync)

为了保障企业信息安全，CODING 支持自动同步企业微信通讯录与 CODING 团队成员，以便企业微信通讯录的成员由于离职等原因被删除时能自动解除与 CODING 团队的关联。

1.  在「团队设置中心」->「全局设置」->「组织与成员」->「成员管理」中，点击页面左下角「企业微信后台管理」右侧的设置按钮，选择「应用配置」。

![](https://help-assets.codehub.cn/enterprise/20210929163603.png)

2.  选择所需的成员同步策略并保存设置。

-   **从团队移除成员**：企业微信通讯录中的成员被删除之后，自动退出所在的 CODING 团队。
-   **锁定成员**：企业微信通讯录中的成员被删除之后，仍保留在 CODING 团队成员列表，但无法访问团队资源和登录团队。
-   **仅取消授权**：企业微信通讯录中的成员被删除之后，仍保留在 CODING 团队成员列表，但无法访问 CODING。成员被授权之后即可重新登录团队。

![](https://help-assets.codehub.cn/enterprise/20210831184119.png)


==== 2021/09/29 ====
