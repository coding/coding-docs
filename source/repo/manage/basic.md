---
title: 设置仓库信息 - CODING 帮助中心
pageTitle: 设置仓库信息
pagePrevTitle: 查看仓库详情
pagePrev: repo/manage/view.html
pageNextTitle: 归档仓库
pageNext: repo/manage/archive.html
alias: 
-   host/config.html
-   repo/config/basic.html
---

进入一个项目之后，在「代码仓库」模块，点击任一仓库进入其详情页面。在「设置」页签即可对当前代码仓库进行设置。

> 只有项目管理员才能进入仓库的设置页面。

![](https://help-assets.codehub.cn/enterprise/20210813145138.png)

你可以在「基本设置」页面修改你的仓库名称与图标。修改名称后会导致导致仓库的访问 URL 改变，在此之前的 URL 地址将失效。修改名称后需在你的本地仓库与新的地址相匹配。

```bash
git remote set-url origin https://e.coding.net/codingcorp/coding-help-generator/[new-repo-name].git
```

除此之外，你还可以在该页面添加仓库描述、查看代码仓库用量情况。如有必要，你还可以归档、重置或删除代码仓库。

==== 2021/08/11 ====
