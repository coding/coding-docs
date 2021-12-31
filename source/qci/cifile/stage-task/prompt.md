---
title: 人工确认 - CODING 帮助中心
pageTitle: 人工确认
sitemap: false
---

prompt 关键字可以用来暂停当前任务的执行，用于人工确认是否需要继续执行或是中止执行。

### [基础用法](#basic)

在 CIFile 中设置 prompt 关键字：

prompt 在 stages 关键字的下一级，作为一个特殊的 stage，prompt 关键字例子如下：

```
stages:
    - stage: build
      cmds:  # cmds are executed sequtially
          - make

    - prompt:  #the stage will hold until recerver confirm
        - msg: Should go on?
          detail: "[click](http://tapd.oa.com)"
          to: someone
        - msg: another message
          to: [someone_A, someone_B]
```

`msg`表示流水线暂停的原因、以及用户需确认的内容等信息，会显示在 prompt 的人工确认界面中。

`to`表示该 prompt 需要确认的处理人，多个处理人使用列表的形式，表示其中任一一个处理人都可以处理。

`detail`表示显示在处理界面上的详细信息，支持 markdown 格式和环境变量，人工处理时可以展示更丰富的信息和交互。

包含 prompt 关键字的 pipeline 如下图所示：

![](https://help-assets.codehub.cn/enterprise/20211012162526.png)

可以在 detail 关键字中填写 markdown 和环境变量

![](https://help-assets.codehub.cn/enterprise/20211012162538.png)

点击 task 节点，会显示 prompt 处理页签，处理人可以根据实际情况选择继续运行或是中止流水线

![](https://help-assets.codehub.cn/enterprise/20211012162559.png)

选择“继续”，如果还有剩余的 prompt 任务，还需要等待其余的 prompt 处理完毕，否则后面的 stage 将会继续执行。

选择“终止”，其余的 prompt 任务将会置为`略过`，后面的 stage 将不会执行（finally 除外）

![](https://help-assets.codehub.cn/enterprise/20211012162612.png)

**注意**： prompt的处理人可以用```QCI_PROMPT_OPERATOR```环境变量来获取，多个处理人用分号分隔。
处理信息可以用```QCI_PROMPT_MSG```环境变量来获取，多个处理信息用分号分隔。

**注意**： prompt下的 msg、to、detail 关键字支持使用环境变量。

**注意**： 为了方便使用环境变量来定义不定个数的处理人，to 关键字同时也支持用分号(```;```)分隔的多个人名

### [超时设置](#ttl)

`prompt` 也算入任务的整体执行时长中，可以通过`timeout`关键字来指定超时时间。

例子如下：

```yaml
- prompt:  #the stage will hold until recerver confirm
    - msg: another message
      to: [someone_A, someone_B]
      timeout: 30
```

`timeout`的默认单位是`分钟`，CODING-CI允许指定时间单位来简化配置，目前支持`h`(小时)，`m`(分钟)，`s`(秒)

比如，允许处理时间为一小时，可以设置成

```yaml
- prompt:  #the stage will hold until recerver confirm
    - msg: another message
      to: [someone_A, someone_B]
      timeout: 1h
```

### [自定义表单](#custom-form)

`prompt`可以设置自定义表单项，填写的表单项在后续步骤中可以通过环境变量获取。

自定义表单项的格式与 CIFile 中环境变量的格式一致。

```yaml
- prompt:  #the stage will hold until recerver confirm
    - msg: another message
      to: [someone_A, someone_B]
      env:
          tapd_url: "",
          report_url:
              value: ""
              desc: 报告链接
              require: true
```

`desc`为表单项的说明

`require`为 true 表示表单项必录

`env`的 key 会放入环境变量中，在后续的步骤中可以直接获取，在此也需要注意环境变量的注意事项。

==== 2021/10/12 ====
