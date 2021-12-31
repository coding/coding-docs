---
title: 通用变量 - CODING 帮助中心
pageTitle: 通用变量
pagePrevTitle: 持续集成简介
pagePrev: qci/intro/ci.html
pageNextTitle: 快速开始
pageNext: ci/start.html
sitemap: false
---

内置通用环境变量，各类型任务都可引用。
除此之外，不同类型的公共编译机有部分平台相关的环境变量，具体请参考各平台环境变量说明。

- CODING-CI 系统定义的内置变量，命名统一以 QCI_ 开头

- 禁止修改内置环境变量的值，修改仅在当前 cmd 中生效，不会影响其他 task 或者下一次启动

- CODING-CI 现有的内置环境变量为：

    #### 与代码库相关的：

  - **QCI_REPO**：本次运行 job 的代码库路径
  - **QCI_REPO_BRANCH**：本次运行 job 的代码库分支名称
  - **QCI_REPO_COMMIT**：本次运行 job 的代码库版本号（ GIT 的 commit， svn 的 revision）
  - **QCI_REPO_REVISION**：含义同 **QCI_REPO_COMMIT**
  - **QCI_REPO_TAG**：如果本次运行是打标签触发，其值为 TAG 的名称，否则其值为空
  - **QCI_MR_SOURCE_BRANCH**：如果本次运行是 MR 触发，其值为源分支的名称，否则其值为空
  - **QCI_MR_TARGET_BRANCH**：如果本次运行是 M R触发，其值为目标分支的名称，否则其值为空
  - **QCI_MR_ID**：如果本次运行是 MR 触发，其值为 MR 单的唯一ID
  - **QCI_MR_IID**：如果本次运行是 MR 触发，其值为代码库中 MR 单的序号 ID

  #### 与本次提交相关的：

  - **QCI_COMMIT_AUTHOR**：本次运行代码库版本的提交人
  - **QCI_COMMIT_DATE**：本次运行代码库版本提交时间
  - **QCI_COMMIT_MESSAGE**：本次运行代码库版本提交信息

  #### 与任务相关的：

  - **QCI_BUILD_TIME**：本次 task 运行开始时间的时间戳（单位为 s）

  - **QCI_TRIGGER_TYPE**：本次运行 job 的触发类型，其值为：

      - TRIGGER_MANUAL （人工启动）
      - TRIGGER_TIMER （定时启动）
      - TRIGGER_TAG （打标签触发）
      - TRIGGER_CI （CI 触发）
      - TRIGGER_MR （MR 触发）

  - **QCI_TRIGGER**：本次运行 job 的用户名
      - 当 QCI_TRIGGER_TYPE 为 TRIGGER_MANUAL 时，其值为启动 job 的用户
      - 当 QCI_TRIGGER_TYPE 为 TRIGGER_TIMER 时，其值为项目助手
      - 当 QCI_TRIGGER_TYPE 为 TRIGGER_TAG 时，其值为打 tag 的用户
      - 当 QCI_TRIGGER_TYPE 为 TRIGGER_CI 时，其值为提交代码的用户
      - 当 QCI_TRIGGER_TYPE 为 TRIGGER_MR 时，其值为提交 MR 申请的用户

  - **QCI_JOB_ID**：本次运行 JOB 的 ID

  - **QCI_JOB_NAME**：本次运行 JOB 名称

  - **QCI_JOB_CREATOR**：本次运行 JOB 的创建者

  - **QCI_JOB_ADMIN**：本次运行 JOB 的管理员

  - **QCI_JOB_MEMBER**：本次运行 JOB 的成员

  - **QCI_JOB_URL**：本次运行 JOB 的链接

  - **QCI_JOB_TIME**：本次 JOB 的启动时间

  - **QCI_BUILD_NUMBER**：本次运行的序号，相同任务每次运行会增加 1

  - **QCI_BUILD_ID**：本次运行的 ID，供内部使用，全局唯一

  - **QCI_TASK_ID**：本次运行标识 task 的 ID，供内部使用，全局唯一

  - **QCI_LAST_BUILD_ID**: 上次执行任务的 BUILD_ID

  - **QCI_LAST_BUILD_COMMIT**： 相同 branch 下的上次执行的版本号，对于无代码库或 SVN，即为上次执行的版本号

  - **QCI_LAST_BUILD_REVISION** 含义同 **QCI_LAST_BUILD_COMMIT**

  - **QCI_LAST_SUCCESS_BUILD_ID** ：上次执行成功任务的 BUILD_ID

  - **QCI_LAST_SUCCESS_BUILD_COMMIT**： 相同 branch 下的上次执行成功的版本号，对于无代码库或 SVN，即为上次执行成功的版本号

  - **QCI_LAST_SUCCESS_BUILD_REVISION**： 含义同 **QCI_LAST_SUCCESS_BUILD_COMMIT**

  - **QCI_FAIL_TASKS**: 获取失败任务的名称，多个任务名称用 `;`(分号)分隔

  - **QCI_FAIL_TASKS_ID**: 获取失败任务的id，多个任务id用 `;`(分号)分隔

  - **QCI_TASK_RESTART**: 本次运行的 task 是否为重跑，重跑时该值为 1，否则为 0

  - **QCI_TEMPLATE_ID**: 任务的模版 ID


   #### 与人工处理节点相关的:

  - **QCI_PROMPT_OPERATOR**：prompt 后的步骤可以通过此环境变量获取 prompt 的处理人，当有多个处理人时，该变量的值为用分号分隔的多个人

  - **QCI_PROMPT_MSG**：prompt 后的步骤可以通过此环境变量获取 prompt 的处理信息，当有多个处理步骤时，该变量的值为用分号分隔的多个审批信息

   #### 与执行环境相关的：

  - **QCI_LOCAL_IP**：本次运行的编译机 IP

  - **QCI_WORKSPACE**：本次运行的工作空间路径，当在 docker 中运行时，是 docker 中的路径

  - **QCI_IN_DOCKER**：本次运行是否使用 docker，1 为在 docker 中运行，0 为不在 docker 中运行

  - **QCI_PHYSICAL_WORKSPACE**：本次运行的实际物理路径，当 QCI_IN_DOCKER 为 0 时，QCI_PHYSICAL_WORKSPACE 与 QCI_WORKSPACE 相同

    #### 构建版本号：

  - **QCI_MAJOR_VERSION**：主版本号，在任务配置界面进行配置

  - **QCI_FEATURE_VERSION**：特性版本号，在任务配置界面进行配置

  - **QCI_FIX_VERSION**：修正版本号，在任务配置界面进行配置

  - **QCI_BUILD_VERSION**：构建号，在任务配置界面进行配置，当没有设置初始值时，其值与 **QCI_BUILD_NUMBER** 相同

==== 2021/10/26 ====
