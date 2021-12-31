---
title: 流程表达式 - CODING 帮助中心
pageTitle: 流程表达式
pagePrevTitle: 阶段类型
pagePrev: cd/pipe/stages.html
pageNextTitle: 触发器配置
pageNext: cd/pipe/triggers.html
---

### 功能介绍

部署流程表达式让用户可以在部署流程执行过程中动态地设置和访问变量。在部署流程的阶段配置中，几乎所有的文本框都可以使用表达式。部署流程表达式帮助用户在部署流程执行过程中引用关于系统状态的任意值。通过这些值，用户可以对特定的阶段或部署流程分支执行开关操作、动态命名分组（stack）、检查其他阶段的状态等。

本文档讲述如何正确的使用表达式，并提供了部分范例。了解更多关于表达式的语法和函数：[Pipeline Expression Reference](https://www.spinnaker.io/reference/pipeline/expressions/)

> 部署流程表达式的语法基于：[Spring Expression Language (SpEL)](https://docs.spring.io/spring/docs/current/spring-framework-reference/html/expressions.html)

### 部署流程表达式概览

部署流程表达式由 `$` 和花括号构成，例如：

```bash
${expression here}
```

如果表达式不能被正确的解析，会直接返回表达式的字面值，上面的例子将返回 `expression here`。

表达式可以和字符串拼接。以下例子中如果`expression A`的值为 *Hello*，`expression B`的值为 *world*，那么完整的解析结果为 *Hello-randomString-world*。

````bash
${expressionA}-randomString-${expressionB}
````

需要注意的是表达式不支持嵌套：`${ expression1 ${expression2} }` 将会解析失败。

### 部署流程表达式的使用场景

除了部署流程的配置阶段，只要是文本框都可以使用部署流程表达式。但有个例外，在部署流程配置阶段的【启动所需制品】，可以勾选【使用默认制品】并填写制品的全路径表达式。当需要为某些字段的值设置部署流程表达式但没有文本框提供输入时，可以编辑部署流程中的 JSON 配置。

#### 表达式的解析阶段

表达式在部署流程开始执行时解析。部署流程的配置阶段除了【启动所需制品】，其他配置都不能使用表达式，因为表达式是在配置阶段执行完成后才开始解析。

### 编写表达式的辅助工具

#### 辅助函数

CODING 部署控制台提供了内置辅助函数用来简化一些常见的用例。这些函数可以帮助用户使用名称访问指定的阶段、从字符串中过滤特殊字符、以及解析 JSON 等。

在部署流程表达式中输入`#`字符就会自动列出所有可用辅助函数。

![](https://help-assets.codehub.cn/enterprise/20200409163325.png)

### 辅助属性

辅助属性是当前部署流程执行上下文可以引用全局信息的变量。例如：`execution`变量用来引用当前部署流程执行上下文，`trigger`变量表示部署流程触发器的信息。如果用户配置了 Jenkins 触发器，可以使用表达式`${trigger["buildInfo"]["number"]}`获取到哪一次构建触发了当前的部署流程执行。

在部署流程表达式中输入符号`?`即可快速的看到可用的辅助属性和阶段列表。通过列表选择，按下回车键将需要的辅助属性或阶段名称添加进表达式。

![](https://help-assets.codehub.cn/enterprise/20200409164849.png)

将辅助属性加入表达式后，用户可以使用任一修饰键（Shift、Command、Alt、Control）列出和辅助属性有关的所有部署流程上下文。

### 上下文属性

上下文属性和辅助属性类似，但上下文属性的作用局限于阶段。这些属性包括阶段名称、状态、开始和结束时间等等。用户可以使用上下文属性和`#stage`辅助函数结合以获取阶段的属性。例如：

```bash
${#stage("Deploy to Proc")["type"]}
```

将返回阶段的类型，即：deploy。

如果想要得到部署流程的所有可用变量，用户可以查看部署流程执行的 JSON 内容。最简单的方法如下：

1.  进入部署流程执行页面
2.  点击 【细节】 展开
3.  点击右下角的【Source】链接，将会在浏览器打开一个新的 Tab 页面，以 JSON 格式展示部署流程执行详情。

![](https://help-assets.codehub.cn/enterprise/20200409165340.png)


==== 2020/09/08 ====
