---
title: DevOps - 从渐进式交付说起（含 Demo） - CODING 帮助中心
pageTitle: DevOps - 从渐进式交付说起（含 Demo）
pagePrevTitle: DevOps 视角的前后端分离
pagePrev: start/best-practice/front-back.html
pageNextTitle: DevOps 的分与合
pageNext: start/best-practice/devops-inside.html
alias: best-practices/pro-delivery.html
---

<! [](https://help-assets.codehub.cn/enterprise/20200604135258.png)

如果让你主导一款千万、甚至亿级用户产品的功能迭代，你会怎么做？
你需要面对的挑战可能来自于：

> 商业战略的变化带来新的产品诉求，而产品的任何改动哪怕仅是界面调整，都将面临无数存量用户的挑战。

这时候，作为产品负责人，你会选择稳定压倒一切？还是自我革新，继续向前探索用户与市场的可能呢？这时候向 Facebook、Twitter 等互联网巨头的学习显得尤为必要。我们通过调研，试图窥探他们在瞬息万变的市场中仍然保持“稳定”迭代的秘密 - ***渐进式交付***

通过本篇文章，你将收获：

> 1.  什么是渐进式交付，为什么 DevOps 能够天然与其结合
> 2.  为什么渐进式交付能赋予大规模组织下的产品持续交付及稳定迭代的能力
> 3.  小项目，大项目同样适用的实践经验

### [🤔️ 何为渐进式交付](#what-is)

移动互联网时代的爆发，诞生了一大批巨型互联网企业和项目，部分大型项目的技术复杂程度和组织复杂程度甚至不亚于传统的工业项目，为了实现对这些项目的管理和迭代，我们不妨先将目光投至传统工业寻找答案。

“渐进式交付”一词最早起源于大型、复杂的工业化项目，比如：铁路、汽车和军事产业、新基建的 5G 网络产业等等。它和 DevOps 的目标一致，试图将复杂的工程化项目进行分阶段拆解，通过持续进行小型迭代闭环，降低交付成本和节约交付时间。

“渐进式交付”流行于互联网产品是在近两年 Kubernetes 以及云原生大规模使用之后。这两项技术的出现，为“渐进式交付”在互联网的应用提供了基础设施和实现方法。

而 DevOps 是“渐进式交付”的实现手段，而其中的“流水线”为“渐进式交付”提供了实现途径。在产品的迭代过程，可以将“渐进式交付”的具体行为附着在“流水线”中，将整条交付“流水线”看做是产品迭代的一个过程和一次“渐进式交付”周期。

说了这么多“渐进式交付”的理论基础，在实践中又是以哪些技术方法落地呢？

**1. A/B 测试**
**2. 金丝雀/灰度发布**

以 Facebook 为例，每次发布重大功能，都会经历一次典型的“渐进式交付”过程：

1.  迭代发布
2.  公司全员 A/B 测试
3.  特定用户 A/B 测试
4.  灰度发布
5.  全量发布

**这种渐进式交付的好处是，对于新迭代正式推向市场前提供了灰度用户的数据支撑，帮助决策者充分了解用户倾向和市场诉求。**

在“渐进式交付”的过程中，A/B 测试环节以及灰度发布环节都可以根据用户数据和市场反馈决定是否进入全量发布，这种方式既能够保证迭代敏捷进行，又能够保证迭代的用户和市场安全性。

#### [A/B 测试](#a-b-test)

例如通过对用户画像中地理位置和性别组合条件进行 A/B 测试，使其访问新版本，而其他的用户则继续访问旧版。一段时间后，研究用户行为数据和用户体验报告，决定功能是否继续进入下一个发布环节。

![](https://help-assets.codehub.cn/enterprise/20200604140106.png)

#### [金丝雀/灰度发布](#grey-test)

使用特定分流技术使流量由新老版本共同承担，如典型的“MurmurHash”算法。

![](https://help-assets.codehub.cn/enterprise/20200604141038.png)

### [💰 技术价值和商业价值](#value)

从原理上来看，这些技术并不是多么新的技术，比如 A/B 测试，我们用最原始的方式：业务代码增加逻辑判断条件也可实现，但为什么没有大规模运用呢？

原因很简单：纯业务代码的实现依赖于技术开发，需求方无法自主控制 A/B 测试的环境和条件，这种过度依赖于技术开发并不能带来规模化的运用。我们需要的是一种完全脱离业务代码的实现方式，最好能以自动化/半自动化实现，并且尽量能把这个动作加入到已有的内部流程内。

现在，有了云原生和 Kubernetes 的支持，结合 DevOps 的流水线，自动化的渐进式交付成为了可能。

我们参考 Facebook 的发布方式，设计了下面这个 Pipeline Demo。

![](https://help-assets.codehub.cn/enterprise/20200604141335.png)

它主要实现了：

> 1.  提交代码后自动执行单元测试，并构建 Docker 镜像；
> 2.  将 Docker 镜像推送到私有制品库，自动触发流水线；
> 3.  执行 K8S Job Migrate 数据库（如果有改动），并部署新版到预发布环境；
> 4.  人工确认：发布生产环境前是否进行 A/B 测试；
> 5.  A/B 测试通过后，设置灰度发布的比例，自动灰度发布；
> 6.  人工确认：是否全量发布生产环境；
> 7.  生产环境自动配置限流和熔断策略，保证生产稳定；

最终实现的效果：

1.  提交代码后自动构建镜像、单元测试、推送到镜像仓库并触发 CD 流水线；

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/gradual-devops/4.gif)

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/gradual-devops/5.gif)

2.  执行 K8S Job 对预发布环境数据库自动 Migrate，并发布到预发布环境；

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/gradual-devops/6.gif)

3.  此时通过访问 <http://dev.coding> 可以访问到新发布的服务。

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/gradual-devops/7.gif)

4.  人工确认：在发布生产环境前选择是否进行 A/B 测试；

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/gradual-devops/8.gif)

5.  在本例，发布后以 Header 包含 location=shenzhen 作为区分 A/B 测试流量。

在浏览器内直接请求 <http://pro.coding>，流量仍然分流到生产环境。在 Postman 携带 location=shenzhen 的 Header 请求，可以发现流量被分流到“A/B 测试环境”；

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/gradual-devops/9.gif)

6.  人工确认：设置期望的灰度发布比例，自动灰度发布，如选择灰度发布比例为 50%；

![](https://help-assets.codehub.cn/enterprise/20200604143447.png)

7.  请求 <http://pro.coding>，灰度发布环境和生产环境将以 1:1 的流量比例对外提供服务；

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/gradual-devops/11.gif)

8.  人工确认：全量发布生产环境；

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/gradual-devops/12.gif)

9.  此时请求 <http://pro.coding> 访问的是生产环境新版本；

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/gradual-devops/13.gif)

10. 自动配置限流和熔断策略，保证生产稳定性。通过压力测试可看到并发请求有一部分被限流；

HttpCode=429，代表 Too Many Requests ，拒绝服务。

![](https://help-assets.codehub.cn/enterprise/20200604143745.png)

> 对于开发人员，这种渐进式交付经过多轮的灰度、A/B 测试，最大程度减少代码 BUG 发布到生产环境；

> 对于运维人员，这种几乎全自动的交付方式改变了手动修改 yaml 文件，手动 apply 的麻烦，最大程度减少发布产生的人为错误。通过自动触发的方式，减小了与开发的沟通成本；

> 对于产品经理和运营人员，产品迭代不再是靠内部团队“YY”，而是基于实际用户体验数据，了解新功能对于用户和市场的反馈，最大程度减小新功能的用户和市场风险；

### [💻 动手实践](#practice)

1.  准备一个 K8S 集群，推荐使用腾讯云容器服务；
2.  K8S 集群部署 Traefik 替换 nginx-Ingress 作为 Ingress Gateway，提供更好的流量治理能力；
3.  开通 CODING DevOps，提供镜像构建和流水线的部署能力；
4.  克隆示例代码并推送到自己的 CODING 代码仓库；
5.  复制模板创建部署流水线；
6.  尽情测试；

#### [克隆源代码并创建构建计划](#clone-build)

1.  克隆源代码并推送到自己的 CODING 仓库。

```bash
git clone https://e.coding.net/wangweicoding/cd-production.git
git remote remove origin
git remote add origin 你的 CODING 仓库地址
git push origin master
```

2.  创建构建计划。

-   使用 cd-production 代码仓库内的 Jenkinsfile 创建构建计划

![](https://help-assets.codehub.cn/enterprise/20200604145351.png)

#### [开通腾讯云容器服务](#enable-tke)

-   开通集群，并在 CODING DevOps 新建 K8S 集群凭证（如有必要，请允许集群外网访问）

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/gradual-devops/16.gif)

#### [通过 CODING DevOps 初始化 Traefik](#initiate)

-   复制代码仓库 cd-production 的 coding-templates/traefik.json 内容，并在 部署控制台 创建 pipeline，点击“编辑 JSON 配置”，将内容复制到输入框。

![](https://help-assets.codehub.cn/enterprise/20200604145546.png)

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/gradual-devops/18.png)

点击“Update Pipeline”后，自动创建了对应的 Pipeline。

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/gradual-devops/19.png)

**注意请将每一个阶段的云账号修改为自己的云账号。**

再点击“保存”即完成 Traefik 初始化的 Pipeline 创建，返回后，点击“立即启动”完成集群 Traefik 的初始化。

进入“腾讯云”容器服务，打开集群 Service，点击命名空间 traefik-system ，找到名为 traefik-ingress 的 IP 地址，并在本机新建两个 Host 规则：

```bash
IP地址 dev.coding
IP地址 pro.coding
```

这样在本地通过访问 dev.coding 就可以访问发布的服务了。


#### [通过 CODING DevOps 初始化 Mysql](#initiate-mysql)

-   以上述同样的操作复制代码仓库 cd-production 的 coding-templates/mysql.json 内容，并在每一个阶段修改为自己的“云账号”，创建 Pipeline 并启动完成集群 Mysql 的初始化。

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/gradual-devops/20.png)

#### [创建渐进式交付流水线](#create-pipeline)

> 在创建渐进式交付流水线之前，请先开通 CODING 制品库，开通完成后，请按照指引在本地使用 cd-production 的 Dockerfile 构建镜像并推送至“制品库”

随后以上述同样的操作复制代码仓库 cd-production 的 coding-templates/devops.json 内容，创建渐进式交付的 Pipeline。

**请将“配置”阶段的“启动所需制品”修改为自己的 CODING 项目、Git 仓库、镜像仓库、镜像。**

**请将“配置”阶段的“自动触发器”修改为自己的 CODING 项目、镜像仓库、镜像。**

**请将每一个阶段的云账号修改为自己的云账号。**

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/gradual-devops/21.png)

尝试修改项目 index.html 并推送，触发流水线。

### [⚙️ 项目说明与核心原理](#description)

#### [项目说明](#project)

```bash
├── Dockerfile
├── Jenkinsfile  # CODING CI 构建脚本
├── Pipfile
├── Pipfile.lock
├── README.md
├── app.py
├── coding-templates
│   ├── devops.json  # CODING CD 渐进式交付模板
│   ├── mysql.json    # CODING CD Mysql 初始化模板
│   └── traefik.json   # CODING CD Traefik 初始化模板
├── config.py
├── database_version.py
├── devops
│   ├── README.md
│   ├── mysql
│   │   ├── dev
│   │   │   ├── mysql-deployment.yaml
│   │   │   └── mysql-pv.yaml
│   │   └── pro
│   │       ├── mysql-deployment.yaml
│   │       └── mysql-pv.yaml
│   └── traefik
│       ├── deployment
│       │   ├── configmap.yaml
│       │   └── deployment.yaml
│       ├── deployment.yaml
│       ├── open-treafik.yaml
│       └── router
│           ├── dev
│           │   └── flask-dev.yaml      # Dev 环境的 Traefik IngressRoute 规则
│           └── pro
│               ├── circuitbreaker.yaml  # Pro 环境的 Traefik 熔断规则
│               ├── flask-abtest.yaml    # Pro 环境的 A/B Testcase
│               ├── flask-pro-all.yaml   # Pro 环境的 Traefik IngressRoute 规则
│               ├── flask-pro.yaml
│               ├── mysql-ratelimit.yaml
│               ├── mysql-tcp-router.yaml
│               └── ratelimit.yaml         # Pro 环境的 Traefik 限流规则
├── flask_test.py
├── k8s-canary                             # 灰度发布环境的 K8S Manifest
│   ├── deployment.yaml                
│   └── nodeport-canary.yaml
├── k8s-dev                                 # Dev 环境的 K8S Manifest
│   ├── deployment.yaml                
│   ├── migrate-mysql-job.yaml     # Dev 环境的 Migrate Database K8S Job
│   ├── nodeport-service.yaml
│   └── service.yaml
├── k8s-pro                                 # Pro 环境的 K8S Manifest
│   ├── deployment.yaml
│   ├── migrate-mysql-job.yaml
│   └── nodeport-service.yaml
├── manage.py
├── migrations
│   ├── README
│   ├── alembic.ini
│   ├── env.py
│   ├── script.py.mako
│   └── versions
│       ├── 95585fe4b611_initial_migration.py
│       └── fece98dad497_second_migrate.py
├── requirements.txt
└── templates
    └── index.html                           # 项目发布首页
```

#### [核心原理](#principle)

在这个例子中，我们使用了 Traefik 作为集群网关，使用 Router 对 Host dev.coding 和 pro.coding 进行匹配，使流量按照不同发布阶段进行不同的分配。

#### [架构图](#architecture)

**Dev 环境架构图**

访问 dev.coding 时，Router 匹配到此 Host 规则，将流量转发到名为 k8s-flask-nodeport 的 Service（即 Dev 环境的 Service）。

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/gradual-devops/22.png)

Traefik Router 核心配置代码为：

```bash
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: k8s-flask-dev
  namespace: dev
spec:
  entryPoints:
  - web
  routes:
  - kind: Rule
    match: Host(`dev.coding`)
    services:
    - name: k8s-flask-nodeport
      port: 8080
      namespace: dev
```

**A/B 测试环境架构图**

访问 pro.coding 时，Router 匹配到此 Host 规则，并检查 Header 是否匹配，并将根据匹配结果决定将流量转发到 k8s-flask-canary 或者 k8s-flask 两个不同环境的 Services。

![](https://help-assets.codehub.cn/enterprise/20200604151015.png)

A/B 测试 Traefik Router 核心配置代码为：

```bash
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: k8s-flask-abtest
  namespace: pro
spec:
  entryPoints:
  - web
  routes:
  #A/B test
  - kind: Rule
    match: Host(`pro.coding`) && Headers(`location`, `shenzhen`)
    services:
    - name: k8s-flask-canary
      port: 8080
      namespace: pro
```

**灰度发布架构图**

访问 pro.coding 时，Router 匹配到此 Host 规则，并根据配置的 Weight 权重，将流量按比例转发到 k8s-flask-canary 或者 k8s-flask Service。

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/gradual-devops/24.png)

例如以 1:1 的比例分配灰度比例，Traefik Router 核心配置代码为：

```bash
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: k8s-flask-pro
  namespace: pro
spec:
  entryPoints:
  - web
  routes:
  #canary deploy
  - kind: Rule
    match: Host(`pro.coding`)
    services:
    - name: k8s-flask
      port: 8080
      namespace: pro
      weight: 50    # 权重比例
    - name: k8s-flask-canary
      port: 8080
      namespace: pro
      weight: 50    # 权重比例
```

当全量发布生产环境的时候，只需要将 Canary 环境的的 Weight 权重设置为 0 ，即所有流量都转发到生产环境。

**熔断和限流架构图**

在生产环境，我们一般使用限流和熔断技术来应对流量激增，牺牲部分用户的体验来保证生产环境的稳定。Traefik 内熔断和限流是通过配置 middlewares 来实现，对流量进行匹配后，再进行中间件二次流量确认。

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/gradual-devops/25.png)

Traefik Middlewares 限流核心配置：

```bash
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: flask-k8s-traffic
  namespace: pro
spec:
  rateLimit:
    # 1s 内接收的请求数的平均值不大于500个，高峰最大1000个请求
    burst: 1000
    average: 500
```

Traefik Middlewares 熔断核心配置：

```bash
# Latency Check
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: k8s-flask-breaker
  namespace: pro
spec:
  circuitBreaker:
    expression: LatencyAtQuantileMS(50.0) > 100
    # 50% 的请求比例响应时间大于 100MS 时熔断
```

### [🔚 小结](#conclusion)

Kubernetes 和 Service Mesh 的出现，给 DevOps 带来了更多可能，渐进式交付只是一种借助其便利性的比较典型的发布方式。
我们借助了 Traefik 作为集群网关，通过分流技术实现了 A/B 测试和灰度发布，当然，你也可以引入 Service Mesh 使用 Istio 管理集群流量，借助 Virtual Service 和 Destination Rule 实现同样效果。
借助 CODING DevOps 的能力，我们将“推送代码”、“构建镜像”、“触发部署流程”进行打通，实现了自动化的 DevOps 能力。
当然，还可以做到更多有价值的发布流程，比如：

-   运营、产品人员可以实现很方便地随时修改 A/B Testcase 进行分流测试，只需要配置一个修改 A/B Testcase 的 Pipeline ，输入相关的分流指标，并运行即可生效；

-   除了 A/B Testcase ，灰度发布也变成了实时可控的数值，甚至可以实现一个“渐进式灰度发布”的 Pipeline ，增加 Wait 阶段实现灰度比例随着时间推移自动增加；

-   可以很方便地实现一个自动回滚的 Pipeline，通过输入版本号就可以实现自动回滚到对应的版本，如使用数据库 ORM 产品，甚至可以实现数据库的自动回滚;

-   Traefik 提供的熔断和限流能力，结合 Pipeline 的 Webhook 触发以及监控系统如 Prometheus 联动，可以实现业务系统压力较大的时候自动触发熔断和限流 Pipeline 改变限流策略，保证生产环境的稳定性；

### [📖 资源链接和参考资料](#reference)

-   [Demo Git 仓库地址](https://e.coding.net/wangweicoding/cd-production.git)

-   [CODING 持续集成（CI）](https://coding.net/products/ci)

-   [CODING 持续部署（CD）](https://coding.net/products/cd)

-   [Tencent TKE](https://cloud.tencent.com/product/tke)

-   [Facebook 的增长神器 —— 灰度发布 + A/B testing](https://www.leiphone.com/news/201511/egQAOzoaf5oDikw3.html)

-   [Traefik 文档](https://docs.traefik.io/)

==== 2020/08/13 ====
