---
title: 交银施罗德如何使用 CODING 探索企业发展新思路？ - CODING 帮助中心
pageTitle: 交银施罗德如何使用 CODING 探索企业发展新思路？
pagePrevTitle: 拉卡拉
pagePrev: cases/lakala.html
---

![](https://help-assets.codehub.cn/enterprise/20200812145447.png)

### 关于交银施罗德

交银施罗德成立于 2005 年 8 月 4 日，是中国第一批银行背景基金公司之一，也是众多中外合资基金公司中的佼佼者。由拥有百年历史的中国交通银行、二百年投资经验积累的施罗德投资管理有限公司、以及全球集装箱行业巨头中国国际海运集装箱（集团）股份有限公司共同携手，强强联合发起设立。

目前，公司旗下共管理着包括股票型基金、混合型基金、债券型基金、QDII 基金以及 ETF 基金等类型在内的超过 20 只公募基金产品。同时，作为国内专户理财业务的先驱者，公司在专户理财、投资咨询业务方面上也积极开拓业务，较为成功地管理着数只专户理财产品，有力地推动了公司业务的多元化发展。

### 面临的挑战

随着行业竞争加剧，互联网金融的快速发展，传统基金公司将面临更大的挑战。如何在兼顾服务稳定的同时进行快速的产品迭代与质量把控？交银施罗德决心从企业内部底层进行调整。通过优化代码库管理模式，提高项目管理效率，全面提升企业的综合实力，以更好地服务客户。

#### 研发管理流程不顺畅

交银施罗德目前拥有数百人规模的内部团队与外协团队，一个项目的协作需要在项目管理、任务分派、即时通讯等不同工具之间来回切换，这导致了内部、外部沟通成本居高不下，项目管理费时费力。随着业务的发展，代码量的增加，低效的研发管理流程已经制约了交银施罗德业务的迅猛发展势头。

#### 代码仓库代码量庞大

交银施罗德过去使用 SVN 的方式进行代码管理，由于软件代码量庞大，每次的日志查询、不同版本之间的代码比较和代码提交等操作都需要和服务器通信，造成响应速度缓慢；而在无法连接服务器的情况下，则直接无法工作；由于只有一个中心端服务器，一旦发生灾难性问题，那么所有数据都会丢失，所以需要经常做备份。

### 企业发展新思路

#### 优化代码仓库结构

经过了细致的评估分析，CODING 私有部署专门为交银施罗德实施高性能的 Git 仓库，从任务管理到代码审查，优化开发流程，同时整合了代码质量管理工具，可一站式完成代码管理及代码质量把控，项目及项目人员管理，大大提升了研发效率。

![](https://help-assets.codehub.cn/enterprise/20200812152431.png)

切换至 Git 后，交银施罗德的研发团队可以通过非线性的方式并行开发，无需进行额外的等待，最大限度的释放了开发团队的工作能力。允许成千上万个并行开发的分支，大大提高了版本更新的效率。

#### 引入持续集成

在重视产品发布效率的同时，交银施罗德也十分关注代码质量与版本稳定性。CODING 管理系统通过集成 Jenkins 实现持续集成，持续集成（CI）系统在分支合并阶段介入。当分支的开发人员完成代码编写并提交合并请求后，持续集成系统会自动对代码进行编译及自动化测试，帮助交银施罗德的研发团队实现自动测试和应用程序自动构建。

在代码审查方面，基于 Sonar 的代码质量审查功能，负责人可以对指定版本代码进行质量检查，并通过代码评审功能进行便捷快速的人工审查，分支代码符合质量要求后才允许合并，确保主干代码的整洁与质量。这一整套完整的代码评审流程，可以帮助交银施罗德研发团队及早发现潜在缺陷与 BUG，降低事故概率，通过制度设计来提升代码质量。

![](https://help-assets.codehub.cn/enterprise/20200812152845.png)

#### 追踪团队工作数据

除了对代码库的高效管理，代码的质量控制之外，交银施罗德开始优化企业的数字资产管理，对提高项目管理效率、提升系统交付速度、解放管理者的需求也愈发迫切。

数字资产是企业在日常运行过程中产生的无形数据资产，如任务内容、讨论过程、文档及 Wiki 等，以往只依靠 SVN + Jira 协同开发的模式无法做到信息的自动化流转，只能大量依靠人力督促任务的进行。现在交银施罗德有了一套整体化项目管理工具，实现了高效的全局管理。

CODING 针对软件开发团队定制了一站式研发流程管理工具，可以兼容项目管理与代码库管理。管理者不仅可以快速掌控全局，还能层层深入至单个具体任务，甚至精确至每行代码的细节，得以做出更加客观、准确及时的决策。CODING 成熟的解决方案助力交银施罗德构建安全、高效的分布式版本控制系统、展现清晰的全局项目管理视图；提升了研发效率，降低协作成本。

![](https://help-assets.codehub.cn/enterprise/20200812153250.png)

#### 云端工作站

除此之外，CODING 还为交银施罗德提供了一个永不间断的云端工作站——Cloud Studio，能够有效解决组织内存在多套开发环境时，解决搭建开发环境出现不一致的问题，极大地方便了交银施罗德研发团队在工作中进行各种语言的编程联系及测试。Cloud Studio 还提供了完整的 Linux 环境，并且支持自定义域名指向，动态计算资源调整，可以完成各种应用的开发编译与部署。

![](https://help-assets.codehub.cn/enterprise/20200812163438.png)

### 客户收益

交银施罗德通过部署 CODING 私有管理系统，在既有的研发体系和组织结构基础之上，建立了一个相对完整的软件研发全流程管理平台，高效整合了研发资源，显著提升了项目管理效率，保障了业务规模快速扩大下的代码质量，为理财、投资业务快速增⻓提供了可靠支撑，实践了企业发展新思路。


==== 2020/08/13 ====