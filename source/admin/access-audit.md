---
title: 访问审计 - CODING 帮助中心
pageTitle: 访问审计
pagePrevTitle: 服务集成——绑定 TCTP
pagePrev: admin/service-integration/tctp.html
pageNextTitle: 登录设置
pageNext: admin/login.html
alias: 
-   agile-development/dashboard.html
-   pro/access-audit.html
---

> 此功能为高级版付费功能，欢迎前往[价格页](https://coding.net/pricing)进行服务订购。

「访问审计」功能支持自动将部分内容判定为敏感内容，并记录这部分内容的访问日志；同时团队管理者和拥有对应权限的团队成员可以对重要内容再次进行手动标记，例如记录公司重要运营数据的 Wiki 文档、重大项目竞标方案、产品原型图、团队 OKR 等内容，以便于在「敏感内容」列表内进行快速追踪与管理，帮助团队预判可能的信息泄漏来源，及时规避信息泄漏风险，提高团队信息安全等级。

点击团队首页右上角的齿轮图标 <img src ="https://help-assets.codehub.cn/enterprise/20210928153255.png" style ="margin:0"> 进入团队设置中心，点击「安全性」→「访问审计」进入设置界面。

![](https://help-assets.codehub.cn/enterprise/20210930160001.png)

### [标记敏感内容](#mark)

「访问审计」支持手动标记下列敏感内容：
-   单篇 Wiki 文档；
-   网盘内的单个文件；
-   项目协同内的单个需求或单个任务。

根据团队数字化资产管理需求，团队管理者和拥有对应权限的团队成员通过 Wiki 目录或文档详情页、文件列表或者文件详情页、事项详情页的 ··· 选项，在下拉菜单中选择「标记为敏感内容」，即可将该内容标记为「敏感内容」。可在「访问审计」右侧随时查阅标记操作详情。

![](https://help-assets.codehub.cn/enterprise/20210930161333.png)

> ⚠️ 只能对单独的文件/事项进行敏感内容标记，无法批量操作，标记父文档不会影响子文档；移动被标记的 Wiki 文档或文件不改变其本身的敏感标记属性，复制 Wiki 文档和文件不会复制其敏感标记属性。

### [查看敏感内容](#view)

已标记内容可在「敏感内容」内快速查看，支持单个或批量取消标记；访问详情则记录了查看过该文件的所有用户、操作时间及 IP 地址等信息。

![](https://help-assets.codehub.cn/enterprise/20210930162521.png)

### [访问日志](#access-log)

「访问日志」自动记录以下所有敏感内容，可以在筛选器中根据需求选择查看「敏感内容」或「全部日志」、特定的内容类型、访问者及操作时间：
-   Wiki 文档：每篇 Wiki 的访问信息；
-   文件：文件网盘内每个文件的访问信息，统计可预览类型的文件；
-   事项：包含待规划列表、迭代列表、全部事项列表、史诗列表、需求列表、任务的访问信息，以及需求详情和任务详情；
-   团队：团队成员信息被访问时的信息。

![](https://help-assets.codehub.cn/enterprise/20210930162419.png)

==== 2021/08/23 ====