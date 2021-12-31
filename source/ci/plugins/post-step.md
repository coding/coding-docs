---
title: 在阶段末尾执行插件 - CODING 帮助中心
pageTitle: 在阶段末尾执行插件
pagePrevTitle: 上传 API 文档
pagePrev: ci/plugins/api-doc.html
pageNextTitle: 代码扫描
pageNext: ci/plugins/code-scan.html
alias: devops/ci/plugins/post-step.html
---

在配置持续集成的过程中，有一些步骤需要根据流水线 / 阶段的执行情况决定是否执行。例如，当「单元测试」步骤执行失败时，「收集测试报告」步骤就没有必要执行了。因此我们可以为「收集测试报告」步骤添加判断条件，让它在之前的「单元测试」阶段执行成功后方才执行。

您可以通过持续集成步骤里的「置底执行」开关控制实现上述效果。

### 使用图形化编辑器配置流水线 / 阶段末尾执行

#### 流水线末尾执行

在流水线末尾的「结束阶段」点击 `+` 添加步骤，进入「高级配置」，选择执行条件。默认为始终执行，点击[此处](#执行条件详情)查看执行条件详情。

![](https://help-assets.codehub.cn/enterprise/20200901145729.png)

配置成功后，在流水线的最后阶段，构建任务会根据执行条件执行步骤。相同执行条件的步骤将会按照「结束」阶段里的设置顺序执行，不同执行条件下的的步骤执行顺序互不影响。

#### 阶段末尾执行

如果您根据阶段的执行情况设置特定步骤，可以将阶段内的步骤设置为「置底执行」。

1.  添加一个普通步骤。

![](https://help-assets.codehub.cn/enterprise/20200901150918.png)

2.  进入高级配置，打开 “置底执行” 开关，该步骤会自动跳到「置底执行」区域。

![](https://help-assets.codehub.cn/enterprise/20200901151623.png)

3.  选择执行条件，默认为始终执行。查看执行条件详情请到 [执行条件详情](#执行条件详情) 。

![](https://help-assets.codehub.cn/enterprise/20200901162312.png)

### Jenkinsfile

``` groovy
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM',
        branches: [[name: env.GIT_BUILD_REF]],
        userRemoteConfigs: [[
          url: env.GIT_REPO_URL,
          credentialsId: env.CREDENTIALS_ID
        ]]])
      }
    }
    stage('安装依赖') {
      steps {
        sh 'npm install'
      }
    }
    stage('单元测试') {
      // 该区域的步骤将会在单元测试阶段末尾执行  
      post {
        // 当单元测试阶段执行成功，才会执行 success 区域中的测试报告收集步骤
        success {
          junit 'target/surefire-reports/*.xml'
        }
      }
      steps {
        sh 'npm test'
      }
    }
  }
  // 该区域的步骤将会在流水线末尾执行
  post {
    // always 区域步骤会始终执行
    always {
      sh 'echo hello CODING'
    }
  }
}
```

### 执行条件详情

-   *always* : 无论当前阶段的完成状态如何，都允许运行该步骤。
-   *aborted* : 当前阶段被中断时，允许运行该步骤（例如手动终止）。
-   *failure* : 若当前阶段失败时，允许运行该步骤。
-   *success* : 当前阶段运行成功后，允许运行该步骤。
-   *unsuccessful* : 当前阶段的构建结果产出失败后，允许运行该步骤。
-   *cleanup* : 待其他条件执行完毕后再执行该步骤。
