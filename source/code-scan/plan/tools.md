---
title: 集成外部扫描工具 - CODING 帮助中心
pageTitle: 集成外部扫描工具
pagePrevTitle: Xcheck 工具
pagePrev: code-scan/plan/xcheck.html
pageNextTitle: 方案模板
pageNext: code-scan/plan/template.html
alias: host/code-scan/tools.html
---

### [功能介绍](#intro)

代码扫描功能支持自行集成扫描工具，集成后的工具能够被「代码扫描」模块调度。还支持对扫描结果的统一查看与处理。接入外部工具需要先进行标准化操作，集成至 CODING 扫描方案中开始使用。

### [1. 接入标准化](#init)

准备好相应的扫描工具代码，或其他开源扫描工具，按照以下指引进行接入标准化。点击参考[示例项目](https://yy-2019.coding.net/public/gongjuguize-demo/demo-tool/git/files)。

#### 环境变量说明

代码分析 提供环境变量（具体调用方式可参考示例项目）：

```BASH
SOURCE_DIR：要分析的代码目录路径
DIFF_FILES: 增量文件列表（可用于处理增量扫描的场景，执行速度更快）
TASK_REQUEST: 任务参数 json 文件路径
```

#### 运行方式

支持命令行执行，比如`python run.py`或`run.exe`，在工具代码的根目录执行命令。

#### 获取要分析的源码

在代码中通过环境变量获取，比如 python 代码：

```python
import os
source_dir = os.environ.get("SOURCE_DIR", None)
```

#### 适配标准输出

结果输出到当前工作目录下的`result.json`文件中，比如 Python 代码：

```python
import json
with open("result.json", "w") as fp:
  json.dump(result, fp, indent=2)
```

`result.json`文件格式如下：

```json
[
    {
    "path": "文件绝对路径",
    "line": "行号",
    "column": "列号,可以直接写0",
    "msg": "提示信息",
    "rule": "规则名称,可以根据需要输出不同的规则名",
    "refs": [
          {"line": "回溯行号",
      "msg": "提示信息",
      "tag": "用一个词简要标记该行信息，比如uninit_member,member_decl等，如果没有也可以都写成一样的",
      "path": "回溯行所在文件绝对路径"
      },
      ...
    ]
    },
  {
  ...
  },
  ...
]
```

> *tips: `refs` 为可选项，用于记录问题回溯路径信息。比如当前文件的回溯路径其他的 3 行代码，可以将这三行的路径及提示信息，按顺序添加到 refs 数组中。*

### [2. 集成阶段](#integrated)

#### 提交至代码仓库

将准备好的工具代码，提交至任意项目中的 CODING 代码仓库中的 master 分支中；若后续有更新，我们将自动拉取最新的代码。

#### 集成至 CODING

点击团队首页右上角的齿轮图标 <img src ="https://help-assets.codehub.cn/enterprise/20210928153255.png" style ="margin:0"> 进入团队设置中心，前往「功能设置」→「代码扫描」→「工具规则」中进行管理。

![](https://help-assets.codehub.cn/enterprise/20211014114202.png)

按照页面提示逐步输入数据。

![](https://help-assets.codehub.cn/enterprise/20210421112618.png)

其中，我们提供以下公共环境变量，其余环境需打包进代码仓库后自行安装。


-   环境变量：工具执行所需的环境变量
    | 环境   | 版本 | 指定方式                                                |
    | ------   | ----   | -------------------------------------------------------   |
    | node   | 12   | PATH=/data/codedog/tools/linux-node-v12.16.3/bin:$PATH  |
    | java   | 8    | PATH=/data/codedog/tools/linux-jdk8/bin:$PATH           |
    | java   | 11   | PATH=/data/codedog/tools/linux-openjdk-11.0.2/bin:$PATH |
    | python | 2.7  | PATH=/data/codedog/tools/linux-Python-v2.7.13/bin:$PATH |
    | python | 3.7  | PATH=/data/codedog/tools/linux-Python-v3.7.2/bin:$PATH  |
    | go     | 1.12 | PATH=/data/codedog/tools/linux-go-1.12.6/bin:$PATH      |
    更多环境变量陆续支持中

#### 添加扫描规则

创建工具后，点击进入工具详情，在「规则列表」中配置新规则。

![](https://help-assets.codehub.cn/enterprise/20210421113559.png)

按照页面提示填写规则配置。

![](https://help-assets.codehub.cn/enterprise/20210402175120.png)

请注意 `规则名称` 或 `real_name` 需要与工具产出的 `result.json` 文件中的 rule 字段对应，以实现扫描结果与规则的匹配，填写完成后点击确认。

### [3. 使用工具](#use)

在代码扫描中选择任意扫描方案，点击「添加规则」。

![](https://help-assets.codehub.cn/enterprise/20210402175134.png)

找到已添加的新工具，点击批量添加。

![](https://help-assets.codehub.cn/enterprise/20210421150851.png)

添加完成后，在扫描任务中启用带有此规则的扫描方案即可。

==== 2021/04/21 ====
