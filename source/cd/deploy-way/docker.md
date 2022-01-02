---
title: 自动发布 Docker 制品时触发 - CODING 帮助中心
pageTitle: 自动发布 Docker 制品时触发
pagePrevTitle: 触发器配置
pagePrev: cd/pipe/triggers.html
pageNextTitle: 在构建计划中添加部署阶段
pageNext: cd/deploy-way/ci-job.html
alias: cd/workflow.html
---

CODING 持续部署的一大优势在于能够便捷的集成上下游产品为工作流，下文将演示如何通过三个步骤实现 「持续集成任务推送制品 → 制品仓库镜像更新 → 触发部署流程」这一基础的自动化流水线配置。

### [1. 应用与项目关联](#bind)

部署流程控制台中的「应用」需提前与项目相关联。前往部署控制台，点击应用中的「关联项目」按钮，选择持续集成配置所在的项目并进行关联。

![](https://help-assets.codehub.cn/enterprise/20210617145100.png)

### [2. 配置持续集成](#ci)

此步骤使用持续集成将制品推送至制品仓库。你可以通过持续集成计划模板创建，或直接编写 Jenkinsfile 手动增加此阶段。

![](https://help-assets.codehub.cn/enterprise/20210617155844.png)

在持续集成流程中手动增加此阶段：

![](https://help-assets.codehub.cn/enterprise/20210617160153.png)

**Jenkinsfile 参考**

```groovy
stage('部署到远端 Kubernetes 集群') {
      steps {
        cdDeploy([
          deployType: 'PATCH_IMAGE',
          application: "${CCI_CURRENT_TEAM}",
          pipelineName:  "${PROJECT_NAME}-${CCI_JOB_NAME}-${CD_CREDENTIAL_INDEX}",
          image: "${CODING_DOCKER_REG_HOST}/${CODING_DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION}",
          cloudAccountName: "${CD_ACCOUNT_NAME}",
          namespace: "${CD_NAMESPACE_NAME}",
          manifestType: "${CD_MANIFEST_TYPE}",
          manifestName: "${CD_MANIFEST_NAME}",
          containerName: "${CD_CONTAINER_NAME}",
          credentialId: "${CD_CREDENTIAL_ID}",
          personalAccessToken: "${CD_PERSONAL_ACCESS_TOKEN}",
        ])
      }
    }
```

### [3. 根据制品镜像版本触发](#docker)

前往持续部署中的应用部署流程，点击「基础配置」中的触发器启用开关。此处选择通过 CODING Docker 制品更新触发，将监听关联项目中制品版本号。若持续集成将制品推送至制品仓库时，将自动触发部署流程；选择「自定义」能够监听其他项目的制品仓库更新情况。

除了通过 CODING Docker 制品更新触发，你还可以通过 Git 仓库或定时器触发此部署流程。

![](https://help-assets.codehub.cn/enterprise/20210617165717.png)

==== 2020/08/13 ====
