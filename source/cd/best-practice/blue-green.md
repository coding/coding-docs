---
title: Kubernetes 蓝绿部署实践 - CODING 帮助中心
pageTitle: Kubernetes 蓝绿部署实践
pagePrevTitle: Kubernetes 滚动发布实践
pagePrev: cd/best-practice/rolling-release.html
pageNextTitle: 在 Kubernetes 上持续部署 Helm 应用
pageNext: cd/best-practice/k8s-helm.html
alias: 
-   cd/practice/blue-green.html
-   best-practices/cd/blue-green.html
---

### 前言

本文将介绍如何通过 CODING CD 使用 Nginx Ingress 来实现`蓝绿发布`。

为什么要采用蓝绿发布？随着业务的快速发展，对开发团队的要求越来越高，一方面要求为用户提供稳定的服务，一方面要求进行快速业务迭代。因此基于系统稳定性和快速业务迭代的综合考虑，需要采用蓝绿发布上线新版本服务的方式，实现应用服务的平稳升级。

为什么要使用 CODING CD？传统的部署是修改 YAML 文件的镜像版本，然后通过命令行 kubectl apply 的方式更新应用服务的版本，这种发布方式过于依赖人工执行，对于 DevOps 团队来说是不可忍受的。而通过 CODING CD 部署流程实现自动化流水线，流水线的所有阶段都可以供团队中的任何人检查、改进和验证，开发团队可以提高发布的速度和降低发布的风险和成本。

### 概述

#### 什么是 Nginx Ingress

Nginx Ingress 是 Kubernetes Ingress 的一种实现，它通过 watch Kubernetes 集群的 Ingress 资源，将 Ingress 规则转换成 Nginx 的配置，然后让 Nginx 来进行 7 层的流量转发。

#### 使用注解说明

我们通过给 Ingress 资源指定 Nginx Ingress 所支持的一些 annotation 可以实现蓝绿发布，需要给服务创建两个 Ingress，一个正常的 Ingress（myapp-ingress），另一个是带 `nginx.ingress.kubernetes.io/canary: "true"` 这个固定的 annotation 的 Ingress，我们姑且称它为 Canary Ingress（myapp-blue-ingress），一般代表新版本的服务，结合另外针对流量切分策略的 annotation 一起配置即可实现多种场景的蓝绿发布，以下是对本次实践使用到的 annotation 的介绍：

-   `nginx.ingress.kubernetes.io/canary-by-header`: 表示如果请求头中包含这里指定的 header 名称，并且值为 `always` 的话，就将该请求转发给该 Ingress 定义的对应后端服务；如果值为 `never` 就不转发，可以用于回滚到旧版；如果是其它值则忽略该 annotation。
-   `nginx.ingress.kubernetes.io/canary-by-header-value`: 这个可以作为 `canary-by-header`的补充，允许指定请求头的值可以自定义成其它值，不再只能是 `always` 或 `never`；当请求头的值命中这里的自定义值时，请求将会转发给该 Ingress 定义的对应后端服务，如果是其它值则将会忽略该 annotation。
-   `nginx.ingress.kubernetes.io/canary-weight`: 表示 Canary Ingress 所分配流量的比例的百分比，取值范围 `0-100`，比如设置为 10，意思是分配 10% 的流量给 Canary Ingress 对应的后端服务。

更多关于 Nginx Ingress 的注解说明可以参考[官方文档](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#canary)。

### 蓝绿发布

蓝绿发布，是在生产环境稳定集群之外，额外部署一个与稳定集群规模相同的新集群，并通过流量控制，逐步引入流量至新集群直至 100%，原先稳定集群将与新集群同时保持在线一段时间，期间发生任何异常，可立刻将所有流量切回至原稳定集群，实现快速回滚。直到全部验证成功后，下线老的稳定集群，新集群成为新的稳定集群。

#### 发布流程

![](https://help-assets.codehub.cn/enterprise/20210303145610.png)

蓝绿发布的流程，包括：蓝绿发布开始、蓝绿初始化、蓝绿验证、蓝绿取消或完成上线。

![](https://help-assets.codehub.cn/enterprise/20210303145628.png)

如上图所示，老集群集群的版本为 v1，该集群通过 version=v1 标签被 Service myapp-svc 访问到。（a）额外部署了一个新集群，版本为 v2，该集群通过 version=v2 标签被 Service myapp-blue-svc 访问到。（b）通过流量控制，控制部分流量或全部流量到新集群，进行蓝绿验证，同时原稳定集群继续保持在线。（c）如果验证没有发现任何故障，则应用 myapp 的蓝绿发布完成，v2 版本集群成为新的稳定集群。（d）如果在验证中发现了故障，则通过流量控制，将全部流量切回原来稳定的老集群，实现快速回滚。

### 实践

**前提条件：**

Kubernetes 集群中需要部署 Nginx Ingress 作为 Ingress Controller，并且对外暴露了统一的流量入口。

#### 老集群初始化

发布流程

![](https://help-assets.codehub.cn/enterprise/20210303145653.png)

配置

![](https://help-assets.codehub.cn/enterprise/20210303145707.png)

这里配置部署 myapp 应用服务所需要的 docker 镜像制品，还有启动参数 version，该参数的作用主要是作为标签为 Service 提供筛选过滤条件，实现新老版本服务的流量控制。

#### 发布策略

![](https://help-assets.codehub.cn/enterprise/20210303145719.png)

发布策略采用`人工确认`阶段，可配置确认人，选择不同发布方式。

#### 常规发布

![](https://help-assets.codehub.cn/enterprise/20210303145811.png)

常规发布采用`预置条件检查`阶段，预置条件配置 `#judgment("发布策略") == '常规发布'` 表达式，表达式中的 [judgment 函数](https://spinnaker.io/reference/pipeline/expressions/#judgmentstring)返回`人工确认`阶段选定的选项，并通过 == 关系运算符来比较表达式中的值，如果表达式判断成功，将执行这个分支的阶段。

#### 新集群(即绿集群)部署

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    strategy.spinnaker.io/max-version-history: '3'   # 表示保留 3 个历史版本的 myapp-deploy
    strategy.spinnaker.io/versioned: 'true'   # 表示 Spinnaker 对 myapp-deploy 进行版本管理
  name: myapp-deploy
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
      version: '${parameters.version}'   # 引用配置中的启动参数 version
  template:
    metadata:
      labels:
        app: myapp
        version: '${parameters.version}'
    spec:
      containers:
        - image: selinaxeon-docker.pkg.coding.net/coding-yhj/docker/myapp
          name: myapp
          ports:
            - containerPort: 80
```

`${parameters.version}` 表达式表示引用配置中已配置的启动参数 version。

这里部署新集群的 Deployment 被打上 Spinnaker 注解：

-   `strategy.spinnaker.io/versioned`，当该注解被设置为 ‘true’ 时，Spinnaker 将对 Deployment 资源进行版本管理。简单来说，就是发布后的 Deployment 名称将带有版本号，如 myapp-deploy-v000。
-   `strategy.spinnaker.io/max-version-history`，该注解表示 Spinnaker 将配置要保留的资源版本数。当 Spinnaker 发布的 k8s 资源的历史版本数超过 max-version-history 时，Spinnaker 会删除旧版本的资源。这里设置为 '3'，表示要保留 3 个历史版本的 Deployment myapp-deploy。

注意，此阶段还需要绑定配置中已配置的 myapp-image Docker 镜像制品，Spinnaker 将自动替换 Manifest 中匹配的 image。具体绑定替换规则参考[帮助文档](https://help.coding.net/docs/cd/pipe/artifacts/in-kubernetes.html#%E5%9C%A8-manifest-%E4%B8%AD%E7%BB%91%E5%AE%9A%E5%88%B6%E5%93%81)。

#### 切换流量

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-svc
spec:
  ports:
    - name: tcp-80-80
      port: 80
      protocol: TCP
      targetPort: 80
  selector:
    app: myapp
    version: '${parameters.version}'
  type: NodePort
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
  name: myapp-ingress
spec:
  rules:
    - host: myapp.coding.prod
      http:
        paths:
          - backend:
              serviceName: myapp-svc
              servicePort: 80
            path: /
```

这里 Service myapp-svc 通过 `version: '${parameters.version}'` 标签访问到带有相同标签的 myapp-deploy Pod，myapp-ingress 配置路由到  Service myapp-svc 的规则，可通过网址：<http://myapp.coding.prod> 访问 myapp-svc 后端服务。

#### 下线老集群

![](https://help-assets.codehub.cn/enterprise/20210303150014.png)

这里采用`扩缩容(Manifest)`阶段，选择`动态选择目标`并且 `Target` 选择`次新的`，将 Deployment myapp-deploy 的 replicas 设置为 0，完成老集群下线操作。之所以不采用`删除 (Manifest)`阶段是因为要保留 myapp-deploy 的历史发布版本，方便回滚操作，另外删除 myapp-deploy 的历史版本交给 `strategy.spinnaker.io/max-version-history` 注解实现。

注意，这里`执行选项`的`如果阶段失败`选项选择`终止流程中的这个分支`，因为对于老集群初始化部署时，没有次新的版本可供下线操作，此阶段会执行失败，导致整个流程部署失败。

为什么在常规发布多了此阶段？目的是实现流水线可复用，第二次发布新版本服务时还可以通过该部署流程执行，新集群部署完直到服务稳定，即可同时进行`切换流量`和`老集群下线`操作。

### 准备进行蓝绿发布

![](https://help-assets.codehub.cn/enterprise/20210303150831.png)

在“发布策略”的人工确认阶段选择发布类型“蓝绿发布”，即可开始蓝绿发布。在“蓝绿发布”的预置条件检查阶段配置条件表达式：`#judgment("发布策略") == '蓝绿发布'`。

#### 初始化

#### 新集群(即蓝集群)部署

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    strategy.spinnaker.io/max-version-history: '3'
    strategy.spinnaker.io/versioned: 'true'
  name: myapp-deploy
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
      version: '${parameters.version}'
  template:
    metadata:
      labels:
        app: myapp
        version: '${parameters.version}'
    spec:
      containers:
        - image: selinaxeon-docker.pkg.coding.net/coding-yhj/docker/myapp
          name: myapp
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: myapp-blue-svc
spec:
  ports:
    - name: tcp-80-80
      port: 80
      protocol: TCP
      targetPort: 80
  selector:
    app: myapp
    version: '${parameters.version}'
  type: NodePort
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/canary: 'true'   # 开启 canary 功能
    nginx.ingress.kubernetes.io/canary-by-header: blueGreenVersion   # 基于请求头路由
    nginx.ingress.kubernetes.io/canary-by-header-value: blue   # 请求头满足 blueGreenVersion=blue 的请求会被路由到 myapp-blue-svc
  name: myapp-blue-ingress
spec:
  rules:
    - host: myapp.coding.prod
      http:
        paths:
          - backend:
              serviceName: myapp-blue-svc
              servicePort: 80
            path: /
```

`蓝绿初始化`流程：首先推送路由规则，控制全部流量在老集群，保证新集群部署启动期间不会接收任何流量。我们通过实例的 `version: '${parameters.version}'` 标签来识别是蓝集群还是绿集群，因此启动部署流程前须填写不同的启动参数，确保 Service myapp-blue-svc 通过不同的 version 标签值筛选到蓝集群的实例 Pod；另外，通过发布 Ingress 规则 myapp-blue-ingress，请求头满足 blueGreenVersion=blue 匹配的请求会被路由到蓝集群的 Service myapp-blue-svc。推送完规则后，就可以部署新集群了。

注意，此阶段也需要绑定配置中已配置的 myapp-image Docker 镜像制品。

用户需要在正确匹配请求头才可以访问新版本服务：`curl -H 'blueGreenVersion:blue' http://myapp.coding.prod`。

### 蓝绿验证

`蓝绿验证`流程：初始化完成后，可以推送路由规则，将部分请求流量或全部流量路由至新集群进行验证。验证过程中如果没有问题，可以不断将流量迁移至新集群，直至所有流量都在新集群。如果蓝绿验证成功则进入`蓝绿完成上线`流程，验证失败则进入`蓝绿取消`流程。

![](https://help-assets.codehub.cn/enterprise/20210303150924.png)

蓝绿验证采用`人工确认`阶段，配置确认人，可选择控制部分请求流量或全部流量路由至新集群进行验证。这里还配置了自定义参数 blue_ratio，该参数是控制部分流量到新集群的请求百分比。

#### 控制部分流量到新集群

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/canary: 'true'
    nginx.ingress.kubernetes.io/canary-weight: '${#stage("蓝绿验证")["context"]["customParams"]["blue_ratio"]}'
  name: myapp-blue-ingress
spec:
  rules:
    - host: myapp.coding.prod
      http:
        paths:
          - backend:
              serviceName: myapp-blue-svc
              servicePort: 80
            path: /
```

`#stage("蓝绿验证")["context"]["customParams"]["blue_ratio"]` 表达式表示引用`人工确认`阶段中已配置的自定义参数 blue_ratio，这将控制随机 blue_ratio% 请求进入新版本集群。

在此阶段的`执行选项`还需配置条件表达式 `#judgment("蓝绿验证") == '控制部分流量到新集群'`，控制部署流程分支执行方向。

![](https://help-assets.codehub.cn/enterprise/20210303151010.png)

#### 蓝绿验证结果确认

![](https://help-assets.codehub.cn/enterprise/20210303151021.png)

如果在控制部分流量到新集群验证过程中发现问题，可以通过此人工确认阶段实现将全部流量切回老集群。

在此阶段的`执行选项`也需要配置条件表达式 `#judgment("蓝绿验证") == '控制部分流量到新集群'`，因为上一阶段因不满足条件被跳过执行，此阶段为上一阶段的下游阶段，还会继续执行，因此也需要配置条件表达式。

#### 控制全部流量到新集群

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/canary: 'true'
    nginx.ingress.kubernetes.io/canary-weight: '100'
  name: myapp-blue-ingress
spec:
  rules:
    - host: myapp.coding.prod
      http:
        paths:
          - backend:
              serviceName: myapp-blue-svc
              servicePort: 80
            path: /
```

说明：通过设置 `nginx.ingress.kubernetes.io/canary-weight: '100'` 控制全部流量到新集群。

注意，在此阶段的`执行选项`需要配置条件表达式 `${ (#stage("蓝绿验证")["status"].toString() == "SUCCEEDED" && #judgment( '蓝绿验证') == '控制全部流量到新集群') || (#stage("蓝绿验证结果确认")["status"].toString() == "SUCCEEDED" && #judgment('蓝绿验证结果确认') == '验证成功，控制全部流量到新集群') }`。表达式中的 [stage 函数](https://spinnaker.io/reference/pipeline/expressions/#stagestring) 使用 `#stage("蓝绿验证")["status"].toString()` 返回"蓝绿验证"人工确认阶段的执行状态。Spinnaker 表达式的语法基于 [Spring Expression Language (SpEL)](https://docs.spring.io/spring/docs/current/spring-framework-reference/html/expressions.html)，可以使用 && 和 || 等关系运算符。

这里需要这么复杂的条件表达式，是因为既可以从“蓝绿验证”人工确认阶段直接选择`控制全部流量到新集群`选项进入此阶段，也可以从“蓝绿验证结果确认“人工确认阶段选择`验证成功，控制全部流量到新集群`选项进入此阶段，因此需要强大的条件表达式来控制流程分支的走向。由此可见，Spinnaker 部署流程的强大，可支持复杂的流程分支控制，满足各种发布场景的不同需求。而且流水线只需一次配置，多次执行。

#### 蓝绿最终效果确认

![](https://help-assets.codehub.cn/enterprise/20210303151104.png)

如果在控制全部流量到新集群验证过程中发现问题，可以通过此人工确认阶段进入“蓝绿取消”流程，实现将全部流量切回老集群。

在此阶段的`执行选项`也需要配置跟“控制全部流量到新集群”阶段一样的条件表达式，来控制部署流程分支执行方向。

### 蓝绿完成上线

#### 新集群验证成功

![](https://help-assets.codehub.cn/enterprise/20210303151119.png)

新集群验证成功采用`预置条件检查`阶段，预置条件配置比较简单：`#judgment("蓝绿最终效果确认") == '新集群验证成功'`。

#### 蓝绿完成上线

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-svc
spec:
  ports:
    - name: tcp-80-80
      port: 80
      protocol: TCP
      targetPort: 80
  selector:
    app: myapp
    version: '${parameters.version}'
  type: NodePort
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
  name: myapp-blue-ingress
spec:
  rules:
    - host: myapp.coding.prod
      http:
        paths:
          - backend:
              serviceName: myapp-svc
              servicePort: 80
            path: /
```

如果蓝绿验证没有发现问题，那么就可以完成蓝绿发布上线了。只有当全部流量在新集群时才能操作完成上线。完成上线后，如果再有需要回滚，那只能走普通的回滚流程了。

这里 Service myapp-svc 通过 `version: '${parameters.version}'` 标签访问到带有相同标签的新集群 Pod，实现流量切换，myapp-blue-ingress 也配置路由到  Service myapp-svc 的规则。

#### 老集群下线

![](https://help-assets.codehub.cn/enterprise/20210303151139.png)

“老集群下线”跟常规发布的“老集群下线”相似，都采用`扩缩容(Manifest)`阶段，只不过`执行选项`采用默认配置。

### 蓝绿取消

#### 新集群验证失败

![](https://help-assets.codehub.cn/enterprise/20210303151155.png)

新集群验证失败采用`预置条件检查`阶段，预置条件比较复杂：`${ (#stage("蓝绿验证结果确认")["status"].toString() == "SUCCEEDED" && #judgment( '蓝绿验证结果确认') == '验证失败，蓝绿取消') || (#stage("蓝绿最终效果确认")["status"].toString() == "SUCCEEDED" && #judgment('蓝绿最终效果确认') == '新集群验证失败') }`。因为既可以从“蓝绿验证结果确认”人工确认阶段直接选择`验证失败，蓝绿取消`选项进入此阶段，也可以从“蓝绿最终效果确认人工确认阶段选择`新集群验证失败`选项进入此阶段。

#### 代码参考

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/canary: 'true'
    nginx.ingress.kubernetes.io/canary-by-header: blueGreenVersion
    nginx.ingress.kubernetes.io/canary-by-header-value: blue
  name: myapp-blue-ingress
spec:
  rules:
    - host: myapp.coding.prod
      http:
        paths:
          - backend:
              serviceName: myapp-blue-svc
              servicePort: 80
            path: /
```

如果在蓝绿验证过程中发现了问题，蓝绿取消可秒级将全部流量切回老集群，具体步骤：推送路由规则控制所有流量到老集群。

这里修改 myapp-blue-ingress 的路由规则，只有请求头匹配 blueGreenVersion=blue 才可以访问到新集群，不匹配则访问老集群，实现了全部流量切换回老集群。

#### 新集群下线

![](https://help-assets.codehub.cn/enterprise/20210303151212.png)

这里采用`删除(Manifest)`阶段，选择`动态选择目标`并且 `Target` 选择`最新的`，将新集群的 Deployment myapp-deploy 删除，完成老集群下线操作。

当然，也可先通过修改路由规则的方式，先将流量切回老集群，然后保留现场，方便进行问题排查。

### 效果

终于配置完成蓝绿发布的部署流程，接下来我们来看一下蓝绿发布效果。

**初始化绿集群：**

![](https://help-assets.codehub.cn/enterprise/20210303151312.gif)

**蓝绿发布成功：**

![](https://help-assets.codehub.cn/enterprise/20210303160843.gif)

**蓝绿发布失败：**

![](https://help-assets.codehub.cn/enterprise/20210303160933.gif)

### 结语

在上面的示例中，我们通过在 CODING CD 中配置一条流水线，实现了基于 Nginx Ingress 的蓝绿发布。部署流程只需配置一次，便可永久使用。本文所有内容结束，感谢您的阅读。

==== 2021/03/03 ====
