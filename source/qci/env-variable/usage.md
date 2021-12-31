---
title: 变量分类与使用 - CODING 帮助中心
pageTitle: 变量分类与使用
pagePrevTitle: 持续集成简介
pagePrev: qci/intro/ci.html
pageNextTitle: 快速开始
pageNext: ci/start.html
sitemap: false
---

### 变量分类

根据生效范围、赋值方式和时机的不同，CODING-CI 中环境变量分为如下几类：

#### 内置通用环境变量

-   CODING-CI 系统定义的内置变量，命名统一以 QCI _开头
-   禁止修改内置环境变量的值，修改仅在当前 cmd 中生效，不会影响其他 task 或者下一次启动
-   具体请参考[文档](#general)

#### 公共编译机平台相关的环境变量

-   不同平台的公共编译机有额外的环境变量
-   具体请参考相应平台的公共编译机环境变量

#### 任务自定义环境变量

-   用户在 .coding-ci.yml 中定义的 env 变量、以及在 CODING-CI 页面上配置的自定义环境变量
-   命名规范：
    -   不能与 CODING-CI 内置环境变量同名
    -   建议大写，由用户自行保证在执行过程中唯一
-   优先级：
    -   用户在 CODING-CI 页面上配置的自定义环境变量，优先级高于 yml 文件中定义的环境变量
-   若在执行过程中修改任务自定义环境变量的值，修改仅在当前 cmd 中生效，不会影响其他 task 或者下一次启动

#### 运行时自定义环境变量

-   用户在执行过程中赋值，传递数据给当前 task 的后续 cmd 或者后续 stage 下的 task 使用的动态变量
-   命名规范：
    -   不能与 CODING-CI 内置环境变量同名
    -   不能与 CODING-CI 任务自定义环境变量同名
    -   建议大写，由用户自行保证在执行过程中唯一
-   优先级：
    -   运行时自定义环境变量优先级高于任务自定义环境变量和内置环境变量
-   执行过程中可以动态设置和修改值
    -   注意不能像一般意义上的环境变量一样设置。使用和生效范围见下文
-   运行时自定义环境变量仅用于传递很小的数据，**当数据量很大时，建议以文件的方式传递**（CODING-CI 的 temps 关键字）

---

下文将介绍如何运行自定义环境变量设置与使用方式。

### 使用环境

#### 设置运行时自定义环境变量
-   用户通过往运行时自定义环境变量文件里添加行的方式设置和修改运行时自定义环境变量
    -   **注意**：对于执行设置操作的 cmd 脚本本身而言，CODING-CI 运行时自定义环境变量并不是真正的环境变量，不能在执行设置操作后立刻像普通环境变量一样使用
-   运行时自定义环境变量文件由环境变量 QCI_ENV_FILE 指定
-   多次设置同一环境变量，以最后一次设置的值为准
-   设置示例：
    -   shell 脚本：
    ```bash
    echo "ENV_PLANID=123" >> $QCI_ENV_FILE # 注意是追加
    ```
    -   py 脚本：
    ```python
    env_path = os.getenv('QCI_ENV_FILE', None)
    if env_path:
        with open(env_path, 'a+') as f: # 注意是追加
            f.write("ENV_PLANID=789\n")
    ```

-   **请勿修改QCI_ENV_FILE的值**，否则运行时自定义环境变量不能正确往后传递

#### 使用运行时自定义环境变量
-   像普通环境变量一样获取使用即可
-   使用示例：
    -   shell 脚本：
    ```bash
    plan_id=$ENV_PLANID
    ```
    -   py 脚本
    ```python
    plan_id = os.getenv('ENV_PLANID', None)
    ```

#### 运行时自定义环境变量生效范围
-   生效范围：
    -   同一个 task 下的多个 cmd 执行时：
        由于 task 下的多个 cmd 串行执行，上一个 cmd 设置的运行时自定义环境变量，下一个 cmd 中会生效

    -   同一个 stage 下的不同 task 执行时：
        -   由于 stage 下的多个 task 并发执行，当前 stage 下的 task 中设置的环境变量，不会在当前 stage 的其他 task 中生效, 在后续 stage 中才会生效
        -   同一个 stage 下的多个 task 中，若变更了同名环境变量的值，以执行时最后一次变更为准
-   示例：
若 CIFile 结构如下：
    ```yaml
    -   stage: build
      tasks:
        -   task: sync
            cmds:
                -   cmd1
                -   cmd2
        -   task: qta
            cmds:
                -   cmd3
                -   cmd4

    -   stage: test
      tasks:
        -   task: unittest
            cmds:
                -   cmd5
                -   cmd6
        -   task: qta
            cmds:
                -   cmd7
                -   cmd8
    ```
    -   cmd1 中设置的运行时自定义环境变量，cmd2、cmd5-8 中可用
    -   cmd5 中设置的运行时自定义环境变量，cmd6 中可用
    -   cmd1-4 中设置的运行时自定义环境变量，cmd5-8 中可用

#### 环境变量值有换行符的情况

当设置的环境变量有换行符时，直接写入`$QCI_ENV_FILE`会在换行符处截断。
可以在设置`$QCI_ENV_FILE`之前，进行转义替换。
例如可以采用如下方式进行替换：

python:
```python
env_path = os.getenv('QCI_ENV_FILE', None)
if env_path:
    with open(env_path, 'a+') as f: # 注意是追加
        f.write("ENV_PLANID=$'%s'\n" % os.getenv('QCI_COMMIT_MESSAGE', "").replace("\n", "\\n"))
```

shell:
```bash
echo \"ENV_PLANID=$'$QCI_COMMIT_MESSAGE'\" | sed ':label;N;s/\n/\\n/;b label' >> $QCI_ENV_FILE
```

## sudo 命令时使用环境变量

sudo 运行时，会默认重置环境变量，所以脚本中的 CODING-CI 的环境变量传递不过去。但命令行中的环境变量会被 shell 替换，所以在命令行的参数会被正常解析。
可以使用sudo -E 参数，保留环境变量执行。


### 加密环境变量

#### 使用场景

如密码等敏感信息，不能直接写明文，需加密防止泄露。

#### 加密算法

CODING-CI 使用 RSA 算法加密。

#### 使用场景一：在 CODING-CI 前台配置环境变量
1.  CODING-CI 前台定义环境变量入口为修改集成任务->自定义环境变量
2.  自定义环境变量时，输入明文后，选中【加密】即可，系统将自动加密环境变量的值，如下图所示：

![](https://help-assets.codehub.cn/enterprise/20211026145105.png)

#### 使用场景二：在 CIFile 中配置环境变量

1.首先登录 CODING-CI，使用 CODING 提供的加密服务将明文转为密文，入口在我的 CODING-CI -> 加密服务：

![](https://help-assets.codehub.cn/enterprise/20211026145206.png)

2.复制加密后的密文，写入 .coding-ci.yml，格式示例：
```
env:
    PASSWD:
      secret: xxxxyyyzz #the string encrypted by CODING-CI public key
```
-   `secret` 关键字标识当前字段值为加密后的密文，执行任务时将解密

==== 2021/10/26 ====
