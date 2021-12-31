---
title: 接入自动化工具 - CODING 帮助中心
pageTitle: 接入自动化工具
pagePrevTitle: API 文档管理
pagePrev: management/api/start.html
pageNextTitle: OpenAPI 导入指南
pageNext: management/api/openapi.html
alias: management/api/automation.html
---

CODING API 文档支持接入 3 种自动化方式发布文档，分别是使用[持续集成](#CI)、[Docker](#Docker) 与 [cURL](#cURL) 接入。推荐使用接入 CODING 持续集成（CI）的自动化方式，因为此方式简化了繁琐步骤，能够大幅降低人工发布所耗费的精力，通过简单配置或编码即可快速接入团队的流水线中。

![](https://help-assets.codehub.cn/enterprise/%E6%8E%A5%E5%85%A5%201.png)

### [持续集成](#CI)

CODING 持续集成模板目前支持以下注释生成工具：

-   Java Springfox
-   apidocjs
-   Postman
-   PHP Swagger-PHP
-   PHP L5-Swagger
-   其他 Swagger API 数据文件
-   自定义构建过程

下文将会以 Springfox 为例，演示如何使用代码自动构建自动化发布 API 文档

![](https://help-assets.codehub.cn/enterprise/%E6%8E%A5%E5%85%A5%202.png)

#### 克隆代码

首先需要克隆该开源 [Springfox 代码仓库](https://demo-api.coding.net/public/demo-codes/springfox/git/files)至您的项目中，下文用于演示的 「springfox」代码仓库便是基于此开源代码。

![](https://help-assets.codehub.cn/enterprise/%E6%8E%A5%E5%85%A5%203.png)

#### 配置持续集成

1.  通过 API 文档内的「自动化发布」->「快速接入 CI」，或持续集成功能中的「构建计划」->「创建构建计划」->「API 文档」，即可到达 API 文档构建计划创建页。

![](https://help-assets.codehub.cn/enterprise/%E6%8E%A5%E5%85%A5%204.png)

2.  选择 Springfox 模板，填写构建计划名称，选择「springfox」仓库。

![](https://help-assets.codehub.cn/enterprise/%E6%8E%A5%E5%85%A5%205.png)

勾选拟发布至的 API 文档 ID，若未创建过 API 文档，可选择「创建 API 文档」，填写文档标题和地址后完成创建。其余选项按需设置即可。

![](https://help-assets.codehub.cn/enterprise/%E6%8E%A5%E5%85%A5%206.png)

#### Jenkinsfile 参考

```groovy
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: env.GIT_BUILD_REF]],
          userRemoteConfigs: [[
            url: env.GIT_REPO_URL,
            credentialsId: env.CREDENTIALS_ID
          ]]])
        }
      }
      stage('发布 API 文档') {
        steps {
          codingReleaseApiDoc(apiDocId: env.API_DOC_ID, apiDocType: env.API_DOC_TYPE, cmd: env.API_DOC_COMMAND, resultFile: env.API_DOC_RESULT_FILE, scanDir: env.API_DOC_SCAN_DIR)
        }
      }
    }
  }
```

若希望使用 apidoc.js 生成内容并通过 resultFile 挂载，可以参考以下持续集成配置命令：

```groovy
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: GIT_BUILD_REF]],
          userRemoteConfigs: [[
            url: GIT_REPO_URL,
            credentialsId: CREDENTIALS_ID
          ]]])
        }
      }
      stage('发布 API 文档') {
        steps {
          sh 'node -v'
          sh 'yarn -v'
          sh 'yarn global add apidoc@0.29.0 && apidoc -i ./ -o /apidoc_result2 && ls /apidoc_result -al'
          codingReleaseApiDoc(apiDocId: env.API_DOC_ID, apiDocType: env.API_DOC_TYPE, cmd: '', resultFile: '../../apidoc_result/api_data.json', scanDir: '', postmanToken: '', postmanUid: '')
        }
      }
    }
  }
```

在环境变量中填写以下信息：

![](https://help-assets.codehub.cn/enterprise/20211027173706.png)

> 需确保在终端中和持续集成配置中所设定的导出 `swagger.json` 文件路径一致。

#### 运行持续集成

持续集成任务配置完成并创建后，系统即刻开始自动构建，可通过「详情」查看构建进度。

![](https://help-assets.codehub.cn/enterprise/%E6%8E%A5%E5%85%A5%207.png)

![](https://help-assets.codehub.cn/enterprise/%E6%8E%A5%E5%85%A5%208.png)

构建成功后，可前往 API 文档页中查看发布后的文档地址。

![](https://help-assets.codehub.cn/enterprise/%E6%8E%A5%E5%85%A5%209.png)

### 使用 Docker/cURL 接入

#### 准备

接入自动化工具需要用到「CODING 开放 API」的能力，而后者需要授权才可访问，所以需要您先开通“项目访问令牌（推荐）”或者“个人访问令牌”。

> 为了区分人工和自动化的操作，建议使用项目访问令牌，并为 API 文档开通专用访问令牌。

##### 开通项目访问令牌

前往「项目设置」->「开发者选项」->「项目令牌」->「新建项目令牌」，其中管理权限请勾选「API 文档」，信息填写完成后即可新建访问令牌。

![](https://help-assets.codehub.cn/enterprise/%E6%8E%A5%E5%85%A5%2010.png)

![](https://help-assets.codehub.cn/enterprise/%E6%8E%A5%E5%85%A5%2011.png)

##### 获取令牌用户名与密码

在「项目令牌」页可管理现有项目令牌，选择「查看密码」并通过身份验证后，即可获取令牌用户名和令牌密码（token），我们需要用到「令牌密码」，复制后备用。

![](https://help-assets.codehub.cn/enterprise/%E6%8E%A5%E5%85%A5%2012.png)

##### 准备合规的 API 数据

CODING API 文档目前支持符合 OpenAPI / Postman / apiDoc 这 3 种规范下的 YAML 或者 JSON 格式的 API 数据。例如这是 OpenAPI 规范下 YAML 格式的 API 数据：

```yaml
openapi: 3.0.0
info:
  title: Sample API
  description: Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.
  version: 0.1.9
servers:
  - url: http://api.example.com/v1
    description: Optional server description, e.g. Main (production) server
  - url: http://staging-api.example.com
    description: Optional server description, e.g. Internal staging server for testing
paths:
  /users:
    get:
      summary: Returns a list of users.
      description: Optional extended description in CommonMark or HTML.
      responses:
        '200':    # status code
          description: A JSON array of user names
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string
```

#### [Docker](#Docker)

[Docker](https://docker.com/) 是一种轻量级的虚拟化技术，是一种 Linux 容器（Linux Containers，缩写为 LXC）技术的封装。为了帮助您更方便地上传 API 数据，CODING 提供了 Docker 镜像【[apidoc-publisher](https://hub.docker.com/r/ecoding/apidoc-publisher)】来实现 API 数据的上传，相较于 cURL 方式更易懂，操作更加方便。

##### 环境变量

| 环境变量            | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| ACCESS_TOKEN        | {访问令牌}                                                   |
| APIDOC_TEAM         | 企业域名，若企业首页地址为：[https://abc.coding.net](https://abc.coding.net/)， 则企业域名即为 abc |
| APIDOC_PROJECT      | 项目地址名称，若项目首页地址为：[https://abc.coding.net/p/xyz](https://abc.coding.net/p/xyz)， 则项目地址名称即为 xyz |
| APIDOC_ID           | API 文档资源 ID，若选中文档详情地址为：[https://abc.coding.net/p/xyz/api-docs/1](https://abc.coding.net/p/xyz/api-docs/1)， 则 ID 即为 1 |
| APIDOC_RELEASE_TYPE | 传输内容形式：content 为文本形式，file 上传文件形式          |
| APIDOC_CONTENT      | {API 数据内容}                                               |

##### 发布 API 文档

Docker 方式支持【文本】和【上传文件】 2 种形式发布 API 文档，更推荐您使用【上传文件】形式。

###### 上传文件形式发布

上传文件形式需要指定 APIDOC_RELEASE_TYPE 为 file，并挂载 API 数据文件的目录至容器的 /opt 目录中，其中 API 数据必须保存在名为 data.txt 的文件中。请将以下命令中的环境变量替换为您的真实数据，无需保留花括号，并在终端内执行：

```dockerfile
docker run -it --rm \
  -e ACCESS_TOKEN={访问令牌} \
  -e APIDOC_TEAM={企业域名} \
  -e APIDOC_PROJECT={项目地址名称} \
  -e APIDOC_ID={API 文档资源 ID} \
  -e APIDOC_RELEASE_TYPE=file \
  -v {API 数据文件路径}/data.txt:/opt/data.txt \
  ecoding/apidoc-publisher
```


例如以下命令：

```dockerfile
docker run -it --rm \
    -e ACCESS_TOKEN=token \
    -e APIDOC_TEAM=codingcorp \
    -e APIDOC_PROJECT=code-repo \
    -e APIDOC_ID=2 \
    -e APIDOC_RELEASE_TYPE=file \
    -v /c/Workspace/code-repo/data.txt:/opt/data.txt \
    ecoding/apidoc-publisher
```

操作演示截图仅做参考，终端返回 `api doc success` 即为发布成功，可在文档管理页面查看更新动态：

![img](https://help-assets.codehub.cn/enterprise/20191008043757.png)

###### 文本形式发布

文本形式需要指定 APIDOC_RELEASE_TYPE 为 content，并在命令中传入 API 数据内容，其中 API 数据要以单引号括起来。请将以下命令中的环境变量替换为您的真实数据，无需保留花括号，并在终端内执行：

```dockerfile
docker run -it --rm \
  -e ACCESS_TOKEN={访问令牌} \
  -e APIDOC_TEAM={企业域名} \
  -e APIDOC_PROJECT={项目地址名称} \
  -e APIDOC_ID={API 文档资源 ID} \
  -e APIDOC_RELEASE_TYPE=content \
  -e APIDOC_CONTENT='{API 数据内容}' \
  ecoding/apidoc-publisher
```

例如以下命令：

```dockerfile
docker run -it --rm \
    -e ACCESS_TOKEN=token \
    -e APIDOC_TEAM=codingcorp \
    -e APIDOC_PROJECT=code-repo \
    -e APIDOC_ID=2 \
    -e APIDOC_RELEASE_TYPE=content \
    -e APIDOC_CONTENT='openapi: 3.0.0
info:
  title: Sample API
  description: Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.
  version: 0.1.9
servers:
  - url: http://api.example.com/v1' \
    ecoding/apidoc-publisher
```

操作演示截图仅做参考：
![img](https://help-assets.codehub.cn/enterprise/20191008045125.png)

#### [cURL](#cURL)

**cURL** 是一个利用 URL 语法在命令行下工作的文件综合传输工具，支持文件上传和下载。使用 cURL 可以在命令行模式下将 API 数据轻松上传至 CODING。

CODING API 文档提供了 `API 发布`  的接口，可以上传 API 数据更新 API 文档，支持文件上传或以文本形式传输 API 数据，接口地址：

```json
POST https://{team}.coding.net/api-docs/open/api/v1/projects/{project}/docs/{id}/releases
```

##### 路由参数

| 参数    | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| team    | 企业域名，若企业首页地址：`https://abc.coding.net`， 则企业域名即为 abc |
| project | 项目地址名称，若项目首页地址：`https://abc.coding.net/p/xyz`， 则项目地址名称即为 xyz |
| id      | API 文档资源 ID，若选中文档详情地址为：`https://abc.coding.net/p/xyz/api-docs/1`， 则 ID 即为 1 |

###### Header

| 参数          | 描述                                                 |
| ------------- | ---------------------------------------------------- |
| Authorization | 授权信息，此处填写访问令牌，格式为：token {访问令牌} |

###### 请求参数/Body

-   文本形式

  可直接将 API 数据内容字符串传给服务端，API 数据内容支持 OpenAPI、Postman、Apidoc，格式支持 JSON、YAML。

  | 参数    | 描述                                  |
  | ------- | ------------------------------------- |
  | content | API 数据内容，如 OpenAPI 描述文件内容 |
  
  范例：

  ```json
  curl -X POST -H "Authorization: token {访问令牌}" -H "Accept:application/json" https://{team}.coding.net/api-docs/open/api/v1/projects/{project}/docs/{id}/releases \
    -F "content={API 数据内容}"
  ```



-   上传文件

  可将生成的 API 数据文件直接上传至服务端，支持内容及格式与文本形式一致。

  | 参数 | 描述                                     | 支持格式   | 最大文件大小 |
| ---- | ---------------------------------------- | ---------- | ------------ |
  | file | API 数据文件路径，如：/data/api_data.yml | yml / json | 5MB          |
  
  范例：

  ```json
curl -X POST -H "Authorization: token {访问令牌}" -H "Accept:application/json" https://abc.coding.net/api-docs/open/api/v1/projects/xyz/docs/2/releases \
    -F "filename=@{API 数据文件路径}"
  ```

==== 2021/05/24 ====
