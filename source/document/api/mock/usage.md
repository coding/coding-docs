---
title: 使用流程 - CODING 帮助中心
pageTitle: 使用流程
pagePrevTitle: Mock API 功能介绍
pagePrev: management/api/mock/intro.html
pageNextTitle: Mock API 调用说明
pageNext: management/api/mock/call.html
alias: management/api/mock/usage.html
---

### 1. 创建 API 文档并录入数据

   参考 [创建 API 文档](/docs/management/api/start.html#创建-API-文档)。

### 2. 开启 Mock API 功能

![](https://help-assets.codehub.cn/enterprise/20191202064136.png)

   点击「开启并配置 Mock API Server」启用 Mock API Server，同时 CODING 会针对该 API 文档生成随机 Mock API 基础路径，该地址可替换 API 使用者目前所配置的真实 API 基础路径。

![](https://help-assets.codehub.cn/enterprise/20191202064517.png)

### 3. 配置 Mock API Server

![](https://help-assets.codehub.cn/enterprise/20191202065318.png)

配置界面提供了以下能力：

-   重置基础路径

    即可以重新获取随机的 Mock API 地址

-   API Token 鉴权

    开启后，Mock API 需要在请求时传入 API Token 才可访问  Mock API 数据，否则不允许访问。

    API Token 需要在请求 API 时传入 `X-Coding-Mock-Token` Header，值为生成的 API Token。

-   IP 白名单

    开启后，只有指定 IP 的主机才可访问 Mock API，其他 IP 不可访问并返回异常。

    IP 支持通配符配置方式，如：

    ```text
    192.*.*.*
    100.28.*.*
    20.*.30.111
    ```

### 4. API 文档展示 Mock API 地址和自定义基础路径

![](https://help-assets.codehub.cn/enterprise/20191202065549.png)

### 5. 停用 Mock API Server

停用不会影响 API 文档，不会清除 Mock API 基础路径、安全配置，但访问 Mock API 基础路径不可用。

![](https://help-assets.codehub.cn/enterprise/20191202065617.png)

> 使用 Mock API Server 之前建议完善各 API 的响应返回（Response Example）范例数据，当然也可以优先完善需要提供模拟真实 API 能力的 API 数据，以便 Mock API Server 可以正常返回模拟数据。
>
> 当然，为了保证 Mock API 能与真实 API 一样拥有校验能力，API 路由及请求参数也需要适当完善，以便 API 使用者在对接时能与真实 API 一致的体验。

==== 2020/08/13 ====
