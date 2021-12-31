---
title: 制品库权限 -   CODING 帮助中心
pageTitle: 制品库权限
pagePrevTitle: 制品库代理
pagePrev: artifacts/proxy.html
pageNextTitle: 制品库认证
pageNext: artifacts/auth.html
alias: 
-   devops/artifacts/permission.html
-   ar/permission.html
-   packages/permission.html
---

### **功能介绍**

制品作为团队的重要资产，它的权限管理是至关重要的：例如某些制品需要开放给第三方外部使用（比如开源组件包）、某些制品需要开放给团队内的其他项目组成员使用（比如基础公共组件包）、某些制品只需开放给本项目成员使用（比如应用安装包）。CODING 制品库提供了完善的权限管理，满足不同场景下的权限需求。

### 权限规则

1.  CODING 制品库提供了三种权限范围

-   项目内
-   团队内
-   公开

2.  不同成员对制品的操作

-   拉取：从制品库拉取任意指定的制品。
-   推送：推送任意制品到制品库。
-   代理：从代理中同步不在缓存中的制品。 [了解更多什么是制品库代理功能](./proxy.html)

3.  鉴权规则

<table border=0 cellpadding=0 cellspacing=0 width=566
 style='border-collapse:
 collapse;table-layout:fixed;width:422pt'>
 <col width=71 style='mso-width-source:userset;mso-width-alt:2261;width:53pt'>
 <col width=55 span=9 style='mso-width-source:userset;mso-width-alt:1749;
 width:41pt'>
 <tr height=21 style='height:16.0pt'>
  <td height=21 class=xl65 width=71 style='height:16.0pt;width:53pt'></td>
  <td align=center colspan=3 class=xl65 width=165 style='width:123pt'>项目内</td>
  <td align=center colspan=3 class=xl65 width=165 style='width:123pt'>团队内</td>
  <td align=center colspan=3 class=xl65 width=165 style='width:123pt'>公开</td>
 </tr>
 <tr height=21 style='height:16.0pt'>
  <td height=21 class=xl65 style='height:16.0pt'></td>
  <td class=xl65>拉取</td>
  <td class=xl65>推送</td>
  <td class=xl65>代理</td>
  <td class=xl65>拉取</td>
  <td class=xl65>推送</td>
  <td class=xl65>代理</td>
  <td class=xl65>拉取</td>
  <td class=xl65>推送</td>
  <td class=xl65>代理</td>
 </tr>
 <tr height=25 style='height:19.0pt'>
  <td height=25 class=xl65 style='height:19.0pt'>本项目成员</td>
  <td class=xl66>✅</td>
  <td class=xl66>✅</td>
  <td class=xl66>✅</td>
  <td class=xl66>✅</td>
  <td class=xl66>✅</td>
  <td class=xl66>✅</td>
  <td class=xl66>✅</td>
  <td class=xl66>✅</td>
  <td class=xl66>✅</td>
 </tr>
 <tr height=25 style='height:19.0pt'>
  <td height=25 class=xl65 style='height:19.0pt'>团队内成员</td>
  <td class=xl66>&#128683;</td>
  <td class=xl66>&#128683;</td>
  <td class=xl66>&#128683;</td>
  <td class=xl66>✅</td>
  <td class=xl66>&#128683;</td>
  <td class=xl66>&#128683;</td>
  <td class=xl66>✅</td>
  <td class=xl66>&#128683;</td>
  <td class=xl66>&#128683;</td>
 </tr>
 <tr height=25 style='height:19.0pt'>
  <td height=25 class=xl65 style='height:19.0pt'>匿名成员</td>
  <td class=xl66>&#128683;</td>
  <td class=xl66>&#128683;</td>
  <td class=xl66>&#128683;</td>
  <td class=xl66>&#128683;</td>
  <td class=xl66>&#128683;</td>
  <td class=xl66>&#128683;</td>
  <td class=xl66>✅</td>
  <td class=xl66>&#128683;</td>
  <td class=xl66>&#128683;</td>
 </tr>
 <![if supportMisalignedColumns]>
 <tr height=0 style='display:none'>
  <td width=71 style='width:53pt'></td>
  <td width=55 style='width:41pt'></td>
  <td width=55 style='width:41pt'></td>
  <td width=55 style='width:41pt'></td>
  <td width=55 style='width:41pt'></td>
  <td width=55 style='width:41pt'></td>
  <td width=55 style='width:41pt'></td>
  <td width=55 style='width:41pt'></td>
  <td width=55 style='width:41pt'></td>
  <td width=55 style='width:41pt'></td>
 </tr>
 <![endif]>
 </table>


### 设置权限

了解上述权限对应的鉴权规则后，您可以在创建制品仓库时按需设置权限范围，对于已经创建好的制品仓库您也可以进行权限范围修改。

#### 创建仓库时设置权限

在【制品库】页面，新建制品仓库时即可设置权限范围。

![](https://help-assets.codehub.cn/enterprise/20200717100647.png)

#### 对已存在的仓库修改权限

点击仓库右上方的【设置仓库】。

![](https://help-assets.codehub.cn/enterprise/20191227150042.png)

在【基本信息】中即可对权限范围进行更新。

![](https://help-assets.codehub.cn/enterprise/20191227150117.png)


==== 2020/08/13 ====
