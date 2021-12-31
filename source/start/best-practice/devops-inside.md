---
title: DevOps 的分与合 - CODING 帮助中心
pageTitle: DevOps 的分与合
pagePrevTitle: DevOps - 从渐进式交付说起(含实践 Demo)
pagePrev: start/best-practice/pro-delivery.html
pageNextTitle: Opsless - Serverless 驱动的 DevOps 新形态
pageNext: start/best-practice/opsless.html
alias: best-practices/devops-inside.html
---

> DevOps 是使软件开发和 IT 团队之间的流程自动化的一组实践，以便他们可以更快，更可靠地进行构建，测试和发布软件。 DevOps 的概念建立在建立团队之间协作文化的基础上，这些团队过去一直在相对孤岛中运作。

类似这种的 DevOps 相关描述听起来特别抽象，非常学术，非常教科书，让人感觉无法落地，不知道该如何入手。很多团队在了解并实践 DevOps 的时候不能很好的多维度看待 DevOps，实践的过程也很痛苦，不知道这种新型的理念如何实际提升自己团队的战斗力。

本文从开发和运维两个视角多层次的讲解什么场景应该单独 Dev 和 Ops 什么场景应该 DevOps，即 DevOps 的分与合，并使用一个 Demo 示例告诉大家 DevOps 中的关键步骤——持续部署该如何实践。

### [DevOps 的两个视角](#two-views)

DevOps 从字面上看就是开发和运维，也有翻译为开发运维（运营）一体化。我们这里的两个视角不是别的东西，正是开发和运维。这里的开发，并不仅限于开发工程师，而指代的是整个软件的研发过程所含的所有要素，涵盖需求分析、开发、测试等等，其终点是可交付的软件制品。同样运维不仅仅是运维工程师，指代的是软件交付后投产过程以及后续的运营，反馈等系列过程，其起点是接受交付的软件制品。

这么两个视角的区分是隐含着软件工程背后的逻辑。就像一栋大楼，他的建设方是建筑和设计公司，他的运营方是物业公司一样，两者之间有相对清晰的界限。

![](https://help-assets.codehub.cn/enterprise/20200610173821.png)

我们需要回顾软件行业的发展，来看为什么 DevOps 被提出来，为什么现在要强调 Dev 和 Ops 的紧密结合以及什么场景要紧密结合，什么场景不需要。

以下四个方面促使了软件行业开始意识到 DevOps 的作用：

-   网络化：典型的传统软件代表 Office 系列，Photoshop 等大都不需要网络支持，单体安装在电脑上即可使用，这类软件不牵涉运维，所以更没有 DevOps 概念。新型的以互联网为基础的软件，例如微信，腾讯会议等都是建立在网络基础上的，这属于典型的 C/S 的架构，C/S 架构中服务器端软件地位极为重要，服务器端软件是隐藏在众多用户背后的不可见的，需要稳定性、安全性等运维诉求，就引出了开发和运维工作的协同化诉求。

-   Web 化：相对于 C/S 的软件，B/S 的软件在用户端的部分（C/S 是桌面或者手机应用，B/S 是网页）上有更高的更新发布频率，需支持更新过程不停止服务，无感更新等特性，对软件的交付速度和质量有了更高的要求，这也引出了开发和运维工作的协同化诉求。

-   云化：传统的 ERP，CRM，HRM，视频会议系统都是有软件供应商独立实施给客户方，而这些软件也都在逐步云化，产生了例如销售易，腾讯会议，钉钉，企业微信等 SaaS 应用软件，这类 SaaS 化的软件对 DevOps 诉求更为迫切。

-   敏捷化：传统的外包软件交付模式因其反馈周期长，实施成本高等弊病已经开始大规模的转向敏捷、小步快跑、高速迭代的模式，更高的交付速度要求开发和运维之间必须建设协作文化，流程，标准以及工具。

如果你的软件不符合上述四个发展方向，看到这里就够了，你不需要去实践人云亦云的 DevOps，无头苍蝇式的乱撞只会给你带来不必要的麻烦。如果你感同身受，那么 DevOps 正是逐渐把开发和运维中间的界限模糊的力量：

![](https://help-assets.codehub.cn/enterprise/20200610175015.png)

本文在探讨完毕两个视角、双向移动、四个层面后会把开发和运维的中间重叠部分（软件交付）为主题来详细阐述这一 DevOps 实践的最大难题。

#### [开发视角](#dev)

开发阶段关注的信息和概念跟运维运营阶段有相当大的差异又有部分的重叠：

![](https://help-assets.codehub.cn/enterprise/20200610175044.png)

#### [运维视角](#ops)

同样的，运维阶段关注的信息和概念与开发阶段有相当大的差异，又有部分重叠：

![](https://help-assets.codehub.cn/enterprise/20200610175109.png)

### [视角的聚焦](#focus)

在对 DevOps 概念进行理解，全局考虑的时候需要能像上文中提的一样理解开发阶段和运维阶段的广义性，但在本文设计的持续部署话题，因篇幅限制，会把视角聚焦在开发阶段的结束和运维阶段，考虑狭义的运维概念（即传统理解的运维工程师的工作范畴）通过剖析运维工程师的工作内容变化来讨论 DevOps 的分与合。

那么对于运维工程师的基本工作而言，可以把模型简化为如下两个方面：

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/devops-divide-or-join/ops-level.png)

#### [业务运维的左移](move-ops-to-left)

在高频次的程序发布，爆发式业务增长的场景下，运维团队越来越痛苦，在加上很多团队没有合适的工具系统和标准化的部署流程，经常会看到团队内的双向吐槽：

开发团队说：

> 为什么我们这边修好了 bug 今天不能给我发布？我需要查一下生产环境日志要等 3 个小时？运维同学能不能不要总是抄错配置项？

运维团队说：

> 请用文档详细撰写清楚发布步骤和注意事项并仔细评估发布风险。运维团队已经排满了所有发布计划，你这个修复问题不严重，请等下周再排。

运维团队陷入无限的机械性重复劳动中，而其中大部分工作都是低杠杆的执行发布，查询日志，执行回退等。这属于 DevOps 的分离的场景，团队与团队之间有工作压力不均，信任感缺失，目标不一致等问题，建议尝试做一些「业务运维的左移」，也即在合适的工具系统基础上把业务运维的部分权力或者人员分配到开发团队，使之可以完成大部分的程序发布、配置更新、日志查询等工作，解放运维。

形成下图效果，从人员上可以是开发兼职业务运维，也可以是开发团队有专职业务运维人员，其本质是「业务运维的主要工作闭环在开发团队内部」，实现高效运转。

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/devops-divide-or-join/business-ops-move-left.png)

这样即在某种程度上实现了 Dev 和 Ops 的合。

#### [基础设施运维的右移](#move-infra-to-right)

信息数据的安全诉求，以云为代表的基础设施的虚拟化、弹性化、甚至于代码化的发展也给运维团队的基础设施运维工作带来了新的挑战和机遇。我们会发现基础设施运维团队在云的发展下渐渐的实现了右移（把基础设施全信任的交给云处理）。

在没有云主机的年代，运维团队不得不扛着沉重的服务器去机房里对照着官方指南安装操作系统配置网络策略，在有了云主机没有容器的时代，运维团队好不容易摆脱了物理服务器，却不得不维护大量的服务器软件，安装、卸载、批量发布等，去维护业务运行的基础软件环境，在有了 Kubernetes，Docker 等容器技术之后，运维工程师又从维护软件运行基础环境中解脱，转而做更上层的基础设施：监控体系、负载均衡等，在不远的未来当 Serverless 重构云计算体系的时候，运维人员连监控体系、负载均衡等都不需要关注了，全量交给云来解决。

云的不断发展的历程也是一个逐步吞噬基础设施运维人员工作的历程，如今运维人员在云的基础上有了云 LB 不需要再运维 HAProxy，Nginx 等，有了云数据库不需要再运维 MySQL、Redis 等。如此种种，基础设施运维的工作都右移给了云。

当然这个右移不是一蹴而就的，是个渐进的过程，需要行业慢慢去接受，也需要云的成熟与发展。最近沸沸扬扬的微盟运维人员删库跑路事件是一个很好的佐证，他们使用了腾讯云，腾讯云最终帮他们找回了数据，但他们基础设施运维的右移程度不够高，换句话说叫做云原生渗透不够深，如果使用的是类似于云数据库这类云提供的数据库基础设施，那也许大可不必使用硬盘恢复技术来找回数据。

诚然，云产品还有长远的路要发展，但在现有的云的能力下，各位可以思考下，自己团队的基础设施运维右移了多少，阻碍右移的问题是什么，右移不够导致浪费了多少人员精力，带来了多少风险。

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/devops-divide-or-join/infrastructure-ops-move-right.png)

### [DevOps 的四个重要层面](#importance)

认真评估你的软件的交付机制以及运维团队左移和右移的程度是你选择采用何种 DevOps 分合策略，以及 DevOps 实践是否成功的关键因素。

DevOps 的分与合，与运维工作的左移右移，云技术的发展，云原生标准的统一有极大关系，DevOps 概念可以在很多层面上得到体现，本文就其中主要的，可以让 DevOps 团队真切感知的四个层面来做简要介绍：

#### [从人员管理层面看 DevOps](#person-manage)

要想实践 DevOps 的分与合，必须要配置上合适的团队配置。这里有若干种配置的分类：

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/devops-divide-or-join/staff1.png)

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/devops-divide-or-join/staff2.png)

-   第一种模式属于 Dev 和 Ops 分的比较彻底的类型，这种人员模型可以适配业务运维左移程度较少，交付流程较为标准化的场景，运维团队制定流程，流程和运维服务共享给所有开发团队。

-   第二种模式属于 Dev 和 Ops 合的比较彻底的类型，这种人员模型适配业务运维左移程度很高的情形，基础设施运维右移程度也很高的场景，基本上实现了每个开发团队配合云就能完整实现闭环，已经没有传统意义的独立运维部门。

-   第三种模式属于 Dev 和 Ops 部分分开、部分合并的类型，这种人员模型可以适配业务运维左移程度较多，但基础设施运维右移成都较少的场景，适用于希望能实现开发团队闭环，又对云基础设施有信任问题，需要自建基础设施（例如私有云，或基于公有云的私有基础设施）类型的团队，这种模式跟第二种模式的唯一差异是是否有自主基础设施运维团队，多见于超大规模 DevOps 建设私有云的场景。

-   第四种模式属于 Dev 和 Ops 的合并已经达到极致，可以完全无运维团队工作，在使用云基础设施和合适的开发工具基础上就可以实现开发团队内完整闭环，例如全量使用 Serverless 技术，无需担心负载均衡，弹性扩缩容，监控等基础设施工作。

没有哪个模式是完美的，在实践自己的 DevOps 人员配置的时候，要想清楚自己的实际场景，当想清楚自己的人员配置的时候，要想保持高效就要考虑这些人与人之间信息如何流转顺畅。

#### [从信息流转层面看 DevOps](#info-flow)

DevOps 是一种协作文化，协作流程，而协作的本质是顺畅、精准的信息流转。

一个简化的典型的 DevOps 信息流转模型大致如下：

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/devops-divide-or-join/information-flow.png)

信息流转顺畅和精准的根本在于信息是否是结构化、流程化、标准化的。若一个所有信息流转都依赖聊天群、开会、邮件等形式解决，看似能够一触即达的信息流转，往往会有重点不突出，信息遗漏，信息依赖人为跟进等问题，其实是不顺畅也不精确的。

核心要把握 DevOps 实践团队的几个阶段是否是信息传输顺畅且精准的：

-   开发交付测试阶段：信息提供方是开发、主接收方是测试、抄送方是产品经理、项目经理、运维等，这个提测申请是否结构化？是否具备标准？有没有流程？是否有专用工具支撑？

-   测试回馈：信息提供方是测试，主接收方是开发、抄送方产品经理、项目经理等，这个信息最简单的方式是采用体系化的缺陷管理系统配合上下游来一起管理，细化流程和标准后即可实现顺畅，精准传达。

-   交付发布：信息主提供方是开发，主接收方是运维，抄送方是产品经理、测试、项目经理等，这个阶段的自动化程度是相当重要的，要想实现自动化，前提是结构化、流程化、标准化先行。在本文的后续段落中会以 Kubernetes 体系的自动部署为实战来介绍如何结构化、流程化、标准化直至最终实现自动化。

待这几个关键环节都定义好标准和流程的时候，再次要去看其他环节的细化信息流转问题，接下来就是需要考虑使用何种工具系统为此标准和流程提速了。

#### [从工具系统层面看 DevOps](#tool-system)

DevOps 的协作文化目的是提升团队的效能，而自动化工具是必备的，好的工具体系应该是整合的、角色切面的、自动流转的。工具系统目标是顺畅精准的传输信息并且高效的执行机械化操作。

-   整合性：DevOps 的开源、商业软件有很多款，然而大多数软件系统之间都是弱整合状态，很多都是宣称支持 OAuth 或者 LDAP 用户体系就算整合了，但这里面的差距还很大。例如 Jira 的项目和 GitLab 的项目，GitLab 的项目与 TestLink 的测试计划，这些实际的概念在不通的系统之间都遵从着不同的产品设计哲学，实际上弱整合的工具系统在提升团队信息流转效率上并没有太大帮助。

-   角色切面：好的 DevOps 工具系统应该像是一个为工厂量身定制的生产流水线，各个角色各司其职，关注精准的信息，执行标准的操作，输出标准的结果。在弱整合的工具系统里可能不同系统的用户、角色、权限设计都有很大差异，难以实现角色切面。例如一套基于 Jira + GitLab + Jenkins + Kubernetes 的体系，运维角色应该加入 Jira 的项目中么？产品经理是否需要关注 Jenkins 中的 Job 执行状态？

-   自动流转：自动流转是为了解决重复性的机械劳动而设计的，要想具备自动流转的特性，整合性和角色切面也必须设计的非常好，开发完毕到提测自动部署，测试通过到自动发布，在设计好流程和标准后都是一些机械化的重复劳动。

工具系统不是万能的，有时候你会发现有了好的人员结构、信息流转方式、整合性的工具系统，实践起 DevOps 还是有一定困难，那你可能需要一个更高维度的视角——**技术架构**。

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/devops-divide-or-join/scatted-system.png)

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/devops-divide-or-join/all-in-one-system.png)

#### [从技术架构层面看 DevOps](#tech-architecture)

技术架构对 DevOps 的影响主要体现在构建、部署、运维环节。不同的软件类型，技术架构在这三方面是有很大差异的。例如单机手游，只有构建和发布市场，基本不存在部署、运维环节。而微服务架构 SaaS 化的多租户云服务在这方面就复杂的多。

这里以典型的服务器端应用的技术架构升级过程来作简要分析，例如对于一个基于 Spring 框架写成的 Java Web 应用，其发展历程可能是这样的：

-   单体 Tomcat：构建一般使用 IDE 配合 Maven/Gradle，少许团队会使用 Jenkins 之类的进行自动化构建 war 包，部署往往选择 scp/sftp 形式进行发布，停机部署，需要运维人员专门人工操作，容易出现错误。

-   多实例 Tomcat + Nginx 负载均衡 + 动静分离：构建开始变的复杂，前端的 js、css 等需要进行独立的压缩和上传，部署过程有很多运维团队开始选用 Ansible 之类的便于管理 Nginx 的复杂配置文件和多实例并行发布，Ansible 等工具为自动化的发布提供了诸多便利，但仍然要求运维人员去撰写难以维护的 PlayBook 和服务器的基础软件环境。

-   前后端分离 + 容器化：当以 Docker 为代表的容器技术开始流行的时候，团队开始尝试构建的结果不再局限到 war 包层面，可以把前端和后端分别构建出 Docker 镜像，以 Docker 镜像作为标准交付，但服务的配置信息、扩缩容能力，健康检查等问题仍然困扰着运维团队。

-   微服务化架构 + 容积集群部署：以 Kubernetes，Istio Service Mesh 等为代表的容器集群编排和微服务技术开始逐步进入大家的视野，部分团队开始尝试让开发团队自主通过 Kubernetes 工作负载 Yaml 文件、ConfigMap 等形式管理配置信息，使用 Service 配合微服务的流量控制体系进行灰度控制、服务降级、熔断处理、标准化健康检查监控等。

Serverless 无服务器架构：以 Serverless Framework、AWS Lambda、Knative 等为代表的新一代无服务器架构的服务器端应用已经帮助一些技术领先的团队实现了进一步的去运维化，后端开发只需要按照云函数的定义要求进行少量的声明或者配置，即可实现全套的 CI/CD、负载均衡、弹性伸缩、生产级别高可用等能力。如果你还不知道什么是 Serverless，欢迎来[这里了解](https://cloud.tencent.com/product/sls)。

云的发展也映射着技术架构的变迁，也引领着基础设施运维的右移，大致分为三个阶段：

-   VM/虚拟机 实现了去硬件化 Hardwareless
-   Container/容器 实现了去操作系统化 OSless
-   云函数/Serverless 实现了去服务化 Serverless

每一种技术架构的 DevOps 的实践模式是有差异的，分与合的程度也不一样。仔细品味这些技术架构的特点，认真评估自身团队业务运维左移和右移的程度，就可以选择出合适的人员管理模式、选择适合自己的工具系统，形成顺畅、精准的信息流转，从而让 DevOps 的实践取得实质性成果。

### [DevOps 的粘合剂：持续部署](#adhesive)

持续部署是软件交付的一种形式，常用于服务器端软件的交付，在这里我们以 CODING CD + Kubernetes 来简要讲述一个服务器软件持续部署模式，我们假定团队现在的各方面基本情况如下：

-   业务运维部分左移：常规发布、配置管理等基础业务运维左移到开发团队
-   基础设施运维部分右移：基础计算资源由云全托管，直接使用云的 Kubernetes 集群，负载均衡器，数据库等
-   开发团队和运维团队分离：运维团队更多的是制定业务运维规范标准和流程，在云的基础上层进行更高层次的基础设施运维，如制作业务监控体系，信息安全，日志系统等
-   整合式 DevOps 系统：直接使用 CODING 提供的集敏捷项目管理，测试管理，代码管理，持续集成，制品库，持续部署为一体的 SaaS 服务
-   简单的微服务技术架构：未引入如 Istio 等高级微服务架构（引入微服务架构的持续部署跟此示例类似，但细节过多，不适于在此文详述），使用 Docker 镜像 + Kubernetes

这种模式可能是适合目前国内大多数团队的现状的模式，具备相当的代表性，跟此模式有差异的团队也可以通过此模式来品味本文的 DevOps 思考，去改进自身的实践。

#### [前提准备](#prerequisite)

[使用腾讯云 TKE 创建一个 Kubernetes 集群](https://cloud.tencent.com/document/product/457/11741);

[准备好一套可以构建出 Docker 镜像的源代码，并提供对应的 Kubernetes Manifest 文件，示例代码库](https://wzw-test.coding.net/p/demo-for-cd/d/demo-for-cd/git);

[配置好自动构建过程](/docs/ci/process/text.html);

本示例代码比较简单，我直接贴出几个对应的核心文件：

```app.py
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "<h1>欢迎使用 CODING CD!！</h1>"

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
```

```Dockerfile
FROM python:3.7

COPY . /app
COPY pip.conf /etc/

WORKDIR /app
RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["app.py"]
```

```Jenkinsfile
pipeline {
  agent any
  environment {
    ENTERPRISE = "wzw-test"
    PROJECT = "demo-for-cd"
    ARTIFACT = "demo-for-cd"
    CODE_DEPOT = "demo-for-cd"
    
    ARTIFACT_BASE = "${ENTERPRISE}-docker.pkg.coding.net"
    ARTIFACT_IMAGE="${ARTIFACT_BASE}/${PROJECT}/${ARTIFACT}/${CODE_DEPOT}"
  }
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]],
                            userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]])
      }
    }
    stage('打包镜像') {
      steps {
		sh "docker build -t ${ARTIFACT_IMAGE}:${env.GIT_BUILD_REF} ."
        sh "docker tag ${ARTIFACT_IMAGE}:${env.GIT_BUILD_REF} ${ARTIFACT_IMAGE}:latest"
      }
    }
    stage('推送到制品库') {
      steps {
		script {
          docker.withRegistry("https://${ARTIFACT_BASE}", "${env.DOCKER_REGISTRY_CREDENTIALS_ID}") {
            docker.image("${ARTIFACT_IMAGE}:${env.GIT_BUILD_REF}").push()
          }
        }
      }
    }
  }
}
```

```deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: demo-for-cd
  name: demo-for-cd-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: demo-for-cd
  template:
    metadata:
      labels:
        app: demo-for-cd
    spec:
      containers:
      - image: demo-for-cd-image
        name: demo-for-cd
        ports:
        - containerPort: 5000
      imagePullSecrets:
      - name: coding-registry
```

```service.yaml
apiVersion: v1
kind: Service
metadata:
  labels:
  name: demo-for-cd-service
spec:
  ports:
    - name: http
      port: 5000
      protocol: TCP
  selector:
    app: demo-for-cd
  type: LoadBalancer
```

#### [在 CODING 实现简单的开发与运维的切面](#implement)

CODING 提供了团队和项目两个层面的基于角色的权限控制可以方便的实现不同角色的切面效果：

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/devops-divide-or-join/app-project.png)

具体来讲可以在团队成员管理和项目成员管理进行具体角色的分配。

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/devops-divide-or-join/ops-team.png)

在此示例中我们的项目名称叫做 demo-for-cd, 应用名称叫做 flaskapp。

#### [运维角色进行预配置](#preconfig-ops)

1.  配置云账号（让 CODING 持续部署跟 Kubernetes 集群打通）。

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/devops-divide-or-join/config-cloud-account.png)

2.  创建应用 flaskapp。

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/devops-divide-or-join/create-app.png)

3.  把应用 flaskapp 跟项目 demo-for-cd 相关联：关联后可以理解为这个应用的相关发布权限和配置管理权限下放到项目中，映射前文提到的“业务运维左移”思想。

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/devops-divide-or-join/app-project-bind.png)

4.  在应用内创建部署流程：应用该怎么部署，在什么条件下部署，需要什么资源这些由运维团队制定，映射前文提到的“交付发布”需要标准化、流程化。

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/devops-divide-or-join/deploy-flow.png)

#### [需要注意的细节](#notes)

-   运维在配置部署流程的时候须要制定流程启动所需制品标准（此处映射我们提的交付流程的信息要`结构化`），我们声明了启动流程需要三个制品分别是: 一个 Docker 镜像，一个 Deployment Manifest 文件，一个 Service Manifest 文件。

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/devops-divide-or-join/expected-artifacts.png)

-   运维可选配置若干个自动触发器来自动启动这个流程（此处映射我们提的交付流程的信息在结构化的基础上实现自动化），我们设置了当 Docker 镜像库出现新镜像版本时自动触发此流程。

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/devops-divide-or-join/autotrigger.png)

-   可以给部署流程添加额外的通知推送用以告知相关人员（此处映射我们提的信息流转要精准，区分主接收人和抄送订阅），这里可以把发布事件信息同步到产品经理、项目经理等。

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/devops-divide-or-join/notify.png)

#### [最佳实践提示](#tips)

-   尽量做到版本化管理一切资源：版本化管理 Kubernetes 配置文件，管理容器镜像，管理部署流程配置等等，这样有助于快速的灾难恢复，问题追溯等，这些能力 CODING 都已提供，可以很方便的实现。

-   可在流程中插入 Kubernetes Job，使用 run job 来处理发布过程中的诸如数据库表结构更新，数据迁移，静态资源预编译等过程。

-   使用 Kubernetes ConfigMap 来管理配置项和配置文件，这样所有的可交付制品类型就被限制为 Docker 镜像和 Kubernetes Manifest，便于管控。

-   可选使用独立 Git 仓库来管理 Kubernetes 文件，主要由运维团队来管理，接受开发团队的合并请求（可自由决定配置管理是否左移至开发团队）

#### [开发角色完成开发和发布](#dev-complete)

在运维进行完上述配置后，开发人员就可以在项目里独立进行发布操作了（映射我们提的业务运维左移至开发团队）。

开发团队在确认新版本的三个制品（一个 Docker 镜像，两个 Kubernetes Yaml 文件）准备好后直接可以新建发布单来执行发布，因事先预配置好了流程标准，这里开发无需跟运维团队进行低效的无意义的其他形式的沟通，直接选定三个资源的版本即可执行发布。

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/devops-divide-or-join/new-release.png)

![](https://blog-img-1301285745.cos.ap-guangzhou.myqcloud.com/devops-divide-or-join/release-detail.png)

开发也可以通过上游的代码仓库、持续集成和制品库的配合完成全自动化发布，实现分钟级自动上线。

### [其他场景的持续部署](#cd-in-others)

持续部署是 DevOps 的关键环节，跟 DevOps 一样与团队的运维左移右移成都，技术架构等有很大关系，没有哪个持续部署工具系统是可以涵盖所有的场景的。CODING 持续部署希望能涵盖大多数较新的技术体系，以及拥抱云原生的部署场景。这里给出几点关于其他常见的持续部署的做法提示：

-   Ansible + 堡垒机场景：这类持续部署的核心在于 Ansible 的 Playbook 的撰写质量，可以选择直接接入 CI （如 CODING 持续集成、Jenkins）体系使用，实现快速部署。

-   云主机的弹性伸缩组：CODING 持续部署支持基于云主机镜像配合弹性伸缩组的模式进行发布，此模式较重，可以根据自己实际情况进行选择。

-   scp/sftp，Git/SVN：建议尽快升级至容器等形态的方式发布，在未升级前也可以考虑直接嵌入到 CI 中执行。

-   Serverless 场景：这种属于基础设施右移非常彻底的类型，大多数情况下不需要引入独立的持续部署工具体系，可以考虑直接在 CI 甚至于 IDE 开发阶段使用插件等机制添加部署能力，无需进行过度复杂的设置。CODING 持续部署不排除未来会针对 Serverless 部署场景添加更多的其他方面能力，如审批，通知等，以支持更安全稳定的发布行为管控。

### [该分还是该合](#choice)

看到这里，我相信你已经能够把握住 DevOps 的几个实践的核心要素，DevOps 不是非黑即白的，只要有开发和运维的团队自始至终都一直在实践着 DevOps，只是效果有好坏，水平有高地。业务体系、团队配置、技术架构、工具系统都有差异，脱离这些基本现实去喊口号，聊价值是无意义的。你的 DevOps 团队要分还是要合，分合到什么程度，请冷静思考文中提到的几个核心要素。

==== 2020/08/13 ====
