---
title: 发布单 - CODING 帮助中心
pageTitle: 发布单
pagePrevTitle: 应用与项目
pagePrev: cd/cloudaccount.html
pageNextTitle: 部署流程介绍
pageNext: cd/pipe/overview.html
---

### 功能介绍

团队内的的运维角色完成应用的部署流程配置，并将应用关联至项目后，其他角色（一般指开发）就可以在项目内提交发布单以实现应用发布。同时发布单也可以结合审批流，让应用的发布都具备人工审查、审计等风险控制机制。

### 新建发布单

进入项目页面

![](https://help-assets.codehub.cn/enterprise/20200409145909.png)

添加 Kubernetes 云账号到 CODING 系统，本示例使用 Kubeconfig 认证方式。

![](https://help-assets.codehub.cn/enterprise/20200409145925.png)

点击确定，等待云账号验证（部署控制台会尝试确认账号的可用性，请耐心等待验证完成）：

![](https://help-assets.codehub.cn/enterprise/20200409145935.png)

![](https://help-assets.codehub.cn/enterprise/20200409150020.png)

### 配置应用

成功添加云账号后，进入 CODING 部署控制台创建应用。

点击导航栏【应用】->【创建应用】，输入名称 “flaskapp” 。

![](https://help-assets.codehub.cn/enterprise/20200409150036.png)

新建应用表单字段解释：

| 字段                         | 是 / 否  | 说明                                                         |
| ---------------------------- | -------------- | ------------------------------------------------------------ |
| 应用名                       | 是             | 标识应用的唯一ID                                             |
| 应用描述                     | 否             | 应用描述信息                                                 |
| 云服务                       | 是             |                                                              |
| 从云服务商获取健康检查       | 布尔值，默认否 | 如果启用，表示从云服务商获取健康检查状态<br>如果禁用，则从第三方（负载均衡器，服务发现）<br>获取健康检查状态。 |
| 启用健康覆盖选项             | 布尔值，默认否 | 启用之后，健康检查来源可以在云服务商和第三方服务（负载均衡器，服务发现）之间进行切换 |
| 实例端口                     | 否             | 用于生成运行实例的链接，在应用配置页面可以配置覆盖此端口号，或者自定义链接 |
| 执行中的部署流程支持重启     | 布尔值，默认否 | 启用后，用户可以重启正在执行的部署流程，此选项不推荐启用     |
| 运行中的部署流程支持重复执行 | 布尔值，默认否 | 启用后，用户可以对一个部署流程开启多个运行时（如果部署流程配置了多个参数对应执行不同的阶段，就会用到此功能） |

如果想在 cd-demo 项目中提交发布单执行此应用的发布流程，需要把 flaskapp 这个应用与上文中的 cd-demo 项目进行关联。

可以在 CODING 页面右上角头像下拉菜单【团队管理】->【部署设置】页面，找到 flaskapp ，点击【绑定】：

![](https://help-assets.codehub.cn/enterprise/20200413163421.png)

### 配置部署流程

接下来创建部署流程，在应用列表点击 “flaskapp” 进入应用详情页，点击【部署流程】进入部署流程配置页面，再点击【创建】创建部署流程，类型选择 "部署流程"，部署流程名称输入 “deployTesting”。

![](https://help-assets.codehub.cn/enterprise/20200409150108.png)

进入部署流程配置页面，在开始配置部署阶段之前，可以为此流程设定：

- 流程的执行选项（在此示例中我们保持默认即可）
- 启动流程所需的制品包（在此示例中我们设置一个 Docker 镜像作为启动所需的制品包）
- 启动流程的自动触发器（在此示例中我们设置当项目内的 CODING Docker 仓库有新 Docker 镜像版本的时候自动触发启动部署流程）
- 启动流程所需的额外参数（在此示例中我们不需要额外的参数）

#### 配置流程启动所需制品

此处配置的制品（Docker 镜像）将会被 Automated Triggers 和后续阶段引用。

![](https://help-assets.codehub.cn/enterprise/20200409150126.png)

#### 配置 CODING 制品库镜像自动触发

`Artifact Constraints` 字段选中 `flaskapp-image` 的含义是将 Expected Artifacts 配置的制品（Docker 镜像）作为部署流程触发器，当制品（Docker 镜像）有版本更新时，自动触发部署流程执行。

![](https://help-assets.codehub.cn/enterprise/20200409150147.png)

#### 配置 Deploy（Manifest）Deployment 阶段

![](https://help-assets.codehub.cn/enterprise/20200409150318.png)

`image` 字段填写 docker 镜像的全路径；`Required Artifacts to Bind` 处选择 `flaskapp-image` 进行绑定，指定 Kubernetes 集群使用 Expected Artifacts 配置的制品（Docker 镜像）进行部署。

![](https://help-assets.codehub.cn/enterprise/20200409150334.png)

#### 配置 Deploy（Manifest）Service（LoadBalancer 类型）阶段

继续添加 Stage 用于部署 LoadBalancer 类型的 Service：

![](https://help-assets.codehub.cn/enterprise/20200409150345.png)

### 自动触发部署流程执行

运维人员完成上述配置后，开发更新项目代码即可将应用自动发布到 Kubernetes 集群，在基础设施页面查看信息确认应用发布成功。

服务组信息：

![](https://help-assets.codehub.cn/enterprise/20200409150357.png)

负载均衡器信息：

![](https://help-assets.codehub.cn/enterprise/20200409150417.png)

负载均衡器页面右下角显示的 IP 即为负载均衡器暴露的外网 IP，点击 IP 即可访问 flaskapp 服务。

![](https://help-assets.codehub.cn/enterprise/20200409150445.png)

### 手动提交发布单

此外，开发人员也可以在项目内手动提交发布单。

![](https://help-assets.codehub.cn/enterprise/20200409150642.gif)

发布成功后，点击发布单查看发布详情：

![](https://help-assets.codehub.cn/enterprise/20200409151443.png)

### 更多功能

#### 查看基础设施信息

基础设施页面展示了运行环境的健康状况以及 Deployments 和实例的元数据信息。在集群页面，可以对资源进行伸缩容、禁用和回滚等操作作为部署服务的控制台，实现集群管理。

![](https://help-assets.codehub.cn/enterprise/20200409151550.png)

* 左侧的过滤器可对所有服务进行筛选展示，支持字符串搜索，或者根据 region、stack 和 status 等特定属性进行过滤。

* 中间区域展示所有部署服务，图中绿色的小滑块表示单独的实例（如腾讯云 CVM 实例、单个 Kubernetes Pod），滑块的个数对应实例的副本数。实例从属于某个服务组，服务组又从属于集群。

负载均衡器信息：

![](https://help-assets.codehub.cn/enterprise/20200409151712.png)

#### 调整 Pod 实例数量

在集群详情页右侧点击 "Deployment Actions" 可对集群进行伸缩容、回滚、以 JSON 格式编辑集群配置等操作，这里以伸缩容为例。

1. 在对话框中填写调整信息（此处将 Pod 实例数量由默认的2调整为3）

![](https://help-assets.codehub.cn/enterprise/20200409151816.png)

2. CODING CD 调用 Kubernetes 接口执行扩容操作

![](https://help-assets.codehub.cn/enterprise/20200409151851.png)

3. 最后查看 Kubernetes Pods 信息可以看到扩容成功（绿色小滑块个数从 2 变为 3）

![](https://help-assets.codehub.cn/enterprise/20200409151917.png)

#### 查看 Pod 日志

在实例列表中选择 Pod 实例查看详情，在右侧信息栏点击【Console Output(Raw)】可以查看 Pod 日志：

![](https://help-assets.codehub.cn/enterprise/20200409151954.png)

#### 直接在控制台创建服务组

除了通过部署流程发布应用，CODING 控制台支持在页面直接创建服务组。进入【基础设施】页面，点击【集群】->【创建服务组】，在弹出框中选择 Kubernetes 类型，最后在 Manifest 配置页填写服务组信息：

![](https://help-assets.codehub.cn/enterprise/20200409152012.png)

点击【创建】，创建成功后即可看到服务组信息：

![](https://help-assets.codehub.cn/enterprise/20200409152044.png)

负载均衡器和安全组也支持以同样的方式创建。



==== 2020/08/13 ====
