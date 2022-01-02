---
title: CODING CD 主机组部署实践 - CODING 帮助中心
pageTitle: CODING CD 主机组部署实践
pagePrevTitle: 基于腾讯云弹性伸缩（AS）的持续部署
pagePrev: cd/best-practice/cvm-cd.html
pageNextTitle: 使用 CODING 持续部署的强大表达式
pageNext: cd/best-practice/expression-cd.html
alias: best-practices/cd/host-group.html
sitemap: false
---

**主机组部署**，即*在原生 Linux 系统上，进行应用的部署*。它是早期软件开发里常见、常用的部署方式，但随着 Docker、Kubernetes 的兴起，针对此类部署方式的支持也愈加稀少。因此一套整合了代码、制品、部署的整套流程更是屈指可数。如今 CODING CD 推出的主机组部署功能，正好能够弥补上这个缺口，让这种看似“原始”的方式也能加入进 DevOps 环中。本文将以一个简单实例的方式，来介绍 CODING CD 主机组部署的使用场景与流程。

### 概念与原理

使用主机部署前，需要简单了解 3 个与其相关的基本概念，会让您对后续的流程有一个更加深刻的理解。

#### agent

**一个由 CODING 开发的二进制程序包**，名称为 `cloud-agent`，它是作为 CODING CD 与您想要管理的主机之间的沟通桥梁。

 `cloud-agent` 默认以后台进程启动，启动时会**主动**与 CODING CD 建立长连接，并通过长连接来接收 CODING CD 的指令，如部署。接收到指令后，通过 SSH 到相应的主机上去，做相应的处理。

目前 `cloud-agent` 只支持 Linux（macOS 也支持，但未提供该版本的二进制下载链接）。

#### 堡垒机

**运行 agent 的机器**。当您在某一台机器上运行 agent 时，该机器便变成了堡垒机。

对堡垒机的要求总结来说一句话：既能“攘外”，又能“安内”。外便是 CODING，内便是您的主机。即如下两点：

1.  **能够访问外网**，以便连接上 CODING 服务。
2.  **能够使用 SSH 免密登录**您想管理的**主机组**。

#### 主机组

**堡垒机能够访问的主机**。从另外一个角度说，主机组也是 CODING CD 能够“掌控”的主机。同时，主机组也是您真正部署服务的机器。因此，您所部署的服务的依赖，需要先在主机组上解决。

对主机组的要求只有一点：**开启 SSH 服务**，并**能够被堡垒机免密访问**。

### 适用场景

总体思想：CODING CD 借助 agent 实现部署，不对您的主机及主机构成的网络构成侵入。使用的场景以及工作原理，如下所示：

![](https://help-assets.codehub.cn/enterprise/20201211105718.png)

场景主要分为两种，一种是在公网的主机组，另一种是在私有网络的主机组。在本文中，将采用第二种，基于私有网络的主机组部署。

### DEMO 简介

主要包含 DEMO 的基本介绍，详细的介绍请 clone 该 [DEMO](https://ci-cd.coding.net/public/host-server-deploy/host-server-deploy-demo/git/files) 项目到本地进行体验。

#### 项目信息

-   service-one (端口：9001)
-   /health ：健康检查用
-   /service-1/hola：hello-world 请求
-   service-two (端口：9002)
-   /health ：健康检查用
-   /service-2/hello：hello-world 请求
-   service-three (端口：9003)
-   /health ：健康检查用
-   /service-3/hi：hello-world 请求

#### 主机组信息

拥有 4 台本地机器，一台作为 AGENT，一台作为主机 1，一台作为主机 2，一台用作请求转发。

|          | 堡垒机       | 主机 1           | 主机 2           | 负载均衡    |
| -------- | ------------ | --------------- | --------------- | ----------- |
| IP       | 172.16.73.4  | 172.16.73.2     | 172.16.73.3     | 172.16.73.1 |
| PORT     |              | 22              | 22              | 80          |
| 登录用户 | agent        | user-for-deploy | user-for-deploy |             |
| 系统     | Ubuntu 20.10 | Ubuntu 20.10    | Ubuntu 20.10    |             |

#### 负载均衡配置

整体部署规划如下：

-   service-one 只部署到主机 1
-   service-two 只部署到主机 2
-   service-three 部署到主机 1 和主机 2

负载均衡配置如下：

```nginx
worker_processes  1;
events {
    worker_connections  1024;
}
http {
    upstream service-one {
        server 172.16.73.2:9001;
    }
    upstream service-two {
        server 172.16.73.3:9002;
    }
    upstream service-three {
        server 172.16.73.2:9003;
        server 172.16.73.3:9003;
    }
    server {
        listen       80;
        server_name  172.16.73.1;
        location /service-1 {
            proxy_pass http://service-one;
        }
        location /service-2 {
            proxy_pass http://service-two;
        }
        location /service-3 {
            proxy_pass http://service-three;
        }
    }
}
```

修改 nginx 配置文件后，启动 nginx 或重新载入配置。

### 准备工作

在 **堡垒机** 上，将公钥拷贝到主机 1、主机 2 上，实现免密登录。

```shell
ssh-copy-id user-for-deploy@172.16.73.2
ssh-copy-id user-for-deploy@172.16.73.3
```

点击团队首页右上角的齿轮图标 <img src ="https://help-assets.codehub.cn/enterprise/20210928153255.png" style ="margin:0"> 进入团队设置中心，轻点「功能设置」→「持续部署」→「堡垒机」。

![](https://help-assets.codehub.cn/enterprise/20211013192250.png)

点击`添加堡垒机`，拷贝初始化脚本，登录到 agent 上，粘贴运行，如下：

![](https://help-assets.codehub.cn/enterprise/20201211110022.png)

agent 运行成功后，可以回到`添加堡垒机`页面，看到刚刚添加的 agent，如下：

![](https://help-assets.codehub.cn/enterprise/20201211110131.png)

添加完堡垒机后，接下来添加主机组。我们可以由一个堡垒机，创建出多个主机组，此时，每个主机组的引申含义便是单个服务的集合，即服务组。例如，您的项目中有三个服务，三个服务的部署情况分别为：

-   服务 1：只部署**主机 1**
-   服务 2：只部署**主机 2**
-   服务 3：同时部署**主机 1**、**主机 2**

此时，我们可以创建 3 个主机组，分别对应于上面的三个服务。如下：

![](https://help-assets.codehub.cn/enterprise/20201211110956.gif)

至此，准备工作完毕。

#### CI 配置

在项目页面，点击`制品库`，创建名为 `jar-repo` ，用来存放 jar 包的 generic 制品库。

![](https://help-assets.codehub.cn/enterprise/20201211111419.png)

在持续集成中，点击创建流水线，选择自定义构建过程模板，然后选择使用 DEMO 项目中的 Jenkinsfile。这这个过程中，您可能需要对流水线做一些细微的调整，具体用法可参考我们持续集成的配置文档。

![](https://help-assets.codehub.cn/enterprise/20201211111512.png)

运行 CI 后，制品库中应该有 3 个 jar 包，后续是**通过制品库的制品更新**来*触发 CD*。接下来进入 CD 的配置。

#### CD 配置

打开`部署控制台`，新建`应用` host_server_deploy_demo，勾选 `主机组部署` 选项。创建应用成功后，进入该应用。我们在此选择通过 CODING Generic 制品库来触发 CD 流水线，因此每个制品对应一次服务部署，也就是说每个制品，创建一个部署流水线。

由于三个服务在配置上的相似性，在此，我们以 ServiceOne 为例，其他两个服务，可参考 ServiceOne 的配置。

1.  选择`新建流水线` ，点击`空白流程`，输入名称 `DeployServiceOne`，如下：

![](https://help-assets.codehub.cn/enterprise/20201211111745.png)

2.  点击创建，成功创建流水线后，进入流水线的配置界面。选择流水线部署服务时所需的制品，即：

-   service-one-latest.jar

在选择匹配规则完成后，记得勾选上使用默认制品，并将该制品的别名改成您能识别的，例如：ONE。然后点击保存。过程如下：

在本文中，后续两个流水线中所需制品的别名，将分别命名为 TWO、THREE。

![](https://help-assets.codehub.cn/enterprise/20201211111920.png)

3.  在保存好制品后，再创建 CODING Generic 制品库触发器，这样每次制品版本更新都能触发此流水线，也就是说，每次更新服务后，通过 CI 构建好服务的 jar 包，上传到 CODING Generic 制品库即可触发 CD 流程。

4.  接着，添加 `部署（主机组）`阶段，`阶段名称`改为 `Deploy Service One` 。选择所需要部署的服务组，即选择此次部署行为的**目标机群**。按照我们开始的规划，这里的：

-   主机组选择**服务 1**

-   服务名称为 `ServiceOne`

-   策略选`普通部署`

![](https://help-assets.codehub.cn/enterprise/20201211113513.png)

-   前置脚本做一些部署的准备工作，如干掉之前在跑的程序，如下：

  ```shell
  PID=`ps -ef | grep java | grep one.jar | awk '{print $2}'`
  if [  "$PID" = "" ]; then
    echo "not running"
  else
    echo "the service is RUNNING and it will be killed by agent"
    kill -9 $PID
  fi
  ```

-   制品选择前面配置的 `ONE`，为 service-one-latest.jar 的别名，复制到主机上的 `~/one.jar`。

![](https://help-assets.codehub.cn/enterprise/20201211113457.png)

-   后置脚本用来启动 java 程序，如下：

  ```java
   java -jar ~/one.jar > /dev/null 2>&1 &
  ```

-   启用健康探针，选择 `HTTP 探针`，请求路径填写 DEMO 中的 `/health` 的 URL，如下：

![](https://help-assets.codehub.cn/enterprise/20201211113441.png)

注意事项：

-   脚本内容（包括*前置脚本*、*后置脚本*）**不应该包括阻塞命令**，比如说开启 Java Web 服务。这样会堵塞脚本的执行，导致部署流程卡住，进而导致部署失败。对堵塞命令有如下两个建议才不会导致部署流程卡住：

-   后台运行
-   重定向标准输出与标准错误

  即对堵塞的服务，用类似 `cmd >/dev/null 2>&1 &` 的命令来启动。

-   如果开启了健康探针，**主机**中需要安装 curl 命令。

5.  在配置完 service-one 之后，**接着配置 service-two 与 service-three**。与 service-one 类似，都需要重复上面的操作。要注意修改相应的参数，新增完成后，将得到 3 个流水线，如下所示：

### 滚动部署

所谓滚动部署，即当服务的部署对象有多个时，不是一次性部署完，而是分批次部署。因此，我们能清楚地看见服务在各个实例上的发布过程。CODING CD 的主机组部署中也实现了这种能力。

我们打开 `Deploy Service Three` （*因为此服务需要部署到 2 个主机上*）的配置，找到`部署策略`，选择`滚动部署`。在此，我们选择*每次部署数量*为 1，每部署完一个批次后，*等待 60s* 之后，再进行下个批次的部署。

⚠️ 如果在上图的 `运行部署流程` 中选择了 **A 应用**的 **B 流程**，那么运行周期将变成：

1.  **B 流水线**
2.  Deploy Service Three
3.  等待 60s
4.  **B 流水线**
5.  Deploy Service Three
6.  等待 60s
7.  **B 流水线**

从上面 7 个步骤中可以看出，每一个批次都会被两个 `B 流水线` 包裹。因此，是否选择 `运行部署流程` 须根据您的实际需求来决定。目前此项功能可用来**调整负载均衡配置**。

保存流水线后，修改 service-three 的代码，即在 hi 接口中，添加前缀 `Edited:` 后推送到 CODING 代码仓库，接着触发 CI、CD，最终我们来到 service-three 的滚动部署。部署操作完成后，服务的效果可以看出，两个实例都已更新完毕。

### 结语

至此，本文所介绍的 CODING CD 主机部署，已经完毕，如果还有疑问或建议，欢迎提交[工单](https://e.coding.net/signin?redirect=/workorder)。

==== 2020/12/11 ====
