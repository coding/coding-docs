---
title: 回滚 - CODING 帮助中心
pageTitle: 回滚
pagePrevTitle: 查看部署详情
pagePrev: cd/host-deploy/check-deploy-details.html
pageNextTitle: 最佳实践——Kubernetes 滚动发布实践
pageNext: cd/best-practice/rolling-release.html
---

### 功能介绍

使用场景一般是当线上版本出现故障时，需要回滚到某个稳定的历史版本。在【集群】页面点击服务组，可查看回滚操作入口：

![](https://help-assets.codehub.cn/enterprise/20201224174314.png)

回滚操作包含如下 5 个配置项：

*   基础设置：选择回滚的目标版本，填写对回滚操作的描述
*   前置脚本：选择版本后，系统自动填充部署此版本时的脚本内容，用户可根据需要编辑
*   制品下载：选择版本后，系统自动填充部署此版本时所用到的制品，不支持变更
*   后置脚本：选择版本后，系统自动填充部署此版本时的脚本内容，用户可根据需要编辑
*   健康探针：支持 HTTP 和 SHELL 脚本两种探针类型，用户可使用探针确保服务回滚成功

![](https://help-assets.codehub.cn/enterprise/20201224174338.png)

==== 2020/12/24 ====
