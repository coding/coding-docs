---
title: 产品简介 - CODING 帮助中心
pageTitle: 产品简介
pageNextTitle: 基础操作
pageNext: artifacts/quick-start/basic.html
alias: 
-   devops/artifacts/manual.html
-   packages/manual.html
-   artifacts/manual.html
---

### 什么是制品

软件制品是指由源码编译打包生成的二进制文件，不同的开发语言对应着不同格式的二进制文件，这些文件通常可以直接运行在服务器上，用以支撑应用运行。


### 为什么需要制品仓库

当下不少研发组织依然使用着粗粒度的制品管理（比如搭建简易 FTP 来提供制品下载 ），甚至没有进行基本的制品管理体系。在这种粗放式的制品管理方式下，不同类型包的存储与获取是一件头疼的事情，版本追踪极其混乱，团队协作也是障碍重重。

将制品托管至 CODING 制品仓库，不仅可以进行版本控制，还可以与云上的代码仓库、持续集成、持续部署无缝衔接。接入制品仓库后，还支持使用制品扫描，及时检测可疑漏洞。制品生产流程具备标准化、可追溯能力，是现代化企业制品开发过程中的必备能力。

### 制品类型

CODING 制品库目前支持的制品类型详细如下：

-   [Generic File](/docs/artifacts/quick-start/generic.html) 指的是通用文件类型的制品。

-   [Docker](/docs/artifacts/quick-start/generic.html)

-   [Maven](/docs/artifacts/quick-start/generic.html)

-   [npm](/docs/artifacts/quick-start/generic.html)

-   [PyPI](/docs/artifacts/quick-start/generic.html)

-   [Helm](/docs/artifacts/quick-start/generic.html)

-   [Composer](/docs/artifacts/quick-start/generic.html)

-   [NuGet](/docs/artifacts/quick-start/generic.html)

-   [Conan](/docs/artifacts/quick-start/generic.html)


### 制品库层级关系

制品仓库的层级关系主要分为三层，依次为**仓库 > 包 > 版本**，每个层级描述如下：

-   **仓库**：用于管理不同类型的仓库和仓库下的包资源，可以设置仓库对外的访问权限。
-   **包**：构建产物对外提供访问的基础单元，用于介绍当前构建产物的用途和使用指引。
-   **版本**：列出某个包下的所有构建产物，详细记录了每次构建产物的版本迭代更新变化。

层级关系如图所示：

![](https://help-assets.codehub.cn/enterprise/20190606211819.png)

==== 2021/09/18 ====
