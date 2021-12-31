---
title: 常见问题 - CODING 帮助中心
pageTitle: 常见问题
pagePrevTitle: 最佳实践——如何提高代码质量
pagePrev: repo/best-practice/policy.html
pageNextTitle: 词汇表
pageNext: repo/glossary.html
alias: 
-   host/introduce.html
-   common/code-security.html
---

### [提示验证失败怎么办？](#q1)

在克隆代码仓库时需输入服务邮箱与服务密码。你可以前往「个人账户设置」 -> 「个人设置」查看服务凭证。

![](https://main.qcloudimg.com/raw/898334e0a1808d344ce184fbdd84035e.png)

### [克隆代码时出错怎么办？](#q2)

1.  请确保安装并使用了最新版官方 Git 客户端。
2.  在终端中输入命令 `git remote -v` 查询所关联的 remote url （大小写敏感）是否为正确的：

若 remote url 有误，请参考一下命令行修改远程仓库地址。

```bash
$ git remote set-url origin https://git.coding.net:username/right-name.git
```

### [推送代码时提示其他错误怎么办？](#q3)

请参考[快速开始](/docs/repo/start.html)确保你执行了正确的操作。如果仍然报错请[提交工单](https://e.coding.net/signin?redirect=/workorder)，并在工单中附上以下信息（可选）：

-   Git 报错信息
-   执行 git --version 的结果
-   其他可能有用的信息，例如输入 `ping coding.net` 命令后的运行结果、你目前的 IP 地址及所使用的 DNS 等

### [提示 Couldn't resolve host 怎么办？](#q4)

这可能是由于你的 DNS 设置造成的，请更换你的 DNS 为 114.114.114.114 或 1.1.1.1 后重启网络。

### [提示 Permission denied (publickey) 怎么办？](#q5)

可能是由于你没有目标仓库和分支的权限，导致无法更新数据。

1.  确认你的 push 方式：
-   SSH 方式：请检查你的 SSH 公钥是否正确（如果你有多个私钥，请使用 ssh-add 命令来指定默认使用的私钥）。
-   HTTPS 方式：请检查密码及用户名是否正确。
2.  确认对目标分支是否有写权限。

### [提示 RPC failed 错误怎么办？](#q6)

这是由于 HTTPS 推送方式的 `http.postBuffer` 限制推送文件大小。可以在终端中执行 `git config http.postBuffer 524288000` 命令以设置更大的限制值，或者切换为 SSH 方式进行推送。

若返回错误码：`HTTP 403 curl 22 The requested URL returned error: 403 Forbidden`，还可以检查是否具备仓库访问权限、账号密码是否正确、仓库存储是否已满。

### [如何修改已关联的外部仓库？](#q7)

以修改已关联的 GitHub 仓库为例：

1.  登录 GItHub，点击右上角头像处的【Settings】>【Applications】>【Authorized OAuth Apps】 取消关联。

![](https://help-assets.codehub.cn/enterprise/20211202171855.png)

2.  登录新的 GitHub 账号。

3.  返回 CODING 的代码仓库，点击「关联仓库」后重新刷新 GitHub OAuth 认证。

![](https://help-assets.codehub.cn/enterprise/20211202172039.png)

### [认证失败超过 20 次提示冻结 3600s 怎么办？](#q8)

![](https://help-assets.codehub.cn/enterprise/20211202173145.png)

使用错误的凭据连续认证失败累计 20 次将触发安全保护机制，暂时冻结该仓库的 https 访问，需要暂时停止所有自动或者手动认证的动作，等待冻结时间结束后重新进行登录，否则即使使用正确的账号密码也会认证失败并导致冻结时间重置。

若需紧急进行代码操作，你也可以改为 SSH 协议进行代码推拉。

### [公钥拉取失败提示 Permission denied](#permission-denied)

1.  如果机器上只有一个公钥的情况下：可以尝试删除公私钥，按照提示重新生成，点击阅读[操作指引](/docs/repo/ssh/config.html)

2.  若机器上存在多公钥，需前往 `~/.ssh` 文件夹新建 config 文件，格式如下：

```bash
Host "authmanage"
HostName "code.csdn.net"
User "git"
IdentityFile "C:/Users/WangJun/.ssh/id_rsaAuthManage"

Host "demo"
HostName "code.csdn.net"
User "git"
IdentityFile "C:/Users/WangJun/.ssh/id_rsaDemo"
```

例如旧的 git 地址为：`git@code.csdn.net:wangjuntytl/authmanage.git`，在配置了新的 config 文件后不要在直接使用命令：`git clone git@code.csdn.net:wangjuntytl/authmanage.git`。

而是改为使用 `git clone git@authmanage:wangjuntytl/authmanage.git` 命令，ssh 将会依据你设置 host 找到相应的 hostname。

### [代码托管在 CODING 是否安全？](#q8)

这个问题涉及两个层面，一是代码托管至云端是否安全，二是代码托管至 CODING 是否安全。

1.  相较于把代码上云，将代码放在本地是否就安全呢？
   
    代码放在本地，首先需要搭建一套代码管理系统配有专人维护，并且还需辅以建设安全机制，保障服务稳定和数据的安全性，以上两项都有一定的技术要求和较高的成本支出；
   
    专业的人负责专业的事。代码托管托管在具备技术实力和安全保障的专业云服务商上，在保障代码安全的基础时还能够使用更多功能，享受专业的服务，更加省时省力省钱；

    国内企业 SaaS 服务经过多年发展，企业将人力信息、财务信息、客户信息、产品部署都放在云服务商，对于中小企业来说，选择一家有技术安全实力的云服务提供商比自己搭建一套系统更加安全高效。

2.  代码托管到 CODING 是否安全呢？
   
    CODING 是目前国内市场上唯一基于企业级 Java 技术完全自主研发的一站式软件研发平台，相比其它基于开源项目改造的更加安全、可控性更高。同时具备更强的扩展性，不容易受到被公开的漏洞攻击。
    
    网站通信采用 HTTPS 协议，代码推拉采用 HTTPS 或 SSH 协议，全程加密传输数据，避免数据传输过程中的泄漏；
    
    可设置成员权限，可锁定异常成员，访问资源都须经用户 OAuth 认证，有效控制企业资源的访问权限；

    提供二次验证、密码规则设置等功能，可以有效防止由团队成员账号遗失或被盗导致的团队信息泄漏风险；

    提供详细的操作日志，可通过记录追溯团队成员的操作行为，可及时发现异常操作；

    具有完善的运维安全机制，点击了解[详情](https://coding.net/company/security)。

    架构设计高可用。代码仓库使用分区存储策略存放于不同的存储服务器上，将其挂载到计算服务器工作空间上，相互之间不产生影响。若单点故障，负载会自动分配到其他服务器上。单个代码仓库出现问题后，仅需恢复此仓库的数据即可，其他仓库不受影响。

    在客户环境满足的情况下，CODING 可以提供卓越的高可用能力，保证代码的安全性。

    代码仓库支持硬盘 Raid、全程加密传输、定时备份、实时备份等多种手段保证代码的安全，最大程度降低代码管理风险。
    为收费服务，收费服务意味着契约精神，CODING 有责任保障客户的代码及相关资产的安全；

    自 2014 年运营至今，服务了 200 万研发团队与数万家企业用户，未出现信息泄漏的事件，在业内中拥有良好的口碑和信誉；

==== 2021/11/29 ====
