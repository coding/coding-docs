---
title: 制品库代理 - CODING 帮助中心
pageTitle: 制品库代理
pagePrevTitle: 使用 npm 制品库
pagePrev: artifacts/quick-start/npm.html
pageNextTitle: 制品库权限
pageNext: artifacts/permission.html
alias: 
-   devops/artifacts/proxy.html
-   ar/proxy.html
-   packages/proxy.html
---

### 功能介绍

制品库的代理功能支持用户配置仓库代理多个源，当私有仓库内找不到对应的包时，会尝试去配置的源拉取对应的包返回给用户。同时也支持用户配置代理源认证的账号信息。制品库代理功能可作为统一入口帮助用户管理依赖的第三方制品。

![](https://help-assets.codehub.cn/enterprise/20200108104510.png)

>制品拉取的顺序
> 1.  优先获取私有仓库内的包。
> 2.  私有仓库内无法找到时，再从配置代理的源按照从上到下顺序查找。
> 目前针对 Docker / Maven / Npm / PYPI / Composer / Cocoapods / Helm / rpm 类型制品仓库提供代理功能。

### 开启代理

在【制品库】下新建制品库时，可选择【启用代理】，默认此项打开。

![](https://help-assets.codehub.cn/enterprise/20201112112349.png)

### 配置代理

在制品库列表页面，点击右上角按钮【设置仓库】进入某个制品库的设置页面。

![](https://help-assets.codehub.cn/enterprise/20200716174238.png)

在制品库设置页面，点击【代理设置】，可以添加/删除代理来源、调整代理来源优先级、配置鉴权信息。

![](https://help-assets.codehub.cn/enterprise/20191009144430.png)

#### 添加来源

在点击【添加来源】按钮后，进入创建来源页面，填写地址、名称，如有必要再填写配置鉴权信息。点击【添加】按钮即可。

![](https://help-assets.codehub.cn/enterprise/20191009144937.png)

#### 修改鉴权

如需修改代理源的鉴权信息，在代理源列表页面，点击【配置】按钮，即可进行修改。

![](https://help-assets.codehub.cn/enterprise/20191009145505.png)


> 目前仅支持添加并配置 CODING 已内置的制品库代理地址。制品库内置的代理地址如下：

| 类型    | 名称      | 地址     |
| ---------- | ---------- | ---------- |
| npm    | npmjs | <https://registry.npmjs.org> |
| npm    | cnpm  | <https://registry.npm.taobao.org> |
| npm    | TencentCloud npm | <http://mirrors.cloud.tencent.com/npm> |
| PyPI   | PyPI  | <https://pypi.org/simple> |
| PyPI   | TencentCloud PyPI | <http://mirrors.cloud.tencent.com/pypi/simple> |
| Maven  | Maven Central | <https://repo.maven.apache.org/maven2> |
| Maven  | TencentCloud Maven | <http://mirrors.cloud.tencent.com/nexus/repository/maven-public> |
| Maven  | JCenter | <https://jcenter.bintray.com> |
| Composer  | Aliyun Composer | <https://mirrors.aliyun.com/composer>|

### 使用代理

在代理配置成功后就可以使用代理源拉取依赖了。

**Q：如何识别制品库中的制品来源是不是从代理同步而来的？**

1.  以 Maven 类型制品为例，您可以在本地执行 maven install 时看到类似如下的制品拉取日志：

```java
[INFO] Downloading from : https://xxxxxxxx-maven.pkg.coding.net/repository/coding-demo/my-maven/org/springframework/spring-jcl/5.0.7.RELEASE/spring-jcl-5.0.7.RELEASE.pom
[INFO] Downloaded from : https://xxxxxxxx-maven.pkg.coding.net/repository/coding-demo/my-maven/org/springframework/spring-jcl/5.0.7.RELEASE/spring-jcl-5.0.7.RELEASE.pom (1.9 kB at 735 B/s)
```

2.  同时，在 CODING 制品库上，您也可以看到该制品的来源。

![](https://help-assets.codehub.cn/enterprise/20200108142601.png)

**Q：直接从第三方制品源拉取制品和通过 CODING 制品库代理拉取有什么区别？**

制品库可以帮助您统一管理团队内的制品源配置，您可以在 CODING 制品库内追踪团队内成员的使用情况，也可以通过 CODING 制品扫描统一检测出有安全缺陷，直接对团队内的制品安全进行审计。

![](https://help-assets.codehub.cn/enterprise/20200108134750.png)


==== 2020/08/13 ====
