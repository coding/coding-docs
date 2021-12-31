---
title: 常见错误码 - CODING 帮助中心 
pageTitle: 常见错误码
pagePrevTitle: 
pagePrev: 
pageNextTitle: 
pageNext: 
alias: ci/node/faq.html
---

### [常见错误码集合](#error-code)

-   ./gradlew: not found

    此问题常见于使用了错误的持续集成模板。您可以检查所使用的的代码仓库中是否有 `gradlew` 文件或者文件的目录位置是否与持续集成中定义的文件路径相符。

![](https://help-assets.codehub.cn/enterprise/20211201173433.png)

-   ./gradlew: Permission denied

    此错误是因为文件缺少执行权限，将文件赋予执行权限即可。例如在执行文件之前添加命令： `chmod +x gradlew`。

-   codingArtifactsGeneric ERROR: no file found

    出现此错误需检查构建过程的步骤中所定义的文件名或路径是否正确，所在的文件的相对路径为：`/root/workspace`，例如按下图所示填写了 `README.md` 文件，那么实际所使用的的路径为： `/root/workspace/README.md`。

![](https://help-assets.codehub.cn/enterprise/20211201174420.png)

-   groovy.lang.MissingPropertyException: No such property: REPO_URL for class: WorkflowScript\r

    此错误一般由没有注入环境变量，执行失败引起。错误码中将提示由哪个环境变量所引起，例如此提示为  `REPO_URL` 变量缺失。

-   The specified user settings file does not exist: /root/workspace/./settings.xml

    此错误表示执行在 Maven 命令时找不到 `settings.xml` 文件。可以通过 `ls -ltr` 命令看看当前目录是否有这个文件，如果没有，可以把本地的 `settings.xml` 和 `pom.xml` 文件提交到代码仓库，然后通过检出代码将其拉取至编译机器中，点击查看[参考代码仓库](https://codes-farm.coding.net/public/maven-demo/maven-demo/git/files)。

-   toomanyrequests: You have reached your pull rate limit

    此错误提示由于 dockerhub 对免费用户拉取镜像次数限制导致的。阅读此[文档详情](/docs/ci/faq/artifacts.html)以解决此问题。

-   Maven 编译时报错：Failed to execute goal on project xxxxxx  Checksum validation failed, no checksums available

    你可以在持续集成设置 → 流程配置中的命令行添加 -c 参数，例如：`mvn clean package -c -DskipTests -gs settings.xml` 后解决此问题。

-   Gradle 报错：Switch Maven repository 'maven(url)' to redirect to a secure protocol (like HTTPS) or allow insecure protocols

![](https://help-assets.codehub.cn/enterprise/20211202114149.png)

需要前往持续集成设置 → 流程配置中的制品编译步骤前执行此命令：`cd /root/.gradle && rm init.gradle`。

-   使用镜像更新插件时报错：result 9001 {project_auth_null=无法解析项目令牌

![](https://help-assets.codehub.cn/enterprise/20211202161531.png)

删除 `CD_PERSONAL_ACCESS_TOKEN` 变量，然后再次编辑插件生成新的个人令牌，保存即可。

==== 2021/07/30 ====
