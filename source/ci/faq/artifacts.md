---
title: 持续集成与制品库 - CODING 帮助中心 
pageTitle: 持续集成与制品库
pagePrevTitle: 持续集成与代码仓库
pagePrev: ci/faq/ci-repo.html
pageNextTitle: 词汇表
pageNext: ci/glossary.html
---

### [为什么会超过拉取限额？](#dockerhub-limited)

使用 CI 拉取镜像时提示 `reached your pull rate limit` 报错，如下图所示：

![](https://help-assets.codehub.cn/enterprise/20210507145959.png)

这是因为 dockerhub 的免费账户存在镜像拉取次数限制，CODING 的出口 IP 达到了 dockerhub 的拉取次数限制而出现的错误，您可以参考下文中的两个办法解决此问题：

-   将镜像托管至 CODING Docker 制品仓库，详情请参考[《快速开始——Docker 制品库》](/docs/artifacts/quick-start/docker.html)

-   使用个人 Dockerhub 账号

若您没有 dockerhub 账号，请[点击前往](https://hub.docker.com)注册账号；

注册完成后修改构建计划配置，在 docker 执行命令前添加此行，填入已注册的账号：

```bash
    docker login -u <dockerhub username> -p <dockerhub password>
    username=$(docker info | sed '/Username:/!d;s/.* //'); 
    echo $username
```
执行时可以在日志查看到正在使用的 dockerhub 账号，若账号符合拉取次数限制条件即可解决此问题。

![](https://help-assets.codehub.cn/enterprise/20210507144801.png)

### [如何自动获取代码 tag 作为制品的版本号？](#version)

`${GIT_TAG}` 是内置的环境变量，设计初衷是为了在配有监听 TAG 触发的构建计划中，监听到 TAG 后获取最新的 TAG 值以保存至变量中，因此只有在通过 TAG 触发构建计划的时候此变量才有参数值，其他的触发方式（手动、定时、远程触发）触发构建时此值为空。



==== 2021/05/07 ====
