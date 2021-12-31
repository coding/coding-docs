---
title: Kubernetes 云账号的最小权限要求 - CODING 帮助中心
pageTitle: Kubernetes 云账号的最小权限要求
pagePrevTitle: 部署 Kubernetes 资源时拉取私有库镜像
pagePrev: cd/question/private-repo.html
pageNextTitle: CODING 静态网站服务
pageNext: cd/static-website.html
---

若希望在 Kubernetes 场景下（K8s 云账号）完成应用发布，CODING 持续部署需要调用相关的 Kubernetes APIs。CODING 团队不推荐您将 Kubernetes 集群所有权限皆授予 CODING CD；得益于 Kubernetes 的 RBAC（Role Based Access Control）机制，您可以给 CODING CD 配置应用发布所需的最小权限。下文是配置最小权限的指引。

### Role

CODING 推荐您在需要开放权限的命名空间中创建 `Role`，并将 `ServiceAccount` 和 `Role` 进行绑定。

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
 name: coding-cd-role
rules:
- apiGroups: [""]
  resources: ["namespaces", "configmaps", "events", "replicationcontrollers", "serviceaccounts", "pods/logs"]
  verbs: ["get", "list"]
- apiGroups: [""]
  resources: ["pods", "pods/portforward", "services", "services/proxy", "secrets"]
  verbs: ["*"]
- apiGroups: ["autoscaling"]
  resources: ["horizontalpodautoscalers"]
  verbs: ["list", "get"]
- apiGroups: ["apps"]
  resources: ["controllerrevisions", "statefulsets"]
  verbs: ["list"]
- apiGroups: ["extensions", "app", "apps"]
  resources: ["deployments", "replicasets", "ingresses", "daemonsets"]
  verbs: ["*"]
```

### Service Account

下一步是为 CODING CD 创建一个 `Service Account`，持续部署控制台将会用此 `Service Account` 与 Kubernetes 集群交互。您可以使用如下的 manifest 创建 `Service Account`。

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
 name: coding-cd-service-account
 namespace: default
```

### Role Binding

最后，创建一个 `RoleBinding` 将上述的 `coding-cd-role` 与 `coding-cd-service-account` 进行绑定。

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
 name: coding-cd-role-binding
 namespace: default
roleRef:
 apiGroup: rbac.authorization.k8s.io
 kind: Role
 name: coding-cd-role
subjects:
- kind: ServiceAccount
  namespace: default
  name: coding-cd-service-account
```


==== 2020/08/13 ====
