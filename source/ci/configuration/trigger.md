---
title: 触发规则 - CODING 帮助中心
pageTitle: 触发规则
pagePrevTitle: 图形化编辑器
pagePrev: ci/process/visual-editor.html
pageNextTitle: 环境变量
pageNext: ci/configuration/env.html
alias: 
-   devops/ci/trigger.html
-   ci/trigger.html
---

### [功能介绍](#intro)

在持续集成计划的配置过程中，您可以按需设置构建计划运行的触发规则，触发规则中包含了构建计划运行的频率与触发的条件。每一个持续集成的构建计划，都会支持以下几种触发方式：

-   手动触发
-   代码变更触发
-   定时触发
-   API 触发

上述的多种触发方式可以同时使用。

### [手动触发](#manually)

您可以主动触发一个构建计划，手动触发时，可输入对应的构建参数，构建参数将以环境变量的形式加入到构建环境中。

在构建计划页面，点击【立即构建】，在弹框中按需选择构建目标（标签、分支、修订版本），输入需要的构建参数完成触发构建。

![](https://help-assets.codehub.cn/enterprise/20200925110908.png)

### [代码变更触发](#code-changed)

配置了代码变更触发的构建计划，会自动监听本构建计划中所选择的代码仓库，根据其变化来自动触发构建计划。

![](https://help-assets.codehub.cn/enterprise/20200211111213.png)

#### [代码更新](#push)

-   推送到 <分支> 时触发构建

    只有指定的分支更新代码时，才触发构建

-   推送新标签时触发构建

    只有创建了新的 git tag ，才会触发构建

-   推送到分支时触发构建

    任意分支更新都会触发构建

-   符合分支或标签规则时构建

    支持正则匹配 ref 全称或者简称：

    1、如 refs/heads/master 和 master 都能匹配 master 分支触发；

    2、如希望 master 和 dev 更新时才触发构建可使用： ^refs/heads/(master|dev)。

#### [合并请求](#merge-request)

目前合并请求会在以下几种情况下执行构建：

-   发起合并请求时触发
-   合并请求的源分支发生变更
-   合并请求的目标分支发生变更
-   归并合并请求时触发

>**合并请求执行**与**代码更新时执行**的不同之处在于，合并请求构建会构建**源分支与目标分支合并后的结果**，可以尽早发现集成中的错误。

![](https://help-assets.codehub.cn/enterprise/20200925111056.png)

#### [自动取消相同构建](#auto-cancel)

您可以在设置中勾选是否取消「自动取消相同版本号」以及「自动取消相同合并请求」所触发的构建（仅保留最新一个）。

![](https://help-assets.codehub.cn/enterprise/20200925142626.png)

#### [GitLab 私有云](#gitlab)

[绑定 GitLab 私有云](/docs/admin/service-integration/gitlab.html)时，会自动创建 GitLab Webhook，后续事件自动通知 CODING，然后匹配上述触发规则设置。 

![](https://help-assets.codehub.cn/enterprise/20210818202005.png)

### [定时触发](#scheduled)

通过给构建计划添加定时触发配置，您可以周期性或在某个具体的时间点，自动触发一个构建计划，产生一个具体的构建任务。
您可以为一个构建计划添加多个定时触发，没有前后优先级之分，多个定时触发有时间重合的，依然会触发多次构建。

![](https://help-assets.codehub.cn/enterprise/20200212105135.png)

-   触发条件：代码无变化时不重复触发定时任务

    若选中分支代码与上次触发对比无变化，即使到达触发时间，也不会触发构建。

-   日期选择

    您可以选择选择一周内的多个日期。

-   周期触发

    您可以选定 00:00 -   24:00 之间的任意时间为周期（精确到小时），按照选中的间隔触发任务。

-   单次触发

    您可以在 00:00 -   24:00 之间选择任意时间为触发时间点（精确到分钟）。

### [API 触发](#api)

在使用此项功能之前，请确保您已经在【项目设置】->【开发者选项】->【项目令牌】->【新建令牌】中生成了具备持续集成 API 触发权限的令牌。

![](https://help-assets.codehub.cn/enterprise/20200331103821.png)

生成具备相应权限的令牌后便能够调用构建计划中的 API 触发接口。点击生成 curl 命令触发示例后即可生成相应的调用命令。

![](https://help-assets.codehub.cn/enterprise/20200331110728.png)

#### [API 说明](#api-detail)

项目令牌调用 CODING 持续集成 API 时所使用的认证方式为`Basic Auth`，下面是关于 API 接口的详细信息和相关参数。

##### 触发构建任务

```json
POST https://< TEAM_GK >.coding.net/api/cci/job/< JOB_ID >/trigger
```

##### 请求 body

```json
{
  "ref": "master",
  "envs": [
    {
      "name": "my-params-1",
      "value": "hello",
      "sensitive": 1
    },
    {
      "name": "my-params-2",
      "value": "world",
      "sensitive": 0
    }
  ]
}
```

##### 返回 body

```json
{
  "code": 0
}
```

##### 参数说明

|  参数名字 | 参数位置  | 是否必填  | 类型  | 默认值  | 说明
|---|---|---|---|---| ---
|  ref |  body |   否 |   string | master  | 构建目标的 ref （ `commit sha` / `tag` / `branch` ），若构建计划不使用代码仓库可以忽略
|  envs |  body |   否 |   env[] | -    | 构建计划的启动参数

**envItem**

|  参数名字 | 参数位置  | 是否必填  | 类型  | 默认值  | 说明
|---|---|---|---|---| ---
|  name |  envItem.name |   是 |   string | master  | 构建计划的启动参数的名称
|  value |  envItem.value |   否 |   string | -    | 构建计划的启动值
|  sensitive |  envItem.sensitive |   否 |   number | 0  | 是否将启动参数设置为保密,设置保密后日志中不可见。 1 为保密，0 为明文

==== 2021/08/24 ====
