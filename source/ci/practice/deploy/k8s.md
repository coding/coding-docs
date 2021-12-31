---
title: K8s 集群 - CODING 帮助中心
pageTitle: K8s 集群
pagePrevTitle: 自动部署到 Linux Docker 服务器
pagePrev: ci/deploy/docker.html
pageNextTitle: 自动部署到 Serverless
pageNext: ci/deploy/serverless.html
alias: 
-   devops/ci/deploy/k8s.html
-   ci/deploy/k8s.html
---

持续集成可简易部署项目到 K8s 集群，步骤如下：

1.  获取 Docker 仓库的用户名和密码（CODING 制品库一键创建访问令牌即可获得），录入持续集成的环境变量中；
2.  构建 Docker 镜像并上传到仓库；
3.  在云计算服务商（比如 腾讯云）创建一个 K8s 集群和 deployment，获得 Kubeconfig，录入 CODING 凭据管理；
4.  在持续集成中使用下述 `Jenkinsfile`：执行 kubectl 进行部署；

### Jenkinsfile

```groovy
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]],
        userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]])
      }
    }
    stage('构建') {
      steps {
        echo '构建中...'
        script {
          // 请修改 dockerServer、dockerPath、imageName
          dockerServer = 'codes-farm-docker.pkg.coding.net'
          dockerPath = '/laravel-demo/laravel-docker'
          imageName = "${dockerServer}${dockerPath}/laravel-demo:1.0.0"
          def customImage = docker.build(imageName)

          // 推送 Docker 镜像到仓库
          docker.withRegistry("https://${dockerServer}", CODING_ARTIFACTS_CREDENTIALS_ID) {
            customImage.push()
          }
        }
      }
    }
    stage('部署到 K8s') {
      steps {
        echo '部署中...'
        script {
          // 请修改 credentialsId：填入 k8s 凭据 ID
          withKubeConfig([credentialsId: 'f23cc59c-dfd1-40b9-a12f-2c9b6909e908']) {
            // 使用 kubectl 创建 K8s 密钥：来自环境变量的 DOCKER_USER 和 DOCKER_PASSWORD
            sh(script: "kubectl create secret docker-registry coding --docker-server=${dockerServer} --docker-username=${env.DOCKER_USER} --docker-password=${env.DOCKER_PASSWORD} --docker-email=support@coding.net", returnStatus: true)

            // 使用 kubectl 修改 K8s deployment：指定 Docker 镜像链接和密钥
            // 请修改 laravel-demo、web 为你的 deployment 中的值
            sh "kubectl patch deployment laravel-demo --patch '{\"spec\": {\"template\": {\"spec\": {\"containers\": [{\"name\": \"web\", \"image\": \"${imageName}\"}], \"imagePullSecrets\": [{\"name\": \"coding\"}]}}}}'"
          }
        }
      }
    }
  }
}
```

### [截图](#screenshots)

![CODING 制品库 生成访问令牌](https://help-assets.codehub.cn/enterprise/20200417112021.png)

![CODING 持续集成 环境变量 DOCKER_USER](https://help-assets.codehub.cn/enterprise/20200417112623.png)

![腾讯云 容器服务 tke k8s Kubeconfig](https://help-assets.codehub.cn/enterprise/20200410135939.png)

![CODING 凭据管理 k8s Kubeconfig](https://help-assets.codehub.cn/enterprise/20200410140103.png)

![腾讯云 容器服务 tke k8s 创建 deployment](https://help-assets.codehub.cn/enterprise/20200410152719.png)

### [提醒](#notice)

「K8s 部署」包括 5 步甚至更多，如果都写在「持续集成」里难以维护，建议使用「[持续部署](/docs/cd/overview.html)」。

![K8s 部署流程](https://help-assets.codehub.cn/enterprise/20210119155733.png)

==== 2021/01/27 ====
