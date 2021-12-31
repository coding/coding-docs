---
title: 在持续集成中使用 SSH - CODING 帮助中心
pageTitle: 在持续集成中使用 SSH
pagePrevTitle: Jenkins when 条件判断
pagePrev: ci/practice/jenkins-when.html
pageNextTitle: 在持续集成中使用 dotnet 工具
pageNext: ci/practice/net-core.html
alias: devops/ci/practice/ssh.html
---

### [功能介绍](#intro)

在持续集成中执行构建时，您可能需要通过 SSH 协议登录到一个远端服务器以执行必要的脚本或者指令。您可以在「持续集成」构建计划设置中的「流程配置」使用文本编辑器填入相关命令。

### [如何使用 SSH 相关指令](#ssh-commands)

CODING 持续集成中支持您通过 SSH 命令操作远端服务器。

-   sshCommand：在远端机器执行指定命令
-   sshPut：将当前工作空间的文件/目录放置到远端机器
-   sshGet：从远端机器获取文件/目录到当前工作空间
-   sshScript：读取本地 shell 脚本，在远端机器执行，而不是执行远端机器上的脚本，否则将会报错：「does not exists」。
-   sshRemove：将远端机器的某个文件/目录移除

例如，下文将演示如何通过账号 + 密码连接远端机器并执行 SSH 相关命令，Jenkinsfile 配置示例如下：

```groovy
def remote = [:]
remote.name = "node"
remote.host = "node.abc.com"
remote.allowAnyHosts = true

node {
    withCredentials([usernamePassword(credentialsId: 'sshUserAcct', 
        passwordVariable: 'password', usernameVariable: 'userName')]) {
        remote.user = userName
        remote.password = password

        stage("SSH Steps Rocks!") {
            writeFile file: 'test.sh', text: 'ls'
            sshCommand remote: remote, 
                command: 'for i in {1..5}; do echo -n \"Loop \$i \"; date ; sleep 1; done'
            sshScript remote: remote, script: 'test.sh'
            sshPut remote: remote, from: 'test.sh', into: '.'
            sshGet remote: remote, from: 'test.sh', into: 'test_new.sh', override: true
            sshRemove remote: remote, path: 'test.sh'
        }
    }
}
```

### [如何使用 SSH 连接到远端服务](#ssh-remote)

除了上述示例通过账号 + 密码连接远端服务外 ，您还可以通过 SSH 私钥来连接到远端服务，Jenkinsfile 配置示例如下：

```groovy
def remote = [:]
remote.name = "node"
remote.host = "node.abc.com"
remote.allowAnyHosts = true

node {
    withCredentials([sshUserPrivateKey(credentialsId: 'sshUser', keyFileVariable: 'identity')]) {
        // ssh 登陆用户名
        remote.user = 'root'
        // 私钥文件地址
        remote.identityFile = identity
        stage("SSH Steps Rocks!") {
            writeFile file: 'abc.sh', text: 'ls'
            sshCommand remote: remote, 
                command: 'for i in {1..5}; do echo -n \"Loop \$i \"; date ; sleep 1; done'
            sshPut remote: remote, from: 'abc.sh', into: '.'
            sshGet remote: remote, from: 'abc.sh', into: 'bac.sh', override: true
            sshScript remote: remote, script: 'abc.sh'
            sshRemove remote: remote, path: 'abc.sh'
        }
    }
}
```

### [拓展阅读](#more)

-   想要了解更多 Jenkinsfile 中关于 SSH 命令的内容，您可以查看 [Jenkins 官方帮助文档](https://jenkins.io/doc/pipeline/steps/ssh-steps/)

-   想要了解更多 Jenkins 的 SSH 插件相关内容，您可以查看该插件的[官方主页](https://github.com/jenkinsci/ssh-steps-plugin)


==== 2021/11/22 ====
