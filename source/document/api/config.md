---
title: 配置说明 - CODING 帮助中心
pageTitle: 配置说明
pagePrevTitle: API 文档管理快速开始
pagePrev: management/api/start.html
pageNextTitle: Mock API 功能介绍
pageNext: management/api/mock/intro.html
alias: management/api/config.html
---

创建 API 文档需要经过 2 个步骤：

1.  配置基础信息
2.  配置描述信息

### 基础信息配置

![](https://help-assets.codehub.cn/enterprise/20191014140121.png)

如上图所示为需要填写的基础信息，包括：

-   文档标题：API 文档的标题，将显示在 API 文档的左上角和正文顶部。
-   访问模式：

    -   **私有模式**：访问 API 文档需要登录或输入访问令牌。
    -   **公开模式**：访问 API 文档无需登录，直接可以查看。
-   访问地址：`https://{企业域名}.coding.net/{项目地址名称}/docs/{自定义访问地址}`

    -   **自定义访问地址**：该地址可自定义，项目内不可重复。

> -   企业域名：当前企业子域名称，如：<https://abc.coding.net> ，则子域名称为 `abc`
> -   项目地址名称：当前 API 文档管理所在的项目地址名称，如：<https://abc.coding.net/p/xyz> 中 `xyz` 为项目地址名称。

-   API 数据录入

    目前支持 3 种主流 API 描述语言：

    -   **OpenAPI / Swagger**

        [OpenAPI](https://swagger.io/resources/open-api) 始于 Swagger 规范，是目前使用最广泛的 REST API 的 API 描述标准，由 Linux 基金会维护，官方最新版本为 OpenAPI 3.0。
        需要注意的是 Swagger 规范已于 2015 年捐赠给 Linux 基金会后改名为 OpenAPI [来源](https://smartbear.com/blog/develop/what-is-the-difference-between-swagger-and-openapi/)：

        -   OpenAPI = 规范
        -   Swagger = 实现规范的一系列工具栈

        用户可将编写完成的 OpenAPI 描述文件（支持 JSON/YAML），也可使用如 [springfox](http://springfox.github.io/springfox) 生成 OpenAPI 描述文件，导入至 CODING，并生成精美的 API 文档。

    -   **Postman**

        [Postman](https://www.getpostman.com/) 是一款服务于 REST API 的完整开发环境，您可以在 Postman 设计 API，并通过导出的 Postman Collection 文件导入 CODING，生成精美的 API 文档。

    -   **apiDoc**

        [apiDoc](http://apidocjs.com/) 是一款通过注释或注解生成 API 文档的工具，支持 Java、PHP、JS 等多种语言，生成方便，但文档体验较差。您可通过将生成文档中间文件 `api_data.json` 导入至 CODING，生成精美的 API 文档。

    > 该步骤在一开始进入时提供了一份「宠物商店」Demo API 数据，供用户参考。用户可以点击 Tips 中的 `清空范例` 清除数据。

    API 数据输入框支持输入以上 3 种 API 描述语言，并支持解析 `JSON` 和 `YAML` 格式数据，

    > 若觉得输入框太小，可点击右上方按钮最大化。

### 描述信息配置

![](https://help-assets.codehub.cn/enterprise/20191202040720.png)

如上图所示为配置描述信息步骤。上一步骤已经完成了 API 文档的基础部分，而这一步骤则是填充 API 描述信息，包括：

-   简介：介绍 API 的背景、作用等。

-   API 基础路径：用于描写 **API 服务器地址**，可以在**名称**中指定环境名称。

-   详细描述：用于详细描述 API 的背景、功能、调用的规范等，支持 Markdown 语法，详细描述将显示在 API 文档 GET STARTED 正文中。该部分可展开至全屏编辑。

> 需要注意的是 Markdown 语法中的一级标题（写法为`#`），将被提取为 API 文档 GET STARTED 导航栏的菜单项。

#### API 基础路径配置

API 基础路径配置开关有**关闭**和**打开**两种状态，用于描写 API 服务器地址，可以在名称中指定环境名称。开关默认为关闭状态。

> 更多说明见[API    路径详解](/docs/management/api/config.html#API-路径详解)。

-   **关闭**「自定义基础路径」开关:

    固定使用[配置基础信息](/docs/management/api/config.html#基础信息配置)时 API 文件数据中的基础路径地址，不可修改，也不可指定基础路径名称。

-   **打开**「自定义基础路径」开关:

    API 基础路径可以在页面上自定义，默认自动填充[配置基础信息](/docs/management/api/config.html#基础信息配置)时 API 文件数据中的基础路径地址。

### API 路径详解

合理、好用的 RESTful API 应该规范好协议、域名、版本、路径、操作等方面。

-   协议：

    API 与用户的通信协议，总是使用 HTTPS 协议。

-   域名：

    应该尽量将 API 部署在专用域名之下。比如:

    ```text
    https://api.petstore.com
    ```

    如果确定 API 很简单，可以考虑放在主域名下。比如:

    ```text
    https://petstore.com/api/
    ```

-   版本：

    应该将 API 的版本号放入路径。比如:

    ```text
    https://petstore.com/api/v1/
    ```

    另一种做法是，将版本号放在 HTTP 头信息中，但不如放入 URL 方便和直观。

-   **路径**：

    -   又称 "终点"（endpoint），表示 API 的具体网址。
    -   路径是可供调用的 REST API 单元。

    举例来说，有一个 API 提供宠物医院（petstore）的信息，包括各种宠物和不同客户的信息，则它的路径应该设计成下面这样：

    ```text
    - https://petstore.com/api/v1/pet
    - https://petstore.com/api/v1/user
    ```

-   **API 基础路径**：

    同个 API 下，不同路径的相同组成部分。

    举例来说，有一个 API 提供宠物医院（petstore）的信息，其中包含各种宠物信息的路径为`https://petstore.com/api/v1/pet`，包含不同客户信息的路径为`https://petstore.com/api/v1/user`，则它们的相同组成部分`https://petstore.com/api/v1/`是这个 API 的基础路径。

-   路径的作用：

    -   通过配置路径，您可以定义向开发者公开 API 的交互方式。
    -   一个或多个 HTTP 操作一起构成完整的路径。这些操作是与 API 交互的不同方式，您可以使用 `GET`、`POST`、`PUT`、`DELETE`、`PATCH` 和 `OPTIONS` 操作。

==== 2020/08/13 ====
