---
title: 基本设置 - CODING 帮助中心
pageTitle: 基本设置
pagePrevTitle: 权限配置
pagePrev: project-settings/permission.html
pageNextTitle: 高级设置——项目令牌
pageNext: project-settings/deploy-tokens.html
alias: project/basis/settings.html
---

项目管理员可在进入项目之后，点击页面左下角「项目设置」进入项目设置页面进行基本设置。

![](https://help-assets.codehub.cn/enterprise/20210803153424.png)
### [项目基本信息](#config)

如需对项目信息进行修改，在「项目设置」->「项目与成员」->「基本信息」中，按需修改项目的地址、名称或起始时间等。

![](https://help-assets.codehub.cn/enterprise/20210803154114.png)


注意：修改项目地址将导致项目的访问 URL（包含 Git 仓库的 URL）改变，在此之前的 URL 将失效。Git 仓库地址修改方法：

```bash
git remote set-url origin $NEW_URL
```

### [项目内功能开关](#switch)

在「项目设置」->「项目与成员」->「功能开关」中可**根据团队协作场景，自由组织和配置项目内各功能模块开关。**

![](https://help-assets.codehub.cn/enterprise/20210804150302.png)

当指定功能模块被关闭，进入项目后左侧导航栏将隐藏该功能模块入口。项目成员无法再访问该模块和相关数据，但已产生的数据或已配置的触发规则不受影响。当再次开启功能模块时，即可恢复至该功能模块关闭前的状态。

### [项目通知设置](#notify)

在「项目设置」->「项目与成员」->「通知设置」中可**开启「项目公告通知全员」和「合并请求动态通知全员」**。

-   开启「项目公告通知全员」开关：当有新的项目公告发布时，所有项目成员会在页面右上角 <img src ="https://help-assets.codehub.cn/enterprise/20210804152811.png" style ="margin:0"> 收到消息提醒。

-   开启「合并请求动态通知全员」开关：在没有分支管理员的情况下，当非保护分支有新的合并请求动态时，所有项目成员会在页面右上角 <img src ="https://help-assets.codehub.cn/enterprise/20210804152811.png" style ="margin:0"> 收到消息提醒。

![](https://help-assets.codehub.cn/enterprise/20210804152520.png)


### [每日工作邮件提醒](#email-reminder)

> 每日邮件提醒仅用于推送项目内变更信息。

在「项目设置」->「项目与成员」中自行开启「每日工作邮件提醒」；开启后将收到邮件提醒本周待完成的工作、已过期的工作、打开的缺陷与待处理的合并请求。

![](https://help-assets.codehub.cn/enterprise/20210804153023.png)

开启提醒之前，需点击页面右上角个人头像，进入「个人账户设置」->「提醒设置」开启「项目协同每日邮件提醒」。然后单独前往各个项目内的「项目设置」开启「每日工作邮件提醒」以接受特定项目的消息推送。

![](https://help-assets.codehub.cn/enterprise/20210804153431.png)


设置完成后，将在每天早晨 8:30-10:00 收到邮件，样式如下：

![](https://help-assets.codehub.cn/enterprise/20200417154352.png)

### [项目内分类标签](#tag)

项目分类标签用作项目内功能模块（任务、需求、缺陷、合并请求等）分类。


1.  在「项目设置」->「项目与成员」->「分类标签」中点击「新建标签」按钮。
如果尚未创建过任何标签，您也可以点击「一键预设默认标签」。

![](https://help-assets.codehub.cn/enterprise/20210804154845.png)

2.  在输入框内输入「标签名称」、选择标签颜色后即可完成项目标签创建。


3.  标签创建之后，便可在新建事项的时候为该事项指定标签。


### [项目模板设置](#template)

在「项目设置」->「项目与成员」->「模板配置」中可**创建项目 Markdown 模板，供项目内所有成员选用。**

CODING 支持团队、项目及个人级别的 Markdown 模板设置，且设置方式类似。模板设置完成后，在 CODING 平台内任一功能模块使用 Markdown 编辑框，都能选择已有的模板。

创建项目 Markdown 模板详细操作可见：[设置团队 Markdown 模板](/docs/admin/team.html#template)。



==== 2021/08/02 ====
