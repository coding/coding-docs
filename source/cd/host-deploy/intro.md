---
title: 主机部署介绍 - CODING 帮助中心
pageTitle: 主机部署介绍
pagePrevTitle: 部署（Manifest）阶段
pagePrev: cd/pipe/stages/deploy.html 
pageNextTitle: 主机组
pageNext: cd/host-deploy/host-group.html
---

### 功能介绍

主机部署提供了基于物理机/虚拟机 的通用部署能力，支持将应用部署到公有云、混合云、私有云/私有环境中。主机部署是早期软件开发里常见、常用的部署方式，但随着 Docker、Kubernetes 的兴起，针对此类部署方式的支持也愈加稀少。因此一套整合了代码、制品、部署的整套流程更是屈指可数。如今 CODING CD 推出的主机组部署功能，正好能够弥补上这个缺口，让这种看似“原始”的方式也能加入进 DevOps 环中。点击阅读最佳实践——[《CODING CD 主机组部署实践》](/docs/best-practices/cd/host-group.html)

### 相关概念

-   堡垒机

堡垒机是 CODING 持续部署服务与主机之间的代理，CODING CD 通过堡垒机上运行的 Agent 服务管控应用发布过程。

-   主机组

主机组是主机实例的集合，通常一个主机组对应应用的一个发布集群（测试集群、预发集群、生产集群）

-   服务

CODING 持续部署抽象的概念。在部署（主机组）阶段需要定义本阶段部署的服务名称，CODING CD 基于此服务名实现版本管理和回滚。

### 架构图

![](https://help-assets.codehub.cn/enterprise/20201224160225.png)

==== 2020/12/24 ====
