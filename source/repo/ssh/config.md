---
title: 配置 SSH 公钥 - CODING 帮助中心
pageTitle: 配置 SSH 公钥
pagePrevTitle: SVN 仓库使用——管理 SVN 目录权限
pagePrev: repo/svn/permission.html
pageNextTitle: 密钥指纹鉴权
pageNext: repo/ssh/fingerprint.html
alias: 
-   project/features/ssh.html
-   project-settings/ssh.html
---

### [功能介绍](#intro)

SSH 的全称为 Secure Shell 即安全外壳协议，是一种加密的网络传输协议。它能够在公开的网络环境中提供安全的数据传输环境，通常用于登录远程主机与推拉代码。

同样一个 SSH 公钥文件，如果添加至某一个代码仓库，则称为**部署公钥**，配置后默认拥有该项目的只读权限；如果添加至个人账户，称为**账户 SSH 公钥**，配置后拥有账户下所有项目的读写权限。同一个 SSH 公钥无法重复添加至代码仓库和个人账户。

### [生成公钥](#keygen)

本文使用 `ssh-keygen` 工具生成 SSH 公钥，执行命令：

```shell
ssh-keygen -m PEM -t ed25519 -C "your.email@example.com"  // 创建新的 SSH 私钥与公钥秘钥对，输入你的邮箱作为标签
Enter file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]  // 推荐使用默认地址
Enter passphrase (empty for no passphrase):  // 此处直接回车即可；若设置密码，则每次使用 SSH 方式推送代码时都会要求输入密码
```

> 若你需要使用多个 SSH 密钥对，在 `Enter file in which to save the key` 步骤时，输入一个新的文件名称就可以避免覆盖已有的密钥对。有关 SSH 更多信息可参考 [维基百科](http://zh.wikipedia.org/zh/Secure_Shell)。
> 若您的系统不支持 Ed25519 算法，请使用命令 `ssh-keygen -m PEM -t rsa -b 4096 -C "your.email@example.com"`。

成功之后显示如下信息：

```shell
Your identification has been saved in /Users/you/.ssh/id_rsa.
# Your public key has been saved in /Users/you/.ssh/id_rsa.pub.
# The key fingerprint is:
# 01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your.email@example.com
```

### [添加公钥](#add-key)

你可以按需添加公钥至单个仓库或个人账户，相同的 SSH 公钥无法重复添加。
#### [关联公钥至单个代码仓库](#deploy-key)

1.  打开上文中生成的秘钥对的地址（通常为 `~/.ssh/`）找到后缀为 `pub` 的公钥文件，使用 `cat` 命令输出所有内容并复制。

![](https://help-assets.codehub.cn/enterprise/20210510170913.png)

2.  前往代码仓库的「设置」->「部署公钥」页面，点击添加部署公钥，粘贴复制的公钥全文。

![](https://help-assets.codehub.cn/enterprise/20210510172409.png)

> *部署公钥默认拥有该项目的只读权限。如果需要获取推送权限，请勾选部署公钥设置里的「授予推送权限」。*

3.  完成后，在本地运行首次连接时的公钥认证命令： `ssh -T git@e.coding.net`

![](https://help-assets.codehub.cn/enterprise/20210511104758.png)

#### [关联公钥至个人账户](#account-key)

1.  打开上文中生成的秘钥对的地址（默认地址通常为 `~/.ssh/`）找到后缀为 `pub` 的公钥文件，使用 `cat` 命令输出所有内容并复制。

![](https://help-assets.codehub.cn/enterprise/20210510170913.png)

2.  登录 CODING，点击右上角个人头像进入「个人账户设置」->「SSH 公钥」页面，然后点击新建公钥按钮。

![](https://help-assets.codehub.cn/enterprise/20210511103851.png)

3.  根据提示粘贴已复制的公钥内容，按需填写公钥名称。

4.  完成后，在本地运行首次连接时的公钥认证命令： `ssh -T git@e.coding.net`

![](https://help-assets.codehub.cn/enterprise/20210511104758.png)


==== 2021/11/13 ====
