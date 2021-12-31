---
title: 使用 cherry-pick 功能 - CODING 帮助中心
pageTitle: 使用 cherry-pick 功能
pagePrevTitle: 使用代码所有者机制
pagePrev: repo/branch/codeowner.html
pageNextTitle: 合并请求与代码评审——设置合并请求
pageNext: repo/mr-review/mr-set.html
sitemap: false
alias: host/git/cherry-pick.html
---

> 目前在 CODING DevOps 平台，cherry-pick 功能仅对白名单团队开放。

Cherry Pick 命令用于把分支中的部分变动提交至其他分支，而无需将本分支中的所有更改合并入其他分支。例如目前有 `Test` 和 `Dev` 两个分支，BB 为测试分支中的一个变动记录，此变更可以单独地并入 `Dev` 分支，两个分支仍然保持平行运行状态。

![](https://help-assets.codehub.cn/enterprise/20210525141941.png)

如果 `Test` 分支里有新的 commit：新建了 `BB.html` 文件，想要将此文件也 “拷贝” 至 `Dev` 分支上，此时就可以使用 cherry-pick 功能。你可以在 Web 端或在本地使用命令行进行操作。

### [Web 端](#web)

1.  在 `Test` 分支中复制新建 `BB.html` 文件时提交的 commit id。

![](https://help-assets.codehub.cn/enterprise/20210525152453.png)

2.  点击 `Dev` 分支右侧的 cherry-pick 按钮，粘贴 commit id。

![](https://help-assets.codehub.cn/enterprise/20210525153058.png)

可以看到 `BB.html` 出现在了 `Dev` 分支里，说明 cherry-pick 成功。

![](https://help-assets.codehub.cn/enterprise/20210525153704.png)

3.  `Dev` 分支中也出现了相同的提交历史记录。

![](https://help-assets.codehub.cn/enterprise/20210525163643.png)

### [本地命令行](#command-line)

1.  在 `Test` 分支中复制新建 `BB.html` 文件时提交的 commit id。

![](https://help-assets.codehub.cn/enterprise/20210525154519.png)

2.  前往 `Dev` 分支，运行命令。

```bash
git cherry-pick  [commit id]
```

3.  若仅想复制文件而不想复制 commit message，在命令行末尾添加 `-n` 参数即可。

```bash
git cherry-pick  < commit id> -n
```

==== 2021/05/25 ====
