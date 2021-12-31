---
title: Worker 常用命令 - CODING 帮助中心
pageTitle: Worker 常用命令
pagePrevTitle: 自定义节点
pagePrev: ci/node/customize.html
pageNextTitle: 构建节点池
pageNext: ci/node/pool.html
alias: devops/ci/node/cci-agent.html
---

### [功能介绍](#intro)

接入自定义构建节点时将在环境中安装 `Worker` 服务，并由此服务调度 CI 构建任务的下发与计算资源的分配。因此熟悉 `Worker` 服务的常用命令能够更好地配合 CI 构建任务，不同操作系统下的安装方法请阅读[此文档](/docs/ci/node/customize.html)。

### [常用配置项命令](#commands)

#### [注册](#register)

```bash
qci_worker reg_cci  --token  token   --server server  --home home
--token 项目令牌，必填
--server  指定的接入服务，非必填
--home    指定工作目录
```

示例：

```bash
qci_worker cci_reg  --token db6fd4d6a2fc7d753a2985d55c44a2262f3e543f  --server ws://codingcorp.nh113vufq.dev.coding.io --home ~/.codingqci
```

#### [启动服务](#start)

```bash
qci_worker up -d
```

#### [重启服务](#restart)

```bash
qci_worker stop
qci_worker up -d
```

#### [手动删除节点](#delete)

```bash
qci_worker stop   #停止 qci_worker
qci_worker remove  # 后台删除节点
```

### [修改配置](#modify)

若需要让指定的 Jenkins 配置项生效，需要先停止 Jenkins 服务进程，然后重启 `qci_worker` 服务。

```bash
qci_worker config  JENKINS_HOST=127.0.0.1   # 指定 Jenkins 启动 host
qci_worker config  JENKINS_PORT=15740       # 指定 Jenkins 启动 port
```

==== 2021/10/19 ====
