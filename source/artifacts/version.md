---
title: 制品版本覆盖策略 - CODING 帮助中心
pageTitle: 制品版本覆盖策略
pagePrevTitle: 制品库属性
pagePrev: artifacts/properties.html
pageNextTitle: 清理策略
pageNext: artifacts/cleanup-strategy.html
alias: 
-   devops/artifacts/version.html
-   ar/version.html
-   packages/version.html
---

在软件开发过程的最后阶段，我们通常会将代码打包成相应制品，并赋予其相对应的版本号，最终发布到生产环境提供服务。**让制品拥有唯一的版本号，可以保障同一个版本的制品永远保持相同的行为，这对于部署及应用生命周期管理而言都非常有意义。**

在开发阶段，每次重新修改代码都有可能会产生新的制品，您可能需要依赖方频繁修改版本号来使用最新的版本。这将会非常不利于开发调试，因为如果在生产阶段随意覆盖同一个制品的版本，可能会带来管理上的混乱。

CODING 制品库提供了灵活的版本覆盖策略，可以保障 Docker 镜像版本的唯一，也可以重复发布同一个 npm 包的版本。您可以根据需要，针对制品的生命周期，设置合适的版本覆盖策略。

在 CODING 制品库中，您可以设置**仓库** / **包** / **版本** 的策略。其中，**版本覆盖策略生效的优先级： 版本 > 包 > 仓库**。接下来本文按照这三个层级来介绍如何设置制品版本覆盖策略、以及制品库提供的默认版本覆盖策略。

### **仓库的版本覆盖策略**

点击【制品库】->【设置仓库】。

![](https://help-assets.codehub.cn/enterprise/20200717113242.png)

点击【版本策略】，此处可设置该仓库下所有制品的版本是否允许覆盖。

![](https://help-assets.codehub.cn/enterprise/20191227151851.png)

> 目前 Maven 较为特殊，多了一项：使用 [Maven SNAPSHOT](https://maven.apache.org/guides/getting-started/index.html)(快照)。

### **包的版本覆盖策略**

点击具体包名可看到右侧的包详情页面。

![](https://help-assets.codehub.cn/enterprise/20191227152110.png)

点击【设置】即可对包的版本策略进行选择，默认情况下包使用本仓库的版本覆盖策略。

![](https://help-assets.codehub.cn/enterprise/20191227152027.png)


### **版本的发布策略**

用户可以将某个版本设置为**已发布**，标记为发布可以保障制品版本的唯一性，防止重复写入同一版本。

> 需要注意：发布操作是不可逆的，当一个版本被设置为发布后，将无法取消发布状态。

将鼠标停放在某个版本上，会显示【标记为发布】按钮。

![](https://help-assets.codehub.cn/enterprise/20191227152224.png)

点击【标记为发布】按钮后，出现发布版本弹窗，点击【确认】即可。

![](https://help-assets.codehub.cn/enterprise/20191227152322.png)

发布成功后，该版本会显示一个**已发布**标签。

![](https://help-assets.codehub.cn/enterprise/20191227152351.png)

### **默认的版本覆盖策略**

制品库按照该制品类型的原生逻辑，提供了默认的版本覆盖策略，详情如下：

| 制品类型 | 仓库 | 包 | 版本 |
| :------| -- | -- | -- |
| Docker | 允许发布相同版本 | 继承仓库规则 | 未发布 |
| Maven  | Maven SNAPSHOT | 继承仓库规则 | 未发布 |         
| npm | 不允许发布相同版本 | 继承仓库规则 | 未发布 |           
| PyPI | 不允许发布相同版本 | 继承仓库规则  | 未发布 |
| Generic | 允许发布相同版本 | 继承仓库规则 | 未发布 |
| Helm | 允许发布相同版本 | 继承仓库规则 | 未发布 |
| Composer | 不允许发布相同版本 | 继承仓库规则 | 未发布 |      
| NuGet | 不允许发布相同版本 | 继承仓库规则 | 未发布 |
| Conan | 允许发布相同版本 | 继承仓库规则 | 未发布 |


==== 2020/08/13 ====
