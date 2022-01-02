---
title: 邮件通知 - CODING 帮助中心
pageTitle: 邮件通知
pagePrevTitle: 调取已上传的凭据
pagePrev: ci/plugins/credentials.html
pageNextTitle: 人工确认
pageNext: ci/plugins/manual-confirmation.html
---

### [功能介绍](#intro)

若想要知悉重要的持续集成任务是否成功运行，可以在构建流程中添加 SMTP 邮件通知插件。任务结束后发送邮件至指定人员以及时查看本次构建所涉及的详细参数。本文将演示如何在构建失败时自动发送邮件通知。

> 你还可以阅读[《第三方服务通知》](/docs/admin/message/third-party/wechat.html)了解如何使用微信、企业微信、企业微信群机器人、钉钉机器人接受通知信息。

### [添加插件](#plugin)

点击持续集成设置，在流程配置中使用图形化编辑器在结束阶段中添加 SMTP 邮件发送插件。

![](https://help-assets.codehub.cn/enterprise/20211222115357.png)

填写邮件标题，在正文中可以添加环境变量以说明此次构建中所生成的关键信息。例如在本文中使用了 `${GIT_REPO_URL}` 与 `${GIT_BUILD_REF}` 环境变量分别说明代码仓库地址与 Git 修订版本号。

![](https://help-assets.codehub.cn/enterprise/20211222121550.png)

> 发件人邮箱授权码与服务地址请咨询邮件服务提供商。

点击阅读[《持续集成——环境变量》](/docs/ci/configuration/env.html#default-env)获取更多系统内置环境变量以增加邮件中需要通知的信息，如提交作者邮箱、提交者名称等信息。

### [条件执行](#conditional-execution)

通过在结束阶段中的高级配置启用[置底执行](/docs/ci/plugins/post-step.html)，你可以为邮件通知的启用触发条件，例如在本文中我们设置当本次构建任务运行失败时再进行邮件通知。

![](https://help-assets.codehub.cn/enterprise/20211222123736.png)

### [通知结果](#result)

触发持续集成后，当任务运行失败后将启用邮件发送步骤进行提醒。

![](https://help-assets.codehub.cn/enterprise/20211222124551.png)

邮件样式如下，你也可以通过 html 语言自定义邮件样式。

![](https://help-assets.codehub.cn/enterprise/20211222153048.png)

==== 2020/12/22 ====
