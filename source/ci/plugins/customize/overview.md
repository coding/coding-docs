---
title: 产品简介 - CODING 帮助中心
pageTitle: 产品简介
pagePrevTitle: 推送到 CODING Docker 制品仓库
pagePrev: ci/plugins/cci-push-docker.html
pageNextTitle: 开发指引
pageNext: ci/plugins/customize/develop.html
alias: devops/ci/plugins/api-doc.html
---

实际的研发过程中，各团队所需要的插件能力各异，自定义团队插件功能能够让成员编写并发布插件。将内部得心应手的工具或命令封装成「自定义插件」，方便团队内其他项目与成员快速复用。

<!--编写好的插件还能够开源至插件市场，在帮助他人的同时也能提升自身的技术影响力；还可以在插件市场学习与使用他人发布的插件，无形中节省反复造轮子所耗费的时间精力。-->

![](https://help-assets.codehub.cn/enterprise/20211014104106.png)

### [基础使用](#basic)

团队首页右上角的齿轮图标 <img src ="https://help-assets.codehub.cn/enterprise/20210928153255.png" style ="margin:0"> 进入团队设置中心，轻点「功能设置」→「构建插件」，你可以在此处看到官方插件、团队插件与个人提交但未公开的插件。在插件详情中查看名称、描述与版本号。

![](https://help-assets.codehub.cn/enterprise/20211014103947.png)

你可以通过流水线编排界面或编译命令行两种方式使用插件功能。

**图形化编辑器**

在阶段内添加步骤时选择是否启用官方插件或团队自定义插件。

![](https://help-assets.codehub.cn/enterprise/20210629103457.gif)

**文本编辑器**

支持使用命令行的方式直接编辑 Jenkinsfile，参考语句示例如下：

```groovy
useCustomStepPlugin(key: 'exec_py_script', version: '1.0', params: [site_packages:'false',requirements:'false'])

// key 为 插件的 ID，version 为版本号（默认使用最新版本，随插件升级而自动升级），params 为当前插件所需要填写的参数。
```

### [插件开发](#toolkit)

插件开发并不限制语言与环境，仅需满足声明文件的规范要求即可上传至 CODING，通过校验后就能在持续集成任务中使用，点击了解[开发指引](/docs/ci/plugins/customize/develop.html)。

若你希望更高效的进行插件开发，系统亦提供了一套便利的开发工具 `qci-plugin`，点击[了解详情](/docs/ci/plugins/customize/qci-plugin.html)。

### [插件上传](#upload)

插件开发不限制语言，但需保证插件逻辑能够以命令行的方式运行，并且 CI 任务的构建环境需具备插件的运行环境，点击了解如何配置[构建环境](/docs/ci/ways.html)。

开发完成后，遵循声明格式编写插件的描述文件，打包插件代码后以 ZIP 包形式上传至 CODING。当声明文件通过检查并进行二次确认发布后，当前插件将以私有插件的状态进入可选列表，在流水线编排时仅作者才能添加与使用。

![](https://help-assets.codehub.cn/enterprise/20210629152804.png)

在实际的构建计划中完成调试后，作者可以将此插件标记成公开，此时团队内其他成员也将可以看到并使用此插件。

![](https://help-assets.codehub.cn/enterprise/20210629153025.png)

==== 2021/07/07 ====
