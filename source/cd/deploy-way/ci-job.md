---
title: 在构建计划中添加部署阶段 - CODING 帮助中心
pageTitle: 在构建计划中添加部署阶段
pagePrevTitle: 自动发布 Docker 制品时触发
pagePrev: cd/deploy-way/docker.html
pageNextTitle: 手动提交发布单
pageNext: cd/deploy-way/manual.html
---

在持续集成中触发部署时请提前前往「部署控制台」，将应用与项目关联。

![](https://help-assets.codehub.cn/enterprise/20210617145100.png)

本文给出了两种设置方法，你可以按照需求有选择性阅读。

-   直接使用构建计划模板
-   在已有构建计划中添加部署阶段

### [使用构建计划模板](#template)

> 请在部署控制台中关联涉及到相关集群的云账号，详情请参考[此处](/docs/cd/cloud-account.html)。

点击项目内左侧产品栏「持续集成」，右上角创建构建计划，选择「部署」分类下的「推送到 Kubernetes」模板。

![](https://help-assets.codehub.cn/enterprise/20210728150125.png)

按照模板提示选择相应的制品仓库、远端集群地址等信息，完成后勾选创建后触发构建。

![](https://help-assets.codehub.cn/enterprise/20210728155826.png)

设置完成后，运行持续构建计划即可完成自动发布。

### [添加部署阶段](#deploy-stage)

在此方法中你可以在「构建计划」→「流程配置」中使用编辑器或填写命令添加部署阶段。

#### [图形化编辑器](#graphic-editor)

在已有构建计划设置中添加「部署」阶段，填写镜像地址、集群与命名空间等关键信息。

![](https://help-assets.codehub.cn/enterprise/20210729102532.png)

#### [Jenkinsfile 参考](#jenkinsfile)

```groovy
stage('推送到 CODING Docker 制品库') {
      steps {
        script {
          docker.withRegistry(
            "${env.CCI_CURRENT_WEB_PROTOCOL}://${env.CODING_DOCKER_REG_HOST}",
            "${env.CODING_ARTIFACTS_CREDENTIALS_ID}"
          ) {
            docker.image("${CODING_DOCKER_IMAGE_NAME}:${env.DOCKER_IMAGE_VERSION}").push()
          }
        }
 
      }
```

==== 2021/07/29 ====
