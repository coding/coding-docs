---
title: 自动添加合并请求评审者 - CODING 帮助中心
pageTitle: 自动添加合并请求评审者
pagePrevTitle: 调取已上传的凭据
pagePrev: ci/plugins/credentials.html
pageNextTitle: 人工确认
pageNext: ci/plugins/manual-confirmation.html
alias: devops/ci/plugins/reviewer.html
---

### 功能介绍

CODING 的内置插件支持用户在持续集成中触发合并请求功能时，系统自动为合并请求添加评审者。

### 快速开始

您可以使用内置的模板或使用 Jenkinsfile 配置来实现此功能。

#### 内置模板

1.  新建构建计划后，选择 「CODING 合并请求添加评审者」模板。

![](https://help-assets.codehub.cn/enterprise/20200925134503.png)

2.  选择指定的评审者。

![](https://help-assets.codehub.cn/enterprise/20200925140249.png)

3.  在触发合并请求时，系统会自动添加评审者。

![](https://help-assets.codehub.cn/enterprise/20200311172134.png)

#### Jenkinsfile 配置

``` groovy
pipeline {
    agent any
    stages {
        stage('为合并请求添加评审者') {
            steps {
                codingMRReviewer(
                    reviewers: '此处填写评审者邮箱',
                )
            }
        }
    }
}

```

将上述配置写入代码仓库的 Jenkinsfile 配置文件后，在本地使用 git push origin localbranch:mr/targetbranch/localbranch 命令就可以实现一下效果：

创建合并请求 -> 触发构建 -> 自动化测试和构建 -> 自动添加合并请求评审者

#### 更多参数演示

```groovy
pipeline {
    agent any
    stages {
        stage('为合并请求添加评审者') {
            steps {
                codingMRReviewer(
                    reviewers: 'coding@coding.com,test2,coding',
                    mrResourceId: '${env.MR_RESOURCE_ID}',
                    credentialsId: '${env.CODING_ARTIFACTS_CREDENTIALS_ID}',
                    withBranchAdmin: false,
                )
            }
        }
    }
}

```

#### 参数说明

| 参数名称                     | 是否必填 | 文本参数类型  | 图形化参数类型     | 默认值                                                      | 说明                                                                                                                 |
|--------------------------|------|---------|-------------|----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| reviewers                | 是    | string  | 项目成员（多选）    | \-                                                       | 需要添加的评审者，多个评审者以逗号分隔, 如: coding@coding\.com,test2 。 支持填写项目内用户的邮箱或 GK （项目外或者不存在成员，会添加无效）                             |
| mrResourceId             | 否    | string  | string      | $\{env\.MR\_RESOURCE\_ID\}                               | 需要添加评审者的 MR 资源 ID，默认会使用 CODING 持续集成内置的系统环境变量 MR\_RESOURCE\_ID （注意：该环境变量只有在发起 MR 时才会存在，若没有设置该参数，或环境变量中不存在，会跳过添加评审者） |
| credentialsId	           | 否    | string  | 凭据（用户名\+密码） | $\{env\.CCI\_CURRENT\_PROJECT\_COMMON\_CREDENTIALS\_ID\} | 用于发起添加评审者操作的凭据（只支持 username \+ password 且必须为项目令牌）类型，默认将使用环境变量中的 CCI\_CURRENT\_PROJECT\_COMMON\_CREDENTIALS\_ID              |
| \(尚未支持\) withBranchAdmin | 否    | boolean | boolean	    | false                                                    | 自动邀请目标分支的管理员作为评审者，与 reviewers 不冲突，可同时配置                                                                            |

### 常见问题

**Q：如果配置的 reviewer 不存在会导致构建失败吗？**

A：不会。

但是如果 reviewer 没有配置，则会构建失败。若无法在当前的团队内找到所有对应的 reviewers， 则会跳过 添加评审者 的操作，并将当前 stage 的构建状态标记为 UNSTABLE （不稳定的），并且不会导致构建的失败。

您可以在日志中看到对应的警告信息，会提示无法在当前项目 my-project 中找到评审者 test2,test3。

若只有部分 reviewer 未找到，则只能添加已经存在的 reviewer, 同理也将标记为 UNSTABLE（不稳定的），并在日志中输出对应的警告信息。

![](https://help-assets.codehub.cn/enterprise/20200925141153.png)

**Q：如果 mrResourceId 对应的合并请求已经合并或者没有配置 mrResourceID 会导致构建失败吗 ？**

A: 不会。

若 mrResourceId 没有配置且 ${env.MR_RESOURCE_ID} 不存在，也不会导致构建失败，但同样会输出相关的警告日志。

至于不存在或已经合并的情况，会将将对应的 stage 标记为 UNSTABLE (不稳定的)， 然后输出对应的构建日志。

**Q：多次添加重复的 reviewer 会导致构建失败吗？**

A: 不会，内置插件会自动跳过已经添加的 reviewer。

==== 2020/08/13 ====
