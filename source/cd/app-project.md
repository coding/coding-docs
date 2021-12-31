---
title: 应用与项目 - CODING 帮助中心
pageTitle: 应用与项目
pagePrevTitle: 云账号
pagePrev: cd/cloudaccount.html
pageNextTitle: 示例项目实践
pageNext: cd/start.html
---

### 功能介绍

CODING 持续部署中的应用和项目都是属于企业/团队的一级资源，它们之间为一对多关系，即一个项目包含多个应用，一个应用从属于多个项目。

### 应用

应用是 CODING CD 中的基本部署单位。应用包含若干个应用集群，以及安全组和负载均衡器等。应用对部署的软件集合进行抽象，通常代表你想要部署的服务、配置、以及运行所需的基础设置。推荐的做法是一个应用对应微服务架构中的一个服务。

![](https://help-assets.codehub.cn/enterprise/20210625112313.png)

**对应关系示例**

在微服务架构下的微服务往往对应于一个 CODING 持续部署的应用，当然您也可以在了解对应关系的情况下依照自己的偏好来设定对应关系。下面是一个典型的团队、项目、应用、集群、云账号之间的关系示例：

-   团队：XXX 科技有限公司
-   云账号
    -   自建 Kubernetes Service Account
    -   腾讯云北京 TKE 集群 Service Account
    -   腾讯云香港 API Key
-   项目 1：车载用品电商站点项目
    -   应用 1：车载电商后端
    -   应用 2：车载电商前端
    -   应用 3：物流管理服务
-   项目 2：服装电商站点项目
    -   应用 1：服装电商后端
    -   应用 2：服装电商前端
    -   应用 3：物流管理服务
-   部署控制台
    -   应用 1：车载电商后端
    -   测试集群
    -   生产集群
    -   应用 2：车载电商前端
    -   测试集群
    -   生产集群
    -   应用 3：物流管理服务
    -   车载电商测试集群
    -   车载电商生产集群
    -   服装电商测试集群
    -   服装电商生产集群
    -   应用 4：服装电商后端
    -   测试集群
    -   生产集群
    -   应用 5：服装电商前端
    -   测试集群
    -   生产集群

### 云账号绑定

云账号是访问云资源的凭证，只有配置了云账号，CODING 持续部署才能实现对云资源的部署管理和基础设施管理，点击了解[详情](/docs/cd/cloud-account.html)。

![](https://help-assets.codehub.cn/enterprise/20210624180735.png)

### 应用创建

点击首页左侧的控制台，点击应用中右上角的创建按钮。

![](https://help-assets.codehub.cn/enterprise/20210625113634.png)

### 与项目关联

在部署控制台内完成应用创建后，可以点击右上角按钮将应用与项目相关联。

![](https://help-assets.codehub.cn/enterprise/20210625145239.png)

### 新建发布单

当运维人员完成对应用的[部署流程配置](pipe/overview.html)后，开发人员在项目内就可以实现从项目协同到应用发布的 DevOps 闭环。典型的场景是当有新版本需要发布时，开发人员在【持续部署】->【Kubernetes】页面新建发布单，发布单自动触发部署流程执行，开发可随时查看发布状态和历史详情。

![](https://help-assets.codehub.cn/enterprise/20210625150326.png)

### 管理应用

在部署控制台新建应用后可以在应用的【配置】中调整应用属性与通知，或删除应用。

![](https://help-assets.codehub.cn/enterprise/20210625150140.png)

#### 应用通知

目前支持四种通知方式：

-   CODING 站内通知
-   企业微信
-   钉钉
-   飞书通知

![](https://help-assets.codehub.cn/enterprise/20211201103715.png)

#### 显示 / 隐藏功能入口

对于不需要显示的功能入口，可以在【特性】栏将其禁用，这里的禁用并不会删除相应的数据，仅表示在控制台界面隐藏。可以隐藏以下功能入口：

-   部署流程
-   集群
-   负载均衡器
-   安全组

![](https://help-assets.codehub.cn/enterprise/20210625151325.png)

#### 添加实例的自定义属性链接

在【集群】->【服务组】->【实例详情】面板可以查看运行实例的自定义链接，自定义链接提供关于实例的简略信息，如：日志、健康状态等。

![](https://help-assets.codehub.cn/enterprise/20210625151552.png)

自定义链接对应的 IP 可以是公有或私有 IP，默认端口为 80；如果需要设置其他端口号，在 Path 文本框以`:`开头，如：`:7002/health`。

1.  在【链接】一栏，点击【Add Section】

2.  【Section Heading】输入自定义链接标题

3.  【Links】输入自定义链接名称，以及 URL

URL 字段支持使用表达式引用更多的实例属性。例如对于腾讯云实例，可以使用`{region}`引用实例的所在地域。

4.  点击【Add Link】在同一属性下添加更多链接

5.  点击【Add Section】添加新的自定义属性链接

6.  点击【撤销】取消添加操作。【撤销】不会删除已保存的自定义属性链接

7.  点击【保存】完成操作

#### 流量保护

流量保护旨在确保任何时间至少有一个实例处于正常运行状态。

启用流量保护功能后，如果用户或者脚本尝试删除、禁用或对服务组进行伸缩容操作，CODING 控制台会对操作进行验证以确保集群中至少有一个实例在正常运行，否则将会拒绝用户或脚本请求。

1.  在【流量保护】栏，点击【添加流量保护】

2.  以下是需要填写的字段：

   | 字段   | 必填项 | 说明                                                         |
   | ------ | ------------- | ------------------------------------------------------------ |
   | 云账号 | 是            | 设置流量保护的云账号                                         |
   | 地域   | 是            | 可选的地域，`*`表示选择所有地域                              |
   | 分组   | 否            | 设置流量保护的集群分组，如果留空表示选择不属于任何分组的集群 |
   | 详情   | 否            | 详情是区分集群的三级字段，具有相同 `${Application}-${Stack}-${Detail}` 的服务组属于同一个集群 |

3.  点击【保存】使配置生效

#### 应用删除

1.  如果应用中有服务组，需要先删除服务组

2.  在应用列表页，选择要删除的应用

3.  点击【配置】

4.  滑动到页面底部即可删除应用


==== 2020/08/13 ====