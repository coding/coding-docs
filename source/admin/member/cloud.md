---
title: 从腾讯云导入成员 - CODING 帮助中心
pageTitle: 通过腾讯云导入成员
pagePrevTitle: 通过企业微信导入成员
pagePrev: admin/member/wecom.html
pageNextTitle: 通过 LDAP 导入成员
pageNext: admin/member/ldap.html
alias: admin/members/cloud.html
---

### [腾讯云导入指引](#introduction)

CODING 支持从腾讯云导入腾讯云子账号列表，暂不支持腾讯云导入组织结构。选择腾讯云类型支持部门的创建、删除、移动、重命名操作，支持已导入的子账号移动到部门操作。

![](https://help-assets.codehub.cn/enterprise/20201117165629.png)

如未绑定腾讯云账号，将弹窗提示前往绑定腾讯云账号。

![](https://help-assets.codehub.cn/enterprise/20210412140502.png)

如腾讯云授权登录态已过期，将弹出腾讯云登录弹窗，支持微信扫码和账号密码授权。

执行导入操作后，页面会显示导入进度。

![](https://help-assets.codehub.cn/enterprise/20201117165841.png)

导入完成后，需对成员进行授权操作，为对应成员授予访问 CODING 服务的团队权限。

![](https://help-assets.codehub.cn/enterprise/20210507165129.png)

### [腾讯云子账号登录指引](#login)

CODING 支持使用腾讯云导入的成员管理，支持腾讯云子账号导入到 CODING 成员系统，经授权后（授权同时会授予 QcloudCODINGFullAccess 策略），腾讯云子账号可在登录页面登录 CODING。

在登录页面输入主账号 ID、用户名、密码，点击登录。

登录条件：

-   主账号已在腾讯云 [CODING DevOps 控制台](https://console.cloud.tencent.com/coding)开通服务
-   对应子账号存在 QcloudCODINGFullAccess 策略 
-   子账号登录时需验证 CODING 账号

![](https://help-assets.codehub.cn/enterprise/20210410095036.png)

==== 2021/11/02 ====
