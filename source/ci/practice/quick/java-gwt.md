---
title: GWT 应用 - CODING 帮助中心
pageTitle: GWT 应用
pagePrevTitle:  使用持续集成定期扫描漏洞 (NPM Audit)
pagePrev: ci/practice/npm-audit.html 
pageNextTitle: Javascript + Electron 开发桌面应用
pageNext: ci/practice/quick/javascript-electron.html
alias: best-practices/ci/1minute/java-gwt.html
---

Google Web Toolkit（GWT）是一个开源、免费的 Web 开发框架，通过该框架，你可以使用 Java 构建复杂、高性能的 JavaScript 应用程序。

>持续集成指的是，频繁地（一天多次）将代码集成到主干。它的好处主要有两个：1.快速发现错误。 2.防止分支大幅偏离主干。持续集成的目的，就是让产品可以快速迭代，同时还能保持高质量。 —— 阮一峰

本文的示例会创建一个简单的 GWT 应用，并利用持续集成工具实现自动构建、测试和发布。

### [前置准备](#prerequisite)

-   Java
-   Maven
-   GWT SDK
-   [CODING 项目](/docs/start/project.html)
-   [Generic 制品仓库](/docs/artifacts/quick-start/generic.html)

#### JDK

GWT 要求 JDK 1.6 或以上版本，在终端中执行命令 `java -version` 检查是否已安装，输出如下图类似内容，即表示已安装。

![](https://help-assets.codehub.cn/enterprise/20200727144108.png)

如果没有安装，可通过 `Homebrew` 工具安装，命令如下

```shell
brew tap adoptopenjdk/openjdk
brew cask install adoptopenjdk8
```

#### Maven 

通过命令 `mvn -v` 检查 Maven 版本，输出类似下图即表示已安装。

![](https://help-assets.codehub.cn/enterprise/20200727144122.png)

如果没有安装，可通过 `Homebrew` 工具安装，命令如下

```shell
brew instll maven
```

#### GWT SDK

可以通过 `Homebrew` 工具或者下载 GWT SDK 压缩包安装。写作本文时，GWT 最新稳定版本是 2.8.2。你可以通过 `homebrew` 或 `手动安装` 两种方式进行安装。

**1. Homebrew 安装**

```shell
brew install gwt
```
默认安装路径为

![](https://help-assets.codehub.cn/enterprise/20200727144137.png)

**2. 手动安装**

为方便大家下载，已将官网 GWT SDK 2.8.2 版本压缩包上传到制品库，可通过如下方式下载：

```shell
curl -L "https://coding-public-generic.pkg.coding.net/demo-gwt/generic/gwt.zip?version=2.8.2" -o gwt-2.8.2.zip
```

下载后的压缩包解压到任意目录（如 /home/user/gwt-2.8.2），并配置到 `PATH` 环境变量，如下所示

```shell
PATH=$PATH:/home/user/gwt-2.8.2/
export PATH
```

以上任一方式安装后，可执行如下命令测试是否安装成功

```shell
webAppCreator
```

输出结果如下：

![](https://help-assets.codehub.cn/enterprise/20200727144155.png)

### [使用 Intellij IDEA 创建 GWT 应用](#create-gwt)

IDEA 默认支持创建 GWT 应用，本文使用命令行工具创建项目，不依赖具体 IDE，通过 IDE 创建 GWT 应用的方式可参见 [Intellij IDEA](https://www.jetbrains.com/help/idea/enabling-gwt-support.html) 相关介绍。

#### [步骤一：创建 GWT 应用](#1)

使用命令行工具创建 GWT Maven 项目

```shell
webAppCreator -out hello -templates maven,sample,readme com.demo.gwt.HelloWorld
```

![](https://help-assets.codehub.cn/enterprise/20200727144212.png)

在 IDEA 中打开上面创建的项目，依次点击：

```shell
File --> Open --> hello（项目名）
```

![](https://help-assets.codehub.cn/enterprise/20200727144228.png)

打开后可以看到项目目录结构：

![](https://help-assets.codehub.cn/enterprise/20200727144245.png)

#### [步骤二：运行 GWT 应用](#2)

GWT 项目文件主要由四部分组成（见下表），可以根据自己的需要修改，为避免增加复杂度，这里不做修改。

内容   | 说明         | 位置
:-------: | :-------: | :--------:
模块描述符| 用于配置 GWT 应用，XML 格式 | src/main/java/com/demo/gwt/HelloWorld.gwt.xml
公共资源 | GWT 模块引用的文件，如 HTML 页面、CSS 样式或图像 | src/main/webapp 
客户端代码 | 实现应用程序业务逻辑的 Java 代码，GWT 编译器将其转换为 JavaScript，最终在浏览器中运行 | src/main/java/com/demo/gwt/client
服务端代码 | 可选的，如果应用不需要服务端处理，不用提供 | src/main/java/com/demo/gwt/server

在 IDEA 菜单栏中选择编辑配置，打开运行配置弹窗，添加 GWT 配置。

![](https://help-assets.codehub.cn/enterprise/20200727144304.png)

修改配置名，选择 HelloWorld 模块，然后点击 OK 保存配置并退出弹窗。

![](https://help-assets.codehub.cn/enterprise/20200727144317.png)

选择上面创建的 GWT 运行配置，单击运行，IDEA 会自动打开浏览器，运行应用。

![](https://help-assets.codehub.cn/enterprise/20200727144336.png)

#### [步骤三：利用持续集成进行自动构建、测试、发布](#3)

在已创建的项目中新建代码仓库，你可以通过导入示例代码或手动上传代码，将 GWT 应用代码上传至项目中的代码仓库中。

**1. 上传示例代码**

在新建代码仓库时选择「导入外部仓库」，粘贴[示例仓库](https://coding-public.coding.net/public/python-flask-demo/python-flask-demo/git/files)中的代码地址。

![](https://help-assets.codehub.cn/enterprise/20211118162845.png)

**2. 手动上传代码**

参考[本文](https://help.coding.net/docs/repo/start.html#git-add)，使用 Git 命令将上文中创建的 GWT 应用代码上传至 CODING 代码仓库中。

接下来前往「持续集成」新建构建计划，点击右侧新建构建计划按钮。可根据自己需要选择合适模板，此处选择 `自定义构建过程`。

![](https://help-assets.codehub.cn/enterprise/20211118163827.png)

在「基础信息」中的代码源选择已上传的应用。

![](https://help-assets.codehub.cn/enterprise/20211118165455.png)

参考以下配置，在「流程配置」中修改静态 Jenkinsfile 配置。

```groovy
def ARTIFACT_ID = ""
def VERSION = ""
pipeline {
  agent any

  stages {
    stage('检出') {
      steps {
        checkout([
          $class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]],
          userRemoteConfigs: [[
            url: env.GIT_REPO_URL,
            credentialsId: env.CREDENTIALS_ID
          ]]
        ])

        script {
            def pom = readMavenPom()
            ARTIFACT_ID = pom.getArtifactId()
            VERSION = pom.getVersion()
        }
      }
    }

    stage('构建') {
      steps {
        sh 'mvn package'

        archiveArtifacts(artifacts: "target/${ARTIFACT_ID}-${VERSION}.war", fingerprint: true)
      }
    }

    stage('测试') {
      steps {
        sh 'mvn gwt:test'
      }
    }

    stage('发布到 generic 制品库') {
      steps {
        codingArtifactsGeneric(
            files: "${ARTIFACT_ID}-${VERSION}.war",
            repoName: "${env.GENERIC_REPO_NAME}",
            version: "${VERSION}",
            workspace: "/root/workspace/target"
        )
      }
    }
  }
}
```

需要按照实际制品仓库的情况修改 `GENERIC_REPO_NAME` 与 `VERSION` 参数。你还可以在「触发规则」中配置自动触发持续集成任务的条件。配置完成后，点击立即构建。

![](https://help-assets.codehub.cn/enterprise/20211118171933.png)

你可以在构建过程中查看各个环节的运行情况。构建完成后，打开 `制品库` 页面还可以看到已发布的制品文件。

![](https://help-assets.codehub.cn/enterprise/20211118172113.png)

### [总结](#end)

在本次教程中，我们创建了简单的 GWT 应用，熟悉了 GWT 项目结构及其命令行工具的使用，而且借助 CODING 持续集成实现了应用的自动构建、测试和发布。

==== 2021/11/18 ====
