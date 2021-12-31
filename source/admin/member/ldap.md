---
title: 从 LDAP 导入成员 - CODING 帮助中心
pageTitle: 通过 LDAP 导入成员
pagePrevTitle: 通过腾讯云导入成员
pagePrev: admin/member/cloud.html
pageNextTitle: 通过 TCTP 导入成员
pageNext: admin/member/tctp.html
alias: admin/members/ldap.html
---

### [LDAP 导入指引](#introduction)

CODING 支持从 LDAP 导入部门成员数据。根据填写的配置信息支持两种模式：

1.  未填写部门配置。将支持在 CODING 部门组织功能中进行部门的创建、删除、移动、重命名，成员移动到部门等操作。
2.  已填写部门配置。将不支持在 CODING 部门组织功能中进行部门的创建、删除、移动、重命名，成员移动到部门等操作。如需操作，请前往 LDAP 系统操作后，点击同步按钮即可。

按照[《绑定 LDAP 指引》](/docs/admin/service-integration/ldap.html)完成绑定操作后，进入「团队设置中心」->「全局设置」->「组织与成员」->「成员管理」，选择 `AD/LDAP` 导入成员。

导入开始后可以在页面中查看进度。

![](https://help-assets.codehub.cn/enterprise/20201117175625.png)

### [登录指引](#login)

在登录页面中选择 AD/LDAP 登录后，填写团队域名、用户名、密码之后确认登录。

![AD/LDAP 登录页](https://help-assets.codehub.cn/enterprise/20210707142748.png)

确认登录后，若不是首次被授权访问，将直接进入 CODING 功能页面。若是首次被授权访问，系统将询问您是否使用已有账号登录 CODING 或注册新账号。

![使用已有账号登录 CODING 或注册新账号](https://help-assets.codehub.cn/enterprise/20210707143002.png)

如您选择已有账号登录，输入登录邮箱、密码后，即可完成加入团队。

![选择已有账号登录](https://help-assets.codehub.cn/enterprise/20210707143244.png)

如您选择注册新账号加入，填写登录邮箱、验证码、密码后，即可完成注册并加入团队。

![注册新账号加入](https://help-assets.codehub.cn/enterprise/20210707143050.png)

==== 2021/09/29 ====
