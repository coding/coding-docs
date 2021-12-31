---
title: 手动提交发布单 - CODING 帮助中心
pageTitle: 手动提交发布单
pagePrevTitle: 在构建计划中添加部署阶段
pagePrev: cd/deploy-way/ci-job.html
pageNextTitle: 部署流程中的制品
pageNext: cd/pipe/artifacts/in-pipelines.html
---

### [新建发布单](#create)

在[权限控制](/docs/cd/rbac.html)一文中，我们推荐赋予「开发」用户组访问与持续部署管理权限。

![](https://help-assets.codehub.cn/enterprise/20210729110254.png)

设置后，开发具备提交发布单的权限，不具备前往部署控制台修改部署配置的权限。运维组用户还可以在应用的部署流程中添加人工确认步骤，确保通过发布单发布时是经二次确认的，通过权限控制把控发布质量。

![](https://help-assets.codehub.cn/enterprise/20210729111644.png)

点击新建发布单后，可以运行已有应用及部署流程。

![](https://help-assets.codehub.cn/enterprise/20210729135533.png)

### [快速发布](#quick)

若不希望在团队设置复杂的权限限制，而直接希望体验持续部署功能，可以使用「快速发布」功能。无需在控制台中配置部署流程即可将镜像发布至集群中，适用于更加灵活复杂的部署流程的场景，比如说临时镜像变更等突发场景，无需快速将制品发布至集群中。

![](https://help-assets.codehub.cn/enterprise/20210729140406.png)

成员所在用户组需具备部署管理权限，所发布的制品的权限范围需设置为公开状态，从而能够被集群访问。

![](https://help-assets.codehub.cn/enterprise/20210729160327.png)

发布完成后可以在持续部署中查看发布详情。

![](https://help-assets.codehub.cn/enterprise/20210729160438.png)


==== 2021/07/29 ====
