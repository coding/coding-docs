---
title: 部署阶段配置 - CODING 帮助中心
pageTitle: 部署阶段配置
pagePrevTitle: 堡垒机 Agent
pagePrev: cd/host-deploy/cloud-agent.html
pageNextTitle: 运行脚本阶段
pageNext: cd/host-deploy/script.html
---

### 功能介绍

部署（主机组）包含 5 个配置项。

![](https://help-assets.codehub.cn/enterprise/20201224165501.png)

### 基础设置

在基础设置部分选择部署的目标主机组，并指定部署的服务名称（CODING 持续部署基于服务名称实现版本管理和回滚等操作）。

### 前置脚本

前置脚本会在主机组的所有实例上运行，常为停服、备份旧版本等操作。

脚本有 `使用制品` 和 `输入内容` 两种来源，其中 `制品` 支持 Git 仓库文件和 Generic 仓库文件。

### 制品下载

制品下载有两项配置：

1.  选择需要下载的制品，目前支持 Generic 仓库文件
2.  指定目标主机的绝对路径，如：`/opt/download/artifacts/package.tgz`

### 后置脚本

前置脚本会在主机组的所有实例上运行，常为制品解压缩、启动服务等操作。

脚本有 `使用制品` 和 `输入内容` 两种来源，其中 `制品` 支持 Git 仓库文件和 Generic 仓库文件。

### 健康探针

健康探针有 **HTTP 探针** 和 **SHELL 探针**两种类型。

#### HTTP 探针

字段说明：

| 字段     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| 请求路径 | 指定 HTTP 探针的请求路径，注意是主机组中的实例自己对自己进行 HTTP 请求 |
| 间隔时间 | 每次请求的间隔时间                                           |
| 超时时间 | HTTP 请求的超时时间                                          |

#### SHELL 探针

表单项说明：

| 字段     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| 脚本来源 | 脚本有 `使用制品` 和 `输入内容` 两种来源，其中 `制品` 支持 Git 仓库文件和 Generic 仓库文件 |
| 间隔时间 | Shell 脚本执行的间隔时间                                     |
| 超时时间 | Shell 脚本执行的超时时间                                     |

==== 2020/12/24 ====