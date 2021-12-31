---
title: 项目管理 - CODING 帮助中心
pageTitle: 项目管理
pageNextTitle: 项目成员管理
pageNext: project-settings/members.html
---
### [创建项目](#create)

1.  登录团队之后，点击页面右上角的 <img src ="https://main.qcloudimg.com/raw/d94a8e60dd3a41d0af07d72ae0e9d70e.png" style ="margin:0">，然后选择「创建项目」。
您也可以从左边的导航栏选择「项目」进入项目页面，再单击右上角的「创建项目」。

![](https://help-assets.codehub.cn/enterprise/20210729102948.png)

2.  根据项目需求选择合适的项目模板。

*   **全功能 DevOps 项目**：一键开启所有 DevOps 功能
*   **按需选择**：基于团队实际所需选取特定功能
*   **从我们的教学项目开始**：基于实践范例开启所需功能

在选择项目模板前，建议您先[认识 CODING DevOps](/docs/start/new.html)，以了解 CODING DevOps 平台的功能模块和使用流程。这样能更好地帮助您选择合适的项目模板。如果您没有特别明确的使用场景，建议您选择「全功能 DevOps 项目」。在您熟悉 CODING DevOps 平台之后，您可以按实际业务情况选择所需的功能模块。

3.  录入项目基本信息即可完成项目创建。

### [在项目管理页面管理项目](#overview)

登录团队之后，点击左侧导航栏「项目」进入项目管理页面。

![](https://help-assets.codehub.cn/enterprise/20210804111659.png)

*   「我参与的」页签会列出您所参与的全部项目，包括[星标项目](#star)。
*   「我管理的」页签则列出您作为项目管理员角色参与的所有项目。
*   「全部项目」页签默认只会出现在团队所有者/管理员的「项目」管理页面，列举了整个团队内的所有项目。
*   「已归档」页签会列出当前团队下已经被归档的项目。只有团队所有者/管理员能归档项目。

您可以在搜索框中输入关键词进行相关项目搜索，或者按照访问时间、创建时间或项目名称给项目排序。

在项目管理页面，您可以对项目进行以下操作：

*   点击「功能模块」下的对应图标进入指定项目的代码仓库/构建计划等模块
*   把鼠标悬浮在「管理员」栏的用户头像以查看指定项目的管理员
*   [将项目设置为星标项目](#star)
*   [管理项目分组](#manage-group)
*   [批量整理项目](#batch-manage)

> 如果您是团队所有者/管理员，您还可以在项目管理页面[管理项目成员](/docs/admin/project.html#member)、[设置项目基本信息](/docs/admin/project.html#set)、[归档项目](/docs/admin/project.html#archive)或[删除项目](/docs/admin/project.html#delete)。

#### [星标项目](#star)

对单独的项目加星标后项目会出现在星标项目栏中，通过鼠标拖拽可以改变星标项目的排序。

![](https://help-assets.codehub.cn/enterprise/20210804112503.png)

您也可点击页面右上角的 <img src ="https://main.qcloudimg.com/raw/d94a8e60dd3a41d0af07d72ae0e9d70e.png" style ="margin:0">快速添加星标并置顶项目。

![](https://help-assets.codehub.cn/enterprise/20210804112624.png)


#### [管理项目分组](#manage-group)
##### [创建项目分组](#create-group)

您可以通过以下任一方式创建项目分组：

**方式一：**

1.  点击某一项目的更多操作图标，选择「移动到分组」->「新分组」。

![](https://help-assets.codehub.cn/enterprise/20210804114202.png)

2.  输入分组名称，点击「创建」即可完成创建。


**方式二：**

在项目列表区域，选择「更多」->「创建分组」，输入分组名称创建分组。

![](https://help-assets.codehub.cn/enterprise/20210804113840.png)

**方式三：**

在项目列表区域，选择「更多」->「管理分组」。输入分组名称后，点击「添加分组」即可完成创建。

![](https://help-assets.codehub.cn/enterprise/20210804114848.png)

创建分组成功后，相应的组名会出现在菜单栏中。点击组名可查看该分组下的所有项目。

![](https://help-assets.codehub.cn/enterprise/20210804114445.png)

##### [重命名项目分组](#rename-group)

在项目列表区域，选择「更多」->「管理分组」。选中某一分组，直接修改分组名字，按回车即可完成更新。
![](https://help-assets.codehub.cn/enterprise/20210804125717.png)

##### [调整项目分组的顺序](#adjust-order)

在项目列表区域，选择「更多」->「管理分组」。把鼠标放在某一分组前的<img src ="https://help-assets.codehub.cn/enterprise/20210804142628.png" style ="margin:0">，此时鼠标变成小手样式。按住小手上下拖拽即可完成项目排序。

##### [删除项目分组](#rename-group)

在项目列表区域，选择「更多」->「管理分组」。鼠标悬浮在某一分组，会出现删除图标。点击删除图标即可删除该分组。

#### [批量整理项目](#batch-manage)

在项目列表区域，选择「更多」->「批量整理项目」。选择多个项目，再指定目标分组，即可一次性把多个项目移动到指定分组。

### [删除项目](#delete)

如需删除项目，可在进入项目之后，点击页面左下角「项目设置」找到删除项目的入口。项目删除之后，项目内的所有数据均会删除且无法恢复。请谨慎操作。

![](https://help-assets.codehub.cn/enterprise/20210803153424.png)

在「项目设置」->「项目与成员」->「更多」中，点击「删除项目」。在弹出的确认框点击确认即可删除项目。

![](https://help-assets.codehub.cn/enterprise/20210803154542.png)

==== 2021/08/02====
