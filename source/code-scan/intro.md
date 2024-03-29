---
title: 产品简介 - CODING 帮助中心
pageTitle: 产品简介
pageNextTitle: 快速入门
pageNext: code-scan/start.html
alias: 
-   host/codedog/start.html
-   host/code-scan/introduction.html
---

CODING 代码扫描能力可以通过分析代码仓库中的源代码，能够及时发现其中潜藏的代码缺陷、安全漏洞以及不规范代码；自动生成问题列表，附带修改建议，便于团队成员修复问题进而提升代码的稳定性；还可以通过对代码进行度量，统计出结构异常复杂的方法及重复代码供开发人员调整，进而提升代码的可维护性，提升团队效率。

### 主要功能

代码扫描主要由**扫描任务**和**扫描方案**两个功能组成。扫描任务指的是执行代码扫描的载体，单次任务包含执行扫描需要的全部信息，其中包括了被扫描代码所在分支概览、扫描任务执行的扫描结果、度量结果、扫描历史与分支信息。扫描方案由执行扫描任务的规则包所组成，一个扫描方案包含多个扫描规则。方案内还支持质量门禁的设置，度量规则的切换，路径过滤等功能。

### CODING 代码扫描的优势

**1.  工具覆盖面广**

代码扫描目前内部集成了多种工具、数千条规则，支持包括 Java、C/C++、JavaScript、Python、Go 等十余种语言在功能、安全、性能、可用性、代码规范等多个维度寻找您代码中的漏洞并提供修改建议。

**2.  协作效率高**

责任人自动指派问题代码提交人，问题代码修复后可自行关闭，实现问题处理的闭环，无需手动指派责任人或关闭问题。不仅如此，还支持对仓库的多个分支进行全量或增量的扫描，轻松监管代码综合质量趋势，能够自动呈现代码的具体质量问题并提示团队成员进行消除。

**3.  易于使用**

为了便于您的使用，我们对每种语言以及常用的前端框架都内置了一份系统推荐扫描方案。此外也支持您按需定制扫描方案，包括规则的选用以及规则级别的调整，一份设置好的方案可以复用于多个分支。

**4.  自动化运行**

支持自动化执行代码扫描，您可以通过设置触发规则，指定合适的时机比如合并请求时自动执行代码扫描。

==== 2020/09/02 ====
