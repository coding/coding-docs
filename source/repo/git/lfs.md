---
title: LFS 使用 - CODING 帮助中心
pageTitle: LFS 使用
pagePrevTitle: 常用命令
pagePrev: repo/git/commands.html
pageNextTitle: Go get 支持
pageNext: repo/git/go-get.html
alias: 
-   host/git/lfs.html
-   repo/git/lfs.html
---

CODING 支持 Git LFS（Git Large File Storage）扩展，编码过程中大文件提交请使用 Git LFS。

使用 Git LFS 提交的大文件不占用 Git 仓库存储空间，理论上可以提交的单个文件大小无上限。

### [安装](#install)

> 注意：Git LFS 插件时的 Git 版本需为 1.8.5 及以上。

#### [Linux](#linux)

1.  ```shell
   curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
   ```

2.  `sudo apt-get install git-lfs`

3.  `git lfs install`

#### [Mac](#mac)

1.  安装 [Homebrew](https://brew.sh)：

   ```shell
   /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
   ```

2.  `brew install git-lfs`

3.  `git lfs install`

#### [Windows](#windows)

1.  下载安装 [windows installer](https://github.com/github/git-lfs/releases)。
2.  运行 windows installer。
3.  在命令行执行 `git lfs install`。

### [使用](#use)

有关 Git 操作请查看 [Git 常用命令](/docs/repo/git/commands.html)。

#### [追踪文件](#track-file)

没有特别说明的情况下，Git LFS 不会处理大文件问题，使用 `git lfs track` 命令进行大文件追踪。

-   **追踪单个文件**

例如追踪一个名为 "coding.png" 的文件，使用 `git lfs track "coding.png"` 命令。

-   **追踪同一后缀的所有文件**

如果要追踪所有后缀为 "png" 的文件，使用 `git lfs track "*.png"` 命令。运行此命令后，不但会追踪已存在的所有后缀为 "png" 的文件，也包括以后创建的 "png" 文件。

-   **查看正在追踪的文件模式（patterns）**

运行命令 `git lfs track`：

```shell
Listing tracked patterns
  *.png (.gitattributes)
```

#### [提交大文件](#submit)

提交代码时需要将 ".gitattributes" 文件也提交到仓库，提交完成后，执行`git lfs ls-files`命令可以查看 LFS 跟踪的文件列表。

```shell
f05131d24d * cat.png
7db207c488 * dog.png
```

将代码 push 到远程仓库后，LFS 跟踪的文件会以 "Git LFS" 的形式显示:

```shell
$ git push origin master
Git LFS: （2 of 2 files）12.58 MB / 12.58 MB
Counting objects: 2, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (5/5), done.
Writing objects: 100% (5/5), 548 bytes | 0 bytes/s, done.
Total 5 (delta 1), reused 0 (delta 0)
To https://e.coding.net/coding/coding-manual.git
67fcf6a..47b2002  master -> master
```

#### [克隆包含 Git LFS 文件的远程仓库](clone-lfs-repo)

使用 `git lfs clone` 命令 clone 包含 "Git LFS" 文件的远程仓库到本地。

```shell
$ git lfs clone https://e.coding.net/coding/coding-manual.git
Cloning into 'coding-manual'
remote: Counting objects: 16,done.
remote: Compressing objects: 100% (12/12),done.
remote: Total 16 (delta 3), reused 9 (delta 1)
Receiving objects: 100% (16/16),done.
Resolving deltas: 100% (3/3),done.
Checking connectively...done.
Git LFS: (4 of 4 files) 0 B / 100 B
```

> 了解更多 Git LFS 的使用，可执行`git lfs help`命令查看帮助。

#### [将原有仓库转换为 Git LFS 仓库](#convert)

如需将原有仓库的文件以 LFS 方式存储，查看[参考教程](https://github.com/bozaro/git-lfs-migrate)。

==== 2020/08/13 ====
