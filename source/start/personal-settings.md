---
title: 个人设置入门 - CODING 帮助中心
pageTitle: 个人设置入门
pagePrevTitle: 团队管理
pagePrev: start/team-settings.html
---

### 功能介绍

CODING 提供的个人设置包括：**个人帐户管理**以及**个人工作台**，方便您个性化地使用 CODING。

**个人工作台**用于方便每个成员查看与自己相关的或者自己关注的事务、项目信息。详细使用文档请查看[个人工作台](/docs/member/workbench.html)。

**个人帐户管理**提供与个人相关的设置：
-   个人信息设置
-   个人 Markdown 模板设置
-   个人 SSH 公钥管理
-   个人访问令牌管理
-   两步验证设置
-   邮箱设置
-   提醒设置
-   绑定设置
-   开放生态

#### 个人帐户管理概览

点击右上角个人头像旁的下拉图标，选择【个人设置】就可以进入个人帐户页面：

![](https://help-assets.codehub.cn/enterprise/20191206135411.png)

个人帐户页面如下：

![](https://help-assets.codehub.cn/enterprise/20191206134630.png)

个人帐户常见场景举例：

1.  绑定第三方服务（例如企业微信、个人微信等），成功后通过微信扫码登录 CODING 。

![](https://help-assets.codehub.cn/enterprise/20191206140023.png)

2.  设置自己的 MD 模版。

![](https://help-assets.codehub.cn/enterprise/20191206140259.png)

3.  详细配置个人的通知提醒。

![](https://help-assets.codehub.cn/enterprise/20191206140350.png)

4.  多邮箱管理。

您可以在邮箱设置中关联多个邮箱，注册团队所用的邮箱默认为「主邮箱」。点击新增邮箱后填写拟绑定的邮箱并输入账户密码，点击邮件中的验证链接以完成绑定。

![](https://help-assets.codehub.cn/enterprise/20200514105508.png)

绑定完成后可以自行指定主邮箱。

-   主邮箱用于登录 CODING、使用 Git 时提示验证的用户名（username）。

-   已验证的邮箱可以作为本地 Git 邮箱，设置完成后 CODING 会识别代码提交者为同一人。

```gitconfig
git config --global user.email "已验证的邮箱"
```


==== 2020/08/13 ====
