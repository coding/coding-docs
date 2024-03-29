---
title: Nuget - CODING 帮助中心
pageTitle: Nuget
pagePrevTitle: Composer 制品库
pagePrev: artifacts/quick-start/basic.html
pageNextTitle: 制品库代理
pageNext: artifacts/proxy.html
alias: 
-   devops/artifacts/quick-start/npm.html
-   ar/quick-start/npm.html
-   packages/quick-start/npm.html
---

该文档介绍如何将 NuGet 类型制品存储在 CODING 制品库中，方便团队在项目进行统一的制品管理与版本控制。下文包含制品仓库创建、NuGet 包制作、制品推拉与使用代理等。

> 阅读该篇文档需要准备好以下内容：
> -   安装 NuGet
> -   [《基础操作》](/docs/artifacts/quick-start/basic.html)——创建项目
> -   制品仓库选择 NuGet 类型。

### [初始化 NuGet 制品（可选阅读）](#init)

访问[官网](https://docs.microsoft.com/en-us/nuget/install-nuget-client-tools#macoslinux)下载并安装 NuGet。

#### [本地生成](#local)

若您已熟悉 NuGet 制品的操作，则可以跳过此章节。

1.  新建 Demo 目录
    
```bash
mkdir nuget-demo && cd nuget-demo
```

2.  创建 `.nuspec` 包

```nuget
nuget spec [制品名称]
```

3.  打包制品

```nuget
nuget pack <制品名称>.nuspec
```

4.  打包完成后即可在本地目录中看到生成的包文件。

![](https://help-assets.codehub.cn/enterprise/20210719172950.png)

#### [在线拉取](#online)

点击访问[官网](https://www.nuget.org/packages)，搜索任意 NuGet 制品并通过在线链接或命令行下载。

![](https://help-assets.codehub.cn/enterprise/20210719174450.png)

通过命令行拉取：

```nuget
nuget install [制品名称] -OutputDirectory packages
```

### [配置制品仓库认证](#auth)

你需要在本地配置认证信息，用以访问 CODING 中的 NuGet 类型制品仓库。此处我们使用「自动生成配置」完成认证过程。

输入密码后，点击操作指引上的「生成个人令牌作为凭据」按钮，输入密码后得到配置命令，复制后在需要推送的 NuGet 制品的所在目录执行配置命令即可。此过程的**权限机制**使用到了「个人访问令牌」功能，若希望对其进行控制，点击[了解更多](/docs/member/tokens.html)。

![](https://help-assets.codehub.cn/enterprise/20210922164523.png)

### [推送制品](#push)

输入命令行，将相应的名称替换为本地内容即可完成推送。

```bash
nuget push -ApiKey api -Source "nuget-go" [制品名称].nupkg
```

### [拉取制品](#pull)

输入命令行，将相应的名称替换为本地内容即可完成拉取。

```bash
nuget install -Source "nuget-go" -Version [制品版本] [制品名称]
```

### [设置为代理](#proxy)

当 CODING 私有制品仓库不存在想要拉取的制品时，将尝试从配置的代理地址拉取。您可以添加第三方制品源，用以获取特定仓库中的制品。无需额外设置，CODING 将会按照顺序从上到下依次检索相应的制品包。

![](https://help-assets.codehub.cn/enterprise/20210922164820.png)

使用命令拉取制品：

```bash
nuget install -Source "nuget-go" -Version [制品版本] [制品名称]
```

拉取的制品及依赖会成功拉取到本地，并且还会同步至 CODING 制品仓库中，详情页会显示包的来源。

![](https://help-assets.codehub.cn/enterprise/20210922165042.png)

若 CODING 制品仓库中没有自动储存由代理拉取的 NuGet 制品，可能由于以下两点问题导致：

1.  您没有该仓库的推送权限。
2.  您的本地缓存中已有该制品。

代理设置的详细说明，请参考[《制品代理》](/docs/artifacts/proxy.html)。

==== 2021/07/19 ====
