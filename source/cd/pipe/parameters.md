---
title: 参数配置 - CODING 帮助中心
pageTitle: 参数配置
pagePrevTitle: 制品配置
pagePrev: cd/pipe/artifacts.html
---

### 部署流程参数配置

在基础配置中可以设置本次部署流程的启动参数。参数将会被注入到部署流程执行上下文，可供后续阶段直接使用。在部署流程启动时，会要求提供对应的参数，如果是手动启动部署流程，需要在 UI 界面输入或选择参数，如果是 Webhook 触发部署流程，则需要在 `Payload` 提供参数。

| 字段          | 是否必填 | 说明                                                         |
| ------------- | -------- | ------------------------------------------------------------ |
| Name          | 是       | 参数名                                                       |
| Label         | 否       | 变量的标签（手动启动部署流程时显示）                         |
| Required      | 否       | 定义部署流程启动时是否必须提供此参数                         |
| Pin Parameter | 否       | 是否在部署流程执行详情处直接显示参数信息（不需要点击 `查看所有参数信息`） |
| Description   | 否       | 参数描述信息（手动启动部署流程时显示）                       |
| Default Value | 否       | 定义参数的默认值                                             |
| Show Options  | 否       | 如果参数是枚举类型，定义参数的枚举值（比如代码仓库分支 `dev`、`master`） |

### 示例项目：Deploy (Manifest) 使用部署流程配置参数

#### 配置参数

定义参数 `version`，参数值为 docker 镜像版本，默认值为 `v1.0`。

![](https://help-assets.codehub.cn/enterprise/20200414111919.png)

#### Deploy（Manifest）引用参数

在部署阶段引用部署流程参数，指定 docker 镜像的部署版本。

![](https://help-assets.codehub.cn/enterprise/20200518103159.png)

#### 手动启动部署流程

手动启动部署流程时需要提供 `version` 参数值，默认值为 `v1.0` 

![](https://help-assets.codehub.cn/enterprise/20200414112025.png)

#### Webhook 触发部署流程

如果使用 Webhook 触发部署流程，则需要在 `payload` 中提供参数值。

```bash
curl --location --request POST 'http://codingcorp.coding.com/api/cd/webhooks/webhook/e519d9d0-57c2-11ea-bd79-057f8b56fcf3' \
--header 'Content-Type: application/json' \
--data-raw '{
  "parameters": {
    "version": "latest", # 填写目标版本
  }
}'
```

==== 2020/08/13 ====
