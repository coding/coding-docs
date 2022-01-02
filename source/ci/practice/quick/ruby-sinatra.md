---
title: 将 Ruby + 项目发布至腾讯云 TKE - CODING 帮助中心
pageTitle: 将 Ruby + 项目发布至腾讯云 TKE
pagePrevTitle: PHP + Zend Framework 构建应用
pagePrev: ci/practice/quick/php-zend.html
pageNextTitle: Java + Android 构建应用
pageNext: ci/practice/quick/java-android.html
alias: best-practices/ci/1minute/ruby-sinatra.html
---

持续集成是敏捷开发的重要实践之一，它倡导团队通过自动化构建工具频繁地验证软件可用性，从而尽早发现集成错误并集中精力改善软件质量。

本文将使用 CODING DevOps 与腾讯云容器服务（下称 TKE）实践 Ruby + Sinatra 应用开发。本文涵盖单元测试、构建 Docker 镜像、推送到制品库、部署到 K8s 集群等环节，讲述如何实现项目的自动化构建、测试、发布、部署。

### [前置准备](#prerequisite)

-   [示例仓库](https://e.coding.net/StrayBirds/demo/ruby-sinatra-demo.git)
-   [CODING 项目](/docs/start/project.html)
-   [Docker 制品仓库](/docs/artifacts/quick-start/docker.html)
-   [腾讯云 TKE 集群](https://console.cloud.tencent.com/tke2/overview)

### [将制品库凭证录入至 TKE](#tke)

因 K8s 集群从制品库拖取镜像需要访问凭证，需要将 CODING 项目中的 Docker 制品仓库的配置凭据导入至 TKE。输入密码后复制系统自动生成的访问令牌：

![](https://help-assets.codehub.cn/enterprise/20211207172622.png)

设置凭证中包含三重信息：

-   库域名：`StrayBirds-docker.pkg.coding.net`
-   用户名：`ruby****`
-   密码：`1261*****`

在 TKE 集群中点击「集群」→「配置管理」→「Secret」，将制品仓库凭据进行录入。

![](https://help-assets.codehub.cn/enterprise/20211207173204.png)

### [录入集群凭据](#kubeconfig)

前往 TKE 控制台中的基本信息，复制集群 APIServer 信息中的 `Kubeconfig`。需勾选外网访问按钮，录入构建机的出口 IP：`111.231.92.100/32,81.68.101.44/32`。

![](https://help-assets.codehub.cn/enterprise/20211208111901.png)

复制后将其录入至「项目设置」→「开发者选项」→「凭据管理」中。凭据类型选择「Kubernetes 凭据」并勾选所有持续集成计划授权。

![](https://help-assets.codehub.cn/enterprise/20211207174733.png)

### [在集群中创建 Deployment](#create-deployment)

为方便将应用部署 K8s 集群中，需要先创建 Deployment 工作负载，之后就可以通过持续集成任务反复将新构建的应用镜像部署到 K8s 集群上。

点击「工作负载」→「Deployment」中的新建按钮。

![](https://help-assets.codehub.cn/enterprise/20211208145916.png)

由于现在还没有构建物镜像，此处选用 nginx r 镜像进行代替，以确保 Deployment 正常运行。

![](https://help-assets.codehub.cn/enterprise/20211208145811.png)

在访问设置中填写所需开放的容器端口，确认无误后完成 Workload 创建。

### [配置构建计划](#deploy-ci)

点击项目左侧菜单栏中的「持续集成」功能，轻点右上角的「创建构建计划」按钮，选择「自定义构建过程」模板。

![](https://help-assets.codehub.cn/enterprise/20211207175532.png)

Ruby + Sinatra 应用持续集成过程分成 6 个阶段：

1.  开始阶段
2.  运行单元测试
3.  构建 Docker 镜像
4.  推送到制品库
5.  部署到 K8s 集群

#### [1. 开始阶段](#1)

此阶段是默认生成的，几乎所有持续集成的构建计划都会包含此阶段。在这个阶段中可以配置一些全局使用的参数，例如构建基础环境、环境变量等。本实践需要在此处添加 3 个[环境变量](/docs/ci/configuration/env.html)，以便被后续阶段所引用。

-   `CODING_DOCKER_REG_HOST`：制品库主机，用于登录制品库。
-   `DOCKER_IMAGE_NAME`：Docker 镜像名称，用于构建和推送镜像。
-   `TKE_CLUSTER_CREDENTIAL_ID`：TKE 集群凭据 ID。

![](https://help-assets.codehub.cn/enterprise/20211208115043.png)

你可以参考下图进行命令填写或替换：

![](https://help-assets.codehub.cn/enterprise/20211208120857.png)

TKE 的集群凭据 ID 填写在上文中录入的 Kubernetes 凭据。

![](https://help-assets.codehub.cn/enterprise/20211208121749.png)

#### [2. 配置单元测试阶段](##2)

「检出」阶段不作修改。在图形化编辑器中点击蓝色 + 号新建阶段，命名为单元测试。在步骤中添加「执行 Pipeline 脚本」，填写下文中的示例测试代码：

```groovy
docker.image('ruby:2.6').withRun('-v $(pwd):/app -w /app') { c ->
    sh 'bundle install'
    sh 'rake test'
}
```

![](https://help-assets.codehub.cn/enterprise/20211208123638.png)

#### [3. 构建 Docker 镜像阶段](#3)

新建阶段并命名为构建 Docker 镜像。在步骤中添加「执行 Pipeline 脚本」，填写下文中的示例代码：

```groovy
docker.build("${env.DOCKER_IMAGE_NAME}:${env.GIT_BUILD_REF}")
```

![](https://help-assets.codehub.cn/enterprise/20211208124637.png)

此处涉及的环境变量已在「开始阶段」中进行配置，而标签所内置的环境变量 `GIT_BUILD_REF` 的值对应检出代码步骤中的 Git 修订版本号。

#### [4. 推送到制品库阶段](#4)

新建阶段并命名为构建 Docker 镜像。在步骤中添加「执行 Pipeline 脚本」，填写下文中的示例代码：

```groovy
    docker.withRegistry("https://${env.CODING_DOCKER_REG_HOST}", "${env.CODING_ARTIFACTS_CREDENTIALS_ID}") {
        docker.image("${env.DOCKER_IMAGE_NAME}:${env.GIT_BUILD_REF}").push()
    }
```

![](https://help-assets.codehub.cn/enterprise/20211208140118.png)

#### [5. 部署到 K8s 集群](#5)

新建阶段并命名为部署到 K8s 集群，在步骤中添加「执行 Pipeline 脚本」，填写下文中的示例代码：

```groovy
    withKubeConfig([credentialsId: "${env.TKE_CLUSTER_CREDENTIAL_ID}"]) {
        sh "kubectl patch deployment ruby-sinatra --patch '{\"spec\": {\"template\": {\"spec\": {\"containers\": [{\"name\": \"ruby-sinatra\", \"image\": \"${env.DOCKER_IMAGE_NAME}:${env.GIT_BUILD_REF}\"}], \"imagePullSecrets\": [{\"name\": \"ruby-sinatra-reg\"}]}}}}'"
    }
```

![](https://help-assets.codehub.cn/enterprise/20211208140401.png)

完成配置后，点击「立即构建」按钮手动触发构建过程。待整个流程运行完成后，可以查看每一步的运行日志。

![](https://help-assets.codehub.cn/enterprise/20211208140854.png)

### [配置自动化触发规则](#auto-triggle-rule)

在持续集成设置中还可以配置多种自动化触发规则，如果默认配置无法满足需求，还可自行配置所需的规则，点击了解[更多详情](/docs/ci/configuration/trigger.html)。

![](https://help-assets.codehub.cn/enterprise/20211208141642.png)

### [查看构建产物](#result)

持续集成运行完成后，可以看到构建产物已自动上传至制品仓库中。

![](https://help-assets.codehub.cn/enterprise/20211208142420.png)

### [查看部署结果](#k8s-status)

构建计划运行成功后，可以前往 TKE 控制台查看 Deployment 的部署状态。

![](https://help-assets.codehub.cn/enterprise/20211208142935.png)

以上是一个简单的自动化部署示例项目。若实际项目需要体系化建设、回退机制、负载流量控制、发布时间窗口、更新策略等可以直接使用[持续部署](/docs/cd/overview.html)功能。

==== 2021/12/08 ====
