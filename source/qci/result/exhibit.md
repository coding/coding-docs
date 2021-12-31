---
title: 个性化展示任务结果 - CODING 帮助中心
pageTitle: 个性化展示任务结果
pagePrevTitle: 持续集成简介
pagePrev: qci/intro/ci.html
pageNextTitle: 快速开始
pageNext: ci/start.html
sitemap: false
---

一般情况下，CODING-CI 任务产出建议存为文件，通过 CODING-CI 命令字 artifacts 落地
    - artifacts 落地的文件，用户可在 CODING-CI 前台下载查看

如下场景，可通过 CODING-CI 支持的 status 命令字来进行个性化任务结果的展示：
    - 当数据量比较小，若希望用户在 CODING-CI 前台直接查看产出，而不是下载文件时
    - CODING-CI 任务调用第三方工具，产出仅为一个报告的 url 或者一些总结描述信息时

### status

task 可以使用 status 字段显式指定 task 的 status。

status 字段指向一个 task status 的 json 文件，该文件包含下面四个字段：
    - **status**: 必选，可以是`success`, `failure`, `error`
        - **success**：对应 CODING-CI 状态为`成功`
            - task 执行成功
        - **failure**：对应 CODING-CI 状态为`失败`
            - task 执行失败（task 的关键逻辑失败）
            - 例如代码扫描， 扫描发现代码问题
        - **error**：对应 CODING-CI 状态为`命令异常`
            - task 执行异常（task 中使用的工具异常）
            - 例如代码扫描，扫描工具本身出错
    - **description**: 可选，status 的描述，支持 markdown 格式
    - **url**: 可选，指向一个外部的 url 链接
    - **title**：可选，配合 url 在 web 端展示，尽量简明
    - **report_dir**：可选，指向要上传到文件服务器的路径
    - **report_html**：可选，指定 report_dir 时，链接的首页文件

命令字 status 指定的 json 文件中的四个字段，在 CODING-CI 前台展示位置如下图所示：

![](https://help-assets.codehub.cn/enterprise/20211026140948.png)

    - status 字段决定了对应 task 的状态，使用了 status 命令字时，cmd 退出的值对 task 无意义
    - url 和 title 展示入口在【报告链接】, 鼠标放在入口上时展示 title，点击入口后，在新窗口中展示 url 指定的页面
    - report_html 和 title 展示入口在【报告链接】, 鼠标放在入口上时展示 title，点击入口后，在新窗口中展示 report_html 指定的页面
    - description 展示入口在【报告描述】，点击后打开的页面中显示 description 内容

-   CIFile 中配置使用 status 示例：

```yaml
        - stage: build
            cmds:
                - echo 'build hello world!'
            status: ./status.json
```

-   status.json 文件配置示例：

```json
        {
            "status": "success",
            "title": "点击查看报告链接",
            "url": "http://qci.oa.com", # 若用户配置了url，以url配置为准上报，不再上传用户报告，report_dir、report_html配置无效。
            "report_html": "./report/index.html", # 允许只配置report_html而不配置report_dir，只上传单个文件，并生成报告链接。
            "report_dir": "./report"
        }
```

-   当用户有多个报告链接需要上报时，status 也支持多个报告链接格式如下：

  ```json
  [
    {
      "status": "success",
      "title": "点击查看报告链接",
      "url": "http://qci.oa.com",
      "report_html": "./report/index.html",
      "report_dir": "./report"
    },
    {
      "status": "success",
      "title": "点击查看报告链接",
      "url": "http://qci.oa.com",
      "report_html": "./report/index.html",
      "report_dir": "./report"
    }
  ]
  ```

  当有至少有一个 status 为 error 时，结果为 error
  否则，当有至少有一个 status 为 failure 时，结果为 failure
  当全部是 success 时，结果为 success

-   tips
    -如下情况，status 命令字并不影响 task 的状态
        - 用户显式指定 task 状态时，配置的 json 文件不存在
        - 用户显式指定 task 状态时，配置的 json 文件没有表示状态的字段
        - 用户显式指定 task 状态时，配置的 json 文件中表示状态的字段值不在 CODING-CI 指定的范围内
    -task 执行完毕后，status 命令字指定的 json 文件将自动删除
    -用户配置了 url，以 url 配置为准上报，不再上传用户报告，report_dir、report_html 配置无效。
    -允许只配置 report_html 而不配置 report_dir，只上传单个文件，并生成报告链接。

==== 2021/10/21 ====
