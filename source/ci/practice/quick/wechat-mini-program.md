---
title: 自动构建微信小程序 - CODING 帮助中心
pageTitle: 自动构建微信小程序
pagePrevTitle: 构建基于 Tensorflow.js 的机器学习应用
pagePrev: ci/practice/quick/tensorflow.html
pageNextTitle: 在构建环境中安装依赖——Go
pageNext: ci/depend/go.html
alias: best-practices/ci/1minute/wechat-mini-program.html
---

做为一个前端开发，在开发微信小程序的时候，我们应该都遇到过这样的场景：

我们双手正在在键盘上飞舞，像写诗一样认真的编写每一行代码，脑海里想着解耦合、设计模式、抽象和分层的时候。突然之间，

产品经理轻轻拍了拍了你肩膀，假装满怀歉意的跟你说：“我需要一个最新测试环境的体验二维码“

于是你端起了印着“和气生财”的马克杯，喝了口水，开始了一波操作

```shell
1. git stash
2. git checkout branch
3. npm install
4. npm build
5. 点击“预览”，生成二维码，发送给对方
```

搞定后，你活动了一下有些许酸疼的手指，切回分支恢复进度，脑海里努力得回忆着刚刚得思路。

这时，测试工程师突然又找你，他也想要一个测试环境的二维码，这时候你又看了看一眼你的马克杯，黯然神伤...

### [概括](#intro)

本文将借助于 CODING 的持续集成，手把手带你实现一个微信小程序的持续集成环境，从构建、发布、通知实现自动化，帮你告别繁琐重复性的劳动，解决黯然神伤的烦恼。

整个实现流程大致如下:

1.  创建 CODING DevOps 项目

2.  创建构建计划，配置微信小程序代码上传白名单

3.  配置微信小程序代码上传私钥到环境变量中

4.  配置企业微信的 webhook 地址到环境变量中

5.  配置构建计划，分为 4 个步骤（检出、编译、上传新版本、发送通知）

下面我们来一步步实现它。

### [前置准备](#prerequisite)

*   [CODING DevOps 项目](/docs/start/project.html)
*   具有管理员权限的微信小程序账号
*   企业微信机器人 WebHook 地址
-   将[示例仓库](https://coding-public.coding.net/public/miniproram/miniproram/git/files)导入至 CODING 代码仓库中

### 设置小程序白名单

此过程需要将构建任务的网络出口 IP 添加至小程序开发白名单中，你可以在构建计划的「基本信息」中获取出口 IP。

![](https://help-assets.codehub.cn/enterprise/20211126151759.png)

```text
# 中国上海
111.231.92.100/32,81.68.101.44/32

# 中国香港
124.156.164.25/32,119.28.15.65/32

# 美国硅谷
170.106.136.17/32,170.106.83.77/32

```

前往微信小程序的管理后台，点击左侧菜单栏中的开发 -> 开发者设置 -> 小程序代码上传 -> 编辑 IP 白名单，添加需要的出口地址。

![](https://help-assets.codehub.cn/enterprise/20211126152329.png)

### 创建构建计划

在「持续集成」中新建构建计划，选择「自定义构建过程」模板。

![](https://help-assets.codehub.cn/enterprise/20211126154450.png)

在配置详情中参考 Jenkinsfile 编写构建过程。

#### Jenkinsfile

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
    stage('构建') {
        steps {
          echo '开始安装依赖'
          sh 'npm install'
          echo '开始构建...'
          sh 'npm run build'
          echo '构建完成'
        }
    }
    stage('上传新版本') {
        steps {
          withCredentials([sshUserPrivateKey(credentialsId: "${env.privatekey}",keyFileVariable: 'identity')]) {
            sh 'node upload.js -p ${identity}'
          }
        }
    }
    stage('发送新版本通知') {
        steps {
            sh 'node notification.js -u ${WECHAT_WEBHOOK}'
        }
    }
  }
}
```

### 添加环境变量

持续集成过程中，我们总会将一些配置（如：账号密码/版本号等）信息以环境变量的形式注入到构建过程中。在本实践中需要将以下两个凭据以环境变量的形式添加至构建计划中。

*   微信小程序代码上传私钥

*   企业微信机器人 webhook 地址

#### 微信小程序代码上传私钥

前往微信管理后台：开发 -> 开发设置 -> 小程序代码上传获取上传私钥与 AppID。

![](https://help-assets.codehub.cn/enterprise/20211126163307.png)

将信息导入至 CODING 项目中的 项目设置 -> 开发者选项 -> 凭据管理 -> 录入凭据 -> 选择 SSH 私钥凭据类型，复制私钥内容粘贴至凭据中。CODING 会对您的私钥进行加密保存，杜绝明文暴露在工程文件中。同时还需要勾选「授权所有持续集成构建计划」。

![](https://help-assets.codehub.cn/enterprise/20211126164214.png)

创建完成后将生成一串凭据 ID，将其导入至变量与缓存中。

![](https://help-assets.codehub.cn/enterprise/20211126170204.png)

#### 上传机器人 webhook

新建[群聊机器人](/docs/project-settings/service-hook/wecom-robot.html)后，复制机器人的 webhook 地址后，以字符串的形式粘贴至「变量与缓存」中。

![](https://help-assets.codehub.cn/enterprise/20211126172524.png)

### 构建阶段细节

示例项目的代码是从微信开发者工具中抽离的关于小程序/小游戏项目代码的编译模块。开发者可不打开小程序开发者工具，独立使用已导入的示例仓库进行小程序代码的上传、预览等操作。

在上文中，我们将小程序上传代码的凭证加到环境变量，通过在 Jenkinsfile 定义 `withCredentials` 参数即可快速提取凭证。

提取到凭证后，调用了一个 upload.js 脚本。此部分代码涉及到了代码的上传和预览二维码的生成。

```JS
const ci = require('miniprogram-ci')
const path = require('path');
const fs = require("fs");
const argv = require('minimist')(process.argv.slice(2));
const package = require('./package.json')
const appDirectory = fs.realpathSync(process.cwd());
const ProjectConfig = require('./dist/project.config.json');
const previewPath = path.resolve(appDirectory, './preview.jpg');


(async () => {
    try {
        const project = new ci.Project({
            appid: ProjectConfig.appid,
            type: "miniProgram",
            projectPath: path.resolve(appDirectory, './dist'),
            privateKeyPath: argv.p,
            ignores: ["node_modules/**/*"],
        })
        await ci.upload({
            project,
            version: package.version,
            desc: package.versionDesc,
            setting: {
                ...ProjectConfig.setting
            },
            onProgressUpdate: console.log,
        })
        await ci.preview({
            project,
            version: package.version,
            desc: package.versionDesc,
            qrcodeFormat: "image",
            qrcodeOutputDest: previewPath,
            setting: {
                ...ProjectConfig.setting
            },
            onProgressUpdate: console.log,
        })
    } catch (e) {
        console.error(e);
        process.exit(1);
    }

})()
```


## 通知阶段

原理为直接发送请求，触发 webhook 后将发送预览二维码。关于企业微信 API 的可查看这里[企业微信文档](https://work.weixin.qq.com/api/doc/90000/90136/91770)。

```JS
const md5File = require('md5-file')
const axios = require('axios');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());

const previewPath = path.resolve(appDirectory, './preview.jpg');


function sendQrCode (imageBase64, hash) {
    return axios({
        headers: { "Content-Type": 'application/json' },
        method: 'post',
        url: argv.u,
        data: {
            "msgtype": "image",
            "image": {
                "base64": imageBase64,
                "md5": hash
            }
        }
    });
}

(async () => {
    try {
        const imageData = fs.readFileSync(previewPath);
        const hash = md5File.sync(previewPath)
        const imageBase64 = imageData.toString("base64");
        await sendQrCode(imageBase64, hash);
      
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
})()
```

当我们把代码上传，发布新版本之后，就会往企业微信群上发送一个预览二维码，通知群上的同事进行预览体验

![](https://help-assets.codehub.cn/enterprise/20200929155925.png)

### [更多扩展](#more)

版本号和版本说明没有集中管理，目前是读取 `package.json` 文件里的 `version` 和 `versionDesc` 参数。若需要进行版本控制，可以尝试通过 CODING 代码仓库的 tag 来管理版本，同时配置通过 tag 来触发构建。

==== 2021/11/26 ====
