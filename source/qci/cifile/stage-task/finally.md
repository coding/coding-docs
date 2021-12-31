---
title: 收尾阶段 - CODING 帮助中心
pageTitle: 收尾阶段
sitemap: false
---

CODING-CI 的流水线在步骤运行失败时，会中止本次执行。但实际中，即使任务失败了也需要进行一些操作，比如处理环境清理、回滚、通知等。

finally 关键字就是可以根据任务结果来运行的 stage。

### [使用说明](#intro)

在 CIFile 中，可以在第一级指定 finally 关键字，示例如下：

```yml
stages:
    - stage: build
      cmds:  # cmds are executed sequtially
          - make

finally:
    failure:
        cmds:
            - echo "CI fails!"
            - email --title "Your CI Fails!" --to someone
```

其中，failure 表示任务执行失败时触发，cmds 表示要执行的命令列表，为简化起见， failure 下不支持配置多个 task。

也可以设置多个触发条件：

```yml
finally:
    success:
        cmds:
            - echo "CI sucess!"
    all:
        cmds:
            - echo "CI all!"
    failure:
        cmds:
            - echo "CI fails!"
```

finally下的条件支持```success```、```failure```、```all```三种，```success```表示任务成功时执行，```failure```表示任务失败时执行，```all```表示不管任务结果如何始终要执行。

这三种条件都是可选的。

### [使用效果](#influence)

设置 failure 关键字时，当任务执行成功时，不会触发 finally

![](https://help-assets.codehub.cn/enterprise/20211012163524.png)

当任务执行失败时，finally 会被触发执行

![](https://help-assets.codehub.cn/enterprise/20211012163535.png)

设置多个关键字时，当任务执行失败时结果如下

![](https://help-assets.codehub.cn/enterprise/20211012163544.png)

==== 2021/10/12 ====
