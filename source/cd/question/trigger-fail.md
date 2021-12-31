---
title: 触发器错误 - CODING 帮助中心
pageTitle: 触发器错误
pagePrevTitle: 最佳实践——使用 CODING 持续部署的强大表达式
pagePrev: cd/best-practice/expression-cd.html
pageNextTitle: Kubernetes 云账号的最小权限要求
pageNext: cd/question/min-authority.html
alias: cd/question/FAQ.html
---

### [Git 仓库触发器错误](#git)

监听 Git 仓库中的分支更新作为部署流程的触发器，但触发失败。

你可以在分支名前需添加 `^refs/heads/` 参数并附上分支名，例如填写：`^refs/heads/master`。

![](https://help-assets.codehub.cn/enterprise/20211206112321.png)

### [TCR 触发器错误](#tcr)

TCR 触发器配置存在问题，无法触发部署流程。

出现此问题的原因之一有可能是直接复制其他部署流程。直接复制后会将原有触发器进行取代，而并非重新生成触发器，将会导致触发器失效。你可以在腾讯云 TCR 控制台的「触发规则」与「触发日志」中查看问题详情。

![](https://help-assets.codehub.cn/enterprise/20211206113115.png)

若需直接复制某一流程，可以将两个流程的触发器删除后重新设置。

![](https://help-assets.codehub.cn/enterprise/20211206113249.png)

==== 2021/05/17 ====
