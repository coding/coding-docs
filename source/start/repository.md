---
title: 使用代码仓库 - CODING 帮助中心
pageTitle: 使用代码仓库
pagePrevTitle: 开始项目协同
pagePrev: start/project-plan.html
pageNextTitle: 启动代码扫描
pageNext: start/scan.html
---

完成项目规划之后，可利用[代码仓库](/docs/collaboration/intro.html)管理项目代码。该功能提供企业级的基于 Git 的云端代码管理服务，支持精细化权限管控、多分支并行开发、多版本管理等功能。

如果您是初次接触 Git，可参考 [Git 通识](/docs/repo/git/basic.html) 先了解 Git 的基本概念和常用操作。

本文将通过以下步骤介绍如何使用[代码仓库](/docs/collaboration/intro.html)功能管理您的项目代码：

1.  [安装并配置 Git 客户端](#git)
2.  [创建代码仓库](#repo)
3.  [克隆代码仓库到本地](#clone)
4.  [推送本地代码至 CODING 代码仓库](#push)

### [安装并配置 Git 客户端](#git)

1.  前往 [Git 官网](https://git-scm.com/downloads) 下载最新版的 Git 客户端并进行安装。

2.  在 Git 客户端配置用户名和邮箱。


```shell
git config --global user.name "您的用户名" 
git config --global user.email "您的邮箱"
```

配置好之后可以使用以下命令行查看配置：

```shell
git config -l
```

如需了解 Git 安装详情，参考 [Git 安装](/docs/repo/start.html)。
### [创建代码仓库](#repo)

1.  进入已创建的项目，点击左侧导航栏「代码仓库」。

2.  在「代码仓库」页面，点击右上角「创建代码仓库」，选择任一创建方式。（本文示例用的是普通创建 Git 仓库。）
*   **普通创建**：可选 Git 或 SVN 仓库。如需了解如何创建 SVN 仓库，参考 [SVN 仓库支持](https://help.coding.net/docs/repo/svn.html)。
*   **模板创建**：可选择任一预置模板。
*   **导入外部仓库**：如果在 GitLab 或 GitHub 已有仓库，可参考[同步或关联外部仓库](https://help.coding.net/docs/repo/sync-relate.html)进行导入。

![](https://help-assets.codehub.cn/enterprise/20210729160941.png)

3.  填写仓库信息，开启**生成 README 文件**以快速初始化仓库，开启**代码扫描**并选择合适的代码扫描方案完成创建。

> 此处开启**代码扫描**功能，会自动在「代码扫描」模块创建对应的扫描任务。

![](https://help-assets.codehub.cn/enterprise/20210729164501.png)

### [克隆代码仓库到本地](#clone)

通常我们会将代码仓库克隆到本地，在本地修改、测试之后再提交到远程代码仓库。授权方式有两种协议：HTTPS 和 SSH。本文以通过 HTTPS 协议克隆为例进行说明。如需了解如何通过 SSH 协议进行克隆，参考[使用 SSH 推拉代码](/docs/repo/ssh.html)。


1.  进入已创建的项目，点击左侧导航栏「代码仓库」。


2.  在「代码仓库」页面，点击需要克隆的代码仓库，进入其详情页面。

3.  在代码仓库的详情页面，点击右上角「克隆」。在弹出的「克隆仓库」页面，点击复制按钮。


![](https://help-assets.codehub.cn/enterprise/20210826165500.png)

4.  在 Git 客户端中输入克隆命令。

```shell
git clone <您克隆的代码仓库地址>
```

首次拉取后会提示填写凭据，此处填写在注册 CODING 时所使用的邮箱与密码即可，你也可以点击右上角下拉菜单，前往「个人账户设置」中修改凭证信息。

![](https://help-assets.codehub.cn/enterprise/20210826164441.png)

命令操作提示成功之后，你可以在本地代码仓库中进行代码修改。

![](https://help-assets.codehub.cn/enterprise/20210826164839.png)

修改完成后便可参考下文，将变动内容推送至远端仓库。

### [推送本地代码至 CODING 代码仓库](#push)

1.  在 Git 客户端，运行以下三条命令将代码推送到 CODING 平台上的代码仓库。

```shell
git add .
git commit -m "<您对本次提交备注的信息>"
git push origin master
```

2.  在「代码仓库」模块中，点击仓库名称打开其详情页面，在「提交」页签可查看所有的提交记录。
![](https://help-assets.codehub.cn/enterprise/20210729173450.png)

如需了解更多代码仓库的使用方法，参考[使用远程代码仓库](/docs/repo/repository.html)。

