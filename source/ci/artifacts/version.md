---
title: 自动生成版本号 - CODING 帮助中心
pageTitle: 自动生成版本号
pagePrevTitle: 外部制品库认证
pagePrev: ci/artifacts/outside.html
pageNextTitle: 推送至 TCR 镜像仓库
pageNext: ci/artifacts/tcr.html
alias: ci/artifacts/version.html
---

在持续集成中打包时，需要根据场景生成不同的版本号：

场景   | 版本号规则 | 版本号示例 | 常用环境
------|----------|------------|---------
合并请求  | mr-{合并请求 ID}-{hash} | mr-123-3a11e12 | 开发/测试
合并后（或推送分支） |  {分支名}-{hash} | main-3a11e12 | 测试
推送 tag    | {tag} | 1.2.0 | 预发布/生产

有两种方式可以实现。

### [插件](#plugin)

使用「魔法版本号」插件：

```groovy
stage('打包') {
  steps {
    useCustomStepPlugin(key: 'coding-public:magic-version', version: 'latest')
    script {
      readProperties(file: env.CI_ENV_FILE).each {key, value -> env[key] = value }
    }
    echo "${env.MAGIC_VERSION}"
    // codingArtifactsGeneric(files: 'web.tar.gz', repoName: 'my-generic', version: env.MAGIC_VERSION)
  }
}
```

### [if 判断](#if)

写代码进行判断：

```groovy
stage('打包') {
  steps {
    script {
      if (env.TAG_NAME ==~ /.*/ ) {
        ARTIFACT_VERSION = "${env.TAG_NAME}"
      } else if (env.MR_SOURCE_BRANCH ==~ /.*/ ) {
        ARTIFACT_VERSION = "mr-${env.MR_RESOURCE_ID}-${env.GIT_COMMIT_SHORT}"
      } else {
        ARTIFACT_VERSION = "${env.BRANCH_NAME.replace('/', '-')}-${env.GIT_COMMIT_SHORT}"
      }
    }
    echo "${ARTIFACT_VERSION}"
    // codingArtifactsGeneric(files: 'web.tar.gz', repoName: 'my-generic', version: ARTIFACT_VERSION)
  }
}
```
