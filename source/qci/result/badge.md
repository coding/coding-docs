---
title: 结果徽章 - CODING 帮助中心
pageTitle: 结果徽章
pagePrevTitle: 持续集成简介
pagePrev: qci/intro/ci.html
pageNextTitle: 快速开始
pageNext: ci/start.html
sitemap: false
---

通过在 markdown 文档中（比如代码库的 readme.md ）添加链接的方式，可以在文档中展示指定 CODING-CI 任务的最近一次执行的序号和执行结果徽章，点击徽章可直接跳转 CODING-CI 平台该任务的最新一次执行。

### 示例

![](https://help-assets.codehub.cn/enterprise/20211026142007.png)

### 快速使用

CODING-CI 的每个任务的详情页面都有项目徽章，点击这个徽章，可以直接看到项目的徽章的使用方法：

![CODING-CI 项目徽章展示](../../_static/QCI项目徽章的使用方法.png)

使用方法现已支持用户新增展示自定义字段，使用链接可以在界面的内容字段填入内容，按 Enter 即可预览
自定义字段的内容将会替换原来的当前最新构建号，可以在自定义的内容后加上 `$build` 即可同时显示用户的自定义内容和当前最新构建号

在链接上的体现是：在请求链接上添加参数 subtitle，subtitle 传空时默认展示当前最新构建号，
subtitle 传值时展示所传的值，所传的值包含 `$build` 字符时，会同时显示值和当前最新构建号

==== 2021/08/04 ====
