---
title: 示例文件参考 - CODING 帮助中心
pageTitle: 示例文件参考
sitemap: false
---

本文档用于说明 CIFile 里可能会用到的 artifacts、cache、temps、status 等涉及到文件路径的关键字配置格式。

### 配置格式

-   路径支持两种配置方式，路径通配符和正则表达式

-   路径中支持环境变量，使用方式和执行平台下环境变量的使用方式一致，如：

    -linux 平台：**${环境变量名}**

        - 示例1：A/${BUILD_ID}/*

        - 示例2：A/release_${BUILD_ID}/*

    -windows 平台：**%环境变量名%**

        - 示例1：A\\%BUILD_ID%\\*

        - 示例2：A\\release_%BUILD_ID%\\*

-   cache 仅支持目录配置，不支持指定文件

### 匹配策略

-   优先使用路径通配符方式匹配，匹配不到则使用正则匹配

-   匹配均**在 cmd 执行的根目录 QCI_WORKSPACE 下**执行

### 配置示例

-   路径通配符：

    -A/*

        - ${QCI_WORKSPACE}/A 目录中的所有文件

    -A/B/*.apk：

        - ${QCI_WORKSPACE}/A/B 目录中以.apk结尾的所有文件

    -d*.apk：

        - $QCI_WORKSPACE目录下，文件名以 d 开头，以.apk结尾的文件

-   正则表达式：

    -A/.*

        - ${QCI_WORKSPACE}/A 目录下、以及其子目录下的所有文件


==== 2021/08/04 ====
