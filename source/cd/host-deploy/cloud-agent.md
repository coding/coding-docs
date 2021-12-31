---
title: 堡垒机 Agent - CODING 帮助中心
pageTitle: 堡垒机 Agent
pagePrevTitle: 主机组
pagePrev: cd/host-deploy/host-group.html
pageNextTitle: 部署阶段配置
pageNext: cd/host-deploy/stage.html
---

### 功能介绍

cloud-agent 是运行在堡垒机上的服务。堡垒机凭借此服务，接受来自 CODING CD 的指令，并利用 ssh 隧道对主机实施部署操作。

### 首次安装

点击团队首页右上角的齿轮图标 <img src ="https://help-assets.codehub.cn/enterprise/20210928153255.png" style ="margin:0"> 进入团队设置中心，你可以在「功能设置」→「堡垒机」中获取 cloud-agent 的安装命令。复制后，在堡垒机的适当目录下，直接粘贴运行即可启动 cloud-agent。

![](https://help-assets.codehub.cn/enterprise/20211013193552.png)

cloud-agent 成功运行后会出现以下提示

![](https://help-assets.codehub.cn/enterprise/20201224164642.png)

在【主机部署-堡垒机】页面中即可看到相应 cloud-agent。

![](https://help-assets.codehub.cn/enterprise/20201224164714.png)

### 后续运行

如果后续遇到 cloud-agent 断开的情况，可以人工登录到堡垒机上，先通过运行 `./cloud-agent stop` 确保 cloud-agent 服务关闭

![](https://help-assets.codehub.cn/enterprise/20201224164745.png)

然后再通过 `./cloud-agent up -d` 手动启动 agent。

![](https://help-assets.codehub.cn/enterprise/20201224164754.png)

### 更新

可以通过运行 `./cloud-agent update` 来进行更新。当有新版本的 agent 时，会进行相应的更新操作。

![](https://help-assets.codehub.cn/enterprise/20201224164858.png)

### 隐藏目录介绍

位置（堡垒机）：`~/.coding-cd`

```text
.
├── config
│   └── cloud-agent.yaml # 配置信息
├── db
│   ├── cloud-agent.db # sqlite 数据库，存放主机部署相关信息，例如部署内容、部署日志等。
│   └── cloud-agent.sql # 数据库表结构。
├── log
│   └── cloud-agent.log # 运行日志
└── scripts
    └── cloud-agent.sh # 辅助脚本
```

位置（主机）：`~/.cloud-agent`

cloud-agent 是否执行过某次部署中的某个脚本的标记

### 子命令概览

| 子命令 | 功能|
| - | - |
|completion  |设置自动补全。详情可通过 `cloud-agent completion --help` 查看|
|init        |初始化 cloud-agent 所需配置|
|language    |设置语言，默认为英语(en/cn)|
|stop        |停止 cloud-agent 服务|
|up          |启动 cloud-agent 服务|
|update      |更新 cloud-agent 版本|
|version     |打印 cloud-agent 版本|

==== 2021/09/22 ====
