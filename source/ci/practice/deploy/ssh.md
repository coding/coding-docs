---
title: Linux 服务器 - CODING 帮助中心
pageTitle: Linux 服务器
pagePrevTitle: 自动部署到 Serverless
pagePrev: ci/deploy/serverless.html
pageNextTitle:  自动上传微信小程序
pageNext: ci/deploy/wechat-miniprogram.html
alias: 
-   devops/ci/deployment.html
-   ci/deploy/ssh.html
---

### 功能介绍

持续集成可简易部署项目到单台 Linux 服务器（多台建议使用「[持续部署](/docs/cd/overview.html)」），步骤如下：

1.  在云计算（比如腾讯云）的网页控制台创建 SSH 密钥对，把私钥录入 CODING 凭据管理，把公钥加载到服务器。也可以使用命令手动创建，把私钥 `id_rsa` 录入 CODING 凭据管理，把公钥 `id_rsa.pub` 的内容复制到服务器的 `~/.ssh/authorized_keys`，参考文档：[《凭据管理》](/docs/project/features/credential.html)；

![腾讯云 创建 SSH 密钥对](https://help-assets.codehub.cn/enterprise/20200415141036.png)
![腾讯云 下载 SSH 私钥](https://help-assets.codehub.cn/enterprise/20200415141056.png)
![腾讯云 服务器 绑定 SSH 公钥](https://help-assets.codehub.cn/enterprise/20200415143856.png)
![CODING 凭据管理 录入 SSH 私钥](https://help-assets.codehub.cn/enterprise/20200410141859.png)

2.  在持续集成中使用下述 `Jenkinsfile`：执行 SSH 进行部署；

### Jenkinsfile

```groovy
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout(
          [$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]],
          userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]]
        )
      }
    }
    stage('构建') {
      steps {
        echo '构建中...'
        // Java Spring Boot Gradle Jar
        // sh './gradlew bootJar'

        // Java Spring Boot Gradle War
        // sh './gradlew bootWar'

        // Java Maven
        // sh 'mvn package'
        // sh 'ls target/'

        // PHP
        // sh 'composer install --optimize-autoloader --no-dev'
        // sh 'tar -zcf /tmp/tmp.tar.gz .'

        // 静态资源
        sh 'tar -zcf /tmp/tmp.tar.gz apache2/ site/'
        echo '构建完成.'
      }
    }
    stage('部署') {
      steps {
        echo '部署中...'
        script {
          // 声明服务器信息
          def remote = [:]
          remote.name = 'web-server'
          remote.allowAnyHosts = true
          remote.host = '106.54.86.239'
          remote.port = 22
          remote.user = 'ubuntu'

          // 把「CODING 凭据管理」中的「凭据 ID」填入 credentialsId，而 id_rsa 无需修改
          withCredentials([sshUserPrivateKey(credentialsId: "c4af855d-402a-4f38-9c83-f6226ae3441c", keyFileVariable: 'id_rsa')]) {
            remote.identityFile = id_rsa

            // SSH 上传文件到远端服务器
            sshPut remote: remote, from: '/tmp/tmp.tar.gz', into: '/tmp/'
            // 解压缩
            sshCommand remote: remote, command: "tar -zxf /tmp/tmp.tar.gz -C /tmp/"
            sshCommand remote: remote, sudo: true, command: "mkdir -p /var/www/example-site"
            sshCommand remote: remote, sudo: true, command: "cp -R /tmp/site/* /var/www/example-site/"
            sshCommand remote: remote, sudo: true, command: "cp -R /tmp/apache2/ /etc/"
            // 重启 apache2
            sshCommand remote: remote, sudo: true, command: "a2ensite example.com"
            sshCommand remote: remote, sudo: true, command: "a2enmod headers rewrite ssl"
            sshCommand remote: remote, sudo: true, command: "systemctl reload apache2"
          }
        }

        echo '部署完成'
      }
    }
  }
}
```

建议服务器关闭密码登录，因为可能会被暴力破解，而只允许 SSH 私钥方式登录，更安全。

如果一定要使用密码登录服务器，则使用下述 `Jenkinsfile` 代码：

```groovy
// 把「CODING 凭据管理」中的「凭据 ID」填入 credentialsId，而 username 和 password 无需修改
withCredentials([usernamePassword(credentialsId: "xxx", usernameVariable: 'username', passwordVariable: 'password')]) {
  remote.user = username
  remote.password = password

  sshPut remote: remote, from: '/tmp/tmp.tar.gz', into: '/tmp/'
}
```


==== 2021/01/27 ====
