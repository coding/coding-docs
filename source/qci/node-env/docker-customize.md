---
title: Docker 镜像定制 - CODING 帮助中心
pageTitle: Docker 镜像定制
sitemap: false
---

若默认 Docker 镜像不满足构建需求，则需要自己定制 Docker 镜像并进行构建。

镜像需要包含 CODING-CI 的 Agent 及执行环境，CODING-CI 会启动镜像，将其作为编译环境使用。

### CODING-CI 编译镜像要点

1.  推荐基础源镜像为csighub.tencentyun.com/qcidocker/qci_base:latest
2.  CODING-CI支持从公司内网、外网Docker仓库拉取镜像，Docker默认仓库为docker.io
3.  如需使用仓库非公开镜像，还需要配置登录认证信息，参见“自定义镜像使用配置示例2”

### 镜像编译步骤

1.  编写Dockerfile，增加自定义环境。可以参考 <https://yeasy.gitbooks.io/docker_practice/content/image/build.html>

2.  使用 `docker build` 命令进行编译
3.  使用 docker push 命令将编译好的镜像上传到指定仓库

### 自定义镜像使用配置示例 1

```yml
version: 2.0

worker:
    docker: qcidocker/qci_base:latest

```

如果是公开镜像，则只需要配置镜像地址即可。示例中使用的是docker.io镜像仓库。

### 自定义镜像使用配置示例 2

```yml
version: 2.0

env:
    DOCKER_USER: my_user_name
    DOCKER_PWD:
      secret: UrcN9ASQyY9nERXWJ19SF5ckAZKUTiMvkI5qT/LLBvKXWJ19SF5ckAZKUTiMvkI5qT/LLBvKKX
      
worker:
    docker: 
        registry: csighub.tencentyun.com
        username: $DOCKER_USER
        password: $DOCKER_PWD
        image: csighub.tencentyun.com/my_user_name/qci_worker:v3
```

在这份配置中，指定了代码仓库地址、镜像地址，以及认证信息。

这些信息都可以放在环境变量中，然后用 `$环境变量名` 的方式进行引用。

环境变量中敏感信息可以加密后配置，加密相关请参考环境变量章节。

### 基础镜像 Dockerfile

```dockerfile
FROM csighub.tencentyun.com/admin/tlinux2.2-bridge-base-tcloud:latest

# install git
RUN rpm --rebuilddb && yum -y install zlib zlib-devel curl perl-ExtUtils-CBuilder perl-ExtUtils-MakeMaker gcc curl-devel expect make wget msgfmt gettext zip unzip \
    && yum -y remove git \
    && yum -y --enablerepo=tlinux-testing install git \
    && git config --global user.email "anonymous" \
    && git config --global user.name "anonymous" \
    && git config --global http.postBuffer 524288000

# install git lfs
RUN rpm --rebuilddb \
    && yum -y --enablerepo=tlinux-testing install git-lfs \
    && git lfs install

# install svn
RUN rpm --rebuilddb && yum install -y subversion

# install python3
RUN rpm --rebuilddb \
    && yum install -y python3 python3-devel

# config pip
RUN echo -e "[global]\nindex-url = https://mirrors.tencent.com/tencent_pypi/simple" > /etc/pip.conf

# upgrade pip
RUN pip3 install -U pip && pip3 install wheel

# install docker
RUN rpm --rebuilddb && yum -y --enablerepo=tlinux-testing install docker-ce-cli

# ENV
ENV PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

# QCI Agent
RUN pip3 install -U qci_worker -i https://mirrors.tencent.com/tencent_pypi/simple
```

==== 2021/10/12 ====
