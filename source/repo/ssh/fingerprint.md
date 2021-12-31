---
title: 密钥指纹鉴权 - CODING 帮助中心
pageTitle: 密钥指纹鉴权
pagePrevTitle: 配置 SSH 公钥
pagePrev: repo/ssh/config.html
pageNextTitle: 通过 SSH 协议推拉代码
pageNext: repo/ssh/pull-push.html
alias: repo/fingerprints.html
---

### [功能介绍](#intro)

代码安全是永不过时的议题，为了保证您所连接的远端仓库是真正的 CODING 代码仓库，现提供 SSH 密钥指纹用于鉴权。您只需要在本地运行命令后，验证返回的结果就可以知晓远端代码仓库的真实性。

### [验证 SHA256 算法指纹](#sha256)

查看本地 `.ssh/know_hosts` 文件中关于 `e.coding.net` 的 SHA256 算法的指纹，如果返回值为 `jok3FH7q5LJ6qvE7iPNehBgXRw51ErE77S0Dn+Vg/Ik`，则证明您连接到了正确的 CODING 服务器。

在终端中运行命令：

```bash
ssh-keygen -lf ~/.ssh/known_hosts
```

查看结果；

![](https://help-assets.codehub.cn/enterprise/20210830154637.png)

### [验证 MD5 算法指纹](#md5)

查看本地 `.ssh/know_hosts` 文件中关于 `e.coding.net` 的 MD5 算法的指纹，如果返回值是 `98:ab:2b:30:60:00:82:86:bb:85:db:87:22:c4:4f:b1`，则证明您连接到了正确的 CODING 服务器。

在终端中运行命令：

```bash
ssh-keygen -E md5 -lf ~/.ssh/known_hosts
```

查看结果：

![](https://help-assets.codehub.cn/enterprise/20210830154427.png)

==== 2021/08/30 ====
