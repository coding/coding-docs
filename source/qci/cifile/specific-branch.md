---
title: 拉取特定分支 - CODING 帮助中心
pageTitle: 拉取特定分支
sitemap: false
---

运行流水线时，CODING-CI 默认会全量拉取代码库，以保证用户可以做自由切换分支等操作。有些时候，我们并不需要在流水线中拉取代码，或者并不需要拉取全量代码，但还需要注册代码库以保证 webhook 触发能够正常工作，CODING-CI 允许在流水线或 CIFile 中设置拉取代码的配置。

在 CIFile 中配置方式如下：

```yaml
version: "2.0"
code_checkout_type: CHECKOUT_ONLY_BRANCH
stages:
- stage: 新阶段
  tasks:
```

CIFile 中可以声明 code_checkout_type，其值为枚举，具体如下：

```
CHECKOUT_ALL: 全量拉取代码 （这是Coding-CI的默认行为）
CHECKOUT_ONLY_BRANCH: 只拉取选定分支的代码
NO_CHECKOUT: 不拉取代码
```

**注意** 选择`NO_CHECKOUT`后，会清空已有代码库文件的工作空间

在界面上，可以进入流水线配置 -> 全局选项，进行配置

![](https://help-assets.codehub.cn/enterprise/20211026112135.png)

==== 2021/10/26 ====
