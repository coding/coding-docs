---
title: 使用升级后的仓库地址 - CODING 帮助中心
pageTitle: 使用升级后的仓库地址
pagePrevTitle: Go get 支持
pagePrev: repo/go-get.html
---

### CODING 升级公告

点击查看[公告全文](https://coding.net/products/upgrade)。
经过慎重考虑，我们决定「将 CODING 个人版与腾讯云开发者平台升级至全新 CODING」，产品服务、品牌等都将整合为同一个 [CODING](https://coding.net)。升级过程将自动完成，您从任意登录页面均将被引导至全新 CODING。

无论您是个人开发者，或是不同规模的团队，全新 CODING 均能满足您在代码托管、团队协同及云端 DevOps 方面需求。

### 更新升级后的远端仓库地址

#### 在 Git 仓库中更新远端仓库地址

1.  进入全新 CODING，您可以找到已经迁移好的原个人版与腾讯云开发者平台的项目。进入您的目标项目，记下新的仓库地址 `&lt;new url&gt;`。
2.  在终端中进入 git 仓库目录。
3.  执行命令 `git remote set-url origin &lt;new url&gt;` 修改本地仓库所对应的新远程仓库地址。

    > 如果您想使用 HTTPS 协议，您使用的命令应形如 `git remote set-url origin https://e.coding.net/xxx.git`。
    > 
    > 如果您想使用 SSH 协议，您使用的命令应形如 `git remote set-url origin git@e.coding.net:xxx.git`。

4.  执行命令 `git remote -v` 来查看已经配置好的远程仓库地址。

以下是操作演示：

1.  进入目标项目的「代码仓库」→「代码浏览」界面，记下新的仓库地址。

    ![](https://help-assets.codehub.cn/enterprise/20200110035006.png)

2.  在终端中进入 git 仓库目录，执行命令 `git remote set-url origin &lt;new url&gt;` 修改本地仓库所对应的新远程仓库地址。

    ![](https://help-assets.codehub.cn/enterprise/20200110035412.png)

3.  执行命令 `git remote -v` 检查更新地址是否生效。

    ![](https://help-assets.codehub.cn/enterprise/20200110035546.png)


#### 在 SVN 仓库中更新远端仓库地址

1.  进入全新 CODING，您可以找到已经迁移好的原个人版与腾讯云开发者平台的项目。进入您的目标项目，记下新的仓库地址 `&lt;new url&gt;`。
2.  在终端中进入 svn 仓库目录。
3.  执行命令 `svn relocate &lt;new url&gt;` 修改本地仓库所对应的新远程仓库地址。


### 确保输入正确的用户名

当您使用 HTTPS 协议与 CODING 连接时，终端会提示 `username for https://e.coding.net/xxx.git`，这里的 `username` 是指您在「个人设置」中填写的「手机」或者「邮箱」。

如果您未填写，请到「个人设置」补充您的「手机」与「邮箱」，如下图所示：

![](https://help-assets.codehub.cn/enterprise/20200219022259.png)

>「个人设置」的位置：将鼠标悬停在顶栏头像上，会弹出下拉框，点击「个人设置」进入，如图所示：
> ![](https://help-assets.codehub.cn/enterprise/20200219022814.png)

### 确保输入正确的密码

密码区分大小写。示例：密码 `PRETTY` 与 `pretty` 不同，也不与 `Pretty` 相同。

还有一些字母和数字可能会混淆。示例：数字 `1` 与小写字母 `l` 不同；数字 `0` 与小写字母 `o` 不同。


==== 2020/08/13 ====
