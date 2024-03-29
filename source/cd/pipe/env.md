---
title: 环境变量 - CODING 帮助中心
pageTitle: 环境变量
pagePrevTitle: 表达式
pagePrev: cd/pipe/expressions.html
pageNextTitle: 制品配置
pageNext: cd/pipe/artifacts.html 
---

### [功能介绍](#intro)

部署流程中支持填写启动参数与自定义变量，你可以通过此功能将一些敏感数据，例如账号与密码，以变量的方式注入至部署流程中，保证数据安全。

### [启动参数](#start-parameter)

前往部署流程，在基础配置中填写启动参数名称与默认值。如下图所示定义 TEST 参数：

![](https://help-assets.codehub.cn/enterprise/20211206110031.png)

在运行脚本中以固定格式进行引用：`${parameters.变量名}`

![](https://help-assets.codehub.cn/enterprise/20211206110435.png)

运行部署流程，在输出日志中就可以查看输出结果。

![](https://help-assets.codehub.cn/enterprise/20211206110630.png)

### [自定义变量](#customize-parameter)

选择「自定义变量」阶段后进行定义。例如将自定义变量设为 HELLO：

![](https://help-assets.codehub.cn/enterprise/20211206111237.png)

在后续流程中使用 `${HELLO}` 参数进行调用，输出结果如下：

![](https://help-assets.codehub.cn/enterprise/20211206111330.png)

==== 2021/12/06 ====
