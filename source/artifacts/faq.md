---
title: 常见问题 - CODING 帮助中心
pageTitle: 常见问题
pagePrevTitle: 清理策略
pagePrev: artifacts/cleanup-strategy.html
pageNextTitle: 制品扫描介绍
pageNext: artifacts/scan/intro.html
alias: 
-   devops/artifacts/problem.html
-   ar/problem.html
-   packages/problem.html
-   artifacts/problem.html
---

### [Maven 相关问题](#maven)

#### [Q：Maven 的 settings.xml 配置文件在哪](#q1)

在生成 Maven 类型制品时，您需要配置您的 settings 文件，通常这个文件存放的位置有如下几个地方，您都可以按需使用，只不过配置生效的范围和优先级不同：

1.  全局配置: ${M2_HOME}/conf/settings.xml
   
   如果您不记得 Maven 的安装目录 ${M2_HOME}，您可以在终端中执行 echo ${M2_HOME} 或者 mvn -version 就可以看到 Maven home 的路径。

2.  用户配置: ${user.home}/.m2/settings.xml
   
   您可以通过 echo 环境变量的方式找到该文件目录，有时候这个目录下是没有 settings.xml 文件，您可以去全部配置里拷贝一份 settings.xml 再进行修改。

3.  指定路径下的 settings.xml

   ```java
   mvn deploy --settings settings.xml
   ```

在终端执行 mvn 相关命令时，settings.xml 配置生效的优先级：指定路径 > 用户配置 > 全局配置。

除了在终端当中执行 mvn 命令，有时候你在 Eclipse 等 IDE 中也会用 Maven，该怎么修改 settings.xml 文件的配置？

以 Eclipse 为例（其它类型 IDE 网上也有丰富的资料供参考）：

1.  点击 Preferences 进入偏好设置。

![](https://help-assets.codehub.cn/enterprise/20191129110437.png)

2.  在 Maven -> User Settings 当中您就可以看到您使用的配置文件路径，并且修改配置文件。

![](https://help-assets.codehub.cn/enterprise/20191129112243.png)

#### [Q：打包时指定了环境变量未生效](#q2)

打包 Maven 制品时指定了环境变量，例如指定了 `-Ptest`，但上传至制品仓库时依然没有生效，依然为默认的 Dev 环境。若要解决此问题，请确认在使用 `mvn deploy` 命令推送到 CODING maven 制品库时是否有加 -P 参数指定环境。

![](https://help-assets.codehub.cn/enterprise/20211105135517.png)

### [npm 相关问题](#npm)

#### [Q：如何将 npm @scope 指向 CODING 私有制品库](#q3)

1: 可以通过配置 **.npmrc** 来指定 @scope 的 registry。

例如: 有一个 npm 包，位置信息如下：
-   企业： my-team 
-   项目： my-project 
-   制品仓库： my-npm-repo 
-   名： @my-scope/my-pkg 。

可以通过配置 `.npmrc`，让 package.json 中的 @my-scope/my-pkg 指向该链接地址：

```ini
@my-scope:registry=https://my-team-npm.pkg.coding.net/my-project/my-npm-repo/
```

2: 直接将 npm 包的 registry 指向 CODING 私有制品库。

直接点击 npm 制品库指引页面中的【使用访问令牌生成配置】生成 .npmrc。

![](https://help-assets.codehub.cn/enterprise/20191210164657.png)

请妥善保管生成的配置：

```ini
registry=https://my-team-npm.pkg.coding.net/my-project/my-npm-repo/
always-auth=true
//my-team-npm.pkg.coding.net/my-project/my-npm-repo/:username=xxxxxx
//my-team-npm.pkg.coding.net/my-project/my-npm-repo/:_password=xxxxx
//my-team-npm.pkg.coding.net/my-project/my-npm-repo/:email=xxxxx
```

由于 CODING 的 npm 制品库支持[代理功能](/docs/artifacts/proxy.html)，可以直接将 npm registry 设置为 CODING 私有制品库，公共制品也可以被拉取到。


> 关于如何在 CODING 持续集成中使用 npm 制品库，可参考文档[《持续集成——构建 npm 类型制品》](/docs/ci/artifacts/npm.html)


### [权限相关问题](#permission)

#### [Q: 如何拉取其它 CODING 项目制品库的制品](#q4)

您可以通过[项目令牌](/docs/project/features/deploy-tokens.html)的方式拉取其它 CODING 项目制品库的制品。

为了方便您区分即将要操作的两个不同项目，我们统一将：

-   需要被拉取制品的制品库所在项目称为 “项目 A” 
-   执行拉取的项目称为 “项目 B” 

##### 步骤一：在项目 A 内创建项目令牌

1.  进入项目 A【项目设置】->【开发者选项】->【项目令牌】，点击 “新建项目令牌” 。

![](https://help-assets.codehub.cn/enterprise/20200714095910.png)

2.  配置制品库权限。

![](https://help-assets.codehub.cn/enterprise/20200724102726.png)

3.  点击确定后创建成功。

![](https://help-assets.codehub.cn/enterprise/20200724104002.png)

##### 步骤二：在项目 B 中将刚才创建的项目 A 项目令牌作为用户名 + 密码拉取制品

1.  根据您的制品类型，在 [制品库快速开始帮助文档](/docs/ar/quick-start/docker.html) 找到配置认证信息指引。

2.  回到刚才创建的项目 A 项目令牌页面，点击 “查看密码”。

![](https://help-assets.codehub.cn/enterprise/20200724104324.png)

3.  在项目 B 制品库配置认证信息时，将项目令牌用户名 + 项目令牌密码（token）作为用户名 + 密码填入信息。以 Maven 类型制品库为例：

![](https://help-assets.codehub.cn/enterprise/20200724104834.png)

4.  正确填入信息后，即可拉取成功其他 CODING 项目的制品库。

#### [Q: 为什么制品仓库会出现没有主动推送的依赖包](#q5)

这是由于该制品仓库开启了[制品代理功能](./proxy.md)，当制品库代理功能开启时，制品仓库会作为统一入口帮助您管理依赖的第三方制品，因此这些依赖包会出现在制品仓库。您可以在 CODING 制品库内追踪该依赖包的团队内成员的使用情况，也可以通过 CODING 制品扫描统一检测该依赖包的安全漏洞，方便您的团队依赖制品审计。

### [镜像相关问题](#mirror)

#### [Q：无法从制品库拉取依赖包](#q6)

使用 mirrors 参数配置镜像源加速后，无法从制品库拉取依赖包进行构建，问题截图如下：

![](https://help-assets.codehub.cn/enterprise/20210519155135.png)

导致此问题的原因可能是由于 `< mirror>` 配置中的 `< mirrorOf>*< /mirrorof>` 将所有流量切换到了镜像源中拉取，而镜像源中并没有保存在 CODING 制品仓库中的依赖包。此问题有两个解决方案：

**方法一：**修改参数配置，仅允许非 CODING 制品仓库来源的制品从镜像源拉取。

```xml BRACKET-FILTER
<settings>
    <!-- profiles 配置根据 CODING 仓库中的拉取指引配置 -->
    <profiles> 
        <profile>
            <id>Repository Proxy</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <repositories>
                <repository>
                    <id>coding-maven-repo-id</id>
                    <name>coding-maven-repo-name</name>
                    <url>https://coding-maven-repo-url</url>
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
    <mirrors>
        <mirror>
            <id>nexus-tencentyun</id>
            <!-- 非 coding-maven-repo-id 来源的制品才会从镜像源中拉取制品 -->
            <mirrorOf>!coding-maven-repo-id</mirrorOf>
            <name>Nexus tencentyun</name>
            <url>http://mirrors.cloud.tencent.com/nexus/repository/maven-public/</url>
        </mirror>
    </mirrors>
</settings>
```

**方法二：**删除 `< mirrors>` 镜像源配置，打开 CODING 制品仓库代理并指向镜像源。此方案会将所有开源依赖包代理并保存至 CODING 制品仓库。

```xml BRACKET-FILTER
<settings>
    <!-- profiles 配置根据 CODING 仓库中的拉取指引配置 -->
    <profiles> 
        <profile>
            <id>Repository Proxy</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <repositories>
                <repository>
                    <id>coding-maven-repo-id</id>
                    <name>coding-maven-repo-name</name>
                    <url>https://coding-maven-repo-url</url>
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

![](https://help-assets.codehub.cn/enterprise/20210519160644.png)

⚠️ 持续集成中的镜像源加速配置写在了构建环境全局配置 `${M2_HOME}/conf/settings.xml` 中，需要使用项目下 `settings.xml` 配置覆盖；

```bash
mvn install -s "./settings.xml"
```

==== 2021/11/29 ====
