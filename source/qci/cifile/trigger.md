---
title: 配置触发方式 - CODING 帮助中心
pageTitle: 配置触发方式
sitemap: false
---

可以在 CIFile 中配置 CI、TAG和 MR 触发方式。

### CI 触发


```yaml
trigger:
  branches:
    include:            # branch names which will trigger a build
        - master
        - release/*
    exclude:            # branch names which will not
        - release/old*
        - release/bak*
  paths:
    include:            # file paths which must match to trigger a build
        - src/*
    exclude:            # file paths which will not trigger a build
        - release
        - build
```

`branches`可以配置监控的分支和排除监控的分支，支持填写通配符和正则表达式。如果没有配置，则监控所有分支。

`paths`可以配置监控的路径和排除监控的路径，支持填写通配符和正则表达式。如果没有配置，则监控所有路径。

**注意**： 如果配置了`trigger`，则使用 CIFile 的 `trigger` 中规则进行 CI 和 TAG 触发，否则采用 UI 配置的 CI 和 TAG 触发规则。



### TAG 触发

```yaml
trigger:
  tags:
    include:            # tag names which will trigger a build
        - master
        - release/*
    exclude:            # tag names which will not
        - release/old*
        - release/bak*
  paths:
    include:            # file paths which must match to trigger a build
        - src/*
    exclude:            # file paths which will not trigger a build
        - release
        - build
  is_local_mr: 0        # is simulate merge local
  is_block_mr: 0        # is block mr util pipeline success
```

`tags`可以配置监控的 tag 和排除监控的 tag，支持填写通配符和正则表达式。如果没有配置，则监控所有 tag。

`paths`可以配置监控的路径和排除监控的路径，支持填写通配符和正则表达式。如果没有配置，则监控所有路径。

`is_local_mr`是否进行本地模拟合入，设置本地模拟合入后，将会在编译机的工作空间中进行 QCI_MR_SOURCE_BRANCH 到 QCI_MR_TARGET_BRANCH 的模拟合入。本次运行的结果将会是本次模拟合入后的结果。

`is_block_mr`是否 block 本次合并（流水线运行结束且流水线结果为通过后自动 unblock）。


**注意**： 如果配置了`trigger`，则使用 CIFile 的 `trigger` 中规则进行 CI 和 TAG 触发，否则采用 UI 配置的 CI 和 TAG 触发规则。

```yaml
trigger:
```

等同于：

```yaml
trigger:
  branches:
    include:
        - '*'
  tags:
    include:
        - '*'
  paths:
    include:
        - '*'
```

### MR 触发

```yaml
mr:
  branches:
    include:            # target branch names which will trigger a build
        - master
        - release/*
    exclude:            # target branch names which will not trigger a build
        - release/old*
        - release/bak*
  paths:
    include:            # file paths which must match to trigger a build
        - src/*
    exclude:            # file paths which will not trigger a build
        - release/*
        - .gitignore
```

`branches`可以配置监控的目标分支和排除监控的目标分支，支持填写通配符和正则表达式。如果没有配置，则监控所有目标分支。

`paths`可以配置监控的路径和排除监控的路径，支持填写通配符和正则表达式。如果没有配置，则监控所有路径。

**注意**： 如果配置了`mr`，则使用 CIFile 的`mr`中规则进行 MR 触发，否则采用 UI 配置的 MR 触发规则。

```yaml
mr:
```

等同于：

```yaml
mr:
  branches:
    include:
        - '*'
  paths:
    include:
        - '*'
```

==== 2021/10/26 ====
