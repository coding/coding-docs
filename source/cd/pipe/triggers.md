---
title: 触发器配置 - CODING 帮助中心
pageTitle: 触发器配置
pagePrevTitle: 表达式
pagePrev: cd/pipe/expressions.html
pageNextTitle: 制品配置
pageNext: cd/pipe/artifacts.html 
---

### [功能介绍](#intro)

CODING 部署控制台支持多种自动触发条件，使之能够与 CODING 中的流水线相互匹配。目前支持 Docker 仓库触发器、TCR 个人版仓库触发器、TCR 企业版仓库触发器、Git 仓库触发器等触发条件。

![](https://help-assets.codehub.cn/enterprise/20210702162551.png)

> 若需使用 TCR 触发器，需提前在首页右上角 <img src ="https://help-assets.codehub.cn/enterprise/20210928153255.png" style ="margin:0">「设置中心」→「第三方应用」中绑定[腾讯云账号](/docs/admin/service-integration/cloud.html)。

### Docker 仓库触发

通过配置 Docker 仓库触发器，能够监听制品仓库下的更新情况。若有镜像更新，将自动触发 CD 的部署流程，点击了解如何搭建[自动化流水线](/docs/cd/workflow.html)。

![](https://help-assets.codehub.cn/enterprise/20210702163913.png)

### Git 仓库触发

支持 CODING 代码库、GitHub、GitLab 三种类型的 Git 仓库。

| 字段           | 说明                                                  |
| -------------- | ----------------------------------------------------- |
| 仓库类型       | 支持 CODING 代码库、GitHub、GitLab 三种类型的 git 仓库 |
| 项目           | 列出登录账号加入的所有项目                            |
| 仓库           | 列出项目下的所有代码仓库                              |
| 分支或标签规则 | 支持正则表达式，留空或`.*`表示不对分支或标签做限制    |

#### CODING 代码库

配置 cd-demo 项目下的 cd-demo 代码仓库作为触发器，分支或标签规则 release.* 表示所有以 release 开头命名的分支或 tag 才会触发部署流程执行。

![](https://help-assets.codehub.cn/enterprise/20210702164044.png)

#### Github

Github 代码库的支持需要提前在项目设置中关联代码库。

![](https://help-assets.codehub.cn/enterprise/20200414160130.gif)

关联完成后选择 GitHub 仓库类型。

![](https://help-assets.codehub.cn/enterprise/20210702164500.png)

#### GitLab

需要提前关联 GitLab 账号后在制品库中选择 GitLab 仓库类型。点击了解如何关联 [GitLab 账号](/docs/admin/service-integration/gitlab.html)。

![](https://help-assets.codehub.cn/enterprise/20210702170410.png)

#### Webhook 触发

选择 Webhook 触发，将生成全局唯一的 URL 触发地址，`Payload Constraints` 定义 `Payload` 请求内容必须提供的参数，支持正则表达式，留空或`.*`表示不对 Key 的 Value 值做限制。

Payload Constraints：如果需要使用特定内容的 payload 触发 Webhook，可以在 `Payload Constraints` 一栏添加 `key/value` 键值对，当部署流程收到 Webhook 请求时，将会 `payload` 内容进行校验，`value` 支持正则表达式。

![](https://help-assets.codehub.cn/enterprise/20210702170551.png)

**使用场景举例**：部署流程 Webhook 地址对公网开放，但只有提供认证凭据才能触发部署流程执行。

如下 `Payload` 请求会成功触发部署流程执行：

```shell
curl --location --request POST 'http://codingcorp.coding.com/api/cd/webhooks/webhook/ba2e9f00-6445-11ea-88b5-a9bc004f5e0f' \
--header 'Content-Type: application/json' \
--data-raw '{"secret": "faiM4&KqJTTuEy8J"}'
```

### 定时触发

例如天晚上 8 点触发部署流程：

![](https://help-assets.codehub.cn/enterprise/20210702170942.png)

==== 2021/07/02 ====
