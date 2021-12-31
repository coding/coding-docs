---
title: 部署 K8s 时相关问题 - CODING 帮助中心
pageTitle: 部署 K8s 时相关问题
pagePrevTitle: Kubernetes 云账号的最小权限要求
pagePrev: cd/question/private-repo.html
pageNextTitle: CODING 静态网站服务
pageNext: cd/static-website.html
---

### [部署 K8s 时失败](#fail)

#### Deployment exceeded its progress deadline

错误截图如下：

![](https://help-assets.codehub.cn/enterprise/20211203173815.png)

这是由于 deployment 的 pod 没有成功运行所导致的错误。可以通过以下方式查看 pod 事件详情，需要根据 pod 的事件排查问题。

**方法一：**

在产品页面点击「方块」查看事件。

![](https://help-assets.codehub.cn/enterprise/20211203174629.png)

**方法二：**

前往您的集群查看 pod 事件。

例如在 TKE 界面查看 pod 的事件：

![](https://help-assets.codehub.cn/enterprise/20211203174801.png)

使用命令行查看 pod 的事件：

```bash
kubectl describe pod [pod name] -n [pod location]

kubectl describe pod nginxtest -n test
```

#### Failed to pull image xxxxxx

这是因为再 yaml 文件里配置了拉取 CODING docker 镜像，但没有配置 CODING docker 仓库的凭据，需要在 yaml 文件添加相关的 imagePullSecrets。

若要解决此问题，需要将 CODING 登录凭据添加到您的 kubernetes 集群的 secret，点击了解[详情](https://help.coding.net/docs/cd/question/private-repo.html)。

#### Deploy failed: error: unable to recognize "STDIN"

![](https://help-assets.codehub.cn/enterprise/20211203180305.png)

出现此报错的原因一般为 yaml 文件格式问题。建议在本地集群验证 yaml 文件，确保能够在本地集群正确执行之后，再粘贴至 CODING 上使用。

### Pod 镜像未更新

部署 K8s 成功，但 Pod 镜像未更新的情况一般发生在 yaml 文件中配置的镜像 tag 没有变更，例如填写的值始终为 latest。

解决办法：你可以将 yaml 文件里的 imagePullPolicy 参数值改成 Always。修改后每次部署都会重新拉取镜像。

若镜像 tag 值不固定，一般不会出现此情况。你可以查看此次发布单的 yaml 文件确认是否选中镜像 tag。

![](https://help-assets.codehub.cn/enterprise/20211206103822.png)

### 部署流程启动后，依然显示为未开始

你可以通过以下两种方法进行排查：

1.  查看流程的基础配置是否勾选了禁止本流程并行执行选项，即同一时间只能执行一个部署。

![](https://help-assets.codehub.cn/enterprise/20211206104257.png)

2.  查看该流程是否有其他流程正在执行，你可以增加「任务数量」以便看到更多任务。

![](https://help-assets.codehub.cn/enterprise/20211206104401.png)


==== 2021/12/06 ====
