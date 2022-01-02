---
title: 自定义节点 - CODING 帮助中心
pageTitle: 自定义节点
pagePrevTitle: 默认节点环境
pagePrev: ci/node/env.html
pageNextTitle: Worker 常用命令
pageNext: ci/node/worker.html
alias: 
-   devops/ci/node/overview.html
-   ci/node/overview.html
-   ci/node/macos.html
-   ci/node/windows.html
-   ci/node/linux.html
---

### [功能介绍](#intro)

在实际的开发项目中，所涉及的开发环境可能是多种多样的。当默认节点的构建环境无法承载项目的运行要求时，例如需使用 macOS Xcode 构建 iOS 应用，那么就可以通过接入自定义类型节点（物理机/虚拟机/容器等）运行特定任务。

接入构建节点时需指定接入的构建节点池，构建节点不能游离节点池而单独存在。[构建节点池](/docs/ci/node/pool.html)分为团队与项目两种类型。

### [接入节点](#connect)

接入自定义节点的过程本质上是在节点中运行 `Worker` 服务，点击了解 [Worker 常用命令](/docs/ci/node/worker.html)。

目前支持 [macOS](#macos)、[Windows](#windows)、[Linux](#linux) 环境接入至构建计划节点池。

#### [推荐配置](#recommended)

-   CPU 8 核或以上
-   内存 16 GB 或以上

#### [环境依赖](#rely)

-   **Python 3.6, Python 3.7, Python 3.8, Python 3.9**

    点击访问[项目地址](https://www.python.org/)进行下载。

-   **Git ≥ 2.8**

    点击访问[项目地址](https://git-scm.com/downloads)进行下载。

-   **Java 8, Java 11**

    点击访问[项目地址](https://www.java.com/zh-TW/download/manual.jsp)进行下载。

-   **Jenkins**

    jenkins.war 文件下载命令：
    
    ```bash
    curl -fL  "https://coding-public-generic.pkg.coding.net/cci/release/cci-agent/jenkins.war?version=2.293-cci" -o jenkins.war
    ```

    jenkins_home.zip 文件下载命令：

    ```bash
    curl -fL  "https://coding-public-generic.pkg.coding.net/cci/release/jenkinsHome.zip?version=latest" -o jenkins_home.zip
    ```

    **Windows:**  进入 `C:/` 目录，创建 `codingci/tools` 目录。在其中下载 jenkins.war 、jenkins_home.zip 文件，并在 `tools/` 目录解压 jenkins_home.zip 文件。

    **Linux:**  进入 `/root/` 目录，创建 `codingci/tools` 目录。在其中下载 jenkins.war 、jenkins_home.zip 文件，并在 `tools/` 目录解压 jenkins_home.zip 文件。

    **macOS:** 进入 `~/` 目录，创建 `codingci/tools` 目录。在其中下载 jenkins.war 、jenkins_home.zip 文件，并在 `tools/` 目录解压 jenkins_home.zip 文件。

### macOS

#### [命令接入](#script)

进入构建节点，选择【接入新节点】->【macOS】，接入方式选择 Bash，在接入配置中选择对应节点池，点击【生成接入配置并复制】。

![](https://help-assets.codehub.cn/enterprise/20211025145421.png)

在终端中输入命令后，等待服务下载完成。安装完成后可以使用以下命令进行验证：

```bash
qci_worker version
```

> 命令接入的默认安装目录为 `/root/codingci`，若希望指定安装目录，请参考[此处](#specify-directory)。

#### [手动接入](#manual)

> 使用手动接入方式前请确保节点 已满足上文中的[环境依赖](#rely)要求。

1.  接入方式选择手动接入，按照提示在终端中输入命令安装客户端，即安装 `Worker` 服务。

![](https://help-assets.codehub.cn/enterprise/20211025145527.png)

2.  选择拟接入的节点池；点击【一键生成并复制】，生成初始化命令。

3.  在终端中执行已自动生成的客户端启动命令，让构建节点保持在线状态。

### Windows

#### [命令接入](#script)

选择【持续集成】->【构建节点】中，点击右上角的【接入新节点】，选中 Windows，选择 Powershell 接入方式。

![](https://help-assets.codehub.cn/enterprise/20211025145623.png)

安装完成后可以使用以下命令进行验证：

```bash
qci_worker version
```

> 命令接入的默认安装目录为 `/root/codingci`，若希望指定安装目录，请参考[此处](#specify-directory)。

#### [手动接入](#manual)

> 使用手动接入方式前请确保节点 已满足上文中的[环境依赖](#rely)要求。

1.  接入方式选择手动接入，按照提示在终端中输入命令安装客户端，即安装 `Worker` 服务。

![](https://help-assets.codehub.cn/enterprise/20211025145707.png)

2.  选择拟接入的节点池；点击【一键生成并复制】，生成初始化命令。

3.  在终端中执行已自动生成的客户端启动命令，让构建节点保持在线状态。

### Linux

#### [命令接入](#script)

选择【持续集成】->【构建节点】中，点击右上角的【接入新节点】，选中 Linux，选择 Bash 接入方式。设置完成后在 Linux 环境中运行已生成的接入配置命令。

![](https://help-assets.codehub.cn/enterprise/20211025150016.png)

安装完成后可以使用以下命令进行验证：

```bash
qci_worker version
```

> 命令接入的默认安装目录为 `/root/codingci`，若希望指定安装目录，请参考[此处](#specify-directory)。

#### [手动接入](#manual)

> 使用手动接入方式前请确保节点 已满足上文中的[环境依赖](#rely)要求。

1.  接入方式选择手动接入，按照提示在终端中输入命令安装客户端，即安装 `Worker` 服务。

![](https://help-assets.codehub.cn/enterprise/20211025145853.png)

2.  选择拟接入的节点池；点击【一键生成并复制】，生成初始化命令。

3.  在终端中执行已自动生成的客户端启动命令，让构建节点保持在线状态。

### [启动守护进程](#daemon)

安装完成后，在构建节点上需要运行守护进程，用以监听并获取由 CODING 后台下发的 CI 任务。以下为运行 / 删除命令行：

```bash
# 在后台运行
qci_worker up -d

# 在前台运行
qci_worker up

# 暂时停止运行
qci_worker stop
```

### [指定安装目录](#specify-directory)

若你需要将 worker 服务安装至指定目录中，需使用手动接入方式。例如安装至 `/opt/qci-workspace` 目录，你需要进行以下操作：

#### [1. 下载 Jenkins 服务](#1)

Linux: 创建 /opt/qci-workspace/tools 目录。在其中下载 jenkins.war 、jenkins_home.zip 文件，并在 tools/ 目录解压 jenkins_home.zip 文件。

-   jenkins.war 文件下载命令

```bash
curl -fL  "https://coding-public-generic.pkg.coding.net/cci/release/cci-agent/jenkins.war?version=2.293-cci" -o jenkins.war
```

-   jenkins_home.zip 文件下载命令

```bash
curl -fL  "https://coding-public-generic.pkg.coding.net/cci/release/jenkinsHome.zip?version=latest" -o jenkins_home.zip
```

#### [2. 手动接入并注册](#2)

按照下图路径获取安装命令，在终端中运行命令，安装 worker 客户端。

![](https://help-assets.codehub.cn/enterprise/20211029165103.png)

复制上图第三步的「初始化客户端」命令后，在末尾添加 `--home /opt/qci-workspace` 参数用以指定安装目录。

![](https://help-assets.codehub.cn/enterprise/20211029165230.png)

#### [3. 启动服务](#3)

运行命令：

```bash
qci_worker up -d
```


==== 2021/10/25 ====
