---
title: OpenAPI 导入指南 - CODING 帮助中心
pageTitle: OpenAPI 导入指南
pagePrevTitle: 接入自动化工具
pagePrev: management/api/automation.html
pageNextTitle: Postman 导入指南
pageNext: management/api/postman.html
---

[OpenAPI](https://swagger.io/resources/open-api) 始于 Swagger 规范，是目前使用最广泛的 REST API 的 API 描述标准，由 Linux 基金会维护，官方最新版本为 OpenAPI 3.0。
需要注意的是 Swagger 规范已于 2015 年捐赠给 Linux 基金会后[改名为 OpenAPI](https://smartbear.com/blog/develop/what-is-the-difference-between-swagger-and-openapi/) ：

-   OpenAPI = 规范
-   Swagger = 实现规范的一系列工具栈

### 获得 OpenAPI 描述文件

OpenAPI 描述文件可通过两种方式来编写：

1.  人工编写 OpenAPI 的 YAML 或 JSON 文件，可使用 SwaggerHub 在线编写。
2.  通过代码注解自动生成 OpenAPI 描述文件，如：SpringFox。

#### SwaggerHub

[SwaggerHub](https://swagger.io/tools/swaggerhub) 是 Swagger 的一个使用 OpenAPI 规范来设计和文档化的工具，它支持在线协作、托管 API 文档以及在线编辑，并且所见即所得。

![](https://help-assets.codehub.cn/enterprise/20191008064417.png)

上图所示为官方范例文档 `PetStore`，是一个比较完整的 OpenAPI 描述文件范例，如果需要对 OpenAPI 规范有个完整的认识，可参考[《如何编写基于 OpenAPI 规范的 API 文档》](https://huangwenchao.gitbooks.io/swagger/content/)

根据规范编写完成的 OpenAPI 描述文件即可用于导入 CODING API 文档管理中。

#### SpringFox

[SpringFox](http://springfox.github.io/springfox) 是一个自动将代码注解转换为 API 文档的工具，支持 Java 语言的 Spring 框架。您可通过参考 [文档](http://springfox.github.io/springfox/docs/current) 实现自动化转换 API 文档。

下面我们通过 SpringFox 提供的 Demo 项目来生成 OpenAPI 描述文件。

1.  打开命令行，下载 Demo 项目代码

   ```shell
   > git clone https://github.com/springfox/springfox-demos.git
   ```

2.  进入代码目录

    ```shell
    > cd springfox-demos
    ```

3.  编译代码

    编译代码需要本地环境支持 Java 和 Gradle。

    ```shell
    > ./gradlew idea
    ```

    或 Windows 用户

    ```shell
    > gradlew.bat idea
    ```

    ![](https://help-assets.codehub.cn/enterprise/20191008064813.png)

    命令行显示 `BUILD SUCCESSFUL` 即为构建成功。

4.  启动本地服务器

    ```shell
    > ./gradlew bootrun
    ```

    或 Windows 用户

    ```shell
    > gradlew.bat bootrun
    ```

    ![](https://help-assets.codehub.cn/enterprise/20191008065146.png)

    稍作等待，直到显示 `FrameworkServlet 'dispatcherServlet': initialization completed in 14 ms` 即为启动成功

5.  打开浏览器，输入：

    ```
    http://localhost:8080/swagger-ui.html
    ```

    ![](https://help-assets.codehub.cn/enterprise/20191008070110.png)

    可看到 Swagger 文档，即为启动成功。

6.  最后，下载 OpenAPI 描述文件

    浏览器输入：

    ```
    http://localhost:8080/v2/api-docs
    ```

    ![](https://help-assets.codehub.cn/enterprise/20191008065312.png)

    右键选择「存储为」保存至本地，可命名为 `xxx.json`，该 OpenAPI 描述文件即可用于导入「CODING API 文档」中。

### 导入数据到「CODING API 文档」

在【发布新版本】页或者【录入 API 数据页】，选择【导入数据】下的【从文件导入】，导入刚才存到本地的 OpenAPI 描述文件，最后选择【完成并发布】实现文档发布。

![](https://help-assets.codehub.cn/enterprise/20191008065650.png)

==== 2020/08/13 ====
