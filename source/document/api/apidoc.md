---
title: apiDOC 导入指南 - CODING 帮助中心
pageTitle: apiDOC 导入指南
pagePrevTitle: Postman 导入指南
pagePrev: management/api/postman.html
pageNextTitle: OpenAPI 导入指南
pageNext: management/api/openapi.html
---

[apiDOC](http://apidocjs.com/) 是一款通过注释或注解生成 API 文档的工具，支持 Java、PHP、JS 等多种语言，生成方便，但文档体验较差。您可通过将生成文档中间文件 `api_data.json` 导入至「CODING API 文档」，生成精美的 API 文档。

### 获得 apiDOC API 数据文件

![](https://help-assets.codehub.cn/enterprise/20191008072425.png)

如图所示为 [apiDOC 示例文档](http://apidocjs.com/example/)，通过 apiDOC 生成的 API 文档同理。

![](https://help-assets.codehub.cn/enterprise/20191008072744.png)

将地址栏中地址最后加上 `api_data.json`，即 `http://apidocjs.com/example/api_data.json` 即为 API 数据文件地址。

### 通过 URL 导入

如图所示，在【发布新版本】页或者【录入 API 数据页】，选择【导入数据】下的【从 URL 导入】，粘贴刚才复制的 API 数据文件地址，最后选择【完成并发布】实现文档发布。

![](https://help-assets.codehub.cn/enterprise/20191008071500.png)

### 通过上传文件导入

在网页上右键点击弹出菜单，选择 `存储为` 将 API 数据文件保存至本地。

![](https://help-assets.codehub.cn/enterprise/20191008073104.png)

在【发布新版本】页或者【录入 API 数据页】，选择【导入数据】下的【从文件导入】，导入刚才存到本地的`api_data.json`文件，最后选择【完成并发布】实现文档发布。
![](https://help-assets.codehub.cn/enterprise/20191008065650.png)

==== 2020/08/13 ====
