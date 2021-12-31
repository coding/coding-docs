---
title: 功能介绍 - CODING 帮助中心
pageTitle: 功能介绍
pagePrevTitle: Shell 规范检查
pagePrev: ci/lint/shell.html
pageNextTitle: Java Spring Boot 自动化测试
pageNext: ci/testing/java-spring-boot.html
alias: ci/testing/intro.html
---

持续集成还可以用于自动化测试任务。代码提交后自动触发任务，开发人员及时检验代码的正确性，及时查看变更对整体的影响。修改旧有代码时候不再“如临大敌”，由小及大提升项目整体的稳定性。

### [建议守则](#rules)

-   开发写测试：测试代码应由开发人员编写，最好「先写测试，后写业务」即测试驱动开发（TDD），避免代码不可测；
-   一个代码库：测试代码和业务代码放在同一个代码库，使用同一种编程语言，一起提交；
-   自动运行：在合并请求时自动运行测试，全部通过才允许合并；
-   检查覆盖率：在合并请求时计算覆盖率，达到要求才允许合并（50% 为中等，80% 为良好，90% 为优秀）；

### [工具](#tools)

各个语言都有开源的测试工具、覆盖率报告工具。持续集成任务结束后支持输出运行结果。

语言  | 测试工具 | 覆盖率工具
-----|---------|----------
Java | [JUnit](https://junit.org/junit5/)   | [JaCoCo](https://www.eclemma.org/jacoco/)
PHP  | [PHPUnit](https://phpunit.de/) | PHPUnit
JS   | [Jest](https://jestjs.io/zh-Hans/) | Jest

运行持续集成任务后将自动生成测试报告。

![](https://help-assets.codehub.cn/enterprise/20200923121714.png)

报告详情：

![](https://help-assets.codehub.cn/enterprise/20201119164317.png)

==== 2021/09/16 ====
