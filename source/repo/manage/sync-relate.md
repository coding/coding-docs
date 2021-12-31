---
title: 导入或关联外部仓库 - CODING 帮助中心
pageTitle: 导入或关联外部仓库
pagePrevTitle: 创建仓库
pagePrev: repo/manage/create.html
pageNextTitle: 查看仓库详情
pageNext: repo/manage/view.html
alias: 
-   host/git/manage.html
-   repo/sync-relate.html
-   host/git/sync-github.html
-   repo/git/sync-github.html
---

### [导入开源仓库](#sync)

CODING 代码仓库不仅提供了一键导入外部开源仓库功能，还支持定时同步外部仓库。在创建代码仓库时点选「导入外部仓库」，填入 Git 开源仓库的 URL 地址即可导入。

![](https://help-assets.codehub.cn/enterprise/20210508151145.png)

同步意味着和源仓库保持一致，将覆盖你在 CODING 仓库中做出的改动。你可以在仓库设置中修改同步信息频率或关闭自动同步功能。

![](https://help-assets.codehub.cn/enterprise/20210611110617.png)

### [导入私有仓库](#import)

CODING 代码仓库支持导入外部私有（非开源）Git 仓库，你可以参考以下三个步骤实现此需求。

**1.  将私有仓库拉取至本地**

```shell
git clone --mirror 私有仓库地址
```

![](https://help-assets.codehub.cn/enterprise/20211215164707.png)

> 拉取至本地的仓库文件夹通常带有 .git 后缀。

**2.  获取目标 CODING 代码仓库地址**

在 Web 端进入 CODING 项目，获取目标仓库的地址。

![](https://help-assets.codehub.cn/enterprise/20211215170158.png)

**3.  推送至目标 CODING 仓库**

在终端中输入命令进入私有仓库。

```shell
cd 私有仓库
```

使用推送命令将私有仓库推送至目标 CODING 仓库。

```shell
git push --mirror 目标仓库地址
```

![](https://help-assets.codehub.cn/enterprise/20211215171101.png)

若出现 refs/pull 报错，可以使用以下命令避免报错：

```shell
git push URL "+refs/heads/*:refs/heads/*" "+refs/tags/*:refs/tags/*"
```

推送成功后，可以看到的私有仓库已上传至目标仓库中。

![](https://help-assets.codehub.cn/enterprise/20211215171946.png)

### [关联代码仓库](#related)

「关联仓库」功能本质上是将访问外部仓库的凭据“暂存”至 CODING，当你使用持续集成 / 部署时，能够直接调用第三方仓库作为代码源，而省去了频繁迁移的繁琐流程。

![](https://help-assets.codehub.cn/enterprise/20210611114015.png)

支持的关联仓库类型有 GitHub 、GitLab 、私有 GitLab、Gitee、工蜂、通用 Git 仓库与其他项目中的 CODING 仓库。前五种仓库类型支持 OAuth 认证方式，通用 Git 仓库支持账号密码认证，关联后的仓库代码不会存储至 CODING 代码仓库。

![](https://help-assets.codehub.cn/enterprise/20210611114318.png)

#### [关联 GitLab 私有仓库](#personal-gitlab)

如需关联私有 GitLab 仓库，需要在 GitLab 创建应用然后由团队管理员绑定私有 GitLab 服务。具体操作请参考[绑定私有 GitLab](/docs/admin/service-integration/gitlab.html)。

#### [关联 GitLab SaaS 仓库](#saas-gitlab)

如需关联 GitLab SaaS 版本上的仓库，在「关联代码仓库」页面选择「GitLab」代码源，然后点击「前往认证」，在跳转的 GitLab 验证页面点击「Authorize」完成授权。授权成功后，选择需要关联的代码仓库即可完成操作。

![](https://help-assets.codehub.cn/enterprise/20210812191547.png)

#### [关联 GitHub 仓库](#github)

在「关联代码仓库」页面，选择「GitHub」代码源，然后点击「前往认证」使用 OAuth 认证即可跳转至 GitHub 进行授权认证。若提示失败，有可能是因为您未在 GitHub 中填写用户名。请前往「Settings」->「Profile」->「Name」进行填写。

==== 2021/08/30 ====
