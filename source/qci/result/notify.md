---
title: 结果通知 -CODING 帮助中心
pageTitle: 结果通知
pagePrevTitle: 持续集成简介
pagePrev: qci/intro/ci.html
pageNextTitle: 快速开始
pageNext: ci/start.html
sitemap: false
---

### 介绍

CODING-CI支持任务运行完成时向指定的人员发送任务结果通知。可以配置多种通知渠道、快速选择任务相关人员、
、追加自定义的通知内容、配置发送的条件、配置多条和自由组合不同的通知方式及通知人，
这些功能可以轻松配置用户理想的通知场景。

现已经支持的通知渠道：

 -邮件
 -短信
 -微信
 -企业微信Tips
 -企业微信群
 
### 配置

可以在任务配置页面的第三个页签配置任务通知：

单条通知配置记录如下：

![](https://help-assets.codehub.cn/enterprise/20211026142906.png)

一个任务可以同时配置多条通知记录，点击通知下方的添加按钮可以继续添加通知配置项，用于组合不同渠道、不同通知条件和不同的通知人。

### 注意事项

 -勾选企业微信群，需要输入企业微信群号，会将通知内容发送至企业微信群，群号获取方法：
 
   已有群：
   
   方法一：
   
   拉"Coding Bot"公共账号进群后，@Coding Bot 发送“群号”后，"Coding Bot"会自动回复该群的群号
   
   方法二：
   
   PC端企业微信，同时按Ctrl+Shift+Alt+D（mac: ctrl+shift+command+D），再右键选中企业微信左侧的群，
   选择"复制并显示room id"，粘贴后取出数字部分，在前面加上"ww"即为群号，
   已有群需要将"Coding Bot"公共账号拉进群才能发送消息
   
   新拉群：群号可以不填，保存后接下来的任务第一次运行完成时，会根据勾选的发送人新拉一个群，并自动填入群号
   
   企业微信群号支持用分号(```;```)分隔多个企业微信群号

 -勾选指定人，可以配置额外的知会人的企业微信名(支持用分号分隔多个人)，发送邮件时会抄送配置的知会人，其他通知方式正常通知

 -支持配置发送条件，可以分别成功、失败时的发送模式，可以选择总是发送、不发送或者结果发生变化时发送
 
 -同一个任务的多条通知记录的相同人员不去重，所以需要配置多条通知时，避免同一个渠道通知同样的人
 
 -可以填入自定义通知内容，通知内容会追加到CODING-CI的内容模版上
 
   通知内容支持${}格式的环境变量，如：${QCI_TRIGGER}
 
   发送邮件时支持自定义html样式，发送其他方式时会自动剔除html标签
   
   邮件内容和企业微信群支持markdown格式，对于企业微信群消息，只支持markdown的子集，详细结果请参考 [企业微信消息类型及数据格式](https://work.weixin.qq.com/api/doc#14404/markdown%E7%B1%BB%E5%9E%8B)
 
   例如：
   
   企业微信支持markdown（子集）格式：
   
   ```
    ### 你好！世界    
    ${QCI_TRIGGER}
    <font color="info">绿色</font>
   ```
   
   效果如下：
   
![](https://help-assets.codehub.cn/enterprise/20211026143025.png)
   
   邮件中可使用html格式或markdown格式：
   
   ``` 
    本次由<span style="color:red">${QCI_TRIGGER}</span>启动
   ```
   
   foxmail支持```<font color="info">```标签， outlook中需要加上class ```<font color="info" class="info">```


==== 2021/08/04 ====
