---
title: Shell - CODING 帮助中心
pageTitle: Shell
pagePrevTitle: PHP 规范检查
pagePrev: ci/lint/php.html
pageNextTitle: 自动化测试介绍
pageNext: ci/testing/intro.html
alias: ci/lint/shell.html
---

Shell 常用代码规范检查工具如下：

工具 | lint 命令 | 支持 IDE
----|----------|----------------
[ShellCheck](https://github.com/koalaman/shellcheck) | shellcheck foo.sh | [VSCode](https://marketplace.visualstudio.com/items?itemName=timonwong.shellcheck)、Jetbrains 内置
[Shfmt](https://github.com/mvdan/sh) | shfmt -d -i 4 -sr foo.sh | Jetbrains 内置

### ShellCheck

ShellCheck 内置规范包括下列规则：

-   子语句标志符
-   禁止全角引号
-   Useless cat
-   read lines rather than words

安装：

```shell
apt-get update
apt-get install shellcheck
```

或下载：

```shell
wget -nc "https://coding-public-generic.pkg.coding.net/public/downloads/shellcheck-linux-x86-64.tar.xz?version=v0.7.2" -O shellcheck-v0.7.2.linux.x86_64.tar.xz
tar -C /usr/local/bin/ --strip-components=1 -Jxvf shellcheck-v0.7.2.linux.x86_64.tar.xz shellcheck-v0.7.2/shellcheck
```

全量检查：

```shell
shellcheck foo.sh 
```

![](https://help-assets.codehub.cn/enterprise/20210909162311.png)

本地增量检查：

```shell
git diff --diff-filter=d --name-only HEAD | grep '.sh$' | xargs shellcheck
```

持续集成合并请求增量检查：

```groovy
sh "git diff --diff-filter=d --name-only ${env.MR_TARGET_BRANCH}... | grep '.sh\$' | xargs shellcheck"
```

### Shfmt

Shfmt 内置规范包括下列规则：

-   for/do 应位于同一行
-   子语句标志符
-   行缩进：默认 tab，可自定义几个空格
-   行内缩进：一个空格
-   重定向后的空格：默认无空格，可自定义

安装：

```shell
wget -nc "https://coding-public-generic.pkg.coding.net/public/downloads/shfmt-linux-amd64?version=v3.3.1" -O /usr/local/bin/shfmt
chmod +x /usr/local/bin/shfmt
```

全量检查：

```shell
shfmt -d -i 4 -sr foo.sh
```

![](https://help-assets.codehub.cn/enterprise/20210909163639.png)

本地增量检查：

```shell
git diff --diff-filter=d --name-only HEAD | grep '.sh$' | xargs shfmt -d -i 4 -sr
```

持续集成合并请求增量检查：

```groovy
sh "git diff --diff-filter=d --name-only ${env.MR_TARGET_BRANCH}... | grep '.sh\$' | xargs shfmt -d -i 4 -sr"
```

==== 2021/09/09 ====
