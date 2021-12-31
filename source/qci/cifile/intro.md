---
title: 示例文件参考 - CODING 帮助中心
pageTitle: 示例文件参考
sitemap: false
---

### 前言

遵循 [Infrastructure as Code 思想](https://en.wikipedia.org/wiki/Infrastructure_as_code)，持续集成的过程配置文件（CIFile）以 yaml 形式进行任务声明与执行。以下文档重点介绍如何通过 yaml 文件方式配置持续集成引擎任务，您可以通过 yaml 中的关键字介绍，了解当前 持续集成引擎的基本概念，参照 demo 快速组织任务，将 yaml 文件上传代码库或通过 持续集成引擎平台导入生成任务。

此外，持续集成引擎还支持基于 UI 交互的任务配置，用户可直接在 持续集成引擎平台上完成任务组织和生成，详细操作指引可参考：[快速开始](/docs/qci/intro/quick-start.html)。

### version: 2.0

CIFile是用户使用 持续集成引擎的重要入口。该文件格式的设计需要兼顾简单易用和强扩展性，同时利于 CI 系统高效执行。

CIFile使用 yaml 格式定义，原则上 CIFile 的命名可以任意指定，在任务配置中指定任务所关联的 CIFile。便于理解，我们推荐并默认以 .coding-ci.yml 的方式来命名 CIFile 文件。

用户编写好.coding-ci.yml，并上传到用户的代码库中。

.coding-ci.yml 的完整示例格式如下：

```yaml
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
      secret: xxxxyyyzz #  加密字符串，在执行时 持续集成引擎会将字符串解密
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

CIFile文件格式包含下面的几块配置声明：

- `worker` **定义任务执行的机器环境**，目前支持使用`实体机/裸机`及`docker 容器`内进行任务执行：
  - `label`： 指定执行的实体机/裸机标签，该标签为用户在注册实体机/裸机时指定的执行机分组。[如何接入执行机](../编译机/worker-register-Linux.md)
  - `docker`： 指定 docker image，目前 持续集成引擎已支持从任意 docker 镜像仓库（例如 docker.io，腾讯云CCS等）拉取镜像进行任务执行。[如何指定镜像源](../docker/custom-image.md)
  - 您可以不指定`woker` 整个标签，系统将使用默认 Docker 镜像执行任务。[查看默认执行环境](../docker/public-image.md)
  - 如果将`docker`设置为空`~`，在公共执行机中会在基础 Docker 中运行，在自定义编译机中则会在实体机执行命令
  - `worker`可以在`stage`或`task`中指定，表示指定`stage`或`task`的执行环境，详细内容可参看[编译环境的指定](./编译机/worker_usage.md)，可以通过指定`language`来指定 持续集成引擎内置的编译环境，请参看[使用language指定编译环境](../docker/docker-language.md)

- `env`  **用户自定义的环境变量**。在 持续集成引擎提供的[系统内置环境变量](../环境变量/env-variables-usage.md)之外，用户可事先申明环境变量，提供任务中命令使用。

  - `secret`： 用 持续集成引擎提供的密钥加密后的敏感数据密文。在任务执行中 持续集成引擎会进行自动转换成明文。
  - 可以通过`desc`指定环境变量的描述，`readonly`指定环境变量在界面上的只读属性，更多属性可参见[环境变量的使用](../配置文件/CIfile-env-variables.md)

- `setup` 在每个 stage 前都会执行的初始化动作，若一条流水线在单个节点执行则只会在第一个 stage 初始化；若一条流水线会在多个节点执行，则会在每个节点都进行初始化，查看[流水线定义详细说明](pipeline-stage-task.md)

- `trigger` 配置 PUSH 和 TAG 触发条件，查看[触发条件](trigger.md)

- `mr` 配置 mr 触发条件，查看[触发条件](trigger.md)

- `stages` **定义持续集成任务内容**。[查看流水线定义详细说明](pipeline-stage-task.md)
  - `stage`： 集成任务的执行阶段定义，一个集成任务可以定义一到多个 stage，多个 stage 顺序执行。所有 stage 执行成功，整个集成任务才执行成功。前一个 stage 执行失败后不再继续后续 stage。

  - `task`：执行阶段里的任务定义。一个 stage 里可以定义多个 task，多个 task 并行执行。stage 下的所有 tasks 执行成功，stage 才标志为成功。

    - 如果 stage 里只有一个 task，可以省略`tasks`字段，将 task 的参数直接写到 stage 里。

  - `cmds`：执行任务里的执行命令。在*nix下是 shell 命令，在 windows 下是 dos 命令。 一个 task 可指定多行 cmd，多行 cmd 顺序执行。cmd 如果返回`0`表示成功，非`0`表示失败。所有 cmd 执行成功，整个 task 才执行成功。前一个 cmd 执行失败后不再继续后续 cmd。所有 cmd 都执行成功时，task 返回成功，否则返回失败。
  在```version: 2.0```中，多个 cmds 之间是可以继承上下文环境的。比如，你可以这样定义多个 cmds:
    ```yaml
    cmds:
      - a = 1
      - cd ./bin/
      - echo $a;sh start.sh
    ```

  - `if`: 可以在`stage`和`task`上设置，表示执行该`stage`或`task`执行的条件，具体请参看[条件执行](../配置文件/condition.md)

  - `output_time`: 可以在`stage`和`task`上设置，表示任务在运行过程中，多少时间没有输出会置为超时，单位为`分钟`，详细信息请参看[超时时间](../配置文件/timeout.md)

  - `ignore`: 可以在`stage`和`task`上设置，表示该`stage`和`task`的执行结果不影响整个任务的结果，请参看[忽略节点的执行结果](../配置文件/ignore.md)

  - `status`： 除依据 cmds 的返回值判断任务是否成功外，持续集成引擎还支持通过`status`字段显式指定 task 的结果，并提供展示更丰富的任务结果信息的能力，[查看status字段说明](../任务/pipeline-status.md)。status 字段指向一个 json 文件，该文件包含下面几个字段：

      - `status`： 必选，可以是"success", "failure", "error"。
      - `description`： 可选，status 的描述，支持 markdown 格式。
      - `url`： 可选，指向一个外部的 url 链接。
      - `title`： 可选，配合 url 在 web 端展示，尽量简明。
      - `report_dir`：可选，指向要上传到文件服务器的路径
      - `report_html`：可选，指定 report_dir 时，链接的首页文件

  - `artifacts`: 指定集成任务产出文件或目录（如构建产出、测试报告等），在 web 界面上提供下载。

     如果脚本中需要获取 artifacts 的下载链接， 可以使用如下方式拼接：

     ```
     http://${TEAM_GK}.coding.net/api/qci/rest-api/totalresult/${QCI_BUILD_ID}/artifacts/${FILENAME}
     ```

     参数解释：
   > QCI_BUILD_ID：持续集成引擎平台环境变量，当前集成 ID，shell 命令中通过 $QCI_BUILD_ID 方式获取，py 脚本可以通过 os.getenv('QCI_BUILD_ID', None) 的方式获取，也可以通过启动接口返回的pipeline_result_id 字段获取

     > FILENAME：用户在 CIFile 中配置的 artifacts 文件，用于下载指定的单个文件，可以带上相对路径，不需要填上相对路径的第一条斜杠。
                  如果用户的编译环境是 windows 环境，则在拼接下载链接的时候，需要将 windows 的分隔符转换为 linux 系统的分隔符，
                  例如 windows 下上传的 artifacts 填写为"test\myFile.apk",则拼接文件时需要使用的链接是"http://${TEAM_GK}.coding.net/api/qci/rest-api/totalresult/${QCI_BUILD_ID}/artifacts/test/myFile.apk"

  - `temps`： 指定任务内缓存。temps 指定文件会被保存，并传递给下游的 stage。

- `prompt`：表示需要人工确认的节点。当执行到了 prompt 节点后，会通知处理人进行相应的操作，处理人可以选择继续执行还是中止任务，请参看[prompt使用说明](../配置文件/prompt.md)

- `finally`：最后执行的节点，且无论前面的节点是否成功。`finally`包含`success`,`failue`,`all`三个条件，分别表示成功、失败、或是无论如何都需要执行的命令，具体用法请参看[finally](../配置文件/finally.md)

- `cache`： 指定任务间缓存。cache 的内容会在下次持续集成的时候利用，从而达到集成任务加速效果。可以用来缓存一些比较耗时的操作，例如依赖包的下载安装、依赖库的编译产出。[查看文件缓存及任务加速说明](../缓存及加速/caches.md)

- `notifications` 通知方式配置，查看[通知及其它配置](notify-other.md)

### version: 1.0

**不推荐使用**

指定CIFile中```version: 2.0```，cmds 下的每个 cmd 命令会继承上下文环境，从而可以更简洁的进行命令行的书写。

在```version: 1.0```的版本中，cmds 下每行执行的命令是相互隔离的，比如，每行 cmd 的```cd```命令或定义变量等行为只在本次命令有效。

比如，在```version: 1.0```版本中，cmds 需要这样写

```yaml
 - cd ./src/ && composer install
 - cd ./src/ && composer update
```

在```version: 2.0```中，命令可以继承上下文环境，cmds 可以这样写

```yaml
- pwd;  a=1  # 当前在workspace根目录
- cd ./src/
- pwd; echo $a      # 当前在workspace/src 目录， 可以获取到 变量a的值
```

在 UI 配置中，命令行的运行方式是继承上下文环境的（即 version: 2.0 的方式）。

==== 2021/08/04 ====
