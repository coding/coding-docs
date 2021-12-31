---
title: 云账号 - CODING 帮助中心
pageTitle: 云账号
pagePrevTitle: 部署控制台
pagePrev: cd/console.html
pageNextTitle: 应用与项目
pageNext: cd/app-project.html
alias: cd/cloudaccount.html
---

云账号是访问云资源的凭证，只有配置了云账号，持续部署控制台才能实现对云资源的部署管理和基础设施管理。目前支持三种云账号类型：

*   腾讯云 TKE：如果您是从腾讯云开发者平台入口注册登录，才会显示此类账号。
*   Kubernetes：支持 Kubeconfig 和 Service Account 两个常用凭据。
*   腾讯云账号：即腾讯云 API 密钥。

点击团队首页右上角的齿轮图标 <img src ="https://help-assets.codehub.cn/enterprise/20210928153255.png" style ="margin:0"> 进入团队设置中心，在「功能设置」→「云账号」中配置云账号。

![](https://help-assets.codehub.cn/enterprise/20211013192526.png)

### [Kubernetes](#k8s)

Kubernetes 云账号支持 Kubeconfig 和 Service Account 两种常用凭据。以 Kubeconfig 为例：

登录云计算网页控制台，复制 Kubeconfig，并将 CODING IP 段添加至集群外网访问控制列表（白名单）。

> CODING 持续部署的公网 IP 段：
> 212.64.105.0/24
> 212.129.144.0/24

![](https://help-assets.codehub.cn/enterprise/20210408195115.png)

将 Kubeconfig 粘贴到 CODING 中，选择 Cluster Context，完成云账号添加。

![](https://help-assets.codehub.cn/enterprise/20210625110357.png)

### [腾讯云 TKE](#tke)

1.  云账号类型选择腾讯云 TKE，按照指引完成与云账号名下的集群绑定。若没有集群请前往[腾讯云 TKE](https://cloud.tencent.com/product/tke) 创建集群。

![](https://help-assets.codehub.cn/enterprise/20200729165720.png)

2.  选择拟部署的集群，点击确定后会自动验证该账号名下的集群并完成互联。

![](https://help-assets.codehub.cn/enterprise/20200729171128.png)

### [腾讯云账号](#tencent-cloud)

1.  云账号类型选择腾讯云账号，输入云账号名称，并选择区域。支持多选区域，CODING 持续部署将获得勾选区域的腾讯云资源管理权限。

![](https://help-assets.codehub.cn/enterprise/20200729172607.png)

2.  在腾讯云[【访问管理】](https://console.cloud.tencent.com/cam/capi)】页面中拷贝 API 密钥信息。

![](https://help-assets.codehub.cn/enterprise/20200730102220.png)

3.  将拷贝的 SecretID 和 SecretKey 粘贴到对应的文本框，点击【确定】完成云账号添加。


==== 2021/04/08 ====
