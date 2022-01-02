---
title: 将 React 项目发布至腾讯云 COS - CODING 帮助中心
pageTitle: 将 React 项目发布至腾讯云 COS
pagePrevTitle: Java + Android 构建应用
pagePrev: ci/practice/quick/java-android.html
pageNextTitle: Vue + 腾讯云 COS 完成上传部署
pageNext: ci/practice/quick/vue-cos.html
alias: best-practices/ci/1minute/react-cos.html
---

随着 Web 应用的发展，运行在浏览器端的 Web 应用能够承担更多且更复杂的业务交互需求，催生了诸如 React 与 Vue 等单页应用框架。虽然这些框架的出现简化了开发流程，但也仅优化了前端工程师的个人开发体验。完成业务代码编写后，仍需进行部署与发布处理。能否通过自动化任务一次性完成代码检出和应用部署工作呢？

本文将介绍如何使用 CODING 持续集成实现将 React 框架 Web 应用自动发布至腾讯云 COS （对象存储）服务。

> COS 对象存储常用于管理网站中所需的 html、css、js 文件、图片与视频等静态资源。

### [前置准备](#prerequisite)

-   Git
-   node 8.16.0 or version>= 10.16.0
-   [CODING 项目](/docs/start/project.html)
-   [腾讯云 COS 存储桶](https://console.cloud.tencent.com/cos5)

<!-- 
### 创建你的 React 项目并推送到仓库

推荐使用 `create-react-app` 脚手架搭建，它集成了**本地开发**、**单元测试** 和 **Webpack 构建**功能，并且初始化了 **git 基本配置**，简化了 React 开发流程。

```sh
npm i -g create-react app
```

```sh
create-react-app my-react-app
```

安装成功后，进入`my-react-app`目录下，执行关联远程仓库命令并推送代码。

```sh
git remote add origin https://e.coding.net/coding-publilc/my-react-app.git
```

```sh
git push -u origin master
```
-->

### [配置构建计划](#deploy-ci)

进入项目后，进入左侧菜单栏的「持续集成」功能，点击右上角的「创建构建计划」并选择 React + COS 模板。

![](https://help-assets.codehub.cn/enterprise/20211210171310.png)

自定义构建计划名称、选择示例代码。

![](https://help-assets.codehub.cn/enterprise/20211210171716.png)

### [上传到 COS Bucket](#cos-bucket)

此步骤需要将腾讯云 COS 服务填写至构建过程中的四个环境变量中：

`COS_SECRET_ID` - 腾讯云访问密钥 **SecretId**

`COS_SECRET_KEY` - 腾讯云访问密钥 **SecretKey**

`COS_BUCKET_NAME` - 腾讯云 COS 存储桶名称

`COS_BUCKET_REGION` - 腾讯云 COS 存储桶地区

#### [获取访问密钥](#cam)

前往[访问管理](https://console.cloud.tencent.com/cam/overview)中的「访问密钥」→「API 密钥管理」获取相应的密钥 SecretId 与 SecretKey。

![](https://help-assets.codehub.cn/enterprise/20211210173558.png)

> 将密钥填写至构建过程中将自动隐藏加密，保障数据安全。

#### [获取 COS 基本信息](#basic-info)

前往[存储桶列表](https://console.cloud.tencent.com/cos5/bucket)，点击目标存储桶的概览获取名称与地区信息。

![](https://help-assets.codehub.cn/enterprise/20211210174229.png)

> 若访问权限不具备公有读权限有可能影响发布结果。

填写完成后，点击「确定」按钮触发构建流程。

### [查看构建成果](#view-result)

触发构建后，在「构建过程」中可以看到构建的完整日志。

![](https://help-assets.codehub.cn/enterprise/20211210175604.png)

点击「上传到 COS Bucket」阶段中最后一个「打印消息」处的 COS 地址，即可跳转到构建完毕的 React Web 应用。

![](https://help-assets.codehub.cn/enterprise/20211210180325.png)

一个全新的 React demo 页面已构建完成。

![](https://help-assets.codehub.cn/enterprise/20211216111844.png)

### [配置 CDN 加速](#cdn)

> 此步骤为可选步骤。

CDN 服务常用于静态网站加速，能够提升网站的访问速度。点击前往 COS 存储桶中的「域名与传输管理」→「默认 CDN 加速域名」，开启默认 CDN 加速域名。

![](https://help-assets.codehub.cn/enterprise/20211210180918.png)

保持默认选项即可。由于我们配置了公有读的存储桶，无需回源鉴权。配置完成后等待部署完成，即可获得 CDN 加速效果。

### [配置触发规则](#triggle-rule)

持续集成支持多种触发方式，例如代码源触发、定时触发、API 触发及手动触发。其中代码源触发又可配置为推送到指定分支或标签触发，触发方式多样，可满足绝大部分场景需要。前往「持续集成设置」→「触发规则」进行配置。

![](https://help-assets.codehub.cn/enterprise/20211210181532.png)

若勾选「代码源触发」，将自动监听符合规则的触发事件，例如 master 分支的代码更新，自动触发持续集成任务完成应用部署。

### [总结](#conclude)

至此，通过配置持续集成任务，已实现自动化发布 Web 应用至腾讯云 COS 存储桶流程，提升了开发前端工程时的工作效率。

==== 2020/10/10 ====
