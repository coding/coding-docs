---
title: Commit Message - CODING 帮助中心
pageTitle: Commit Message
pagePrevTitle: 增量检查代码规范
pagePrev: ci/lint/jenkins-git-diff.html
pageNextTitle: Java 规范检查
pageNext: ci/lint/java.html
alias: 
-   devops/ci/lint/git-commit.html
-   ci/lint/git-commit.html
---

`git commit message` 即代码历史提交信息，记录着每一次代码入库的“原因”，随意的提交信息会极大地影响代码的可维护性，在多人协作开发场景下因个人风格各有不同，若无统一的规范则很容易导致混乱。

一个可供参考的工作流配置如下：在本地仓库书写后，提交代码发起合并请求，自动触发持续集成开启检查任务，检测无误后才能允许并入主干，实现主干的可追溯性与规范化。

![](https://help-assets.codehub.cn/enterprise/20200914163606.png)

### [书写工具](#git-cz)

全局安装 commitizen，即可使用 `git cz` 命令取代 `git commit`，提供交互式选择界面，协助书写。

```bash
npm install -g commitizen cz-conventional-changelog
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

![](https://help-assets.codehub.cn/enterprise/20200914142021.png)

### [项目配置](#install)

在项目代码中通过 npm 安装 lint 工具（任何语言的项目都可以安装，比如 PHP、Java）。

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional @commitlint/prompt cz-conventional-changelog husky
```

修改 `package.json`，即可实现本地提交前自动检查：

```json
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "devDependencies": {
    "@commitlint/cli": "^9.1.2",
    "@commitlint/config-conventional": "^11.0.0",
    "@commitlint/prompt": "^9.1.2",
    "cz-conventional-changelog": "^3.3.0",
    "husky": "^4.3.0"
  }
}
```

### Jenkinsfile

在持续集成中使用下列代码，即可实现：合并请求时，对比当前分支和目标分支的 git log，进行增量检查。

```groovy
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: '*']],
          userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]
        ])
        script {
          if ( env.MR_SOURCE_BRANCH ==~ /.*/ ) {
            sh "git checkout ${env.MR_TARGET_BRANCH}"
            sh "git checkout ${env.MR_SOURCE_BRANCH}"
          } else {
            sh "git checkout ${env.GIT_COMMIT}"
          }
        }
      }
    }
    stage('安装依赖') {
      steps {
        sh 'npm install'
      }
    } 
    stage('增量检查 git commit') {
      when {
        changeRequest()
      }
      steps {
        script {
          sh 'npm install'
          sh """logs=`git log --pretty=format:'%s' ${env.MR_TARGET_BRANCH}... --no-merges`;
          echo "\$logs" | while read i; do echo \$i | npx commitlint; done
          """
        }
      }
    }
  }
}
```

![创建合并请求时触发构建](https://help-assets.codehub.cn/enterprise/20200706173652.png)

### [运行结果](#screenshots)

CI 运行不通过时报错：

![](https://help-assets.codehub.cn/enterprise/20200911194311.png)

### [修改提交信息](#modify)

如果 Git 提交信息不规范，有两种修改方式：

修改最后一次提交信息：

```bash
git commit --amend
```

修改中间某条提交信息：

```bash
git rebase -i HEAD~5
```

把某条前面的 pick 修改为 r，保存退出（VI 为 :x），即可进入编辑界面。

![](https://help-assets.codehub.cn/enterprise/20210106145634.png)
![](https://help-assets.codehub.cn/enterprise/20210106145707.png)

修改完毕，强制推送即可，命令：

```bash
git push -f origin issue-123
```

==== 2021/01/06 ====
