---
title: 制品配置 - CODING 帮助中心
pageTitle: 制品配置
pagePrevTitle: 触发器配置
pagePrev: cd/pipe/triggers.html
pageNextTitle: 参数配置
pageNext: cd/pipe/parameters.html
---

CODING 持续部署的制品就是引用某个资源的 JSON 对象。持续部署支持多种云服务，而制品可以引用许多不同的资源类型，例如：

-   Docker 镜像
-   Git 仓库中的文件
-   Kubernetes 资源对象等

请知悉 CODING CD 的制品只是对资源的引用，并非资源本身，此处的资源可以是 CODING CD 支持的任一类型。从另一角度来看，制品是对资源信息进行描述的 JSON 对象。

### 制品格式

例如，CODING 制品库存储的 Docker 镜像可以使用如下的 JSON 配置并将其引用为 CODING CD 的制品：

```json
    {
      "type": "docker/image",
      "reference": "lhkprod-docker.pkg.coding.net/project/repo/image@sha256:29fee8e284",
      "name": "lhkprod-docker.pkg.coding.net/project/repo/image",
      "version": "sha256:29fee8e284"
    }
```

### 启动所需制品

在部署流程的配置阶段，可以先声明部署流程执行过程中需要使用的制品，这样的制品被称为`启动所需制品`，CODING CD 将`触发部署流程携带的制品`（如：远程 Git 仓库中的文件）和`启动所需制品`处声明的制品（如：path/manifeet.yaml）进行对比，如果`触发部署流程携带的制品`与`启动所需制品`匹配，`触发部署流程携带的制品`将会和`启动所需制品`绑定，阶段可以使用绑定（匹配成功）的制品。

![](https://help-assets.codehub.cn/enterprise/20200529111046.png)

> 将 CODING 代码仓库文件配置为`启动所需制品`，制品别名默认由 CODING CD 自动生成，也支持自定义。

### 制品匹配规则

配置部署流程启动所需制品时，可以在【制品匹配规则】处声明制品匹配条件，将其与触发部署流程携带的制品信息（如：Git 仓库触发携带的制品）进行比较。通过配置【制品匹配规则】，您可以在云账号关联的的多个制品（例如存储在 Git 仓库的多个 manifest 文件）中过滤出最终需要的制品。只有当触发器携带的制品信息与【制品匹配规则】配置的条件匹配时，才能成功触发部署流程执行。

### 如果制品匹配失败

当【制品匹配规则】配置的制品在触发器中没有提供或匹配不到时，可以使用【如果制品匹配失败】中上一次部署流程执行的制品或默认制品。

![](https://help-assets.codehub.cn/enterprise/20200414162401.png)

-   使用前一部署流程制品：CODING CD 会保存每一次部署流程执行的制品信息，当【使用前一部署流程制品】被勾选后，如果【制品匹配规则】配置的制品匹配失败，将使用上一次部署流程执行的制品。

-   使用默认制品：例如 CRON（定时触发）类型的触发器不提供制品信息时，这时可以使用默认制品。

> 当【使用前一部署流程制品】和【使用默认制品】都被启用时，将优先使用【使用前一部署流程制品】。

### 部署流程支持的制品类型

在保留 Spinnaker 部分原生制品类型的基础上，CODING CD 扩充了 CODING docker 仓库、Tencent TCR、CODING helm 等丰富的制品类型。

### Docker 镜像

`Docker 镜像` 制品类型支持 CODING docker 仓库和外部仓库。

### CODING docker 仓库

获取 cd-demo 项目下，cd-demo 制品仓库中的 flaskapp 镜像作为部署流程制品，版本规则 v1.\* 表示所有以 v1 开头命名的版本或 tag 才会成功匹配制品。

![](https://help-assets.codehub.cn/enterprise/20200416143538.png)

字段说明：

| 字段   | 说明                             |
| ---- | ------------------------------ |
| 项目   | 列出登录账号加入的所有项目                  |
| 仓库   | 列出项目下的所有 docker 类型制品仓库         |
| 镜像   | 列出仓库下的所有镜像                     |
| 版本规则 | 支持正则表达式，留空的含义与`.*`一致，不对镜像版本做限制 |

### 外部仓库

![](https://help-assets.codehub.cn/enterprise/20200416144911.png)

| 字段   | 说明                             |
| ---- | ------------------------------ |
| 路径规则 | 支持正则表达式，留空的含义与`.*`一致，不对镜像路径做限制 |
| 版本规则 | 支持正则表达式，留空的含义与`.*`一致，不对镜像版本做限制 |

### Git 仓库文件

#### CODING 代码库

获取 cd-demo 项目下，cd-demo 代码仓库中的 `k8s/service.yaml` 文件作为部署流程制品，版本规则 `release.*` 表示所有以 release 开头命名的分支或 tag 才会成功匹配制品。

![](https://help-assets.codehub.cn/enterprise/20200416145344.png)

#### Github

Github 代码库的支持需要提前在【项目设置】中关联代码库。

![](https://help-assets.codehub.cn/enterprise/20200414135303.gif)

![](https://help-assets.codehub.cn/enterprise/20200416145559.png)

> 获取 cd-demo 项目下，与 github 关联的代码仓库（coding-cd-demo）中的 `api/api.conf` 文件作为部署流程制品，版本规则 `v1.*` 表示所有以 v1 开头命名的分支或 tag 才会成功匹配制品。如果匹配失败，使用上一次部署流程执行的 `api/api.conf` 制品。

#### Gitlab

跟 github 一样，需要提前在【项目设置】中[关联代码库](/docs/admin/enterprise-account/gitlab.html#%E5%85%B3%E8%81%94-Gitlab-%E4%BB%A3%E7%A0%81%E4%BB%93%E5%BA%93)。

![](https://help-assets.codehub.cn/enterprise/20200416145959.png)
![](https://help-assets.codehub.cn/enterprise/20200416150108.png)

> 获取 cd-demo 项目下，与 gitlab 关联的代码仓库（gitlab-cd-demo）中的 `config.ini` 文件作为部署流程制品，版本规则 `dev.*` 表示所有以 dev 开头命名的分支或 tag 才会成功匹配制品。如果匹配失败，使用【如果制品匹配失败】配置的默认制品（代码仓库的全局配置文件 config.ini）。

### Kubernetes 资源

| 字段        | 说明                                                 |
| --------- | -------------------------------------------------- |
| 资源类型      | 支持 ConfigMap、Deployment、ReplicaSet 和 Secret 四种资源类型 |
| 云账号       | 根据云账号确定资源所在的 Kubernetes 集群                         |
| Reference | 资源的 URI 地址                                         |

### 自定义类型

| 字段  | 说明                                                            |
| --- | ------------------------------------------------------------- |
| 类型  | 制品类型                                                          |
| 名称  | 制品名称                                                          |
| 版本  | 制品版本（用于区分类型和名称都相同的制品）                                         |
| 地址  | 对于不同资源类型含义不同（例如：腾讯云实例对应 `region`，Kubernetes 资源对应 `namespace`） |
| 索引  | 制品的 URI                                                       |

==== 2020/08/13 ====
