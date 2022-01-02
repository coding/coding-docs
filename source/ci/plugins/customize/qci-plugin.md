---
title: qci-plugin - CODING 帮助中心
pageTitle: qci-plugin
pagePrevTitle: 声明文件
pagePrev: ci/plugins/customize/format.html
pageNextTitle: 在持续集成中使用 Docker
pageNext: ci/practice/docker.html
alias: devops/ci/plugins/api-doc.html
---

为提升插件开发的便利性，插件系统提供一套基于 Python 环境的开发工具 `qci-plugin`；它的设计理念是以一种简单的方式将构建代码与构建脚本分离, 让构建脚本（编译, 检查, 测试, 发布）得到尽可能的复用，具备以下特点：

1.  基于 `python 3.x` 环境, 开发简单。
2.  使用命令行方式执行, 与开发普通的命令行(CMD) 脚本基本无异。
3.  可以通过简单的声明式实现在 CODING CI 渲染配置组件, 便于流水线配置和编辑, 同时也保留直接执行的能力。
4.  支持结果上报。
5.  支持个性化的结果展示。

借助此工具能够快速创建插件结构、运行和测试插件逻辑、提交插件，点击了解具体的[开发指引](/docs/ci/plugins/customize/develop.html)。

### [环境安装](#env-init)

-   **依赖安装**：`python>=3.6.8`，点击访问[下载地址](https://www.python.org/downloads/)。

-   **安装执行器**

    执行器的包已上传至[公开制品仓库](https://coding-public.coding.net/public-artifacts/cci/qci/packages)，你可以通过命令行快速安装。

```bash
pip install qciplugin -i https://coding-public-pypi.pkg.coding.net/cci/qci/simple/ --trusted-host coding-public-pypi.pkg.coding.net --extra-index https://mirrors.tencent.com/pypi/simple/
```

验证是否安装成功：

```bash
qci-plugin -h
```

### [运行机制](#operating-mechanism)

插件通过 `qci-plugin` 命令启动：

```bash
# 运行本地插件, 第一个参数为 qciplugin.yml 所在目录的路径
qci-plugin ./ --arg1 "hello world"

# 使用最新的公开版本运行, 第一个参数为 "插件 ID"
qci-plugin my_plugin_id --arg1 "hello world"

# 使用指定的版本运行
qci-plugin my_plugin_id@1.0 --arg1 "hello world"
```

### [本地调试](#localhost)

插件支持在本地直接运行调试。添加 `QCI_PLUGIN_DEBUG=1` 环境变量可以查看更多调试信息，运行中的警告提醒不会影响实际执行。

```bash
qci-plugin [local path] [arguments...]

// local path: 插件本地路径(指 qciplugin.yml 所在目录)
// arguments: 插件参数
```

### [SDK](#sdk)

qciplugin 添加了一些便利函数, 方便开发者使用, 可以直接从 qciplugin 包导入。

#### [上报结果](#report)

通过 `report_output` 可以在运行时直接上报输出而无需等待执行结束，`report_output` 可传入一个字典参数:

```json
{
  "title": "标题", // 可选, 输出标题
  "description": "描述", // 可选, 输出描述
  "url": "url地址", // 可选, 输出的远程url地址, 注意: 使用此参数, 则 report_html, report_dir 无效
  "report_html": "本地html路径", // 可选, 输出的html本地文件路径, 会上传至文件服务器
  "report_dir": "本地html目录", // 可选, 输出的html本地目录, 会上传至文件服务器, 注意: 使用此参数, 必须提供 "report_html" 作为输出 "首页"
}
```

除上述规则外，`description` / `url` / `report_*` 必填其中一项，否则上报会返回 False 结果。

```python
from qciplugin import report_output

report_output({
    "title": "测试结果",
    "description": "测试通过",
})
```

#### [获取 access token](#access-token)

如果需要在插件中访问 CODING 其他服务, 可以通过 `generate_access_token` 快捷函数, 在运行时获得任务`启动者`身份调用 CODING 服务的 access token。

```python
from qciplugin._vendor import requests
from qciplugin import generate_access_token

# expire (设定 token 超过 n 秒过期, 默认: 86400)
result = generate_access_token(expire=86400)
print('token', result['token']) # access token
print('user', result['user']) # 任务启动人
print('exp', result['exp'])  # Unix 时间戳

# 请求 coding 网关
response = requests.get('http://coding.oa.com/path/to/service', headers={
    'CODING-Token': 'Bearer %(token)s' % result
})
```

#### [requests](#requests)

qciplugin 调用了 requests 库。若开发者想使用 requests 库，可以直接使用 qciplugin 内置库，示例:

```python
try:
    # 优先使用环境里已经装有的
    import requests
except ImportError:
    # 运行环境里没有, 使用 qciplugin 里的 requests
    import qciplugin._vendor.requests as requests
```

==== 2021/07/07 ====
