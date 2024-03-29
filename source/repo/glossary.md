---
title: 词汇表 - CODING 帮助中心
pageTitle: 词汇表
pagePrevTitle: 常见问题
pagePrev: repo/faq.html
---

### [提交](#commit)

源自 Git commit 命令，是指 Git 的一次改动记录。每次提交会产生一个独一无二的提交 ID，即一串 hash 值。

### [代码分支](#branch)

版本控制系统的基本概念。基于原始开发主线，分离出一份平行的 Git 仓库，可以允许开发者在不影响原有主线的情况下继续工作。

### [保护分支](#protected-branch)

保护分支是 CODING 针对 Git 中有关代码权限开发的一个特色功能，可以将选中的分支保护起来，防止未经报备的代码更改。开启后，保护分支在分支列表中将以绿色盾牌为标志。详情请参考[此处](/docs/repo/branch/protected.html)。

### [默认分支](#default-branch)

即主干分支。新建 Git 仓库时至少会有一个分支，而这时候的第一个分支通常叫做 `master` 或者 `main`，常常为默认分支。详情请参考[此处](/docs/repo/branch/default.html)。

### [状态检查](#status-check)

常用于合并请求场景。某个分支开启状态检查后，此分支上的代码合并请求必须通过持续集成任务后（通常情况下，它们为预发布环境）才能进行合并，完成变更。

### [分支管理员](#branch-admin)

指有权限调整保护分支设置、是否放行涉及保护分支合并请求的成员。

### [部署公钥](#deploy-key)

添加至某一个代码仓库的 SSH 公钥称为部署公钥，拥有该公钥的用户同时具备只读与读写仓库权限。

### [账户 SSH 公钥](#account-ssh-key)

添加至「个人账户设置」下的 SSH 公钥称为账户 SSH 公钥，配置后拥有账户下所有代码仓库的读写权限。

### [代码所有者](#code-owner)

翻译自英文 Code owner，有些代码托管平台也将其翻译为代码属主。该功能允许将某些用户声明为一部分代码仓库代码的拥有者，修改这部分代码需要获得代码所有者的同意。

### [评审者](#review)

创建合并请求时，发起人可以将某些用户添加为评审者，这代表发起人希望这些用户对他的代码改动进行评审，并给予允许合并的行为。

==== 2021/11/05 ====
