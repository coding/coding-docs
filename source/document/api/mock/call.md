---
title: 调用说明 - CODING 帮助中心
pageTitle: 调用说明
pagePrevTitle: Mock API 使用流程
pagePrev: management/api/mock/usage.html
alias: management/api/mock/call.html
---

### Mock API 调用方法

开启 Mock API 功能后，您可在 API 文档看到 Mock API 基础路径，如下图所示：

![](https://help-assets.codehub.cn/enterprise/20191202071132.png)

### 请求路径替换说明

假设 Mock API 基础路径为：

```url
https://c3wfvv32.mock.coding.io
```

API 文档中所有 API（除第三方域名 API）仅需将原真实 API 基础路径替换为 Mock API 基础路径即可。

如请求路由 `GET /users`，原地址为：

```json
GET https://petstore.com/api/v1/users
```

将原基础路径 `https://petstore.com/api/v1` 替换为 Mock API 基础路径后如下：

```json
GET https://c3wfvv32.mock.coding.io/users
```

调用该 API，正常则直接返回响应范例内容，如图：

![](https://help-assets.codehub.cn/enterprise/20191202071239.png)

若参数校验失败，则会返回校验失败原因，如下图所示：

![](https://help-assets.codehub.cn/enterprise/20191202071250.png)

### API 鉴权

Mock API 支持 API Token 鉴权方式。

#### 开启 API 鉴权

点击「配置 Mock API Server」打开配置弹窗：

![](https://help-assets.codehub.cn/enterprise/20191202071545.png)

打开「开启 API 鉴权」开关：

![](https://help-assets.codehub.cn/enterprise/20191202072010.png)

#### 使用 API 鉴权

开启 API 鉴权后，在请求时需要您在请求 Header 中加入才可正常访问

```url
X-Coding-Mock-Token: {API Token}
```

其中 `{API Token}` 需要替换为上一步后台随机生成的 API Token。

若未传入 API Token 或者不正确，将返回异常。

### IP 白名单

开启后，只有指定 IP 的主机才可访问 Mock API，其他 IP 不可访问并返回异常。

#### 开启 IP 白名单

点击「配置 Mock API Server」打开配置弹窗：

![](https://help-assets.codehub.cn/enterprise/20191202071545.png)

打开「开启 IP 白名单」开关：

![](https://help-assets.codehub.cn/enterprise/20191202072753.png)

#### 白名单增加 IP

在白名单开关后面，点击「增加 IP」：

![](https://help-assets.codehub.cn/enterprise/20191202073022.png)

IP 支持通配符配置方式，如：

```text
192.*.*.*
100.28.*.*
20.*.30.111
```

### 请求限制

为了防止拒绝服务攻击，Mock API 制定了一定的限流策略：

```text
1000/API/分钟
```

即每个 API 每分钟可请求 1000 次。

为了方便您查询当前限流的情况，你可通过响应 Header 的 Rate Limit 参数查看，参数如下：

-   `X-Coding-Mock-Rate-Limit-Remaining`： 剩余可请求数量
-   `X-Coding-Mock-Rate-Limit-Total`：限制可请求数量
-   `X-Coding-Mock-Rate-Limit-Reset`： 重置限可请求数量的时间戳

超出限流限制会返回异常。

### 匹配校验规则

![](https://codingcorp.coding.net/api/share/download/06a470d0-84dc-4a2e-b519-fb16e13cfb34)

Mock API 支持使用请求参数来校验 Mock API 请求正确性，下面为校验规则。

### 请求方法（Method）

根据请求的 Method 筛选符合 Method 的路由，支持：

-   GET
-   POST
-   PUT
-   PATCH
-   DELETE
-   OPTIONS

例：

路由表

```text
GET /users
POST /users
POST /users/1
```

传入 Method

```text
POST /users?a=1
```

则筛选仅符合 POST Method 的路由

```text
POST /users
POST /users/1
```

### 路由（Route）

路由匹配规则分为：
1.  路由层级匹配
2.  路由参数（Route Parameter）匹配

> 匹配优先级：

1.  不同层级，**完全匹配路由**优先，超过层级，包含请求路由的忽略
2.  同层级，匹配**完整字符串**路由优先
3.  同层级，匹配多条包含路由参数的路由，满足对应**校验规则**且**校验规则范围较小**路由参数的路由优先
4.  同层级，路由参数在不同层级，**浅层级完整字符串**优先

### 情景模拟

#### 情景 1

请求若满足 2 条路由 A、B， A 为 2 层，B 为 3 层，则选择层数浅的（A），即**完全匹配的路由**优先。

请求：

```json
GET /projects/users
```

满足路由：

```json
A: /projects/users
B: /projects/users/list
```

未完全匹配 B，A 为完全匹配项，即 `/projects/users`


#### 情景 2

路由表为：

```json
C: /projects/users/{id} 规则：id 必须为正整数
D: /projects/users/list
E: /projects/users/{name} 规则：name 必须为字符串
```

请求：

```json
GET /projects/users/list 匹配 D，list 字符串完全匹配
GET /projects/users/1 匹配 C，1 为正整数
```

#### 情景 3

路由表为：

```json
F: /projects/users/{name}/detail
G: /projects/users/detail/{name}
```

请求：

```json
GET /projects/users/abc/detail 匹配 F，abc 不匹配 detail，则匹配 {name} 路由参数
GET /projects/users/detail/abc 匹配 G，detail 字符串完全匹配，abc 匹配路由参数 {name} 规则
```

Method 或路由匹配失败，则返回`匹配失败` 404 异常页面。


### Request 请求规则校验

当通过 Method 和路由匹配后，需要对路由 API 请求参数进行校验，规则包括：

-   必填，未填则校验失败
-   字段类型，如 int、string，若字段传入类型不正确则校验失败
-   字段类型支持：
-   OpenAPI: integer / number / string / boolean / object / array
-   Postman: 从 Body 中自动读取
-   apiDoc: Boolean / Number / String / Object / String[] / Number[] /Boolean[] / Object[]
-   枚举，传入值不再枚举中则校验失败
-   必填值，不正确则校验失败

校验范围包括：

-   Header
-   请求参数
-   POST 参数，支持 JSON / XML 传入，自动解析为 POST 参数

校验失败，则返回`校验失败` 403 异常页面，并给出异常原因。

> 若您想跳过请求校验，您可以在请求时 Header 带上 `X-Coding-Mock-Request-Validate: off` 参数，屏蔽 Mock 接口校验。

### Example 匹配规则

当通过请求规则校验后，则需要针对请求内容返回对应的 Example 内容，规则如下：


1.  若仅一个 Example，且无 Request，则所有请求直接返回第一个 Response 内容

2.  有一个或多个 Example
    2.1 有 Example，则请求必须完全匹配 Example 请求参数配置，匹配则返回对应 Response 内容

    2.2 若某 Example 没有 Request，则未满足 2.1 的请求直接返回该 Example Response 内容（如有多条 Example 无 Request，则仅返回第一条 Example 的 Response）

3.  无 Example
    3.1 存在 API 响应返回参数，可传入请求 Header `X-Coding-Mock-Response-Fake:On`，Mock API 将自动为您生成一组 Fake 数据。
    3.2 反之则返回`无 Mock 数据` 404 异常页面

### 其他规则

-   Response 默认返回 Status 200 的，若未设置则直接返回。

-   API 文档路由已经指定完整 Host 的，不生成 Mock API。
  
-   支持跨域。

### 异常

#### `Token 校验失败/IP不在白名单`

​	状态码：403

```text
Token 校验失败 / IP 白名单校验失败
```

#### `匹配失败` 

​	状态码：404

```text
未找到路由
```

#### `校验失败` 

​	状态码：404

```text
路由规则匹配失败

路由：[用户列表] GET /users
未匹配规则：
Header | Content-Type | 必填
Query 参数 | id | 必须为正整数
```

#### `无 Mock 数据` 

​	状态码：404

```text
当前路由未配置 Mock 数据。

路由：[用户列表] GET /users
```

==== 2020/08/13 ====
