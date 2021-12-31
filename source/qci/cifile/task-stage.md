---
title: 集成任务设定与阶段划分 - CODING 帮助中心
pageTitle: 集成任务设定与阶段划分
sitemap: false
---

### [基本结构](#basic)

-   setup

    在yaml中使用setup关键字来指定每个stage最初要执行的操作，setup中指定的命令会在每个stage下的task之前执行。
    可以使用setup来进行环境初始化等操作，以便在分布式集成环境中也会初始化相同的环境。

    setup用一个列表表示多条初始化操作，示例如下：

```yml
version: 2.0

worker:
    label: mylabel

env:
    USERNAME: myname
    PASSWD:
      secret: xxxxyyyzz #the string encrypted by CODING-CI public key

setup:
    - yum install php
    - pip3 install requests

#define the stages
stages:

...

```

-   CODING-CI任务使用stage来划分不同阶段的任务(task)

    -   各个 stage 之间，串行执行

        -   即前一个 stage 下的所有任务执行完毕后才开始执行下一个stage的任务

```yml
stages:
    - stage: 阶段1-install
    - stage: 阶段2-build
    - stage: 阶段3-release
```
-   CODING-CI同一个stage下，可以有多个任务

    -同一 stage 下的多个任务，并发执行

```yml
stages:
    - stage: install
      tasks:
        - task: 任务1
        - task: 任务2
```

-   同一个stage下，仅有一个task时，可简写为：

```yml
stages:
    - stage: install
      cmds:
        - echo 'hello'
        - echo 'hi'
```

-   CODING-CI一个任务下，可以有多个命令(cmd)

    -同一task下的多个命令，串行执行

```yml
stages:
    - stage: install
      tasks:
        - task: 任务1
          cmds:
            - echo 'hello'
            - echo 'hi'
```

-   cmd 为命令行可执行的命令
    -执行命令前用户需确认所需环境已准备好

### [任务产出](#output)

CODING-CI任务产出，针对单个task配置
目前支持的产出命令字有artifacts

```yml
stages:
    - stage: install
      tasks:
        - task: 任务1
          cmds:
            - echo 'hello'
            - echo 'hi'
          artifacts：
            - ./dist/*.app
            - ./result/report.html
```

产出命令字，支持指定多项产出

### [任务状态](#stage)

隐式指定：

task下的所有命令都执行成功时，任务状态为成功，否则为失败
单个cmd：返回码为0时，为成功，非 0 为失败

显式指定：

使用命令字 status 指定

```yml
stages:
    - stage: install
      tasks:
        - task: 任务1
          cmds:
            - echo 'hello'
            - echo 'hi'
          status: ./status.json
```

### [stage 间数据传递](#stage-transfer)


使用文件传递数据

temps关键字：

指定的文件会被保存，并传递给下游的stage

使用运行时自定义环境变量传递数据

使用方式见环境变量
适用于很小的数据量传递的场景

### [任务超时机制](#ttl)

CODING-CI 通过两个策略来确定任务是否超时：

策略一：执行 task 下的 cmd 时，若间隔10分钟还未输出日志，则判定当前任务执行超时

此时提示为 `errorCode:-1002` 执行超时

若cmd日志打印间隔不超过10分钟，不会超时

可以自定义超时时间，具体方式请参考超时时间设置

策略二：task 开始执行之后，若超过24小时还未执行完毕，则判定当前任务执行超时

此时提示为 `errorCode:-1001` 执行超时

`prompt` 处理时间不会算在任务的总超时时间

==== 2021/08/04 ====
