---
title: 个人访问令牌 - CODING 帮助中心
pageTitle: 个人访问令牌
pagePrevTitle: 登录常见问题
pagePrev: member/personal-account/login-faq.html
---

### [功能介绍](#intro)

个人访问令牌类似某些系统中的应用专用密码。生成后可根据设置的权限访问特定的 API，可以用于创建自己的程序或者脚本。

### [创建访问令牌](#create)

1.  点击页面右上角个人头像，选择「个人账户设置」。


2.  在左侧导航栏中选择「访问令牌」进入令牌列表，点击页面右上角「新建令牌」。

![](https://help-assets.codehub.cn/enterprise/20210910144139.png)

3.  在表单中填写令牌描述，并选择此令牌的访问权限（参考[访问令牌权限说明](#permission)）。你还可以设置 IP 白名单。

![](https://help-assets.codehub.cn/enterprise/20210910144515.png)

令牌创建完成之后将会显示在令牌列表，并将新建的令牌的内容显示出来。

> 注意：令牌的内容只在刚创建完成时显示在令牌列表，刷新之后即显示为令牌描述。为了安全，请将其复制粘贴至您需要使用的地方，并不要保存副本。 如果您需要调试，请在调试后，点击「编辑」重新生成令牌。

![](https://help-assets.codehub.cn/enterprise/20210910150806.png)


### [编辑/重新生成访问令牌](#edit)

在访问令牌列表，点击「编辑」即可进入任一令牌的编辑页面。

![](https://help-assets.codehub.cn/enterprise/20210910145722.png)

-   **修改令牌：**

在编辑页面，你可以修改令牌描述、权限或白名单。


-   **重新生成令牌：**

如果遗失了令牌，可以选择重新生成。

> 注意：重新生成令牌后，令牌内容也仅在创建成功时显示在列表。刷新页面即会显示为令牌描述。

![](https://help-assets.codehub.cn/enterprise/20210910150058.png)



### [删除访问令牌](#delete)

如果令牌不再继续使用，为了避免信息泄露，建议将其删除。

-   **删除单个令牌：**

选择要删除的访问令牌，点击更多选项按钮，选择「删除」即可删除该令牌。

![](https://help-assets.codehub.cn/enterprise/20210910151141.png)

-   **批量删除所有令牌：**

如需批量删除所有令牌，点击令牌列表右上角的更多选项按钮，选择「删除全部」即可。

![](https://help-assets.codehub.cn/enterprise/20210910151213.png)
### [访问令牌权限说明](#permission)

访问令牌目前与 OAuth 的 Access Token 共用一个 Scope 权限范围。

| Scope 名称      | 说明                                                         | 授权 |
| --------------- | ------------------------------------------------------------ | ---- |
| project:depot   | 获取 commit 信息，分支操作，MR/PR, LineNotes, fork, webhook 等操作 | 读写 |
| user            | 授权获取用户信息（用户名称，头像，tag，email，动态 ）        | 读   |
| user:email      | 授权获取用户的 email                                        | 读   |
| notification    | 授权读取通知信息，包含 email 通知                              | 读写 |
| social:message  | 授权读取、发送私信、私信语音                                 | 读写 |
| project         | 授权项目信息、项目列表，仓库信息，公钥列表、成员，任务列表   | 读   |
| project:members | 授权项目管理者增、删、改项目成员，退出项目                   | 读写 |
| project:task    | 授权任务操作，包含增、删、改                                 | 读写 |
| project:file    | 授权文件，包含增、删、改                                     | 读写 |
| project:key     | 授权操作部署公钥、个人公钥                                   | 读写 |

### [使用访问令牌](#use)

访问令牌可以用于在 HTTP 请求中代替用户名密码，访问 CODING API。

可以在 HTTP 请求中使用 `-u` 参数，加入用户：

```shell
$ curl -u tester https://test.coding.net/api/current_user
Enter host password for user 'tester':
{
    "code": 0,
    "data": {
        "global_key": "tester",
        "name": "tester",
        ...
    }
}
```

或者

```shell
$ curl -u "tester:90ed7a169febb12d17e14aa5531827476f6b3a4e" https://test.coding.net/api/current_user
{
    "code": 0,
    "data": {
        "global_key": "tester",
        "name": "tester",
        ...
    }
}
```

你还可以设置至 HTTP 请求的 Header 中：

```shell
$ curl -H "Authorization: Bearer 90ed7a169febb12d17e14aa5531827476f6b3a4e" https://test.coding.net/api/current_user
{
    "code": 0,
    "data": {
        "global_key": "tester",
        "name": "tester",
        ...
    }
}
```

### [利用令牌访问代码仓库](#access)

在设置 Scope 权限选项中勾选 `project:depot` 后，可以用于访问代码仓库。

```shell
git clone https://tester:90ed7a169febb12d17e14aa5531827476f6b3a4e@test.coding.net/test/testRepo.git
Cloning into 'testRepo'...
remote: Counting objects: 11, done.
remote: Compressing objects: 100% (7/7), done.
remote: Total 11 (delta 2), reused 0 (delta 0)
Unpacking objects: 100% (11/11), done.
```

==== 2021/09/09 ====
