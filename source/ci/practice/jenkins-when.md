---
title: 如何使用 when 条件判断语法 - CODING 帮助中心
pageTitle: 如何使用 when 条件判断语法
pagePrevTitle: 在持续集成中使用 Docker
pagePrev: ci/practice/docker.html
pageNextTitle: 在持续集成中使用 SSH
pageNext: ci/practice/ssh.html
---

Jenkins 支持使用 when 语法对构建过程进行条件判断，用上一阶段的构建结果决定是否继续执行下一阶段。此语法适用于多种场景，例如：

-   合并请求

    检查代码规范，若代码不符合规范则中断构建过程，并返回错误告知

-   代码合并

    代码合并成功后自动进入制品发布阶段

-   git tag

    推送代码标签后自动进入制品部署阶段

你可以在构建计划设置中的「流程配置」使用文本编辑器填入以下命令：

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
    stage('合并请求时：检查代码规范') {
      when {
        changeRequest()
      }
      steps {
        script {
          sh 'npm run lint'
        }
      }
    }
    stage('无论何时：单元测试') {
      steps {
        sh 'npm run test'
      }
    }
    stage('无论何时：编译') {
      steps {
        sh 'npm run build'
      }
    }
    stage('代码合并后或 git tag：构建 Docker 镜像') {
      when {
        anyOf {
          branch 'main';
          tag '*'
        }
      }
      steps {
        script {
          if (env.TAG_NAME ==~ /.*/ ) {
            DOCKER_IMAGE_VERSION = "${env.TAG_NAME}"
          } else {
            DOCKER_IMAGE_VERSION = "${env.BRANCH_NAME.replace('/', '-')}-${env.GIT_COMMIT_SHORT}"
          }
          // 注意：创建项目时链接标识不要使用下划线，而是连字符，比如 My Project 的标识应为 my-project
          // 请修改 build/my-api 为你的制品库名称和镜像名称
          CODING_DOCKER_IMAGE_NAME = "${env.PROJECT_NAME.toLowerCase()}/build/my-api"
          // 本项目内的制品库已内置环境变量 CODING_ARTIFACTS_CREDENTIALS_ID，无需手动设置
          docker.withRegistry("https://${env.CCI_CURRENT_TEAM}-docker.pkg.coding.net", "${env.CODING_ARTIFACTS_CREDENTIALS_ID}") {
            docker.build("${CODING_DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION}").push()
          }
        }
      }
    }
    stage('代码合并后或 git tag：部署') {
      when {
        anyOf {
          branch 'main';
          tag '*'
        }
      }
      steps {
        sh 'coscmd upload -r ./dist /'
      }
    }
  }
}
```

==== 2021/04/08 ====
