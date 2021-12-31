---
title: 云账号相关问题 - CODING 帮助中心
pageTitle: 云账号相关问题
pagePrevTitle: Kubernetes 云账号的最小权限要求
pagePrev: cd/question/private-repo.html
pageNextTitle: CODING 静态网站服务
pageNext: cd/static-website.html
---

### 使用 TKE 云账号进行部署时报错

使用 TKE 云账号部署时报错：

```bash
Deploy failed: error: unable to recognize "STDIN": no matches for kind "Deployment" in version "apps/v1"
```

这是因为以下两个资源在 istio 已经废弃，需要手动在集群删除资源。

```bash
kubectl delete apiservice v1alpha1.rbac.istio.io
kubectl delete apiservice v1alpha2.config.istio.io
```

### [各项云账号的区别是什么？](#different)

-   TKE

    如果您是从[腾讯云控制台](https://console.cloud.tencent.com/coding)中登录 CODING DevOps 平台，才会在云账号中显示此类账号，支持使用 k8s 部署。

-   Kubernetes

    支持 Kubeconfig 和 Service Account 两个常用凭据与 K8s 部署。

-   腾讯云账号

    即腾讯云 API 密钥，不支持 K8s 部署，常用于弹性伸缩组部署与 tsf 部署。

### [提示云账号已存在怎么办？](#cloud-account-exits)

云账号支持自定义命名，你可以选用新的云账号名称以避免冲突。

### [无法删除云账号](#unable-delete)

删除云账号时提示：云账号已被 xxxx应用使用，无法改名或删除，若需删除，请先解除关联关系。因为应用是和云账号关联的，删除云账号前需删除该账号所关联的应用资源。你可以前往「部署控制台」→「应用」→「Kubernetes 集群」删除已绑定的应用资源。




==== 2020/08/13 ====
