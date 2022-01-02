---
title: 使用 CODING 持续部署的强大表达式 - CODING 帮助中心
pageTitle: 使用 CODING 持续部署的强大表达式
pagePrevTitle: true
pagePrev: true
pageNextTitle: true
pageNext: true
alias: best-practices/cd/expression-cd.html
---

### 简介

管道表达式是一种动态的表达式，可以在阶段内引用系统内已存在的任意值。即只要存在此变量，就能够被阶段引用。

目前，管道表达式可以使用在两个地方：
*   阶段内`执行选项`的`条件表达式`表单，用来判断当前阶段满足表达式才能执行。
*   部署的 manifest 内，可以使用表达式。

### 语法

由美元符号 `$` 和 `{}` 组成，即 `${}`，括号内书写在部署阶段内置的变量名，但不能被嵌套使用。例如这样是不合法的：`${ expression1 ${expression2} }`

### 高级用法

管道表达式内允许用户执行 JAVA 代码，可以定义更加复杂的逻辑，出于安全考虑，只有以下 JAVA 类可以被调用：
*   Boolean
*   Byte
*   ChronoUnit
*   Date
*   DayOfWeek
*   Double
*   Instant
*   Integer
*   LocalDate
*   LocalDateTime
*   Long
*   Math
*   Random
*   SimpleDateFormat
*   String
*   URLEncoder
*   UUID

例如，你希望在条件表达式内获取到当前日期，可以这样写:

```shell
${new java.text.SimpleDateFormat("MM-dd-yyyy").format(new java.util.Date())}
```

### 表达式比较

可以用关系运算符来做比较，例如：

```shell
${instance["size"] > 400}
${parameters["runCanary"] == "true"}
```

特别注意，比较的时候需要两者数据结构一致才可以，例如 `${parameters["runCanary"]` 可能为 `String` ，那么必须将其转换为 `Boolean` 类型，否则比较不生效。可以用内置的辅助函数来做数据转换：

```shell
${&#35;toBoolean(parameters["runCanary"]) == true}。
```

除此之外，还有以下内置数据转换辅助函数：
*   #toBoolean(String)
*   #toFloat(String)
*   #toInt(String)

### 其他辅助函数

##### 常用

*   #fromUrl（String）
    *   请求 URL 返回字符串，用来获取网页信息。
*   #jsonFromUrl（String）
    *   请求 URL 的内容，并将 JSON 转换为 map 或 list。
*   #yamlFromUrl（String）
    *   请求 URL 的内容，并将 yaml 转换为 map。
*   #judgment（String）
    *   获取“人工确认”阶段用户选择的值。
*   #stage（String）
    *   通过名称获取 stage ，区分大小写，可以获取到该 stage 的配置信息。
*   #triggerResolvedArtifact（String）
    *   在触发器中查找已解析的制品，如果有多个，只返回一个。例如：

    `${&#35;triggerResolvedArtifact("my-image")["reference"]}`

    可能会返回

    `gcr.io/spinnaker-marketplace/orca@sha256:b48dbe7d7cb580db8512e4687d31f3710185b08afcf3cb53c0203025f93f9091`。

*   #triggerResolvedArtifactByType（String）
    *   在执行触发器中按其类型查找制品，如果有多个，只返回 1 个。例如，
    
    `${&#35;triggerResolvedArtifactByType("docker/image")["reference"]}`
    
    可能会返回 
    
    `gcr.io/spinnaker-marketplace/orca@sha256:b48dbe7d7cb580db8512e4687d31f3710185b08afcf3cb53c0203025f93f9091`。

### 不常用

*   #alphanumerical（String）
    *   返回传入字符串的字母数字值。也就是说，去除了除 AZ 和 0-9 之外的所有字符的输入字符串。
*   #deployedServerGroups（String）
    *   将部署阶段的名称作为参数，并返回由指定阶段创建的服务器组。
*   #readJson（String）
    *   将 JSON 字符串转换为 Map，然后可以进一步处理。
*   #readYaml（String）
    *   将 YAML 字符串转换为 Map，然后可以对其进行进一步处理。
*   #deployedServerGroups（String）
    *   将部署阶段的名称作为参数，并返回由指定阶段创建的服务器组。
*   #manifestLabelValue（stageName, manifestKind, labelKey）
    *   返回带有类型 labelKey 的 Kubernetes 部署或 ReplicaSet 清单中的键的标签的值，该清单 manifestKind 通过类型 deployManifest 和名称的阶段进行部署 stageName。
*   #propertiesFromUrl（String）
    *   在给定的 URL 上检索 Java 属性文件的内容，并将其转换为映射。
*   #stageByRefId（String）
    *   通过 refId 获取 stage ，区分大小写，可以获取到该 stage 的配置信息。
*   #currentStage（String）
    *   返回当前阶段。
*   #stageExists（String）
    *   检查给定阶段是否存在，可以用名称或者 ID。
*   #pipelineId（String）
    *   返回管道 ID ，例如 
    
    `${&#35;pipelineId("Deploy to prod")}`
    
    可能会返回 
    
    `9b2395dc-7a2b-4845-b623-838bd74d059b`。

*   #toJson（String）
    *   将任意 JSON 对象转换为 JSON 字符串。

### 获取任意的变量

通过查看已执行完成的部署流程 “Source”，可以看到部署流程使用的所有变量：

![](https://help-assets.codehub.cn/enterprise/20200928113854.png)

![](https://help-assets.codehub.cn/enterprise/20200928113919.png)

这些变量，都可以通过`辅助函数`来获取。

也可以用过滤符号 `.?` 来做数据筛选，例如：

```shell
${execution["stages"].?[type == "bake"][0]}
```
将返回管道中第一个 bake 阶段。

### 数学运算

可以在管道表达式中使用数学运算符号，例如 `${trigger["buildInfo"]["number"] * 2}` ，需要注意的是，变量需要使用辅助函数转化为 `Int`、`Float` 之后，才能进行数学运算。

### 常用示例

#### 部署的 manifest 使用条件表达式

例如指定 Pod `部署权重`为上一个`人工确认`阶段输入的值，另外一个 Pod 权重则由数学表达式计算，两者权重合计 100。
   
```shell
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: k8s-flask-pro
  namespace: pro
spec:
  entryPoints:
    - web
  routes:
    - kind: Rule
      match: Host(`pro.coding`)
      services:
        - name: k8s-flask
          namespace: pro
          port: 8080
          weight: '${100 - #toInt(#judgment("生产环境 - 灰度比例"))}'
        - name: k8s-flask-canary
          namespace: pro
          port: 8080
          weight: '${#toInt(#judgment("生产环境 - 灰度比例"))}'

```

### 动态跳过阶段

如果希望实现这种动态交叉的阶段，根据人工确认阶段输入的值动态选择部署路径：

![](https://help-assets.codehub.cn/enterprise/20200928113936.png)

可以在 A/B 测试阶段的 `条件表达式` 表单内输入：

```text
${♯judgment("是否灰度并进行 A/B 测试") == '是，进行 A/B 测试'}
```
意味着`是否灰度并进行 A/B 测试`的人工确认阶段选择了`是，进行 A/B 测试`后，`A/B 测试`阶段会被执行。如果选择了其他的值，则会进入到 `是否进入自动化灰度`阶段。


### 限制 latest 版本制品的部署，防止提单误操作

例如，要限制部署 latest 版本的 docker 镜像部署，可以取当前阶段所需制品的已绑定制品版本是否为 latest：

```shell
${trigger["expectedArtifacts"][2]["boundArtifact"]["version"]  != 'latest'}
```

意味着第三个制品是我们配置的 docker 类型的启动所需制品，注意索引从第 0 个开始。

==== 2020/09/28 ====
