---
title: 在持续集成中使用 dotnet 工具 - CODING 帮助中心
pageTitle: 在持续集成中使用 dotnet 工具
pagePrevTitle: 在持续集成中使用 SSH
pagePrev: ci/practice/ssh.html
pageNextTitle: 自建静态网站
pageNext: ci/practice/static-website-paas.html
alias: best-practices/ci/1minute/net-core.html
sitemap: false
---

### [前言](#intro)

构建节点的运行环境预装了 Ubuntu 16.04 操作系统，你可以在[此处](/docs/ci/node/env.html)查看已预装的环境。构建节点并非只能用于 Linux 生态，其内置的 dotnet 命令行程序还能够被用于支持 Windows 跨平台开发框架 [.Net Core](https://docs.microsoft.com/zh-cn/dotnet/core/install/sdk?pivots=os-windows) 项目的构建、测试及发布。本文通过一个简单的 .Net Core 项目来演示如何使用 CODING 持续集成自动化处理相关操作。

### [准备工作](#front)

#### 环境

CODING CI 构建节点已经内置了很多常用工具，满足本文所需，如果您希望在本地操作，可以安装如下工具。

-   [git](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)
-   [dotnet](https://docs.microsoft.com/zh-cn/dotnet/core/install/sdk?pivots=os-windows)

这里需要注意的是，我在写作本文时 CODING CI 构建节点内置 dotnet 版本为 2.2.203，本地尽量安装 2.2 版本，避免不兼容。

另外，请您预先准备一个 [CODING 项目](/docs/start/project.html)。

#### 代码

我已经准备了一份简单的[示例代码](https://docs.microsoft.com/zh-cn/dotnet/core/install/sdk?pivots=os-windows)，用来辅助该教程。您可以通过下面的命令克隆到本地。

```sh
git clone https://e.coding.net/coding-public/demo/botnet-demo.git
```

下面我们正式开始通过一个 Demo 演示 CODING 平台持续集成功能的使用。

### 创建制品库

为了方便随时使用构建出来的目标文件，我们将构建物存储到 [CODING 平台制品库](/docs/artifacts/manual.html)，因此需要先创建合适的制品仓库，这里创建 generic 仓库比较合适。

从左侧导航栏打开`制品库`，单击新建仓库，选择 generic 类型，按照提示指定仓库名称，这里仓库名取为 generic。

![](https://help-assets.codehub.cn/enterprise/20200929140617.png)

### 创建并配置构建计划

在左侧菜单栏选择`构建计划`，在打开的页面中点击`新建构建计划配置`。

![](https://help-assets.codehub.cn/enterprise/20200929140642.png)

为简化构建计划配置，CODING 提供了丰富的模板供选择，这里我们选择`简易模板`即可。

![](https://help-assets.codehub.cn/enterprise/20200929140708.png)

### 编写构建脚本

构建脚本定义构建过程的具体步骤，是构建计划的核心部分。CODING 平台提供了[图形化编辑器](/docs/ci/visual-editor.html)方便您快速编写构建脚本。

CODING 持续集成底层基于开源 CI/CD 软件领导者 Jenkins 实现，完全兼容 Jenkins pipeline 构建脚本语法，根据 Jenkins 官方提供的[脚本编写指南](https://www.jenkins.io/zh/doc/book/pipeline/)，可以实现更复杂的构建任务，CODING 也提供了文本编辑器方便您在线编辑。

代码仓库中已包含一个简单的构建脚本（Jenkisnfile），您可以按照自己的想法参考编写。

```shell
// Jenkinsfile
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        sh 'dotnet --info'
        checkout([
          $class: 'GitSCM',
          branches: [[name: env.GIT_BUILD_REF]],
          userRemoteConfigs: [[
            url: env.GIT_REPO_URL,
            credentialsId: env.CREDENTIALS_ID
          ]]])
        }
      }
      stage('构建') {
        steps {
          sh 'dotnet run -p dotnet-demo --   "Hello from the bot"'
          sh 'dotnet build -r ubuntu.16.04-x64 dotnet-demo'
        }
      }
      stage('测试') {
        steps {
          sh 'dotnet test ./dotnet-test'
        }
      }
      stage('发布') {
        steps {
          sh 'dotnet publish -o bin/Release/netcoreapp2.2/ubuntu.16.04-x64 -r ubuntu.16.04-x64 dotnet-demo'
          sh 'tar -zcvf dotnet-demo-ubuntu.16.04-x64.gz dotnet-demo/bin/Release/netcoreapp2.2/ubuntu.16.04-x64/'
          codingArtifactsGeneric(
            files: "dotnet-demo-ubuntu.16.04-x64.gz",
            repoName: "generic",
          )
        }
      }
    }
  }
```

构建脚本中的大部分内容都比较容易理解，稍显陌生的是 codingArtifactsGeneric 步骤，这是 CODING 官方提供的[插件](/docs/ci/plugins/generic.html)，方便上传到 CODING generic 制品库。

### 执行构建

执行构建最简单的方式是手动触发构建，选中想要构建的构建计划，单击立即构建会弹出配置窗口，在这里可以配置此次构建使用的参数，单击确定即可开始构建。

![](https://help-assets.codehub.cn/enterprise/20200929140854.png)

触发后，构建会自动执行，您可以继续做其他事情。

### 下载目标文件

步骤三中定义的构建脚本会将构建出的目标文件发布到 CODING 制品库，如果我们想要在本地使用也是很方便下载的。在制品仓库中单击文件名即可看到指引页，里面给出了对文件不同操作的命令。

![](https://help-assets.codehub.cn/enterprise/20200929140915.png)

### 总结

本文通过一个简单 .Net Core 项目演示了在 CODING CI 中使用 dotnet 工具进行构建、测试、发布的方法，受限于 CODING CI 的默认构建节点为预装 Linux 系统的机器，对 Windows 开发人员的帮助不算多。近期， CODING CI 推出了[自定义构建节点](/docs/ci/node/windows.html)功能，支持 Linux/MacOS/Windows 平台，您可以将自己的机器接入 CI 系统进行构建，想必能为 Windows 开发人员提供更大的帮助。

==== 2020/09/28 ====
