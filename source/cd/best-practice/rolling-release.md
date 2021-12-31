---
title: Kubernetes 滚动发布实践 - CODING 帮助中心
pageTitle: Kubernetes 滚动发布实践
pagePrevTitle: 主机部署——回滚
pagePrev: cd/host-deploy/rollback.html
pageNextTitle: Kubernetes 蓝绿部署实践
pageNext: cd/best-practice/blue-green.html
alias: best-practices/cd/rolling-release.html
---

软件世界比以往任何时候都更快。为了保持竞争力，在既要求尽快推出新的软件版本的同时，还需要避免中断活跃用户访问，影响用户体验。越来越多企业已将其应用迁移到 Kubernetes 集群。

在 Kubernetes 中有几种不同的方式发布应用，所以为了让应用在升级期间依然平稳提供服务，选择一个正确的发布策略就非常重要了，本篇文章将讲解如何在 Kubernetes 使用滚动更新的方式更新镜像。

### 原理

策略定义为 RollingUpdate 的 Deployment。滚动更新通过逐个替换实例来逐步部署新版本的应用，直到所有实例都被替换完成为止，会有新版旧版同时存在的情况。

```yaml
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 0						  # 决定了配置中期望的副本数之外，最多允许超出的 pod 实例的数量
      maxUnavailable: 25%			# 决定了在滚动升级期间，相对于期望副本数能够允许有多少 pod 实例处于不可用状态
```

上述更新策略执行结果如下图所示

![](https://help-assets.codehub.cn/enterprise/20200728110237.png)

### 使用 Kubernetes 原生方式升级应用

#### 准备

image

```sh
bebullish/demo:v1
bebullish/demo:v2
```

deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-dp
spec:
  selector:
    matchLabels:
      app: demo
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
  template:
    metadata:
      labels:
        app: demo
    spec: 
      containers:
      - name: demo
        image: bebullish/demo:v1
        ports:
        - containerPort: 8080
```

service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: demo-service
spec:
  selector:
    app: demo
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 8080
    protocol: TCP
```

将上述 `deployment` 以及 `service` 保存为 yaml 文件，使用 `kubectl apply -f` 命令创建 yaml 资源，等待创建成功后，使用 `kubectl get svc` 获取 EXTERNAL-IP。

#### 测试

如果使用浏览器测试的话，你会发现每次调用都会返回同一个 pod 的名字，那是因为浏览器发出的请求包含 keepAlive，所以需要使用 curl 来保证每次发出的请求都是重新创建的。

```sh
curl -X GET http://${EXTERNAL-IP}
```

![](https://help-assets.codehub.cn/enterprise/20200728111034.png)

#### 升级

升级之前先执行命令，以便查看镜像更新过程

```sh
while true; do curl -X GET http://49.232.125.218 ; done
```

更新镜像

```sh
kubectl set image deployment demo-dp demo=bebullish/demo:v2
```

#### 查看日志

![](https://help-assets.codehub.cn/enterprise/20200728111052.png)

#### 请求流量

![](https://help-assets.codehub.cn/enterprise/20200728111112.png)

#### 结论

首先可以发现在更新过程中，程序保持一直可用的状态，在出现了 v2 版本之后，还会出现 v1 版本的日志，说明在这个期间 v1 和 v2 版本是同时存在的，等到 v2 版本的 pod 全部处于就绪状态之后，可以看到所有的请求就都是 v2 版本的了。

### 使用 CODING CD 方式升级应用

#### 配置制品

![](https://help-assets.codehub.cn/enterprise/20200728111646.png)

使用 docker 官方镜像需要以 `docker.io` 开头

#### 配置 yaml 及绑定制品

![](https://help-assets.codehub.cn/enterprise/20200728111704.png)

deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-dp
spec:
  selector:
    matchLabels:
      app: demo
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
  template:
    metadata:
      labels:
        app: demo
    spec: 
      containers:
      - name: demo
        image: docker.io/bebullish/demo
        ports:
        - containerPort: 8080
        readinessProbe:
          httpGet:
            path: /
            port: 8080
          initialDelaySeconds: 30           # 延迟 30 秒检测，以便更好的观察更新过程
          periodSeconds: 5
        livenessProbe:
          httpGet:
            path: /
            port: 8080
          initialDelaySeconds: 30           # 延迟 30 秒检测，以便更好的观察更新过程
          periodSeconds: 5
      terminationGracePeriodSeconds: 1      # 处于 Terminating 状态多久后，强制杀死 pod
```

阶段中选择 `部署（Manifest）` ，输入上述 yaml 文件（主要增加了就绪探针和存活探针），这里需要把镜像的版本删除掉，在需要绑定的制品选择之前配置的制品。这样配置之后，每次执行的时候版本是动态传入的。

#### 发布制品

![](https://help-assets.codehub.cn/enterprise/20200728111737.png)

选择应用和部署流程，输入版本 v1。

#### 查看结果

![](https://help-assets.codehub.cn/enterprise/20200728111759.png)

等待一小段时间后，就可以在部署控制台中看到发布的资源了。

#### 更新镜像版本

![](https://help-assets.codehub.cn/enterprise/20200728111818.png)

再次执行发布，版本输入 v2。

#### 更新过程

![](https://help-assets.codehub.cn/enterprise/20200728111838.png)

可以看到此时 v2 版本的 pod 有一个正在启动，而 v1 版本的 pod 全部处于就绪状态。

![](https://help-assets.codehub.cn/enterprise/20200728111856.png)

v2 版本的 pod 有一个已经就绪，同时正在启动另一个新的 pod，与此同时 v1 版本的有一个 pod 已经关机了，而另外两个 pod 仍处于就绪状态。

![](https://help-assets.codehub.cn/enterprise/20200728111915.png)

v2 版本的 pod 有两个已经就绪，同时正在启动最后一个新的 pod，与此同时 v1 版本的有两个 pod 已经关机了，而另外一个 pod 仍处于就绪状态。

![](https://help-assets.codehub.cn/enterprise/20200728111933.png)

v2 版本的 pod 已经全部处于就绪状态了，同时 v1 版本的 pod 已经全部关机，至此，一次滚动更新结束。

### 总结

使用 Kubernetes 原生方式实现滚动更新更加简单方便，但也容易出错（人工），推荐使用 CODING 提供的持续部署功能，配置一次，永久使用。不仅可以直观的观察到 pod 更新过程，还提供了非常丰富的 CD 功能，辅以代码托管、持续集成及配套服务，助力提示您的研发效能。

## 参考文章

[Kuerbenetes](https://kubernetes.io/zh/docs/tutorials/kubernetes-basics/update/update-intro/)

[CODING 持续部署](/docs/cd/overview.html)


==== 2020/08/13 ====
