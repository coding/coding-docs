---
title: 应用详情 - CODING 帮助中心
pageTitle: 应用详情
pagePrevTitle: true
pagePrev: true
sitemap: false
---

在应用的基础信息面板，你可以查看应用概览、发布记录与发布应用时的所需环境。

![](https://help-assets.codehub.cn/enterprise/20211103170746.png)

### [应用概览](#intro)

关系拓扑图中的内容由所关联代码仓库的 `yaml` 类型文件中元数据中定义的 `name` 名称所决定，将自动去重。

![](https://help-assets.codehub.cn/enterprise/20211103170345.png)

例如在[快速开始](/docs/orbit/start.html)中，已在关联仓库的 `templates` 目录中定义了 `yaml` 文件类型，那么拓扑图将自动抓取文件元数据中所定义的 `name` 参数用以绘制关系拓扑图。

![](https://help-assets.codehub.cn/enterprise/20211103150119.png)

### [未发布变更](#unposted-changes)

服务：对比上个已发布的版本号，统计有多少个微服务镜像发生了变更，自动对比应用的发布版本号与最新推送镜像版本中的数量差异。

配置：对比上个已发布版本中 `value.yaml` 文件中所改变的行数。

数据：对比上个已发布版本中数据库的变更个数。

![](https://help-assets.codehub.cn/enterprise/20211103170533.png)

### [发布记录](#deploy-record)

此处将展示应用的历次部署记录。

![](https://help-assets.codehub.cn/enterprise/20211103154435.png)

### [环境](#env)

环境可以理解为应用的发布与运行空间。提前在基础设施中添加集群后，在环境中便可以指定应用将要发布的集群。环境配置完成后，你可以查看集群的运行版本与监控信息，还支持进行集群的配置管理、监控与告警的配置等。

![](https://help-assets.codehub.cn/enterprise/20211103155704.png)

==== 2021/10/17 ====
