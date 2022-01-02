---
title: 镜像更新至 K8s 集群 - CODING 帮助中心
pageTitle: 镜像更新至 K8s 集群
pagePrevTitle: 代码扫描
pagePrev: ci/plugins/code-scan.html
pageNextTitle: 中断信号
pageNext: ci/plugins/error-skip.html
---

### [功能介绍](#intro)

当您在持续集成中将镜像构建完毕并推送至制品库后，此插件支持进一步将镜像推送至 Kubernetes 集群。您可以通过[持续集成模板](#template)或在[流程配置](#process-configuration)使用此插件。

### [模板创建](#template)

进入持续集成功能页后，点击右上角的【创建构建计划】按钮，在「部署」中选择模板。

![](https://help-assets.codehub.cn/enterprise/20210410104514.png)

在第三步中选择镜像上传的目标制品库，并在第四步中填写 Kubernetes 相关配置。

![](https://help-assets.codehub.cn/enterprise/20210410105038.png)

填写说明：

| 表单项   | 是否必填 | 说明                                                  |
| -------- | ---- | ----------------------------------------------------- |
| 集群     | 是   | 镜像更新的目标集群                                    |
| 命名空间 | 是   | 已部署工作负载所在的命名空间                          |
| 资源类型 | 是   | 需要更新的工作负载类型                                |
| 资源名称 | 是   | 需要更新的工作负载名称                                |
| Pod 容器 | 是   | 一个 Pod 可能包含多个容器，此处指定需要升级的容器名称 |

因部署功能可以直接管控集群的资源，属于敏感权限。若没有部署设置权限，需向管理员申请。

![](https://help-assets.codehub.cn/enterprise/20210410105513.png)

填写完成后勾选「创建后触发构建」，在构建过程中可以查看镜像更新的详细信息。

![](https://help-assets.codehub.cn/enterprise/20210410105720.png)

跳转至持续部署页面后，查看发布单详情和容器运行详情。

<!--![](https://help-assets.codehub.cn/enterprise/20210410105803.png)

![](https://help-assets.codehub.cn/enterprise/20210410105828.png)-->

### [流程配置创建](#process-configuration)

除了通过模板的方式创建，还可以在持续集成中的流程配置中添加插件。

![](https://help-assets.codehub.cn/enterprise/20210410110023.png)

### [Jenkinsfile](#jenkins)

```jenkins
pipeline {
  agent any
  stages {
    stage('部署到远端 Kubernetes 集群') {
      steps {
        cdDeploy(deployType: 'PATCH_IMAGE', application: '${CCI_CURRENT_TEAM}', pipelineName: '${PROJECT_NAME}-${CCI_JOB_NAME}-${CD_CREDENTIAL_INDEX}', image: '"${CODING_DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION}"', cloudAccountName: 'k8s', namespace: 'liaohongkun-1', manifestType: 'Deployment', manifestName: 'nginx-deployment-1', containerName: 'nginx', credentialId: '2f74c95a6441484d9f362bbc461a049b')
      }
    }
  }
}
```

### [参数说明](#parameter)

| 参数名称         | 图形化界面对应选项名 | 必填 | 文本参数类型 | 图形化参数类型 | 默认值                                                   | 说明                                |
| ---------------- | -------------------- | ---- | ------------ | -------------- | -------------------------------------------------------- | ----------------------------------- |
| deployType       | -                    | 是   | string       | string         | `PATCH_IMAGE`                                            | 发布类型                            |
| application      | -                    | 是   | string       | string         | `${CCI_CURRENT_TEAM}`                                    | CD 应用名称                         |
| pipelineName     | -                    | 是   | string       | string         | `${PROJECT_NAME}-${CCI_JOB_NAME}-${CD_CREDENTIAL_INDEX}` | 部署流程名称                        |
| credentialId     | -                    | 是   | string       | string         | -                                                        | CD 发布凭据（与项目和构建计划绑定） |
| image            | 镜像                 | 是   | string       | string         | -                                                        | Docker 镜像                         |
| cloudAccountName | 集群                 | 是   | string       | string         | -                                                        | 云账号名称                          |
| namespace        | 命名空间             | 是   | string       | string         | -                                                        | 命名空间                            |
| manifestType     | 资源类型             | 是   | string       | string         | -                                                        | 资源类型                            |
| manifestName     | 资源名称             | 是   | string       | string         | -                                                        | 资源名称                            |
| containerName    | Pod 容器名称         | 是   | string       | string         | -                                                        | Pod 容器名称                        |

### [环境变量](#env)

| 变量名称                 | 必填 | 参数类型 | 保密 | 说明                                       |
| ------------------------ | ---- | -------- | ---- | ------------------------------------------ |
| CD_PERSONAL_ACCESS_TOKEN | 是   | string   | 是   | 权限为 `project:deployment` 的个人访问令牌 |

### [注意事项](#notice)

部署属于敏感操作。由于部署设置权限限制的原因，需要生成 CD 发布凭据（与项目和构建计划绑定）进行授权对应的构建计划，因此不支持复制构建计划。（运行时会报错：403 凭据错误：构建计划越权）

==== 2021/04/10 ====
