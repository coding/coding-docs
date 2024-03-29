---
title: 部署 Kubernetes 资源时如何拉取私有库镜像？ - CODING 帮助中心
pageTitle: 部署 Kubernetes 资源时如何拉取私有库镜像？
pagePrevTitle: 最佳实践——使用 CODING 持续部署的强大表达式
pagePrev: cd/best-practice/expression-cd.html
pageNextTitle: Kubernetes 云账号的最小权限要求
pageNext: cd/question/min-authority.html
alias: cd/question/FAQ.html
---

在部署 Kubernetes 资源时，如果 manifest 引用的镜像是存储于私有库的镜像，则需要创建 K8s Secret，并在 manifest 中配置 `imagePullSecrets` 才能成功拉取镜像。

#### [检查 K8s Secret](#check-k8s-secret)

首先检查 K8s 中是否存在以 coding 开头的 Secret，命令：

```shell
kubectl get secrets
```

或通过云厂商的网页查看：

![](https://help-assets.codehub.cn/enterprise/20210517141629.png)

如果使用腾讯云账号登录 CODING，在设置 CODING CD 时，会在 TKE 集群中自动创建名为 `coding-registry-cred-$(user_id)`的 Secret：

![](https://help-assets.codehub.cn/enterprise/20200731104431.png)

#### [创建项目令牌](#project-token)

如果上一步检查发现没有 K8s Secret，则在 CODING「项目设置」——「开发者选项」——「项目令牌」页面创建一个具有「读取制品库」权限的令牌：

![](https://help-assets.codehub.cn/enterprise/20210517143259.png)

![](https://help-assets.codehub.cn/enterprise/20210517143523.png)

#### [创建 K8s Secret](#create-k8s-secret)

把上一步获得的项目令牌创建为 K8s Secret，命令：

```shell
kubectl create secret docker-registry coding-docker \
--docker-server=仓库域名 --docker-username=项目令牌用户名 --docker-password=项目令牌密码
```

> 你可以在 CODING 制品仓库中的配置凭据中找到仓库域名。

![](https://help-assets.codehub.cn/enterprise/20210907174354.png)

或通过云厂商的网页创建：

![](https://help-assets.codehub.cn/enterprise/20210517140116.png)

#### [使用 K8s Secret](#use-k8s-secret)

在 manifest 中通过`imagePullSecrets` 配置此 Secret 用于拉取镜像（最后两行）：

```yaml
apiVersion: apps/v1
kind: Deployment
...
    spec:
      containers:
      - name: my-api
        image: my-team-docker.pkg.coding.net/demo/docker/my-api:1.2.3
        ports:
        - containerPort: 80
      imagePullSecrets:
      - name: coding-docker
```

#### [参考资料](#ref)

[从私有仓库拉取镜像 - Kubernetes 官方文档](https://kubernetes.io/zh/docs/tasks/configure-pod-container/pull-image-private-registry)

==== 2021/05/17 ====
