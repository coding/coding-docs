---
title: 自动构建安卓应用 -   CODING 帮助中心
pageTitle: 自动构建安卓应用
pagePrevTitle: Ruby + Sinatra 构建应用
pagePrev: ci/practice/quick/ruby-sinatra.html
pageNextTitle: React + 腾讯云 COS 完成上传部署
pageNext: ci/practice/quick/react-cos.html
alias: best-practices/ci/1minute/java-android.html
---

一个完整的 Android APP 生命周期包括开发、测试、签名、发布等过程。如何通过工程化方法快速迭代项目，相信是每一位 Android 开发者会遇到的问题。

本文将演示如何实现 Java - Android 项目进行自动化编译构建 / 签名 / 上传到 Generic 制品库进行发布这一完整过程。

### [前置准备](#prerequisite)

-   Git
-   Java
-   Gradle
-   Android SDK 
-   [CODING 项目](/docs/start/project.html)
-   [示例项目](https://straybirds.coding.net/public/demo/java-android-example/git/files)

### [手动构建](#manual-init)

> 此部分内容将通过手动在本地编译、签名等过程，描述 .apk 文件的开发路径。若你已熟悉此流程，请直接阅读[自动化构建](#auto-compile)。

将示例项目中的代码仓库[导入](/docs/repo/manage/sync-relate.html)至 CODING 项目中的代码仓库中。进行手动构建时推荐使用 [Android Studio](https://developer.android.com/studio) 编辑器进行开发。

#### [编译构建](#compile-build)

示例仓库根目录下的 `build.gradle` 文件含有项目所包含的依赖，以及依赖拉取的来源。使用 Android Studio 打开项目，在根目录下调出终端，输入 `./gradlew test` 命令进行测试。

执行 `./gradlew assembleRelease` 命令即可开始编译输出未签名的 apk 文件，更多的用法可参见[Android 开发者官方网站](https://developer.android.com/studio/build/building-cmdline)。

#### [APK 签名](#apk-sign)

对 APK 文件进行签名将拥有以下优势：

-   **应用升级**：当安装应用的更新时，系统会比较新版本和现有版本中的证书。如果证书匹配，则系统允许更新。如果使用不同的证书为新版本签名，您必须为应用分配另一个软件包名称。在此情况下，用户会将新版本作为全新应用进行安装。
-   **应用模块化**：Android 允许通过同一证书签名的多个 APK 在同一个进程中运行（如果应用请求这样做），以便系统将其视为单个应用。这样一来，您便可以按模块部署您的应用，并且用户可以独立更新每个模块。
-   **通过权限共享代码/数据**：Android 提供了基于签名的权限执行机制，以便一个应用可以将功能提供给使用指定证书签名的另一个应用。通过使用同一个证书为多个 APK 签名并使用基于签名的权限检查功能，您的应用可以采用安全的方式共享代码和数据。

在开始对文件签名前，需确保本地有 java 环境。在终端中运行 keytool 生成 Android 签名证书。例如：

`keytool -genkeypair -alias android.test -keyalg RSA -validity 36500 -keystore java-android.p12 -storetype pkcs12`

其中 android.test 是证书的别名，将在后续过程中进行复用。运行命令后按照提示输入证书的密码等信息：

![](https://help-assets.codehub.cn/enterprise/20200928170159.png)

最终会在当前文件夹下面生成名为 `java-android.p12` 的证书文件。使用 Android Studio 进行签名非常快捷，阅读[《使用 Android Studio 对应用进行签名》](https://developer.android.com/studio/publish/app-signing?hl=zh-cn#sign-apk)了解更多。

#### [管理构建物](#artifacts)

对发布物的管理与版本控制将会有助于应用的持续迭代。CODING Generic 类型制品库提供自定义的 Tag 作为版本标签，可以对 APK 文件进行管理和版本追溯。

1.  创建 Generic 类型制品库

![](https://help-assets.codehub.cn/enterprise/20211207111803.png)

2.  将 APK 文件进行拖拽上传

3.  查看版本列表管理历史版本

![](https://help-assets.codehub.cn/enterprise/20200928170456.png)

### [自动化构建](#auto-compile)

手动进行编译、签名与上传 APK 文件至制品仓库本质上都是重复劳作。能否通过自动化工具实现代码更新后就获取最新的制品版本呢？答案是肯定的，下文将介绍如何使用持续集成代替人工执行这些重复操作。

#### [录入证书](#import-certificate)

在开始配置持续集成前，需要将 APK 签名上传至项目中。若通过在团队内明文共享安全证书，存在效率与安全问题。将证书以凭据的方式录入后，通过调用公开的凭据 ID 即可使用证书。

路径：「项目设置」→「开发者选项」→「凭据管理」→「Android 签名证书」，录入后同时还需勾选需授权的持续集成计划。

![](https://help-assets.codehub.cn/enterprise/20211207113622.png)

#### [配置持续集成](#deploy-ci)

点击项目左侧菜单栏的「持续集成」，轻点右上角的创建构建计划按钮。选择「Java-Android 编译并签名 APK」模板。

![](https://help-assets.codehub.cn/enterprise/20211207145812.png)

代码仓库选择已导入至项目中的代码仓库，APK 签名证书选择在上文中录入的凭据。点击立即构建后，持续集成将自动进行编译构建、签名、将构建物上传至 Generic 制品库。你可以在构建过程中查看各项步骤的执行情况。

![](https://help-assets.codehub.cn/enterprise/20211207143919.png)

你还可以在持续集成设置中的触发规则中勾选「代码源触发」或其他自动触发条件，以实现在推送代码时自动触发持续集成任务，完成应用构建。

![](https://help-assets.codehub.cn/enterprise/20211207144211.png)

### [总结](#conclude)

至此，我们已经将整个 Android 开发流程中重要的操作步骤完全自动化流水线化，这极大地简化了人工操作，让开发者能更好的从繁琐的开发流程中脱离出来，专注于代码功能的迭代研发。

==== 2021/12/07 ====
