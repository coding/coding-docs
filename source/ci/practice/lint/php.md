---
title: PHP - CODING 帮助中心
pageTitle: PHP
pagePrevTitle: markdown 规范检查
pagePrev: ci/lint/markdown.html
pageNextTitle: shell 规范检查
pageNext: ci/lint/shell.html
alias: 
-   devops/ci/lint/php.html
-   ci/lint/php.html
---

PHP 常用代码规范检查工具如下：

工具 | lint 命令 | 支持 IDE
----|----------|----------------
[CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) | phpcs --standard=PSR12 app/ | [VSCode](https://marketplace.visualstudio.com/items?itemName=wongjn.php-sniffer)、[IDEA](https://plugins.jetbrains.com/plugin/6610-php)
[PHPMD](https://github.com/phpmd/phpmd) | phpmd app/ | [VSCode](https://marketplace.visualstudio.com/items?itemName=ecodes.vscode-phpmd)
[PHPStan](https://github.com/phpstan/phpstan) | phpstan analyse app tests | [VSCode](https://marketplace.visualstudio.com/items?itemName=calsmurf2904.vscode-phpstan)

### CodeSniffer

[CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) 内置多种规范，其中常用的「[PSR12](https://www.php-fig.org/psr/psr-12/)」规范包括下列规则：

-   每行代码最大长度 120 个字符；
-   运算符左右各 1 个空格；

安装：

```shell
$ composer require --dev squizlabs/php_codesniffer
```

全量检查：

```shell
$ ./vendor/bin/phpcs --standard=PSR12 src/

FILE: laravel-wechat/src/ServiceProvider.php
-------------------------------------------------------------------
FOUND 30 ERRORS AND 1 WARNING AFFECTING 12 LINES
-------------------------------------------------------------------
  43 | ERROR   | [x] Expected at least 1 space before "."; 0 found
  43 | ERROR   | [x] Expected at least 1 space after "."; 0 found

  91 | WARNING | [ ] Line exceeds 120 characters; contains 130 characters

 101 | ERROR   | [x] Expected at least 1 space before "."; 0 found
 101 | ERROR   | [x] Expected at least 1 space after "."; 0 found
```

本地增量检查：

```shell
git diff --diff-filter=d --name-only HEAD | xargs ./vendor/bin/phpcs --extensions=php --standard=PSR12
```

持续集成合并请求增量检查：

```groovy
sh "git diff --diff-filter=d --name-only ${env.MR_TARGET_BRANCH}... | xargs ./vendor/bin/phpcs --extensions=php --standard=PSR12"
```


==== 2020/08/13 ====
