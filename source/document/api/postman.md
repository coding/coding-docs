---
title: Postman 导入指南 - CODING 帮助中心
pageTitle: Postman 导入指南
pagePrevTitle: OpenAPI 导入指南
pagePrev: management/api/openapi.html
pageNextTitle: apiDOC 导入指南
pageNext: management/api/apidoc.html
---

[Postman](https://www.getpostman.com/) 是一款服务于 REST API 的完整开发环境，您可以在 Postman 设计 API。CODING 支持通过 Postman 导出的 Collection 文件，导入 API 数据至 CODING，生成 API 文档。

### 导入 Postman API 数据文件

获取 Postman API 数据文件有两种方式：

1.  通过 `Share Postman API` 获取 API 数据文件 URL
2.  通过导出 `Postman Collection` 文件获取 API 数据文件

#### 通过分享 Postman Collection 获取 API 数据文件 URL

![](https://help-assets.codehub.cn/enterprise/20191008070759.png)

如图所示，我们新建了一个名称为 `Postman API` 的 Collection，点击 `Share Collection`。

在弹窗中点击 `Get Link` 按钮获取分享地址。

![](https://help-assets.codehub.cn/enterprise/20191008070859.png)

该地址即为 Postman API 数据文件 URL，点击 `Copy To Clipboard` 复制地址至剪切板。
如图所示，在【发布新版本】页或者【录入 API 数据页】，选择【导入数据】下的【从 URL 导入】，粘贴刚才复制的分享地址，最后选择【完成并发布】实现文档发布。
![](https://help-assets.codehub.cn/enterprise/20191008071500.png)

#### 通过导出获取 Postman Collection JSON API 数据文件

![](https://help-assets.codehub.cn/enterprise/20191008071838.png)

如图所示，可通过点击 Collection 菜单中 `Export` 进行导出操作。

![](https://help-assets.codehub.cn/enterprise/20191008071939.png)

选中 `Collection v2.1`，点击 `Export` 将导出 JSON 文件保存至本地。
在【发布新版本】页或者【录入 API 数据页】，选择【导入数据】下的【从文件导入】，导入刚才存到本地的 Postman Collection JSON API 数据文件，最后选择【完成并发布】实现文档发布。

![](https://help-assets.codehub.cn/enterprise/20191008065650.png)

==== 2020/08/13 ====
