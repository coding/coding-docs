---
title: Maven - CODING 帮助中心
pageTitle: Maven
pagePrevTitle: Helm 制品库
pagePrev: artifacts/quick-start/helm.html
pageNextTitle: Maven 制品库
pageNext: artifacts/quick-start/maven.html
alias: 
-   devops/artifacts/quick-start/maven.html
-   ar/quick-start/maven.html
-   packages/quick-start/maven.html
---

该文档介绍如何将 Maven 类型的制品存储在 CODING 制品库中。其内容包括创建制品库、推送和拉取制品。

> 阅读该篇文档需要准备好以下内容：
> -   [《基础操作》](/docs/artifacts/quick-start/basic.html)——创建项目
> -   制品仓库选择 Maven 类型

Maven 类型仓库支持 Apache Maven、Gradle Groovy、Gradle Kotlin DSL 三种格式文件。

![](https://help-assets.codehub.cn/enterprise/20210922145853.png)

### [配置认证信息](#certification)

在对 Maven 制品仓库进行推送或拉取操作之前，需要配置认证信息。点击操作指引中的「生成个人令牌作为凭据」，将其添加至 `settings.xml` 文件中。

![](https://help-assets.codehub.cn/enterprise/20210922150414.png)

### [编译 Maven 制品并上传](#compile&upload)

以一个简单的 demo 为例，我们希望把这个 demo 的 Maven 包推送到上述步骤中创建好的 Maven 仓库中。

![](https://help-assets.codehub.cn/enterprise/20191028135905.png)

1.  在仓库的指引页面，复制下列配置到项目的 pom.xml 文件当中。

![](https://help-assets.codehub.cn/enterprise/20210922150821.png)

通常一个 Maven 项目当中已有 groupId、artifactId、version 的配置，只将 distributionManagement 拷贝进去即可。

![](https://help-assets.codehub.cn/enterprise/20191028142639.png)

2.  执行 mvn deploy 命令。

```java
mvn deploy
```

若提示未找到 settings.xml 文件，在命令末尾加上 -s 参数来设置您放置 settings 文件的路径，代入参数后：

```java
 mvn deploy -s "/Users/somebody/software/apache-maven-3.6.2/conf/settings.xml"
 ```

3.  mvn 命令提示 build success 后，刷新制品仓库页面，即可看到最新推送上来的制品。

### [上传无源码的 Maven 包](#upload-no-source-code)

如果第三方 Maven 包未正规发布到网络仓库，而且仅提供 jar 包，未提供源码或者源码编译报错，那我们可以把 jar 包直接上传到仓库，命令如下：

```java
mvn deploy:deploy-file -Durl=file://C:\m2-repo \
                       -DrepositoryId=some.id \
                       -Dfile=your-artifact-1.0.jar \
                       [-DpomFile=your-pom.xml] \
                       [-DgroupId=org.some.group] \
                       [-DartifactId=your-artifact] \
                       [-Dversion=1.0] \
                       [-Dpackaging=jar] \
                       [-Dclassifier=test] \
                       [-DgeneratePom=true] \
                       [-DgeneratePom.description="My Project Description"] \
                       [-DrepositoryLayout=legacy]
```

如果第三方提供了 `pom.xml`，可以从中读取 group、artifact、version 等字段，比如「[微信云支付 Java SDK](https://cloud.tencent.com/document/product/569/9806)」使用下列命令：

```ini
mvn deploy:deploy-file --settings ./settings.xml -Durl=https://coding-public-maven.pkg.coding.net/repository/tencent-cloud-pay-sdk-java/tencent/ \
                       -DrepositoryId=coding-public-tencent-cloud-pay-sdk-java-tencent \
                       -Dfile=../cloudpay.jar \
                       -DpomFile=pom.xml
```

![微信云支付 Java SDK settings.xml](https://help-assets.codehub.cn/enterprise/20200414142931.png)

微信云支付 Java SDK 上传 jar 包列表页面。

![微信云支付 Java SDK 上传 jar 包](https://help-assets.codehub.cn/enterprise/20200414145954.png)

### [拉取 Maven 制品](#pull)

1.  在仓库的指引页面，复制配置到 settings.xml 当中，比如「微信云支付 Java SDK」的配置如下：

```xml BRACKET-FILTER
<settings>
    <!--   omitted xml -->
    <profiles>
        <profile>
            <id>Repository Proxy</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <repositories>
                <repository>
                    <id>coding-public-tencent-cloud-pay-sdk-java-tencent</id>
                    <name>tencent</name>
                    <url>https://coding-public-maven.pkg.coding.net/repository/tencent-cloud-pay-sdk-java/tencent/</url>
                    <releases>
                        <enabled>true</enabled>
                    </releases>
                    <snapshots>
                        <enabled>true</enabled>
                    </snapshots>
                </repository>
            </repositories>
        </profile>
    </profiles>
</settings>
```

2.  在您的 Java 项目的 `pom.xml` 中配置依赖包（dependencies 标签），比如依赖「微信云支付 Java SDK」的配置如下：

```xml BRACKET-FILTER
<project>
    <dependencies>
        <dependency>
            <groupId>com.tencent</groupId>
            <artifactId>cloudpay</artifactId>
            <version>1.6</version>
        </dependency>
    </dependencies>
</project>
```

3.  编译项目

```java
mvn install -s ./settings.xml
```

执行过程您可以看到包被正常拉取下来，也可以在执行完成后在本地 maven 缓存看到拉取下来的包：

![](https://help-assets.codehub.cn/enterprise/20191028152150.png)


==== 2021/09/22 ====
