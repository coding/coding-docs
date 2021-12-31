---
title: 导入飞书成员 - CODING 帮助中心
pageTitle: 导入飞书成员
pagePrevTitle: 通过腾讯云导入成员
pagePrev: admin/member/cloud.html
pageNextTitle: 通过 TCTP 导入成员
pageNext: admin/member/tctp.html
alias: admin/members/ldap.html
---

### [导入指引](#intro)

完成[飞书绑定](/docs/admin/service-integration/feishu.html)后，前往「团队设置中心」-> 「全局设置」->「组织与成员」->「成员管理」开始进行成员与组织架构导入。

![](https://help-assets.codehub.cn/enterprise/20210927170024.png)

### [成员授权与关联](#associate)

导入成员后，还需要进行成员授权才能视为正式加入至 CODING 团队。

若成员**已加入 CODING 团队**，此时仅需进行「关联」操作就可以与飞书架构中的成员进行数据绑定。

成员可以自行前往「个人账户设置」->「绑定设置」中关联飞书账号。

![](https://help-assets.codehub.cn/enterprise/20210927171215.png)

团队管理员也可以将从飞书成员与现有成员（两者是同一人）进行绑定，完成后将保留该成员的历史数据。

![](https://help-assets.codehub.cn/enterprise/20210927171505.png)

若成员**从未注册过 CODING**，团队管理员在 CODING 后台「授权」成员时会发送 CODING 团队邀请邮件，成员按照指引依次完成 CODING 账号注册、账号验证后即可加入团队。

若成员**已注册过 CODING**，团队管理员在 CODING 后台「授权」成员时会发送 CODING 团队邀请邮件，成员直接点击登录后加入团队即可。

### [部门与成员同步](#sync)

在部门同步方面，组织架构导入完成后，CODING 中的部门创建、删除、移动、重命名，将成员移动至其他部门等操作将无法进行。如需变更，请前往飞书后台进行操作，设置完成后再点击 CODING 部门列表上方的刷新按钮进行同步。

在人员同步方面，CODING 支持自动同步飞书通讯录。若飞书成员由于离职等原因，被删除时将会自动解除与 CODING 团队的关联。

> 人员范围取决于[绑定飞书](/docs/admin/service-integration/feishu.html)过程中所选择的应用授权范围。

==== 2021/09/27 ====
