---
title: 持续集成与代码仓库 - CODING 帮助中心 
pageTitle: 持续集成与代码仓库
pagePrevTitle: 自定义构建节点
pagePrev: ci/faq/customize-node.html
pageNextTitle: 持续集成与制品库
pageNext: ci/faq/artifacts.html
---

### [如何在持续集成中推送代码？](#push)

在某些场景下，您可能需要在持续集成阶段推送代码。CODING 的持续集成内置了 Git、SVN 等命令工具，您可以参考如下示例。

```groovy
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([
            $class: 'GitSCM', 
            branches: [[name: env.GIT_BUILD_REF]], 
            userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]])
      }
    }
    stage('修改') {
        steps {
            sh "echo '# Hello CODING' > README.md"
            sh "git add ."
            sh "git commit -m 'add README.md' "

        }
    }
    stage('推送') {
        steps {
            // 使用了 CODING 持续集成系统预置的项目令牌环境变量 PROJECT_TOKEN_GK 和 PROJECT_TOKEN 来推送
            // 若希望推送到非本项目或第三方平台的代码仓库，需要自行换成有效的凭据信息
            sh "git push https://${PROJECT_TOKEN_GK}:${PROJECT_TOKEN}
              @e.coding.net/myteam/myrepo.git HEAD:master"
        }
    }
  }
}
```

### [如何调用 SVN 仓库？](#svn)

在默认的持续集成计划的配置过程中，所运行的代码源默认是 Git 类型仓库。若希望使用 [SVN 仓库](/docs/repo/svn.html)运行持续集成，下文给出了指引。

在开始之前，请先创建项目令牌与申请用户名+密码凭据。

1.  创建项目令牌

前往【项目设置】->【开发者选项】->【项目令牌】中新建项目令牌。设置过期时间后并勾选持续集成所有的权限。

![](https://help-assets.codehub.cn/enterprise/20200616165647.png)

创建完成后会给出用户名及密码。

![](https://help-assets.codehub.cn/enterprise/20200616165831.png)

2.  申请用户名+密码凭据

前往【项目设置】->【开发者选项】->【凭据管理】中录入用户名+密码凭据。用户名和密码需要填写在创建项目令牌时给出的用户名及密码。

![](https://help-assets.codehub.cn/enterprise/20200616171515.png)

创建完成后会给出凭据 ID，稍后需要将此 ID 录入至构建计划的流程配置中。

3.  配置构建计划

在【持续集成】->【构建计划】中点击【新建构建计划配置】，选择基础栏中的空白模板，这样可以自定义流程配置。

![](https://help-assets.codehub.cn/enterprise/20200616172201.png)

命名构建计划后，代码源选择【不使用】。

![](https://help-assets.codehub.cn/enterprise/20200616173322.png)

完成后在流程配置中填写相应的配置。

```groovy
pipeline {
  agent any
  stages {
    stage('检出 SVN 代码') {
      steps {
        checkout([$class: 'SubversionSCM',
                  // 此处可以添加额外认证
                  additionalCredentials: [],
                  excludedCommitMessages: '',
                  excludedRegions: '',
                  excludedRevprop: '',
                  excludedUsers: '',
                  filterChangelog: false,
                  ignoreDirPropChanges: false,
                  includedRegions: '',
                  locations: [[
                               // 输入上文中创建的凭据 ID
                               credentialsId: '5e25f6a9-675c-4b38-97b0-e907b5fe27cd',
                               // 检出代码时所取出代码的范围
                               depthOption: 'infinity',
                               // 是否将 SVN 上的外部引用一并检出
                               ignoreExternalsOption: true,
                               // SVN 的检出目录，此目录是该 Job 工作目录的相对路径
                               local: '.',
                               // SVN 代码仓库地址
                               remote: "svn://subversion.e.coding.net/StrayBirds/svn"]],
                  workspaceUpdater: [$class: 'UpdateUpdater']])
      }
    }
  }
}
```

4.  添加环境变量

在变量与缓存中添加环境变量，类别选择 CODING 凭据里的用户名 + 密码。

![](https://help-assets.codehub.cn/enterprise/20200616174050.png)

5.  触发构建

您可以选择手动构建或配置[触发方式](trigger.html)进行自动构建，构建成功后如图所示。

![](https://help-assets.codehub.cn/enterprise/20200616174301.png)

### [如何拉取多仓库？](#mult-repo)

1.  创建代码仓库项目令牌

在「项目设置」->「开发者选项」->「项目令牌」中新建项目令牌，并勾选读取代码仓库权限。因涉及到两个仓库，需选择「统一配置所有代码仓库权限」，创建完成后获取用户名与密码。

![](https://help-assets.codehub.cn/enterprise/20210602153040.png)

2.  在持续集成配置中选择不使用代码源。

![](https://help-assets.codehub.cn/enterprise/20210602154023.png)

3.  编写 Jenkinsfile 配置文件，填写需拉取的代码仓库地址

```groovy
pipeline {
  agent any
  stages {
    stage('检出1') {
      steps {
        sh 'git clone "https://${GIT_USER}:${GIT_PASSWORD}@e.coding.net/codes-farm/laravel-demo.git"'
        sh 'ls -la'
      }
    }
    stage('检出2') {
      steps {
        sh 'git clone "https://${GIT_USER}:${GIT_PASSWORD}@e.coding.net/codes-farm/laravel-demo/config.git"'
        sh 'ls -la'
      }
    }
  }
}
```

4.  将第一步申请的项目令牌的用户名与密码添加至持续集成的环境变量中。

![](https://help-assets.codehub.cn/enterprise/20210602154607.png)

### [如何检出 Git Submodule 代码？](#git-submodule)

在持续集成构建计划中，若要将子仓库代码作为代码源，需通过流程配置检出 Git Submodule 子仓库代码。

在配置持续集成流程前，请先将子仓库添加至父仓库中。使用 `git submodule add` 命令添加拟跟踪项目的仓库地址作为子仓库，

```shell
git submodule add https://e.coding.net/test/git-sub-module.git
```

代码提交成功后，在父仓库页将看到此图标：

![](https://help-assets.codehub.cn/enterprise/20210825113805.png)

**1. 录入仓库访问凭据**

通常情况下，子仓库的访问凭据与父仓库的凭据有差异，也为了避免在持续集成配置中暴露敏感信息，可以先行将父子仓库的访问凭据都录入至项目设置中。

点击项目内左侧菜单栏的「项目设置」→「开发者选项」→「凭据管理」，录入用户名 + 密码或 SSH 私钥，勾选凭据授权的持续集成计划。

![](https://help-assets.codehub.cn/enterprise/20210825135443.png)

录入完成后获取两者的凭据 ID。

![](https://help-assets.codehub.cn/enterprise/20210825145023.png)

**2. 配置持续集成流程**

参考使用以下 Jenkinsfile 配置：

```groovy
pipeline {
    agent any
        stages {
            stage('检出') {
              steps {
                checkout([
                $class: 'GitSCM',
                 branches: [[name: GIT_BUILD_REF]],
                  doGenerateSubmoduleConfigurations: false,
                  // 此处配置 Submodule 的检出规则
                  extensions: [[
                  $class: 'SubmoduleOption',
                   // 是否禁用检出 Submodule
                  disableSubmodules: false,
                  // 是否允许检出时使用 Parent Project 的用户凭据
                  parentCredentials: false,
                  // 是否递归检出所有 Submodule 的更新
                  recursiveSubmodules: true,
                  // 指定参考仓库的路径
                  reference: '',
                  // 是否追踪 .gitmodules 文件中配置的分支的最新提交
                  trackingSubmodules: false
                  ]],
                  submoduleCfg: [
                  ],
                  // 此处配置远程 Parent Project 和 Submodules的检出信息
                  userRemoteConfigs: [
                  [
                  // 此处配置远程 Parent Project 仓库 SSH 凭据和仓库地址
                  credentialsId: '93207d20-****-****-****-410850900d86',
                  url: 'https://e.coding.net/StrayBirds/Parent/parent.git'
                  ],
                  // 此处配置远程 Submodule 仓库凭 SSH 凭据和仓库地址
                  [
                  credentialsId: '560bdc1e-****-****-****-c8e3ccb3ccc6',
                  url: 'https://e.coding.net/StrayBirds/Submodule/sub.git'
                  ],
                  // 如果有更多的 Submodules ，可以在这里增加配置
                  ]
                  ])
              }
          }
      }
  }
```

运行成功后的日志如下：

![](https://help-assets.codehub.cn/enterprise/20210825145506.png)

### [如何检出其它项目的代码仓库？](#checkout)

在持续集成中，您可以通过[项目令牌](/docs/project/features/deploy-tokens.html)的方式检出其它项目内的 CODING 仓库代码。

为了方便您区分即将要操作的两个不同项目，我们统一将：

-   需要被检出的代码仓库所在项目称为 “项目 A” 
-   执行检出持续集成任务所在的项目称为 “项目 B” 

**步骤一：在项目 A 内创建项目令牌**

1.  进入项目 A【项目设置】->【开发者选项】->【项目令牌】，点击 “新建项目令牌” 。

![](https://help-assets.codehub.cn/enterprise/20200714095910.png)

2.  选择需要检出的代码仓库，按需求配置操作权限。

![](https://help-assets.codehub.cn/enterprise/20200714095925.png)

3.  点击确定后创建成功。

**步骤二：在项目 B 创建凭据**

1.  进入项目 B 进入【项目设置】->【开发者选项】->【凭据管理】，点击 “录入凭据”。

![](https://help-assets.codehub.cn/enterprise/20200714095940.png)

2.  回到之前创建好的项目 A 项目令牌页面，点击 “查看密码”。

![](https://help-assets.codehub.cn/enterprise/20200714100100.png)

3.  在项目 B 的 “录入凭据” 窗口选择 “用户名 + 密码” 类型凭据，粘贴项目令牌对应信息。

![](https://help-assets.codehub.cn/enterprise/20200714100136.png)

4.  选择授权的持续集成项目，点击 “保存”。

![](https://help-assets.codehub.cn/enterprise/20200714100235.png)

**步骤三：在项目 B 持续集成任务中配置对应的环境变量**

1.  进入持续集成设置 -> 【流程配置】，添加 “从代码仓库检出” 步骤，点击 “环境变量”。

![](https://help-assets.codehub.cn/enterprise/20200714100322.png)

也可以在添加检出流程之后，进入持续集成设置 ->【变量与缓存】中添加环境变量。

![](https://help-assets.codehub.cn/enterprise/20200714100331.png)

2.  分别添加以下两个环境变量： 

| 变量名                              | 默认值 |
|------------------------------------|----|
| GIT_REPO_URL                   |  需要检出的仓库克隆地址（HTTPS）   |
| CREDENTIALS_ID              |   在步骤二录入的凭据 ID   |

![](https://help-assets.codehub.cn/enterprise/20200714100413.png)
![](https://help-assets.codehub.cn/enterprise/20200714100440.png)

填好后的环境变量：

![](https://help-assets.codehub.cn/enterprise/20200714100506.png)

**步骤四：开始构建任务，成功检出代码**

![](https://help-assets.codehub.cn/enterprise/20200714100543.png)

### [如何检出使用 Git LFS 的仓库？](#git-lfs)

在持续集成中用户可以通过流程配置检出使用 Git LFS (Large File Storage) 插件管理的代码仓库，实现带有大文件的 Git 仓库持续集成。

**Git LFS 简介**

Git LFS 插件加速了带有频繁变动的大文件（例如图片、视频等）的 `git clone` 和 `git fetch` 操作。

每当您在仓库中添加了大文件时，Git LFS 插件会将它储存在本地的 Git LFS cache 中，同时将代码仓库中的大文件内容代替为指向缓存地址的引用。当您提交代码时，本次提交所涵盖的所有大文件会被提交到远程 Git LFS cache 中，该缓存和您的远程仓库相关联。当您检出带有大文件引用的提交时，插件会将其替换为缓存中的文件实际内容。

因此，通过 Git LFS 插件的管理，大文件只会在 `git checkout` 的时候被加载。

**如何在构建计划中检出代码**

在【构建计划设置】->【流程配置】页面，添加 “从代码仓库检出” 步骤，添加 Git-LFS-Pull 插件。

![](https://help-assets.codehub.cn/enterprise/20200714095732.png)

**Jenkinsfile

``` groovy
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: env.GIT_BUILD_REF]],
          extensions: [
            // 添加 GitLFSPull 插件
            [$class: 'GitLFSPull'],
          ],
          userRemoteConfigs: [[
            url: env.GIT_REPO_URL,
            credentialsId: env.CREDENTIALS_ID
          ]]
        ])
      }
    }
  }
}
```

### [关联的工蜂仓库无法同步至外部仓库列表](#gongfeng)

目前需在工蜂授权时选择 “当前帐号” 的授权范围才能成功同步到外部仓库列表，并在持续集成构建任务重被检出，如果您选择的授权范围是 “项目组” 或 “项目”，则无法成功同步。

![](https://help-assets.codehub.cn/enterprise/20210825145922.png)

### [如何拉取多个代码仓库？](#multi-repo)

> 需保证具备被拉取仓库的访问权限。

在构建过程中步骤中添加以下命令：

```bash
git clone https://${USERNAME}:${PASSWORD}@${Repository}
```

你可以在「变量与缓存中」按照下图填写用户名和仓库地址，以环境变量的方式注入至构建过程中：

![](https://help-assets.codehub.cn/enterprise/20211202162854.png)

==== 2021/07/30 ====
