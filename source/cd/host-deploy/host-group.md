---
title: 主机组 - CODING 帮助中心
pageTitle: 主机组
pagePrevTitle: 堡垒机
pagePrev: cd/host-deploy/bastion-host.html
pageNextTitle: 堡垒机 Agent
pageNext: cd/host-deploy/cloud-agent.html
---

### 功能介绍

主机组是主机实例的集合，通常一个主机组对应应用的一个发布集群（测试集群、预发集群、生产集群）。

点击团队首页右上角的齿轮图标 <img src ="https://help-assets.codehub.cn/enterprise/20210928153255.png" style ="margin:0"> 进入团队设置中心，你可以在「功能设置」→「主机组」中进行管理。

![](https://help-assets.codehub.cn/enterprise/20211013194218.png)

### 添加主机组

| 表单名     | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| 堡垒机     | 此主机组绑定的堡垒机，堡垒机与主机组是一对多的关系           |
| 主机组名称 | 支持中文、字母、中划线和下划线                               |
| 认证方式   | 堡垒机和主机实例之间的通信支持 `密码` 和 `密钥` 两种认证方式 |
| 标签       | 自定义字段；可用于标识主机组所在地域，分类等信息             |
| 实例 IP    | 主机实例的 IP，多个 IP 地址换行填写                          |

==== 2020/12/24 ====
