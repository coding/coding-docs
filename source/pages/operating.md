---
title: 管理指引 - CODING 帮助中心
pageTitle: 管理指引
pagePrevTitle: 搭建 hexo 博客
pagePrev: pages/practice/hexo.html
pageNextTitle: 计费说明
pageNext: pages/price.html
alias: 
-   cd/static-website-v2.html
-   cd/static-website.html#pageTitle
-   pages/index.html
-   devops/cd/static-website.html
---

CODING 网站托管服务在腾讯云 Serverless 产品团队的支持下，进行了全新的改版升级。基于腾讯云 Serverless 底层能力，为广大开发者用户提供了便捷、稳定、高拓展性的网站托管服务。在腾讯云 Serverless 产品团队的运营下，至此一年间，已有超过 2 万开发者用户的站点在 Serverless 上稳定运行。  

近期，因 CODING 产品战略调整，决定将于 **2021 年 12 月 30 日**起关闭网站托管服务的使用入口，请您直接前往[**腾讯云 Serverless 控制台**](https://console.cloud.tencent.com/sls)使用，并对站点进行管理与维护。**此过程中，您无需迁移存量站点，站点的访问不会受到影响，如需访问项目代码，可前往 CODING 代码仓库或您的第三方代码仓库中查看。**
 
### [访问及管理已有站点](#access)

1.  进入[腾讯云 Serverless 控制台](https://console.cloud.tencent.com/sls)，即可查看全部静态站点项目。

![](https://help-assets.codehub.cn/enterprise/20211215163934.png)

2.  点击站点名称，即可查看您的资源详情。

![](https://help-assets.codehub.cn/enterprise/20211215164005.png)

3.  点击「域名编辑」，即可绑定您的 CDN 加速域名（请注意，绑定前需要完成域名备案）。

![](https://help-assets.codehub.cn/enterprise/20211215164028.png)

4.  如果需要更新页面代码，您可以继续在已绑定的代码仓库中进行推送，推送后会自动触发持续集成任务并完成页面更新。

### [常见问题](#faq)

1.  已有站点访问是否会受影响？

已有项目站点无需任何迁移操作，访问不受影响。您可在腾讯云控制台 [Serverless 应用中心](https://console.cloud.tencent.com/sls)继续进行管理。

2.  如何修改站点配置和自定义域名？

目前网站托管只支持修改自定义域名，您可以继续在 Serverless 控制台调整您的自定义域名配置。

3.  计费方式会调整吗？

计费方式和部署方式与之前完全相同，不受影响。

4.  如果需要新增站点，应如何操作？

CODING 不提供新增站点入口，推荐您使用[「腾讯云 Webify 」](https://webify.cloudbase.net/)平台进行部署。前往腾讯云 Webify [快速开始使用](https://webify.cloudbase.net/docs/quick-start)。
