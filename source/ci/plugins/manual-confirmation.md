---
title: 人工确认 - CODING 帮助中心
pageTitle: 人工确认
pagePrevTitle: 持续集成的构建快照
pagePrev: ci/snapshot.html
pageNextTitle: 通用报告收集
pageNext: ci/plugins/html-report.html
alias: devops/ci/plugins/manual-confirmation.html
---

### 功能介绍

在构建任务里的流程配置中加入人工确认步骤，便可以指定确认者和编排自定义表单。设置完成后，当持续集成运行至相应的阶段后将会暂停构建，而后通知确认者，待完成确认后方才进行下一步构建过程。目前支持可视化编排和文本编辑配置两种方式开启人工确认。

### 可视化编排

在【持续构建】->【流程配置】->【阶段设置】中点击开启人工确认并完成相应的功能设置。

![](https://help-assets.codehub.cn/enterprise/20200331153116.png)

填写自定义功能表单，具体参数说明[点此访问](/docs/ci/plugins/manual-confirmation.html#参数说明)。

![](https://help-assets.codehub.cn/enterprise/20200331153207.png)

在并行阶段中也支持添加人工确认。

![](https://help-assets.codehub.cn/enterprise/20200331153622.png)

### 文本编辑配置

在【持续集成】->【流程配置】->【文本编辑器】中填写相关配置。

#### 快速开始

```groovy
pipeline {
    agent any
    stages {
        stage('人工确认演示') {
            input {
                message "是否继续执行构建"
            }
            steps {
                echo "Hello World"
            }
        }
    }
}
```

#### 阶段中的语法演示

```groovy
pipeline {
    agent any
    stages {
        stage('人工确认演示') {
            input {
                message '是否继续执行构建'
                submitter 'coding@coding.com,tester@coding.com'
                parameters {
                    string(name: 'tag', defaultValue: '20191111.1', description: '请输入希望发布的版本号')
                    choice(name: 'testing_env', choices:['testing-1','testing-2','testing-3'], description: '请选择要部署测试环境')
                    booleanParam(name: 'qa', defaultValue: false, description: '测试是否通过')
                }
            }
            steps {
                echo "您希望发布的版本号为 ${tag}"
                echo "您希望部署的测试环境为 ${testing_env}"
                echo "本地测试是否通过: ${qa}"
            }
        }
    }
}
```

#### 步骤中的语法演示

```groovy
pipeline {
    agent any
    stages {
        stage("人工确认演示") {
            steps {
                input  (
                    message: '是否继续执行构建', 
                    submitter: 'coding@coding.com,tester@coding.com',
                    parameters:[
                        string(name: 'tag', defaultValue: '20191111.1', description: '请输入希望发布的版本号'),
                        choice(name: 'testing_env', choices:['testing-1','testing-2','testing-3'], description: '请选择要部署测试环境'),
                        booleanParam(name: 'qa', defaultValue: false, description: '测试是否通过'),
                    ]
                ) 
                echo "您希望发布的版本号为 ${tag}"
                echo "您希望部署的测试环境为 ${testing_env}"
                echo "本地测试是否通过: ${qa}"
            }          
        }
    }
}
```

### 参数说明

#### 基础参数

参数名称 | 必填 |  文本参数类型 | 图形化参数类型 | 默认值 | 说明
:----------- | :----------- | :----------- | :----------- | :----------- | :-----------
 message       |     是   |  string | string |  -    | 人工确认的描述信息，将会显示在人工确认的界面上。
 submitter  |    否    | string | 项目成员（多选） |  -   | 人工确认的确认者，只有指定的确认者或项目管理员才能操作，多个确认者以逗号分隔, 如: ZhangSan,LiSi。 支持填写项目内用户的邮箱或 GK （项目外或者不存在成员，会添加无效）。
 parameters | 否 |  -  | 自定义人工确认表单，目前支持 `字符串 / 单选 / 布尔值` 三种类型， 表单的值在确认后将会以 Jenkinsfile 变量的形式注入到环境中。

#### 确认者的具体规则说明

-   非必填项
-   会通知确认者前往对应的构建任务页面进行操作
-   只有选定的确认者和项目管理员才能对人工确认步骤进行确认操作
-   若没有配置确认者，则会自动向触发者发送通知提醒
-   若没有配置确认者，则项目内所有成员均可以进行操作

  
#### parameters - string 字符串类型

参数名称 | 是否必填 | 默认值 | 说明
:----------- | :----------- | :----------- | :-----------
 name       |     是   |    -    |  参数名称，表单的值在确认后将会以 Jenkinsfile 变量的形式注入到环境中
 defaultValue  |    否    |  -   | 单表的默认值
 description | 否 |  -  | 参数说明，用于显示在人工确认的界面上辅助说明
 
 
 
#### parameters - choice  单选类型

参数名称 | 是否必填 | 默认值 | 说明
:----------- | :----------- | :----------- | :-----------
 name       |     是   |    -    |  参数名称，表单的值在确认后将会以 Jenkinsfile 变量的形式注入到环境中
 defaultValue  |    否    |  -   | 单表的默认值
 description | 否 |  -  | 参数说明，用于显示在人工确认的界面上辅助说明
 
 
#### parameters - booleanParam 布尔值类型
  
参数名称 | 是否必填 | 默认值 | 说明
:----------- | :----------- | :----------- | :-----------
 name       |     是   |    -    |  参数名称，表单的值在确认后将会以 Jenkinsfile 变量的形式注入到环境中
 defaultValue  |    否    |  -   | 单表的默认值
 description | 否 |  -  | 参数说明，用于显示在人工确认的界面上辅助说明
 
### [设置超时时间](#ttl)

使用「限时子步骤」插件，在子步骤中添加「人工确认」，即可自定义超时时间。

![](https://help-assets.codehub.cn/enterprise/20210929101544.png)

```groovy
stage('先审后发') {
      steps {
        timeout(time: 5, activity: false, unit: 'MINUTES') {
          input(message: '是否继续执行构建', submitter: 'support@coding.net')
        }
        //sh 'coscmd upload -r ./dist /'
      }
    }
```

### [常见问题](#faq)

**Q：人工确认会有超时的限制么？**

A：有超时的限制。使用 CODING 提供的云主机所执行的持续集成任务都会受到团队配额的超时时间限制。如果执行期间超过配额的时间，将自动停止掉构建任务。若使用了[自定义构建节点](/docs/ci/node/overview.html#自定义构建节点)，则不受团队配额的时间限制。

**Q：如何使用人工确认的方式来进行 Debug ?**

A：可以使用如下配置命令进行调试。

```groovy
pipeline {
    agent any
    stages  {
        stage("debug") {
            steps {
                script {
                   while (true) {
                        def cmd = input (
                            message: '请输入想要执行的命令', 
                            parameters: [
                                string(defaultValue: '', description: '', name: 'cmd')
                            ])
                        try {
                            // 若输入为 exit ， 则退出 Debug
                            if (cmd == "exit") {
                                break
                            }
                            sh "${cmd}"
                        } catch (e) {
                            print e
                        }
                   }
                   echo 'hello world'
                }
                    
            }
        }
    }
}
```

==== 2021/10/08 ====
