---
title: 快速开始 - CODING 帮助中心
pageTitle: 快速开始
pagePrevTitle: 产品简介
pagePrev: document/wiki/intro.html
pageNextTitle: 权限配置
pageNext: document/wiki/permission.html
alias: management/wiki.html
---

### [创建](#create)

1.  任一项目中点击【文档管理】->【Wiki】后【创建第一个页面】即可开始使用。

![](https://help-assets.codehub.cn/enterprise/wiki%202.png)

2.  在创建页内可对标题和内容进行编辑，完成后选择【提交文档】，您的第一个文档便创建成功了。

![](https://help-assets.codehub.cn/enterprise/wiki3.png)

### [编辑](#edit)

1.  对于已有的文档，通过【编辑文档】即可进入编辑模式进行增删改操作。

![](https://help-assets.codehub.cn/enterprise/wiki4.png)

2.  点击【全屏编辑】按钮，即可切换为实时预览的编辑模式，左侧为编辑页，右侧为实时预览。

![](https://help-assets.codehub.cn/enterprise/wiki5.png)

3.  CODING Wiki 支持多人同时编辑相同文档，详情页及编辑页均会显示当前正在编辑该文档的成员信息。

![](https://help-assets.codehub.cn/enterprise/wiki6.png)

#### [多语法支持](#mutli-language)

1.  CODING Wiki 支持 Markdown 语法，您可以在编辑模式下点击【问号】按钮，查看常用 Markdown 语法。

![](https://help-assets.codehub.cn/enterprise/wiki7.png)

2.  CODING 同时也支持 mermaid 语法，您可以根据文档需求灵活使用不同语法。点击查看[《mermaid 官方文档》](https://mermaid-js.github.io/mermaid/)了解更多。

![](https://help-assets.codehub.cn/enterprise/wiki8.png)

#### [查看历史版本](#version)

通过 Wiki 详情页右上方的 ···  菜单，即可查看该文档任一历史版本。您可选择恢复至所需版本，或者与任意版本进行对比。

![](https://help-assets.codehub.cn/enterprise/wiki9.png)

#### [修改目录](#contents)

1.  您可以在 Wiki 文档目录中，通过文档右侧的「创建子页面」选项，在新页面输入标题和正文后，完成子页面的创建。

![](https://help-assets.codehub.cn/enterprise/wiki10.png)

2.  Wiki 支持无限层级目录，可上下拖拽任意一层目录，以改变该目录的顺序及层级。

![](https://help-assets.codehub.cn/enterprise/wiki11.png)

3.  随着项目知识沉淀，目录树逐渐庞杂，您可以通过「文档目录」右侧快捷按钮进行全部展开/全部收起操作，或在下拉菜单中根据文档数量设置合适的默认展开数量；您还可以通过拉拽目录树的分割线调整目录宽度，系统会记住您的调整结果。

![](https://help-assets.codehub.cn/enterprise/wiki12.png)

### [分享](#share)

在需要分享的 Wiki 文档详情页，选择【分享】，即可通过链接将文档分享给外部人员或指定的团队成员。

![](https://help-assets.codehub.cn/enterprise/wiki16.png)

-   外部分享
可根据需求选择是否开启访问密码与是否包含子页面一起分享，「生成分享链接」后即可复制链接与密码发送给外部人员进行访问。选择「分享设置」即可回退重选并更新分享设置。「停止分享」后分享链接将失效，外部人员将无法访问该文档。

![](https://help-assets.codehub.cn/enterprise/wiki17.png)

-   团队内分享
可根据需求选择向团队内所有成员或是指定成员（支持批量邀请项目内全部成员）分享文档，以及是否包含子页面一起分享。「生成分享链接」后即可复制链接发送给相关成员进行访问。选择「分享设置」即可回退重选并更新分享设置。「停止分享」后分享链接将失效，相关成员将无法访问该文档。

![](https://help-assets.codehub.cn/enterprise/wiki18.png)

### [删除](#delete)

1.  您可以拖拽不需要的 Wiki 至回收站，或者通过父文档标题右侧 ··· 下拉菜单中 的「删除」选项批量删除父文档与子文档。请注意，对父文档进行带子文档的删除至回收站操作时，需要操作者具有所有子文档的相应操作权限，删除文档后分享链接也将失效。

![](https://help-assets.codehub.cn/enterprise/wiki26.png)

2.  可以在回收站内查看被删除的文档、操作者、操作时间、保留时间等详情，并进行「恢复文档」或「永久删除」操作。如无其他操作，回收站内文档将在保留 30 天后永久删除，请审慎进行该项操作。

![](https://help-assets.codehub.cn/enterprise/wiki27.png)

### [文档导入/导出](#import-output)

Wiki 支持从其他项目或本地文件导入文档，同时支持导出为 PDF 或 Markdown 文件。进行导入操作前需确保操作者具备拟导入文档的访问权限、当前项目的 Wiki 编辑权限；若选择以子文档的形式导入，还需确保操作者具备父文档的编辑权限。项目成员编辑 Wiki 权限默认打开，如需调整可查阅[管理操作权限](#permission)。

-   导入为新建文档
若希望导入为新建文档，则可以通过目录树下的「导入」选项，选择从其他项目或是本地文件导入文档。

![](https://help-assets.codehub.cn/enterprise/wiki19.png)

-   导入为子文档
若希望导入为子文档，则可以在父文档标题右侧的 ··· 下拉菜单中选择从其他项目或是本地文件导入文档。

![](https://help-assets.codehub.cn/enterprise/wiki20.png)

-   导出为 PDF/Markdown 文件
CODING Wiki 支持导出为 PDF/Markdown 文件，项目成员可对可读文档进行导出，导出时可选择是否包含子文档一起导出。

![](https://help-assets.codehub.cn/enterprise/wiki21.png)

### [静态站点](#site)

静态站点功能支持将项目内文档快捷发布为公开的静态站点。在首次创建网站托管服务前，团队所有者需要先完成腾讯云授权操作与实名认证，以获得对腾讯云产品的操作权限，详细操作可查阅[《网站托管 - 权限与实名认证》](https://help.coding.net/docs/pages/operating/pre-work.html)。

![](https://help-assets.codehub.cn/enterprise/wiki22.png)

#### [创建](#create-site)

团队所有者完成授权操作，并为所在项目用户组配置持续部署相关权限后，即可前往「Wiki」->「静态站点」->「创建站点」，填写需要发布 Wiki 文档名称、站点名称、选择发布节点、仓库名称，完成站点创建。

![](https://help-assets.codehub.cn/enterprise/wiki23.png)

#### [站点管理](#site-manage)

创建站点后，您可以在静态站点页查看站点详情，也可以管理当前项目中所有由 Wiki 发布的站点，可对站点进行【重命名】、【删除】、【修改文档范围】、【发布】、【重置站点并发布】、【重新部署】等操作。

操作说明：

-   发布：更新 Wiki 内容并部署站点；
-   重置站点并发布：将站点代码重置为默认状态，更新 Wiki 内容并发布；
-   重新部署：不修改站点内容和代码，仅根据当前仓库代码重新部署站点。

![](https://help-assets.codehub.cn/enterprise/wiki24.png)

成功部署的 Hexo 静态站点，支持通过站点地址公开访问。

![](https://help-assets.codehub.cn/enterprise/wiki25.png)

==== 2021/05/24 ====
