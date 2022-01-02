---
title: 管理版本标签 - CODING 帮助中心
pageTitle: 管理版本标签
pagePrevTitle: 管理版本发布
pagePrev: repo/version/release.html
pageNextTitle: 代码仓库安全——检查仓库安全风险
pageNext: repo/security/security.html
---

在代码仓库管理列表，点击指定代码仓库进入其详情页面之后，再点击「版本」->「标签」即可进入其版本标签管理列表。

![](https://help-assets.codehub.cn/enterprise/20211105111845.png)

标签列表显示了该仓库所有标签，按照创建顺序倒序排列。标签列表显示了标签名、标签说明、标签对应版本，并提供 zip 和 tar.gz 下载入口和删除标签入口。点击标签名或者版本号可进入对应的代码版本详情页。


### [新建标签](#create-tag)

在标签管理列表，点击右上角创建建标签按钮，输入标签名并选择待创建标签对应的代码版本（分支、标签、修订版本号），输入标签说明即可创建新标签。

>你可以在代码仓库设置页面[设置保护标签](#protected-tag)，以规范成员的标签操作。

![](https://help-assets.codehub.cn/enterprise/20211102175451.png)

### [查看标签对应的版本发布信息](#view-release)

若某一代码版本对应该标签，点击「版本描述」可以查看该版本发布详情；点击「编辑版本描述」，即可编辑该版本发布信息。

![](https://help-assets.codehub.cn/enterprise/20211102175525.png)

若一个标签并没有对应任何版本发布，可点击「创建版本描述」快速为该标签创建一个发布版本。

![](https://help-assets.codehub.cn/enterprise/20211102175611.png)


### [删除标签](#delete-tag)

在「标签」页面，标签创建者或管理员只能删除未与任何版本发布对应的代码标签。

![](https://help-assets.codehub.cn/enterprise/20211102175640.png)

若任一标签与版本发布关联，只能在「版本发布」删除对应版本的同时将标签删除。

### [设置是否允许删除或强制推送 Git 标签](#protected-tag)

在代码仓库的「设置」->「代码标签」页面，项目管理员可以勾选是否允许删除或者强制推送 Git 标签。关闭此选项后，项目中的成员均不可删除或者通过强制推送修改 Git 标签，同时网页上的标签不提供删除功能。

![](https://help-assets.codehub.cn/enterprise/20210813144435.png)

### [设置保护标签](#protected-tag)

保护标签主要用于规范特定的成员进行创建、更新或删除标签等操作。开启保护标签后需设置标签管理员，仅管理员被允许在此标签下创建匹配标签规则的标签。

当设置了 `*-release` 为保护分支规则之后，非管理员用户通过 Git 推送标签 `xxx-release` 的时候有如下提示：

![](https://help-assets.codehub.cn/enterprise/20210305153450.png)

在 Web 端创建标签或新建版本时也同样会失败。

![](https://help-assets.codehub.cn/enterprise/20210305153646.png)

**使用场景举例**

某团队使用标签作为触发 CI 构建的条件，即在生产分支中，通过推送 `v1.0-release` 字样的标签作为发布命令。

设置保护标签后，仅标签管理员能够创建此类型标签并完成发版动作，保持了代码仓库内各版本序列的整洁与规范。

==== 2021/11/13 ====
