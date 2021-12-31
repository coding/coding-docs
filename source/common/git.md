---
title: Clone 代码出错怎么办？ - CODING 帮助中心
pageTitle: Clone 代码出错怎么办
---

### Git 是什么

Git 是一种在全球范围都广受欢迎的版本控制系统。

在开发过程中，为了跟踪代码，文档，项目等信息中的变化，版本控制变得前所未有的重要。但跟踪变化远远不能满足现代软件开发行业的协同需求，基于 Git 的 Workflow 满足了合作编程的需求，让开发从此变得更加高效和有趣。相比集中式版本控制系统如 SVN ，分布式版本控制系统 Git 拥有更强大的分支管理与合并能力，支持离线开发，并良好地保留了提交过程，让您和您的团队在开发过程中如虎添翼。

关于使用 Git 提交代码，请阅读 [Git 代码托管文档](https://e.coding.net/help/git/intro/) ，您也可以通过阅读 CODING 工程师参与翻译的 《Pro Git》 进一步掌握 Git 这个强大的版本控制系统。

怎样在每次 Push 时不用重复输入密码？

有两种方法：

1. 使用 SSH 方式进行推送，您需要配置 SSH 公钥后进行操作，详情请阅读 [SSH 公钥配置文档](https://e.coding.net/help/git/ssh-key/)

2. 对于 HTTPS 协议: 首先在全局配置保存你的密码， `~/.git-credentials` （没有就创建）内添加

```shell
https://{username}:{passwd}@e.coding.net
```

然后执行配置 Git 命令存储认证命令：

```shell
$ git config --global credential.helper store
```

然后可以看到 `~/.gitconfig` 文件发生了变化:

```shell
git config --show-origin --get credential.helper
```

详情请参考凭证存储。

### Permission denied (publickey)

这个可能是由于你的没有目标仓库和分支的权限，导致无法更新数据。
 确认您的 push 方式，如果是 SSH 方式请检查你的 SSH 公钥是否正确（如果您有多个私钥，请使用 ssh-add 命令来指定默认使用的私钥）； HTTPS 方式请检查密码及用户名是否正确；确认对目标分支是否有写权限。

### Couldn’t resolve host

这是由于 DNS 设置造成的，请更换为 119.29.29.29 或 223.5.5.5 后重启网络。

### RPC failed

这是由于 HTTPS 推送方式的 http.postBuffer 对推送文件大小有限制造成的。
 可以执行 `git config http.postBuffer 524288000` 设置更大的限制值。或者更换使用 SSH 方式进行推送。

### Clone 出错怎么办

1 请确保安装并使用了最新版 官方 Git 客户端

2 请确保 remote url (大小写敏感）是正确的

```shell
$ git remote -v
  origin https://e.coding.net/team-name/repo-name.git (fetch)
  origin https://e.coding.net/team-name/repo-name.git (push)

# 修改
$ git remote set-url origin https://e.coding.net/team-name/right-name.git`
```

3 请确保自己在项目中的权限非受限；
 如果使用 https 方式 clone，服务器端一直返回 403 并且客户端不提示输入密码，则有可能是 git 客户端缓存了错误的密码，请清除已保存的密码
 Mac 用户请依次输入

```shell
$ git credential-osxkeychain erase
 host=e.coding.net
 protocol=https
```

 如果以上都无法解决，请尝试使用 SSH 地址 进行 clone
 如果 SSH clone 出错，请检查你是否连接到正确的地址

```shell
$ ssh -vT git@e.coding.net
 OpenSSH_6.9p1, LibreSSL 2.1.8
 debug1: Reading configuration data /Users/.ssh/config
 debug1: Reading configuration data /etc/ssh/ssh_config
 debug1: /etc/ssh/ssh_config line 21: Applying options for *
 debug1: Connecting to e.coding.net [111.202.69.69] port 22.
 debug1: Connection established.
```

请使用 git 作为用户名

```shell
$ ssh -T username@e.coding.net
```

使用自己的用户名进行链接会出错，请使用 git 作为用户名

```shell
$ ssh -T git@e.coding.net
 Hello usernanme! You've connected to Coding.net via SSH successfully!
```

4 确保 git 使用了密钥

```shell
$ ssh -vT git@e.coding.net
 debug1: identity file /Users/you/.ssh/id_dsa type -1
 debug1: identity file /Users/you/.ssh/id_dsa-cert type -1 
 debug1: Authentications that can continue: publickey 
 debug1: Next authentication method: publickey
 debug1: Trying private key: /Users/you/.ssh/id_dsa 
=debug1: No more authentication methods to try.
Permission denied (publickey). 
```

-1 表示未找到密钥，请参考帮助文档重新生成 rsa 密钥并进行配置

```shell
$ ssh -vT git@e.coding.net
 debug1: identity file /Users/you/.ssh/id_rsa type 1
 debug1: Authentications that can continue: publickey
 debug1: Next authentication method: publickey
 debug1: Offering RSA public key: /Users/you/.ssh/id_rsa
```

1 表示找到了密钥
 确保 SSH 公钥上传到了 Coding.net
 如果以上方法都解决不了问题，请发送执行 `$ssh -vvT git@e.coding.net` 的结果发送至 enterprise@coding.net。

### Push 提示其他错误怎么办

请参考文档并确保您执行了正确的操作，如果仍然报错请在 反馈区 提供我们以下信息以便工程师为您解决问题：
 Git 报错信息
 执行 `git --version` 的结果
 其他有用的信息（如屏幕截图 `$ ssh -vvvT git@e.coding.net`（如果您目前使用了 SSH 方式推送的话）、`$ ping e.coding.net`、您目前的 IP 地址，及您目前使用的 DNS 等信息）
 如果可以的话运行如下的脚本，并将生成的 git.log 贴给 enterprise@coding.net。


==== 2020/08/13 ====
