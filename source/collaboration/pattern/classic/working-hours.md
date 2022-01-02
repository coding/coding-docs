---
title: 工时统计 - CODING 帮助中心
pageTitle: 工时统计
pagePrevTitle: 阻塞关系
pagePrev: collaboration/pattern/classic/blocking.html
pageNextTitle: 跟踪进度
pageNext: collaboration/pattern/classic/track.html
alias: collaboration/customize/working-hours.html
---

当团队在进行协作时，往往对事项的工作时间有所要求，CODING 支持在创建事项（需求、任务、缺陷）时设置预估工时，并在创建完成后进行记录工时、登记任务进度等操作。通过填写使用工时（已经工作的时间）和预计剩下的工时，系统将自动生成完整的工时记录，有助于团队在迭代结束后进行复盘与效率分析。下文将以需求为例，演示如何设置并编辑「工时」。

![](https://help-assets.codehub.cn/enterprise/20210628145616.png)

### [预估工时](#predict)

创建事项时，可以在右侧「预估工时」内填写该事项的预估工作时间，单位为小时（必须小于 10000，最多保留 2 位小数）。

![](https://help-assets.codehub.cn/enterprise/20210628155907.png)

### [登记工时](#register)

1.  在事项详情页中，可以在右侧「工时记录」中登记工时。

![](https://help-assets.codehub.cn/enterprise/20210628162010.png)

2.  在「登记工时」详情页中，可以输入或修改已使用工时，剩余工时将会实时增减，也可以手动修改剩余工时。

![](https://help-assets.codehub.cn/enterprise/20210628162541.png)

3.  开始时间默认为当前时间，你也可以根据实际情况进行修改，可以精确到分钟。

![](https://help-assets.codehub.cn/enterprise/20210628164027.png)

4.  工作描述非必填，你可以简要概括描述所做工作，以便迭代结束后进行复盘。

![](https://help-assets.codehub.cn/enterprise/20210628164302.png)

5.  填写完毕并「确定登记」后，将会更新事项的剩余工时，并自动在「工时日志」中新增记录。

![](https://help-assets.codehub.cn/enterprise/20210628164737.png)

### [进度统计](#progress)

在创建事项或事项详情页内，可以在右侧「进度」中，填写数据，对事项进度进行调整。注意，若在需求内含有子事项，则当前进度不可修改，进度由以下公式自动计算：父事项进度= SUM(直接子事项进度) ÷ SUM(直接子事项数)。

![](https://help-assets.codehub.cn/enterprise/20210628174008.png)

#### [进度自动更新](#automatically-update )

进度统计支持当事项流转至「已完成」时，进度自动更新为 100%。需要在「项目设置」->「项目协同」中，对需求/任务的「工作流」分别进行配置。在「配置规则」中选择「更改属性值」，将当前步骤设置为「任何状态 -> 已完成」，将更改的属性设置为「进度」，填写进度为「100」，应用配置后即可实现进度自动更新。

*注意：仅有开启「管理权限」的用户组成员才能修改或添加自定义状态。详情可查阅[《自定义工作流》](/docs/collaboration/customize/workflow.html)。*

![](https://help-assets.codehub.cn/enterprise/20210707164733.png)

### [管理工时日志](#management)

#### [查看工时日志](#check)

可以在「工时记录」中选择「查看工时日志」，可以在事项详情页「活动/工时日志」中切换。工时日志内展示了当前事项工时记录的历史操作，根据登记工时内填写的「开始时间」排序，登记工时的成员、开始时间、实际工时、工作描述一目了然。

![](https://help-assets.codehub.cn/enterprise/20210628170350.png)

#### [删除工时日志](#delete)

1.  工时日志可以被该日志的登记成员删除。在「工时日志」中，选择指定日志的下方「删除」选项。

![](https://help-assets.codehub.cn/enterprise/20210628171018.png)

2.  删除时需要选择是否调整剩余工时，若勾选，剩余工时中将会加上删除工时。
例如：删除日志内已登记 69 小时，剩余工时 26.92 小时。若勾选「调整剩余工时」，则剩余工时将更新为 26.92+69=95.92 小时；若不勾选，则剩余工时仍为 26.92 小时。

请注意，记录删除后不可恢复，请谨慎操作。

![](https://help-assets.codehub.cn/enterprise/20210628172206.png)

![](https://help-assets.codehub.cn/enterprise/20210628172249.png)

==== 2021/07/02 ====
