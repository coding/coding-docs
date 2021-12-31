---
title: 快速开始 - CODING 帮助中心
pageTitle: 快速开始
pagePrevTitle: Markdown 语法
pagePrev: management/markdown.html
pageNextTitle: 接入自动化工具
pageNext: management/api/openapi.html
alias: management/api/start.html
---

API（Application Programming Interface），又称为应用编程接口，是软件系统不同组成部分衔接的约定。软件开发的过程中，通常会有不同的分工和职责，如后端接口开发与 APP 开发工作，其主要目的是为了让开发人员间达成一定的约定，而无需考虑其底层的源代码或内部实现细节。API 本身是抽象的，它仅定义了一个接口，而不涉及应用程序在实际实现过程中的具体操作。

CODING 提供的 API 文档管理可以为开发人员提供出色的 API 文档体验，并支持使用 OpenAPI、Postman、Apidoc 描述格式集成至现有的 CI/CD 工作流中，从而实现文档自动化发布流程。本文档将帮助您快速熟悉 CODING API 文档管理的基本使用操作。

### 编辑 API 文档

#### 创建

1.  如您是第一次使用 API 文档管理功能，可前往当前项目【文档管理】->【API 文档】，选择【发布 API 文档】；如已存在 API 文档，则可在功能页选择【+】。

![](https://help-assets.codehub.cn/enterprise/%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8%201.png)

2.  在创建 API 文档页，填写 API 文档标题，选择 API 文档访问模式（私有/公开模式），输入 API 文档访问地址，即可完成创建。


> 私有模式：访问 API 文档需要登录 CODING 且拥有当前项目 API 文档功能查看权限，或通过分享口令登录查看。
> 公开模式：访问 API 文档时无需登录，可直接进行查看，分享功能将禁用。

![](https://help-assets.codehub.cn/enterprise/%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8%202.png)

3.  在 API 文档详情页，选择【导入数据】，即可在线录入 API 描述数据（支持 Swagger、OpenAPI、Postman、Apidoc），可选择从文件或 URL 导入。右侧可查阅详细导入指南。

![](https://help-assets.codehub.cn/enterprise/%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8%203.png)

4.  选择「下一步」则可以修改标题、访问地址，以及自定义 API 文档简介、API 基础路径、详细描述等信息；选择「直接发布」则将跳过该步骤直接发布 API 文档。

![](https://help-assets.codehub.cn/enterprise/%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8%204.png)

#### 更新数据

在需要更新的 API 文档详情页，选择【更新数据】，即可修改 API 数据、文档标题、访问地址、自定义 API 文档简介、API 基础路径、详细描述等信息，修改完成后即可发布新版本。

![](https://help-assets.codehub.cn/enterprise/%E5%BF%AB%E9%80%9F%205.png)

### 自动化发布

API 文档支持自动化发布，代码提交后，可通过 CODING CI 自动读取代码中 API 相关注解/注释，快速生成 API 文档，同时支持接入多条构建计划，帮您轻松完成发布。操作指引可查阅[接入自动化工具](https://help.coding.net/docs/management/api/automation.html)。

![](https://help-assets.codehub.cn/enterprise/%E5%BF%AB%E9%80%9F%206.png)

### Mock API

API 文档支持创建 Mock API，可提前交付模拟真实 API 响应的沙盒环境，以便您可以提前开始调试工作，同时并行开发接口实现。此外，您也可以在设计过程中得到即时反馈，并进行迭代以得到更好的 API。操作指引可查阅[Mock API 功能配置](https://help.coding.net/docs/management/api/mock/intro.html)。

![](https://help-assets.codehub.cn/enterprise/%E5%BF%AB%E9%80%9F%207.png)

### 分享/访问 API 文档
#### 分享

1.  在 API 文档详情页，选择【添加分享对象】，填写【分享对象】名称，随机生成或手动填写【访问口令】，选择【口令有效期】后即可新增分享对象。

![](https://help-assets.codehub.cn/enterprise/%E5%BF%AB%E9%80%9F%208.png)

2.  完成新增分享对象后即可复制链接与口令，发送至分享对象，对象可通过此链接访问该 API 文档。

![](https://help-assets.codehub.cn/enterprise/%E5%BF%AB%E9%80%9F%209.png)

  可在分享对象尾部的 ··· 菜单中，重新编辑分享对象、访问口令与有效期，或者删除本次分享，分享链接即刻失效。

![](https://help-assets.codehub.cn/enterprise/%E5%BF%AB%E9%80%9F%2010.png)

#### 访问

1.  分享对象通过分享链接进入 API 文档登录页后，需输入【访问口令】或登录 CODING 账号。

![](https://help-assets.codehub.cn/enterprise/%E5%BF%AB%E9%80%9F%2011.png)

2.  文档中展示了该 API 文档的基础信息，API REFERENCE 部分为各个 API 对应的调用说明（请求路由、请求参数、响应参数等），且在右侧提供了请求和响应的范例 Demo，方便开发人员进行查看。

![](https://help-assets.codehub.cn/enterprise/%E5%BF%AB%E9%80%9F%2012.png)

### 删除 API 文档

在指定 API 文档详情页右上方 ··· 选项中，即可删除该 API 文档，请慎重操作。

![](https://help-assets.codehub.cn/enterprise/%E5%BF%AB%E9%80%9F%2013.png)

==== 2021/05/24 ====
