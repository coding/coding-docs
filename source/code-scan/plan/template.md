---
title: 扫描方案模板 - CODING 帮助中心
pageTitle: 扫描方案模板
pagePrevTitle: 集成外部扫描工具
pagePrev: code-scan/plan/tools.html
pageNextTitle: 自动匹配语言
pageNext: code-scan/plan/auto-match.html
---

### [功能介绍](#intro)

扫描方案模板是团队全局功能，模板能够集成常用的扫描规则、度量规则实现跨项目引用。一次配置，全局复用。为便于使用，我们基于常见语言内置了推荐模板，你可以选择直接调用系统内置的方案模板或配合自定义规则进行使用。

扫描方案归属团队级权限。团队管理员需点击团队首页右上角的齿轮图标 <img src ="https://help-assets.codehub.cn/enterprise/20210928153255.png" style ="margin:0"> 进入团队设置中心，前往「组织与成员」→「权限配置」为成员所在的用户组开启相应的权限。

![](https://help-assets.codehub.cn/enterprise/20211011111512.png)

权限确认开启后，在团队设置中心选择「功能设置」→「代码扫描」→「方案模板」进入模板设置页。

![](https://help-assets.codehub.cn/enterprise/20211014112332.png)

### [编辑模板](#edit)

模板分为系统模板与自定义模板两种类型，系统模板基于特定开发语言编写，适合由单一语言组成的项目。自定义模板除了能够混用多种开发语言外，还支持编辑度量规则、过滤路径等。

你可以通过自定义模板按照实际勾选适合项目的多种规则包。

![](https://help-assets.codehub.cn/enterprise/20210809140936.png)

#### [编译配置](#compile)

部分规则包需借助编译过程的中间产物来追踪更深层次的缺陷，若您在扫描规则中选用了这部分规则，需要输入编译配置编译项目代码，以确保正常运行扫描任务。

> ⚠️ 当前仅有 Java 语言含有编译型规则，所以在编译配置中仅内置了 Java 语言相关编译环境，其他语言无需进行编译配置。

鉴于扫描方案模板会用于不同项目的代码仓库中，有可能存在各仓库间编译命令不一致问题。你可以在代码仓库中加入编译脚本文件，并在设置扫描方案模板时调用该脚本文件，例如在代码仓库中加入 `build.sh` 文件后，在方案的编译配置处输入编译命令： `chmod +x build.sh`。

![](https://help-assets.codehub.cn/enterprise/20210809143554.png)

#### [度量规则](#measure)

在度量规则中，你可以根据团队实际的质量标准自行设定代码质量的评判标准，例如指定圈复杂度超标方法的标准，衡量重复代码的标准等。

![](https://help-assets.codehub.cn/enterprise/20211011111953.png)

#### [过滤配置](#filter)

此功能用于设定扫描任务中的代码仓库范围，路径过滤规则如下：

include（包含） 表示只扫描，例如只需要扫描 `src/` 目录下文件，可以在目标路径中输入 `src/*`。
exclude（过滤） 表示只屏蔽，如果要屏蔽 `src/lib/` 目录下的文件，可以在目标路径中输入 `src/lib/*`，这样将会跳过该目录下的文件。

> ⚠️ exclude 选项的优先级高于 include 。若路径重叠，将会执行 exclude（过滤）策略。

![](https://help-assets.codehub.cn/enterprise/20210809152736.png)

### [方案实例](#cases)

模板编辑完成后，若希望快速应用至项目中的扫描任务，可以在方案实例中勾选对应的扫描任务并快速进行同步。

![](https://help-assets.codehub.cn/enterprise/20210809154116.png)

### [使用扫描方案模板](#using)

你可以使用手动创建、代码仓库中创建、持续集成中创建三种方式使用扫描方案模板。

#### [手动创建](#manual)

点击项目内产品栏左侧的「扫描任务」，勾选从模板中生成扫描方案。

![](https://help-assets.codehub.cn/enterprise/20210809155112.png)

你也可以在扫描方案中通过模板进行创建。

![](https://help-assets.codehub.cn/enterprise/20210818104353.png)

#### [在代码仓库中创建](#repo)

创建代码仓库时打开代码扫描按钮，勾选从模板中生成。

![](https://help-assets.codehub.cn/enterprise/20210818104314.png)

#### [在持续集成中创建](#ci)

持续集成阶段中支持添加代码扫描插件，勾选其中的「通过模板创建」后即可在构建计划中进行使用。

![](https://help-assets.codehub.cn/enterprise/20210817201027.png)

==== 2021/08/17 ====
