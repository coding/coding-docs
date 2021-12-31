---
title: 分支管理 - CODING 帮助中心
pageTitle: 分支管理
pagePrevTitle: 代码浏览与对比
pagePrev: repo/browsing.html
pageNextTitle: 合并请求
pageNext: repo/merge.html
---

分支这个概念类似科幻电影里面经常出现的平行宇宙，每个分支的代码版本都是独立演进的，分支之间的代码版本完全不会干扰另外一个代码版本的开发。但是，与平行宇宙不同的一点是，分支之间还能合并。

Git 的分支相比 SVN 要轻量很多，这是因为 Git 分支并不是复制一个新仓库，而是为一个分支存储一个指针，这个指针将指向某个提交对象。没错，这就和数据结构中常见的指针链表一样。所以 Git 的分支只是指针，并没有将仓库进行复制，每次提交都会让当前的分支向后移动，指向最后一次提交的对象。当你在切换分支时，Git 也只是改变指向当前所在分支的特殊指针 HEAD，所以可以能够快速地在各个分支之间进行切换。

### 分支的功能

分支在实际中可以方便的隔离开发。假设你创建了一个属于你自己的分支，别人看不到，还继续在原来的分支上正常工作，而你在自己的分支上干活。直到开发完毕后，再一次性合并到原来的分支上，这样，既安全，又不影响别人工作。

### 管理远程仓库的分支

进入项目后，点击【代码仓库】->【分支】，在页面左上方可以输入分支名来筛选分支，点击右上方新建分支按钮可以新建分支。

页面主体部分显示默认分支和分支列表。项目会有一个默认的 master 分支，在右侧保护分支设置中可以为项目设置多个保护分支。分支列表会显示当前相比于默认分支提前或落后多少提交，右侧设有新建合并请求的快速入口。

![](https://help-assets.codehub.cn/enterprise/20200722165628.png)

### 新建分支

点击新建分支按钮，在弹窗中按照提示输入相关配置信息，默认以 master 分支为起点。

![](https://help-assets.codehub.cn/enterprise/20210115153236.png)

在新建分支时，您可以给分支添加一个简单的描述信息用以记录分支用途，当分支的名称不能完整的描述分支的用途的时候，就可以利用分支备注来完善信息。在分支 tab 页中可以看到此备注信息，点击右侧菜单按钮还可以进行修改编辑。

![](https://help-assets.codehub.cn/enterprise/20210115154253.png)

### [分支设置](#branch-settings)

#### [设置默认分支](#default)

在分支管理页面的右上角点击`保护分支设置`即可进入分支设置界面修改默认分支，仅项目管理员有权限作出变更修改。

![](https://help-assets.codehub.cn/enterprise/20200722171005.png)

#### [设置保护分支](#protected-branch)

【保护分支】是 CODING 针对 Git 中有关代码权限开发的一个功能。简而言之，保护分支就是将特定的分支保护起来，防止被意外更改，破坏了整体。

开启保护分支后，该分支在分支列表中将以绿色盾牌为标志。成员修改保护分支时需先新建一个分支进行修改， 然后创建合并请求并邀请其他成员评审代码。 其他成员【允许合并】后可自行合并分支。

![](https://help-assets.codehub.cn/enterprise/20200722171238.png)

#### [保护分支规则](#protected-branch)

您还可以通过开启保护分支规则的方式，使用「通配符」更加智能地设置保护分支。开启之后原有的保护分支设置都会保留。

![](https://help-assets.codehub.cn/enterprise/20210115141515.png)

创建完成后，点击【添加规则】可以继续设置自定义规则内容。

![](https://help-assets.codehub.cn/enterprise/20210115150215.png)

保护分支可以有 0 个或者多个分支管理员。其它配置项的说明如下：

-   **禁止强制推送：**默认打开。即使有 git push 的权限，也不允许通过 `git push -f` 的方式强制修改分支的提交历史。对于多人合作的分支，强烈建议打开此选项。它确保了只能通过增加新的提交来改变分支内容，而不是修改历史提交的方式来提交变更。

-   **开启状态检查：**开启之后，通过在 CI 中设置触发条件或设置代码扫描方案，待合并请求检查通过后才被允许合并，点击查看[《持续集成——触发规则》](/docs/ci/trigger.html)。

#### 分支管理员

分支管理员为可选项。添加分支管理员后，所有合并请求需要分支管理员提前设置【允许合并】。分支管理员默认也受保护分支限制，需创建合并请求修改分支。若将其设置为【允许直接 Push】，分支管理员则可以直接修改分支。

进入分支管理中的保护分支设置，在弹窗中进行增减分支管理员，可以修改分支管理员的直接 Push 权限。

![](https://help-assets.codehub.cn/enterprise/20200722171048.png)

若成员没有权限（即保护分支的非分支管理员） push 至该分支，当其尝试 push 至该分支的时候，会得到如下错误提示：

![图片](https://dn-coding-net-production-pp.codehub.cn/bf94efb5-a604-4bf5-9e8a-fd9837fbef64.png)

所以，当你看到这个错误提示的时候，就知道是因为没有该保护分支权限而导致 push 失败了。

#### 允许&禁止 Force Push

项目管理员点击分支最右侧的分支设置，当对 Git 仓库某分支开启禁止 Force Push 的选项后，服务器会对推送至这个分支的更新做【快进模式检查】（FastForwarded Update Check）。如果不是以【快进模式（FastForwarded）】更新，则服务器会拒绝更新，以防误操作导致丢失代码历史，命令行错误提示如下：

![img](https://dn-coding-net-production-pp.codehub.cn/29f7366d-a114-456c-84e7-b9b21b23dcc8.png)

### 本地分支管理

**创建并切换到分支**

使用`git checkout -b【分支名称】`命令可以创建一个分支并切换过去：

```shell
$ git checkout -b learn-checkout
```

**单独创建分支**

新建一个名为【learn-branch】的分支命令如下：

```shell
$ git branch learn-branch
```

**单独切换分支**

创建完分支之后使用 `git branch` 命令查看分支:

```shell
$ git branch
* master
  learn-branch
```

可以看到「master」分支上有一个 \*，说明当前是处在 「master」 分支上，也就是说创建完分支后需要我们手动切换到 「learn-branch」，使用 `git checkout 「分支名称」`命令：

```shell
$ git checkout learn-branch
Switched to branch 'learn-branch'
```

再使用 `git branch` 命令查看，会发现已经切换到【 learn-branch 】分支：

```shell
$ git branch
* learn-branch
  master
```

更多命令请查看 [Git 常用命令速查表](/docs/repo/git/commands.html#分支与标签)。

### 查看分支间差异

点击【代码仓库】->【代码对比】，系统会比较版本差异并检测能否自动合并。具体功能演示可以参考[查看提交详情](/docs/repo/repository.html#web) 。

可选择不同的分支、标签进行对比，点击文件改动 TAB，即可查看所有代码行级改动。

![](https://help-assets.codehub.cn/enterprise/20200722172503.png)

### 合并分支

CODING 建议您以合并请求的方式合并分支，详情参考[合并请求](/docs/repo/code-review.html#合并请求) 。

==== 2021/01/15 ====
