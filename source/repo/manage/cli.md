---
title: 通过本地命令行管理仓库 - CODING 帮助中心
pageTitle: 通过本地命令行管理仓库
pagePrevTitle: 管理代码仓库卡片
pagePrev: repo/manage/card.html
pageNextTitle: SVN 仓库使用——创建 SVN 仓库
pageNext: repo/svn/create.html
---

### [从远程仓库获取数据](#obtain-data)

你可以使用 `git clone` 命令克隆远程仓库至本地，并自动与之关联。

```shell
git clone [remote-name]
```

### [推送数据到远程仓库](#push)

使用 `git push [remote-name] [branch-name]` 可以将本地仓库中的数据推送到远程仓库，如：`git push learn-git master`会将本地的仓库数据推送到远程仓库的 “master” 分支。

### [重命名远程仓库](#rename)

使用 `git remote rename [old-name] [new-name]` 命令修改某个远程仓库在本地的简称，比如想把 `origin` 改成 `learn-git`，可以运行：

```shell
git remote rename origin learn-git 
```

重命名远程仓库之后，若在使用 Git 命令时需要指定远程仓库的名字，请使用更新后的命名作为推送命令。

```bash
git push learn-git [branch-name]:mr/master/[branch-name]
```

### [解除远程仓库关联](#unlink)

比如要解除和远程仓库 “origin” 的关联，运行：

```shell
git remote rm origin
```

> 注意，此命令是解除了本地仓库和远程仓库的关联，并不是删除了远程仓库的数据。

如需了解更多常用的 Git 命令，参考 [Git 常用命令速查表](/docs/repo/git/commands.html)。



==== 2021/10/28 ====
