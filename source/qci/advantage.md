---
title: 产品优势 - CODING 帮助中心
pageTitle: 产品优势
pagePrevTitle: 产品简介
pagePrev: qci/intro/ci.html
pageNextTitle: 自研引擎优势
pageNext: ci/start.html
sitemap: false
---

### [产品优势](#advantage)

基于以上现状，CODING 从**流程串联**及**数据整合**这两个角度出发，打造一个更纯粹的持续集成/持续交付平台，它具备以下特性及优势：

-   **流水线作业**

CI 任务支持流水线作业，业务可自行将任务划分成若干阶段（流水线形式），使用各式满足各研发环节的界定和串联。

-   **开放能力**

相比其它平台封闭内置能力，我们提供更开放的自助接入能力。用户可根据自身需要将自动化工具接入到 CI/CD 任务中，满足各类自动化工具组合诉求。

-   **数据可视化**

你可以在 CODING 快速浏览整个持续集成/部署的核心关键信息，并提供详细信息的跳转链接，辐射关联其他更有价值的内容。

-   **容器友好型**

基于 Docker 容器的集成任务。相比以往需要自行提供编译机接入的持续集成系统，我们支持以容器的方式完成项目的整个持续集成任务，降低接入成本。支持编译 Docker 镜像，能够基于 Dockerfile 完成镜像编译并自动提交至任意 Dockerhub。

-   **集成任务加速**

针对业务特性，自动缓存集成任务的中间结果，在任务内及任务间复用，从而达到任务加速的功能。此外还能够通过磁性分发、工作空间缓存等管理方式对集成任务静默提速。

新版持续集成引擎其带来的优势涵盖更为简单易懂的配置语法、插件扩展能力、优秀的资源调度等，以下是部分产品优势概览。

新版持续集成引擎其带来的优势涵盖更为简单易懂的配置语法、插件扩展能力、优秀的资源调度等，以下是部分产品优势概览。

### 编写脚本

基于 Pipeline as Code 理念，所有配置均使用代码化配置与存储机制。语法预览：

```yml
version: 2.0  # CIFile版本号，请不要修改

worker:
    label: my_label   # 任务执行的集群，当为 PUBLIC 或不设置 label 属性时，将使用公共节点执行
    docker:           # 可单独指定执行环境的 Docker 镜像，如不设置 docker 配置，将使用内置执行环境，详见编译环境章节
      registry: my_custom_registry
      image: my_custom_image
      username: $DOCKER_USER
      password: $DOCKER_PWD


# 用户自定义环境变量
env:
    USERNAME: myname
    PASSWD:
      secret: xxxxyyyzz #  加密字符串，在执行时 CODING-CI 会将字符串解密
    TESTREADONLY:       #  复杂环境变量结构，详见环境变量章节
      value: my_value
      desc: test readonly atrribute
      readonly: true
    MYREPO: ${QCI_WORKSPACE}/git # 支持环境变量的引用嵌套

# 定义任务在启动前需要执行哪些初始化动作
setup:   
    - yum install php
    - pip3 install requests

# 定义任务的提交触发方式
trigger:
  branches:
    include:            # 定义哪些分支的变更会触发任务，不填或 '*' 代表所有分支都会触发此任务
        - master
        - release/*
    exclude:            # 定义哪些分支的变更不会触发任务，不填代表没有分支会被忽略
        - release/old*
        - release/bak*
  tags:
    include:            # 定义哪些 tag 的推送会触发任务，不填或 '*' 代表所有分支都会触发此任务
        - master
        - release/*
    exclude:            # 定义哪些 tag 的推送会触发任务，不填代表没有 tag 会被忽略
        - release/old*
        - release/bak*
  paths:
    include:            # 支持定义分支下的哪些目录变更后才触发任务，不填或 '*' 代表所有文件变更都会触发此任务
        - src/*
    exclude:            # 支持定义分支下的哪些目录变更后不触发任务，不填代表没有文件变更会被忽略
        - release
        - build

# 定义任务的 MR 触发方式
mr:
  branches:
    include:            # 定义哪些分支的变更会触发任务，不填或 '*' 代表所有分支都会触发此任务
        - master
        - release/*
    exclude:            # 定义哪些分支的变更不会触发任务，不填代表没有分支会被忽略
        - release/old*
        - release/bak*
  paths:
    include:            # 支持定义分支下的哪些目录变更后才触发任务，不填或 '*' 代表所有文件变更都会触发此任务
        - src/*
    exclude:            # 支持定义分支下的哪些目录变更后不触发任务，不填代表没有文件变更会被忽略
        - release/*
        - .gitignore
  is_local_mr: 0        # 是否在任务执行前尝试在编译机上模拟一次合入
  is_block_mr: 0        # 在流水线执行中或执行失败时，是否拦截 MR 的合入

# 定义流水线执行内容
stages:
    - stage: install    # 一个 stage 下如果只有一个 task，支持简写
      cmds:   
          - pip install -r requirements.txt
    - stage: build
      if: $QCI_REPO_BRANCH = master    # 支持条件执行
      cmds:
          - make clean
          - make build
      artifacts:    # 收集在任务执行完成时的制品
          - dist/*.apk

    - stage: test
      worker:
        label: PUBLIC
        language: python
      tasks:     # 一个 stage 下的多个 task 会在直接节点上并发执行
          - task: unittest
            if: $QCI_REPO_BRANCH = master
            cmds:
                - make test -unittest
            temps:  # 任务内缓存，将传递到后续 stages，任务完成后销毁
                - ./result/*
          - task: ui-automation
            output_timeout: 20
            cmds:
                - make test -qta
          - task: lint code
            output_timeout: 20
            ignore: true    # 该任务可以忽略错误，即任务失败后也可继续往后执行
            cmds:
                - codedog -o ./build/codedog.json
            status: ./build/codedog.json     # 支持主动声明任务执行结果及报告链接

    - prompt:  # 人工确认阶段，在确认阶段，系统将不会继续执行直到确认完成
      - msg: Should go on?
        detail: "[click to detail](http://coding.net)"
        env:
          TAPD:
            value: ""
            desc: "tapd链接"
        to: someone_A
        timeout: 1440
      - msg: another message
        to: [someone_A, someone_B]

    - stage: deploy
      cmds:
        - plugin: zhiyun_simple_submit
          params:
            product: ${ZHIYUN_PRODUCT}
            name: ${ZHIYUN_NAME}
            description: ${ZHIYUN_DESC}
            tarball: ${ZHIYUN_TARBALL}

finally:      # 任务结束前的清理动作，支持 success（仅成功时执行），failure（仅失败时执行） 和 all（全部执行）
  failure: 
        cmds:
            - echo "CI fails!"
            - email --title "Your CI Fails!" --to hensonwang@tencent.com

cache: # 任务间缓存，设置任务间缓存
    - ${HOME}/.gradle/
    - ./node_modules/

# 定义通知
notifications:
    - name: "通知"                       # QCI前端页面展示用
      channel: "EMAIL;ENWECHAT"        # 通知渠道。EMAIL;ENWECHAT;SMS;ENWECHAT_GROUP;WECHAT
      group: "QCI_JOB_ADMIN;QCI_JOB_NOTIFY_USER"  # 通知组（QCI内置的管理员成员等，如：QCI_JOB_MEMBER;QCI_JOB_ADMIN;QCI_JOB_NOTIFY_USER;QCI_TRIGGER）
      enwechat_group: ""           # 企业微信群id
      user: "andrewjiang;"         # 指定人
      template: ""                 # 通知内容模版
      on_success: change           # 成功发送(change或者always或者never)
      on_failure: always           # 失败发送(change或者always或者never)
    - name: "通知2"
      channel: EMAIL
      group: QCI_JOB_ADMIN
      user: ""
      template: ""
      on_success: change
      on_failure: never

# 当前任务数允许的最大执行并发数
maximum_builds: 3

# 是否清理工作空间，默认清理。1：不清理，0：清理
is_no_revert: 1

# 是否自动取消排队中的任务，默认不取消。1：取消，0：不取消
is_auto_cancel: 1
```

### 构建过程

不止于在配置语法层面进行优化，在使用图形化编辑器中过程中也能感受到由全新引擎所带来的变化。

#### 分布式运行

支持以「任务」级粒度进行构建节点资源下发和管理，支持灵活的分布式执行场景。同时，各项阶段也支持重命名。

![](https://help-assets.codehub.cn/enterprise/20210817165721.png)

#### 新增执行条件

「任务」级粒度层面支持使用条件触发，只有当满足条件时才会执行此任务，例如需去的由上个阶段生成的制品或历经人工确认等预设条件，才能继续执行。

![](https://help-assets.codehub.cn/enterprise/20210817170524.png)

勾选失败条件后，若上一个任务或阶段运行失败，也不会影响本次任务的运行。

![](https://help-assets.codehub.cn/enterprise/20210817173035.png)

![](https://help-assets.codehub.cn/enterprise/20210817173048.png)

#### 灵活分配构建时长

支持设置超时条件，灵活管控任务时长。

![](https://help-assets.codehub.cn/enterprise/20210817173709.png)

#### 优化代码拉取逻辑

支持选定代码拉取范围，实现按需拉取构建代码。

![](https://help-assets.codehub.cn/enterprise/20210817175225.png)

### 高级配置

除了优化构建过程，针对环境变量与触发规则、版本管理、日志变更与任务记录管理也做出了更新。

-   环境变量分组

一条流水线在不同场景下能够切换并使用不同的环境变量。

![](https://help-assets.codehub.cn/enterprise/20210817195050.png)

-   更细粒度的触发细则

支持使用更多的触发细则，例如按路径、人员监听等条件，满足单体仓库及复杂场景下的使用。

![](https://help-assets.codehub.cn/enterprise/20210817195524.png)

-   版本管理能力

具备更加强大的构建任务版本号管理策略。

![](https://help-assets.codehub.cn/enterprise/20210817195719.png)

-   快速禁用/启用任务

支持流水线自动禁用。

![](https://help-assets.codehub.cn/enterprise/20210817195938.png)

-   日志与追溯能力

优化实时日志刷新体验，支持快速跳转及分段展示及收起。

![](https://help-assets.codehub.cn/enterprise/20210817200052.png)

-   任务变更记录

支持查看任务变更记录，追溯任务变更来源和差异详情。

![](https://help-assets.codehub.cn/enterprise/20210817200134.png)

==== 2021/08/17 ====
