---
title: 自动发布 Electron 应用 - CODING 帮助中心
pageTitle: 自动发布 Electron 应用
pagePrevTitle: Java + GWT 构建 JavaScript 应用
pagePrev: ci/practice/quick/java-gwt.html
pageNextTitle: Java + Maven + Spring Boot 快速构建并验证代码
pageNext: ci/practice/quick/maven-spring-boot.html
alias: 
-   best-practices/ci/1minute/javascript-electron.html
-   ci/practice/quick/javascript-electron.html
---

> 一切能用 js 写的应用，最终都会用 js 来写。 -- stack overflow 联合创始人 Jeff Atwood

伴随着 web 开发生态蓬勃发展，原生桌面的开发生态日渐凋零。混合 web 技术栈与原生能力的 electron 应运而生，大量跨平台客户端采用了这一解决方案，“java 一次开发，随处运行” 终于得以实现。与原生 app 类似，electron 需要经历一个编译（将代码转换为可执行文件）的过程。使用 CODING 的持续集成，可以在代码更新时自动编译安装包，完成后还可以一键上传至制品仓库。不仅可以进行版本管理，还能够方便团队拉取制品后进行测试与部署。

与 web 开发不同，对于原生的可执行文件，需要经过操作系统的合法性验证才能安装。譬如分发至 macOS 的应用程序，只能在 macOS 下进行签名，而分发至 Windows 平台应用程序则无此限制。由此考虑，选择在 macOS 平台中编译两个平台的效率更高。

### [环境准备](#front-ready)

本文涉及到 macOS 程序开发，因此需要将苹果电脑接入至自定义节点中，点击了解[如何接入](/docs/ci/node/customize.html#manual)。

*   node 环境
*   yarn 环境
-   [CODING 项目](/docs/start/project.html)
-   将[示例仓库](https://coding-public.coding.net/public/electron-ci-demo/electron-ci-demo/git/files)[导入](/docs/repo/manage/sync-relate.html)至 CODING 仓库
-   [CODING 制品库](/docs/artifacts/intro.html)

### [初始化仓库代码](#init)

示例仓库为 Electron 官方提供的一系列的脚手架及 CLI 工具，拉取至本地。

![](https://help-assets.codehub.cn/enterprise/20211123135218.png)

### [手动编译与制品上传](#manual)

一般软件工程的开发流程为：开发 -> 部署 -> 测试。由于原生应用给到测试团队的不能像 web 一样仅仅是一个链接，因此我们需要把打包好的安装包或其他交付物以制品的形式交付给测试部门。当开发人员将制品上传至制品仓库后，由测试人员下载最新版本即可。

切换至示例项目的根目录，使用 `yarn install` 命令自动安装相关依赖。

![](https://help-assets.codehub.cn/enterprise/20211123145044.png)

示例项目中的 `package.json` 命令已定义了构建命令，因此仅需运行 `yarn dist` 命令即可编译出 Windows 和 Mac 平台的安装包。文件夹中的 `.dmg(macOS)` 及 `.exe(windows)` 文件是最终需要部署的安装包。将构建出来的安装包拖拽上传至团队 [Generic 类型制品库](/docs/artifacts/quick-start/generic.html)中以方便测试及产品验收。

![](https://help-assets.codehub.cn/enterprise/20211123154303.png)

至此已成功在本地中构建了交付物，并且已上传至制品仓库中。但如果对交付物内容进行二次开发修改，进行手动构建过程并将构建物再次上传至制品仓库未免显得过于繁琐，不能够满足敏捷研发的需要。如果能够在将 commit 推送至代码仓库时就能够自动构建，并且还能够自动将交付物部署至制品仓库，那么可以解放开发的部分劳动，并实现构建内容的回退及追溯功能。

### [使用持续集成](#using-ci)

使用 CODING 持续集成，可以帮助我们很好的自动化这些重复的工作。我们需要做的只是编写好一次编译、测试脚本，或者 Jenkinsfile，那么之后我们只需要提交代码至远端，即可自动触发构建，并及时编译、测试。如果在期间发现代码有问题，持续集成还能及时通过多种形式通知到你，让你及时发现错误、改正错误，而不是等待项目正式上线后才发现问题。

创建新的构建计划，选择「自定义构建过程」，代码仓库选择已导入的[示例仓库](https://e.coding.net/coding-public/electron-ci-demo.git)。

![](https://help-assets.codehub.cn/enterprise/20211123160018.png)

勾选「前往配置详情」后，点击确定进入「流程配置-文本编辑器」中。此时我们可以将手动操作过程转译为 Jenkinsfile，将制品的上传过程自动化。

![](https://help-assets.codehub.cn/enterprise/20200727145227.png)

填写 Jenkinsfile 后，在「触发规则」中还可以设定自动触发条件。

#### Jenkinsfile

你可以参考此配置并填写至配置详情中。

```groovy
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
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
          echo '构建中...'
          sh 'yarn'
          sh 'yarn dist'
          echo '构建完成.'
          sh 'mv ./dist/*.dmg build.dmg'
          sh 'mv ./dist/*.exe build.exe'
        }
      }
      stage('上传') {
        steps {
          codingArtifactsGeneric(files: '*.dmg', repoName: 'electron-build', credentialsId: '${env.CODING_ARTIFACTS_CREDENTIALS_ID}', withBuildProps: true, version: '${env.GIT_BUILD_REF}')
          codingArtifactsGeneric(files: '*.exe', repoName: 'electron-build', credentialsId: '${env.CODING_ARTIFACTS_CREDENTIALS_ID}', withBuildProps: true, version: '${env.GIT_BUILD_REF}')
        }
      }
    }
  }
  ```

### [配置构建节点](#ci-node)

因为 CODING 提供的构建云主机仅支持 Linux 系统，而此项目需要使用到 macOS 环境，因此需要将 macOS 作为自定义节点接入至节点池中。点击侧边栏持续集成中的构建节点选项，接入新节点。

![](https://help-assets.codehub.cn/enterprise/20211123164859.png)

在持续集成配置中选定自定义节点，开始构建。

![](https://help-assets.codehub.cn/enterprise/20211123165519.png)

我们可以看到，构建成功后制品库出现了两个以 build + commit hash 为名字的制品，这就是我们构建出来的安装包。

### [总结](#summarize)

通过持续集成，我们能够在修改代码的时候就能够触发持续集成任务，自动发布交付物。

==== 2021/11/23 ====
