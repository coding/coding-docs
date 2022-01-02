---
title: 开发指引 - CODING 帮助中心
pageTitle: 开发指引
pagePrevTitle: 功能介绍
pagePrev: ci/plugins/customize/overview.html
pageNextTitle: 声明文件
pageNext: ci/plugins/customize/format.html
---

### [目录结构](#stru)

插件结构范例：

```bash
- my-plugin-project  // 您的项目目录
  - my-script.xx     // 构建插件执行脚本或入口文件，支持任意语言组织（需执行环境具备，如需特殊环境可使用容器）
  - qciplugin.yml   // 构建插件声明文件，定义您的构建插件名称、版本、参数等信息
```

以上两个文件为必填项。`qciplugin.yml` 为[声明文件](/docs/ci/plugins/customize/format.html)，用于声明插件启动时执行该脚本；插件执行器会在运行时读取该文件，确定插件的参数要求及执行方式。插件文件不限制开发环境与语言；目录下的其它文件和子目录结构无其他要求。

> *提示：插件命名请避免使用下划线(_)与点号(.)开头。*

### [机制说明](#mechanism-detail)

插件文件需读取[声明文件](/docs/ci/plugins/customize/format.html) `qciplugin.yml` 的内容并使用两部分配置:

-   variables: 用于确定从当前插件需要使用者传入哪些参数, 只有声明在 variables 里的参数才会在流水线编排时提供输入表单
-   entry: 用于确定插件要怎样执行脚本命令. 并且会将 variables 里收集到的参数, 根据 entry 里声明的占位符进行填充

假设开发者制作了一个命令行脚本，并接收 `–input` 参数，执行完成后输出 `status.json` 文件：

```bash
python ./run.py --input "hello world" --status ./status.json
```

那么 `qciplugin.yml` 文件的配置声明示例如下:

```yaml
id: myplugin

variables:
  - name: input
    type: text
    label: 输入内容
    required: true

entry:
         #-------------------- 程序入口 -----------------# #- 参数占位符 -# #---------------- 固定参数 ---------------#
  start: $QCI_PLUGIN_EXECUTABLE $QCI_PLUGIN_RUNTIME/run.py     $input        --status $QCI_PLUGIN_RUNTIME/status.json
```

`variabels` 参数声明启动插件时，需要一个 input 参数，运行时需要将 input 参数值替换 start 节点中的 $input 位置，实际上是替换 `–input “value”` 并执行 start 命令。

`–status` 是一个固定参数(不需要用户传入)，允许直接填写。

`$QCI_PLUGIN_EXECUTABLE` 是一个指向在 qci-plugin 中运行 python 命令的特殊值，用来避免环境中可能出现不同的的 python 版本所可能导致的不统一。

`$QCI_PLUGIN_RUNTIME` 是一个特殊的值，用以指向插件目录。因为 qci-plugin 在执行机中, pwd 指向的是集成目录而非插件安装目录，故使用 “./“ 这类相对目录不能等同于插件所在目录, 需要使用 `$QCI_PLUGIN_RUNTIME` 替代插件目录从而找到正确的命令行脚本。

当运行以下命令时：

```bash
qci-plugin myplugin --input "hello world"
```

实际执行的命令如下（以执行环境为准）：

```bash
/usr/bin/python3 /data/__qci/__qci_tool_path/mysql-sjbh2b3/run.py --input "hello world" --status /data/__qci/__qci_tool_path/mysql-sjbh2b3/status.json
```

### [轮询结果](#polling-results)

部分插件调用涉及第三方服务，需要长时间轮询结果。CI 任务运行时有超时限制，如果需要长时间轮询请参考下文对插件进行改造。

#### [向 server 提交取消超时请求](#7-1)

你可以在 `qciplugin.yml` 上声明 `timeout: false`：

```yaml
# 插件版本, 用于定义插件包的版本, 做版本管理使用
version: '1.0'

# 插件ID, 必填
id: plugin_demo

# 插件中文名称
name: 插件 demo

# 添加此配置, 取消 server 超时检查
timeout: false
```

若希望细粒度的控制，可以在轮询声明中使用 `qciplugin` 的 [SDK](/docs/ci/plugins/customize/qci-plugin.html)：

```python
from qciplugin import run_forever_context

# 使用 with 语法, sdk 会帮助你处理所有事情
with run_forever_context():

  # 轮询
  while True:
    do_something()
```

#### [保证轮询过程中有内容输出](#7-2)

CI 任务在运行时会检查一段时间内脚本是否有输出，无输出则中断执行，请确保在轮询/等待过程中一直有内容输出:

```python
import time
from qciplugin import run_forever_context

# 使用 with 语法, sdk 会帮助你处理所有事情
with run_forever_context():

  # 轮询
  while True:
    print('.') # 打印一些内容
    do_something()
    time.sleep(30) # 等待 30 秒再次查询结果
```

### [状态上报](#report)

插件支持设置单个 status 节点指向 `status.json` 文件。插件执行完毕后，执行器会读取里面的内容。`status.json` 可以包含几个部分:

-   status: 可选, 可以是”success”, “failure”, “error”
    -   success：对应 CODING CI 状态为 “成功”
    -   failure：对应 CODING CI 状态为 “失败”, 例如检查出错
    -   error：对应 CODING CI 状态为 “命令异常”, 例如工具本身的错误
-   status_code: 失败的状态码, 可以由开发者自己定义
-   description: 可选, status 描述, 支持 markdown 格式
-   url: 可选, 指向一个外部的 url 链接
-   title: 可选, 请尽量简明
-   report_dir: 可选, 指向要上传到文件服务器的路径
-   report_html: 可选, 指定 report_dir 时, 链接的首页文件
-   metrics: 元数据指标, 如果有报元数据指标, 需要包含这个字段

示例：

-   单纯上报结果

```json
{
    "status": "success",
    "title": "点击查看报告链接",
    "url": "http://your.service.oa.com"
}
```

-   失败时上报状态码

```json
{
    "status": "failure",
    "status_code": 1001,  // 自定义状态码, 便于统计
    "title": "点击查看报告链接",
    "url": "http://your.service.oa.com"
}
```

-   上报本地文件

```json
{
    "status": "success",
    "title": "点击查看报告链接",
    "report_html": "./report/index.html", // report_html 是访问链接
    "report_dir": "./report" // report_dir 上传整个目录, 需要跟 report_html 搭配使用
}
```

-   上报指标

```json
{
  "status": "failure",
  "status_code": 1001,
  "metrics": {
      "files": 100,
      "errors": 8,
      "warning": 10,
      ...
  }
}
```

### [示例插件](#example)

你可以参考此公开[代码仓库](https://coding-public.coding.net/public/cci/ci-plugin-demo/git/files)查看示例插件。

### [插件上传](#upload)

点击团队首页右上角的齿轮图标 <img src ="https://help-assets.codehub.cn/enterprise/20210928153255.png" style ="margin:0"> 进入团队设置中心，在「功能设置」→「构建插件」中上传插件文件。

![](https://help-assets.codehub.cn/enterprise/20211014103947.png)

==== 2021/07/07 ====
