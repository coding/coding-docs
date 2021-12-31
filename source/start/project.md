---
title: 新建项目 - CODING 帮助中心
pageTitle: 新建项目
pagePrevTitle: 注册与邀请
pagePrev: start/register-invite.html
pageNextTitle: 开始项目协同
pageNext: start/project-plan.html
alias: start/create.html
---

在 CODING DevOps 平台建立团队之后，团队内成员可按需创建项目。只有项目创建之后，项目成员才能按需使用**项目协同**、**代码仓库**、**持续集成**、**持续部署**等功能。

### [创建项目](#create)

1.  登录团队之后，点击页面右上角的 <img src ="https://main.qcloudimg.com/raw/d94a8e60dd3a41d0af07d72ae0e9d70e.png" style ="margin:0">，然后选择「创建项目」。
您也可以从左边的导航栏选择「项目」进入项目页面，再单击右上角的「创建项目」。

![](https://help-assets.codehub.cn/enterprise/20210729102948.png)

2.  根据项目需求选择合适的项目模板。

*   **全功能 DevOps 项目**：一键开启所有 DevOps 功能。
*   **按需选择**：基于团队实际所需选取特定功能。
*   **从我们的教学项目开始**：基于实践范例开启所需功能，且项目内已经配置好相关代码。

在选择项目模板前，建议您先[认识 CODING DevOps](/docs/start/new.html)，以了解 CODING DevOps 平台的功能模块和使用流程。这样能更好地帮助您选择合适的项目模板。如果您没有特别明确的使用场景，建议您选择「全功能 DevOps 项目」。在您熟悉 CODING DevOps 平台之后，您可以根据实际业务情况选择所需的功能模块。

3.  录入项目基本信息即可完成项目创建。



### [添加项目成员并分配角色](#member)

创建项目之后，项目管理员可为项目添加成员并分配角色。只有加入了项目所在团队的成员才能参与项目，不支持团队外的成员被添加进项目。

1.  进入已经创建的项目，点击页面左下角「项目设置」。

![](https://help-assets.codehub.cn/enterprise/20210728124924.png)

2.  在项目设置页面，选择「项目与成员」->「成员」，进入成员管理页面。

![](https://help-assets.codehub.cn/enterprise/20210728150031.png)

3.  点击右上角「添加成员」，出现成员选择页面。可从「团队成员」或「项目成员」页签中选择成员加入项目。

4.  在成员列表中找到所添加的成员，执行「关联用户组」操作为其分配项目角色。

>您可以点击「查看权限」查看各个项目用户组的权限。

5.  如需更改项目用户组所拥有的权限，可在项目设置页面内选择「项目成员」->「用户组」，然后对指定的用户组执行「设置权限」操作。如需新建用户组，点击右上角「创建用户组」并分配对应权限即可。

![](https://help-assets.codehub.cn/enterprise/20210728150205.png)

### [设置项目](#config)

项目创建成功后，创建人默认成为该项目的管理员。项目管理员是项目中最高级别的权限拥有者，主要拥有以下权限：
*   项目信息设置
*   项目成员和用户组管理
*   项目成员权限管理
*   项目内功能模块配置

> 只有团队所有者可以归档或删除团队下的项目。项目管理员无项目删除权限。


例如，如需在项目中使用网站托管功能，那么项目管理员要确保**代码仓库**以及**持续部署**模块的功能是打开的。在「项目设置」->「项目与成员」->「功能开关」进行操作：

![](https://help-assets.codehub.cn/enterprise/20210823114754.png)

如需了解详情，参考[项目设置](/docs/project-settings/basic.html)。

==== 2021/08/23 ====