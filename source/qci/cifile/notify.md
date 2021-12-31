---
title: 通知方式 - CODING 帮助中心
pageTitle: 通知方式
sitemap: false
---

本文档将说明 CIFile 中通知方式及其它高级选项配置指引。

### 通知方式
``` CODING 的通知项正在对接中，暂不支持配置```

```yaml
notifications:
    - name: "通知"                       # QCI前端页面展示用
      channel: "EMAIL;ENWECHAT"        # 通知渠道。EMAIL;ENWECHAT;SMS;ENWECHAT_GROUP;WECHAT
      group: "QCI_JOB_ADMIN;QCI_JOB_NOTIFY_USER"  # 通知组（QCI内置的管理员成员等，如：QCI_JOB_MEMBER;QCI_JOB_ADMIN;QCI_JOB_NOTIFY_USER;QCI_TRIGGER）
      enwechat_group: ""           # 企业微信群id
      user: "andrewjiang;"         # 指定人
      template: ""                 # 通知内容模版
      on_success: change           # 成功发送(change或者always或者never)
      on_failure: always           # 失败发送(change或者always或者never)
    - name: "通知2"
      channel: EMAIL
      group: QCI_JOB_ADMIN
      enwechat_group: ""
      user: ""
      template: ""
      on_success: change
      on_failure: never
```

`channel`通知渠道。可以选项：EMAIL、ENWECHAT、SMS、ENWECHAT_GROUP、WECHAT。支持配置多个渠道，使用";"隔开。

`group`通知组，可以填写 CODING-CI 内置环境变量，如QCI_JOB_MEMBER、QCI_JOB_ADMIN、QCI_JOB_NOTIFY_USER、QCI_TRIGGER。支持配置多个渠道，使用";"隔开。

`enwechat_group`企业微信群id。群号获取方法：PC端企业微信，同时按Ctrl+Shift+Alt+D查看。支持填写多个群号，使用";"隔开。

`user`指定其它通知人，填写企业微信名，多个人使用";"隔开。

`template`发送邮件时支持自定义 html 样式或者 markdown 格式子集，发送其他方式时会自动剔除 html 标签，支持使用环境变量，如：${QCI_TRIGGER}。

`on_success`流水线执行成功后通知发送策略，可以填写项：change：结果变化时发送（例如上次成功这次失败）；always：总是发送；never：不发送。

`on_failure`流水线执行失败后通知发送策略，可以填写项：change：结果变化时发送（例如上次成功这次失败）；always：总是发送；never：不发送。

==== 2021/10/26 ====
