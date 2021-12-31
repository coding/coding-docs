---
title: 事件介绍 - CODING 帮助中心
pageTitle: 事件介绍
pagePrevTitle: 服务类型
pagePrev: project-settings/service-hook/service.html
pageNextTitle: 过滤器
pageNext: project-settings/service-hook/filter.html
---

### [事件请求头](#request-header)

事件发送时，部分信息会通过 Http 请求头的方式发送到第三方平台，可通过读取 Http 请求头识别事件信息。

|请求头 | 说明|
| ---------------------------: | :----------------------------------- |
|  X-Coding-Service-Hook-Event | 事件标识                             |
|     X-Coding-Service-Hook-Id | Service Hook 编号                    |
| X-Coding-Service-Hook-Action | 发送行为，如：wecom_group_chat_robot |
|            X-Coding-Delivery | 发送送达编号                         |

### [事件数据结构](#data-structure)

Service Hook 每个事件数据结构均不同，通过事件数据结构，用户可以自定义事件发送内容的模板，支持 JsonPath 方式读取 Json 数据。现已支持的事件列表有项目协同、代码仓库、持续集成、制品仓库、Wiki 文档、文件网盘与项目成员等类型。

### [项目协同](#collaboration)

#### [迭代事件](#iteration-event)

|     事件 | 事件代码          |
| -------: | :---------------- |
| 创建迭代 | ITERATION_CREATED |
| 删除迭代 | ITERATION_DELETED |
| 更新迭代 | ITERATION_UPDATED |
| 规划迭代 | ITERATION_PLANNED |

```js
{
  "event": "", // 事件代码
  "eventName": "", // 事件名
  "iteration": {
    "title": "", // 迭代标题
    "goal": "", // 迭代目标
    "html_url": "", // 迭代访问链接
    "project_id": "", // 迭代所属项目编号
    "code": "", // 迭代资源编号
    "creator": {
      "id": "", // 创建者编号
      "avatar_url": "", // 创建者头像
      "html_url": "", // 创建者主页地址
      "name": "", // 创建者名称
      "name_pinyin": "" // 创建者名称（拼音）
    },
    "status": "", //迭代状态
    "plan_issue_number": "", // 迭代的事项总数
    "start_at": "", //开始时间
    "end_at": "", //结束时间
    "created_at": "", // 创建时间
    "updated_at": "" // 更新时间
  },
  "sender": {
    "id": "", // 发送者编号
    "avatar_url": "", // 发送者头像
    "html_url": "", // 发送者主页地址
    "name": "", // 发送者名称
    "name_pinyin": "" // 发送者名称（拼音）
  },
  "project": {
    "id": "", // 项目编号
    "name": "", // 项目标识
    "display_name": "", // 项目名
    "description": "", // 项目描述
    "icon": "", // 项目图标
    "url": "" // 项目访问地址
  },
  "team": {
    "id": "", // 团队编号
    "domain": "", // 团队域名
    "name": "", // 团队名
    "name_pinyin": "", // 团队名（拼音）
    "introduction": "", // 团队简介
    "avatar": "", // 团队图标
    "url": "" // 团队访问地址
  }
}
```

#### [事项事件](#item-event)

|         事件 | 事件代码                   |
| -----------: | :------------------------- |
|     创建事项 | ISSUE_CREATED              |
|     删除事项 | ISSUE_DELETED              |
|     状态变更 | ISSUE_STATUS_UPDATED       |
|   分配处理人 | ISSUE_ASSIGNEE_CHANGED     |
|     规划迭代 | ISSUE_ITERATION_CHANGED    |
| 关联关系变更 | ISSUE_RELATIONSHIP_CHANGED |
| 更新事项信息 | ISSUE_UPDATED              |

```js
{
  "event": "", // 事件代码
  "eventName": "", // 事件名
  "issue": {
    "html_url": "", // 事项访问地址
    "type": "", // 事项类型
    "project_id": "", // 事项所属项目
    "code": "", // 事项资源编号
    "parent_code": "", // 父事项资源编号
    "title": "", // 事项标题
    "creator": {
      "id": "", // 创建者编号
      "avatar_url": "", // 创建者头像
      "html_url": "", // 创建者主页地址
      "name": "", // 创建者名称
      "name_pinyin": "" // 创建者名称（拼音）
    },
    "status": "", // 事项状态
    "assignee": {
      "id": "", // 指派人编号
      "avatar_url": "", // 指派人头像
      "html_url": "", // 指派人主页地址
      "name": "", // 指派人名称
      "name_pinyin": "" // 指派人名称（拼音）
    },
    "priority": "", // 事项优先级
    "start_date": "", // 事项开始时间
    "due_date": "", // 事项结束时间
    "description": "", // 事项描述内容
    "created_at": "", // 事项创建时间
    "updated_at": "", // 事项更新时间
    "issue_status": {
      "id": "", // 状态编号
      "name": "", // 状态名称
      "type": "" // 状态类型
    },
    "watchers": [
      {
        "id": "", // 关注者编号
        "avatar_url": "", // 关注者头像
        "html_url": "", // 关注者主页地址
        "name": "", // 关注者名称
        "name_pinyin": "" // 关注者名称（拼音）
      }
    ],
    "labels": [] // 事项标签
  },
  "sender": {
    "id": "", // 发送者编号
    "avatar_url": "", // 发送者头像
    "url": "", // 发送者主页地址
    "html_url": "", // 发送者主页地址
    "name": "", // 发送者名称
    "name_pinyin": "" // 发送者名称（拼音）
  },
  "project": {
    "id": "", // 项目编号
    "name": "", // 项目标识
    "display_name": "", // 项目名
    "description": "", // 项目描述
    "icon": "", // 项目图标
    "url": "" // 项目访问地址
  },
  "team": {
    "id": "", // 团队编号
    "domain": "", // 团队域名
    "name": "", // 团队名
    "name_pinyin": "", // 团队名（拼音）
    "introduction": "", // 团队简介
    "avatar": "", // 团队图标
    "url": "" // 团队访问地址
  }
}
```

#### [事项评论事件](#comment-event)

|     事件 | 事件代码              |
| -------: | :-------------------- |
| 增加评论 | ISSUE_COMMENT_CREATED |

```js
{
  "event": "", // 事件代码
  "eventName": "", // 事件名
  "issueComment": {
    "html_url": "", // 事项评论访问地址
    "content": "", // 评论内容
    "created_at": "", // 评论创建时间
    "updated_at": "", // 评论更新时间
    "issue": {
      "project_id": "", // 事项归属项目
      "html_url": "", // 事项访问地址
      "code": "", // 事项编号
      "title": "", // 事项标题
      "creator": {
        "id": "", // 创建者编号
        "avatar_url": "", // 创建者头像
        "html_url": "", // 创建者主页地址
        "name": "", // 创建者名称
        "name_pinyin": "" // 创建者名称（拼音）
      },
      "status": "", // 事项状态
      "assignee": {
        "id": "", // 指派人编号
        "avatar_url": "", // 指派人头像
        "html_url": "", // 指派人主页地址
        "name": "", // 指派人名称
        "name_pinyin": "" // 指派人名称（拼音）
      },
      "priority": "", // 事项优先级
      "description": "", // 事项描述
      "created_at": "", // 事项创建时间
      "updated_at": "" // 事项更新时间
    },
    "creator": {
      "id": "", // 创建者编号
      "avatar_url": "", // 创建者头像
      "html_url": "", // 创建者主页地址
      "name": "", // 创建者名称
      "name_pinyin": "" // 创建者名称（拼音）
    }
  },
  "sender": {
    "id": "", // 发送者编号
    "avatar_url": "", // 发送者头像
    "url": "", // 发送者主页地址
    "html_url": "", // 发送者主页地址
    "name": "", // 发送者名称
    "name_pinyin": "" // 发送者名称（拼音）
  },
  "project": {
    "id": "", // 项目编号
    "name": "", // 项目标识
    "display_name": "", // 项目名
    "description": "", // 项目描述
    "icon": "", // 项目图标
    "url": "" // 项目访问地址
  },
  "team": {
    "id": "", // 团队编号
    "domain": "", // 团队域名
    "name": "", // 团队名
    "name_pinyin": "", // 团队名（拼音）
    "introduction": "", // 团队简介
    "avatar": "", // 团队图标
    "url": "" // 团队访问地址
  }
}
```

#### [更新工时信息](#update-hour-info)

|         事件 | 事件代码                  |
| -----------: | :------------------------ |
| 更新工时信息 | ISSUE_HOUR_RECORD_UPDATED |

```js
{
  "event": "", // 事件代码
  "eventName": "", // 事件名
  "issue": {
    "html_url": "", // 事项访问地址
    "type": "", // 事项类型
    "project_id": "", // 事项所属项目
    "code": "", // 事项资源编号
    "parent_code": "", // 父事项资源编号
    "title": "", // 事项标题
    "creator": {
      "id": "", // 创建者编号
      "avatar_url": "", // 创建者头像
      "html_url": "", // 创建者主页地址
      "name": "", // 创建者名称
      "name_pinyin": "" // 创建者名称（拼音）
    },
    "status": "", // 事项状态
    "assignee": {
      "id": "", // 指派人编号
      "avatar_url": "", // 指派人头像
      "html_url": "", // 指派人主页地址
      "name": "", // 指派人名称
      "name_pinyin": "" // 指派人名称（拼音）
    },
    "priority": "", // 事项优先级
    "start_date": "", // 事项开始时间
    "due_date": "", // 事项结束时间
    "description": "", // 事项描述内容
    "created_at": "", // 事项创建时间
    "updated_at": "", // 事项更新时间
    "issue_status": {
      "id": "", // 状态编号
      "name": "", // 状态名称
      "type": "" // 状态类型
    },
    "watchers": [
      {
        "id": "", // 关注者编号
        "avatar_url": "", // 关注者头像
        "html_url": "", // 关注者主页地址
        "name": "", // 关注者名称
        "name_pinyin": "" // 关注者名称（拼音）
      }
    ],
    "labels": [] // 事项标签
  },
  "work_log": {
    "record_hours": "", // 登记的工时，负数代表删除工时记录
    "remaining_hours": "" // 剩余工时
  },
  "sender": {
    "id": "", // 发送者编号
    "avatar_url": "", // 发送者头像
    "url": "", // 发送者主页地址
    "html_url": "", // 发送者主页地址
    "name": "", // 发送者名称
    "name_pinyin": "" // 发送者名称（拼音）
  },
  "project": {
    "id": "", // 项目编号
    "name": "", // 项目标识
    "display_name": "", // 项目名
    "description": "", // 项目描述
    "icon": "", // 项目图标
    "url": "" // 项目访问地址
  },
  "team": {
    "id": "", // 团队编号
    "domain": "", // 团队域名
    "name": "", // 团队名
    "name_pinyin": "", // 团队名（拼音）
    "introduction": "", // 团队简介
    "avatar": "", // 团队图标
    "url": "" // 团队访问地址
  }
}
```

### [代码仓库](#repository)

#### [合并请求事件](#merge-request-event)

|         事件 | 事件代码       |
| -----------: | :------------- |
| 合并请求创建 | GIT_MR_CREATED |
| 合并请求更新 | GIT_MR_UPDATED |
| 合并请求合并 | GIT_MR_MERGED  |
| 合并请求关闭 | GIT_MR_CLOSED  |

```js
{
  "event": "", // 事件代码
  "eventName": "", // 事件名
  "mergeRequest": {
    "id": "", // 合并请求编号
    "html_url": "", // 合并请求访问地址
    "patch_url": "", // 合并请求 patch 地址
    "diff_url": "", // 合并请求 diff 地址
    "number": "", // 合并请求资源编号
    "state": "", // 合并请求状态
    "title": "", // 合并请求标题
    "body": "", // 合并请求内容
    "user": {
      "id": "", // 创建者编号
      "avatar_url": "", // 创建者头像
      "html_url": "", // 创建者主页地址
      "name": "", // 创建者名称
      "name_pinyin": "" // 创建者名称（拼音）
    },
    "created_at": "", // 合并请求创建时间
    "updated_at": "", // 合并请求更新时间
    "merge_commit_sha": "", // 合并请求 commit
    "merged": "", // 合并请求是否合并
    "comments": "", // 合并请求评论数
    "commits": "", // 合并请求提交数
    "additions": "", // 合并请求新增数
    "deletions": "", // 合并请求删除数
    "changed_files": "", // 合并请求文件变化数
    "head": {
      "ref": "", // 分支名称
      "sha": "", // 最后一个 commit sha
      "user": {
        "id": "", // 提交者编号
        "avatar_url": "", // 提交者头像
        "html_url": "", // 提交者主页地址
        "name": "", // 提交者名称
        "name_pinyin": "" // 提交者名称（拼音）
      },
      "repo": {
        "id": "", // 代码仓库编号
        "name": "", // 代码仓库标识
        "full_name": "", // 完整路径
        "owner": {
          "id": "", // 所有者编号
          "avatar_url": "", // 所有者头像
          "html_url": "", // 所有者主页地址
          "name": "", // 所有者名称
          "name_pinyin": "" // 所有者名称（拼音）
        },
        "private": "", //是否私有仓库
        "html_url": "", //代码仓库访问地址
        "description": "", // 代码仓库描述
        "fork": "", // 是否可以被 fork
        "created_at": "", // 创建时间
        "updated_at": "", // 更新时间
        "clone_url": "", // HTTP 克隆地址
        "ssh_url": "", // SSH 克隆地址
        "default_branch": "", // 默认分支
        "vcs_type": "" // 代码仓库类型
      }
    },
    "base": {
      "ref": "", // 分支名称
      "sha": "", // 最后一个 commit sha
      "user": {
        "id": "", // 提交者编号
        "avatar_url": "", // 提交者头像
        "html_url": "", // 提交者主页地址
        "name": "", // 提交者名称
        "name_pinyin": "" // 提交者名称（拼音）
      },
      "repo": {
        "id": "", // 代码仓库编号
        "name": "", // 代码仓库标识
        "full_name": "", // 完整路径
        "owner": {
          "id": "", // 所有者编号
          "avatar_url": "", // 所有者头像
          "html_url": "", // 所有者主页地址
          "name": "", // 所有者名称
          "name_pinyin": "" // 所有者名称（拼音）
        },
        "private": "", //是否私有仓库
        "html_url": "", //代码仓库访问地址
        "description": "", // 代码仓库描述
        "fork": "", // 是否可以被 fork
        "created_at": "", // 创建时间
        "updated_at": "", // 更新时间
        "clone_url": "", // HTTP 克隆地址
        "ssh_url": "", // SSH 克隆地址
        "default_branch": "", // 默认分支
        "vcs_type": "" // 代码仓库类型
      }
    }
  },
  "repository": {
    "id": "", // 代码仓库编号
    "name": "", // 代码仓库标识
    "full_name": "", // 完整路径
    "owner": {
      "id": "", // 所有者编号
      "avatar_url": "", // 所有者头像
      "html_url": "", // 所有者主页地址
      "name": "", // 所有者名称
      "name_pinyin": "" // 所有者名称（拼音）
    },
    "private": "", //是否私有仓库
    "html_url": "", //代码仓库访问地址
    "description": "", // 代码仓库描述
    "fork": "", // 是否可以被 fork
    "created_at": "", // 创建时间
    "updated_at": "", // 更新时间
    "clone_url": "", // HTTP 克隆地址
    "ssh_url": "", // SSH 克隆地址
    "default_branch": "", // 默认分支
    "vcs_type": "" // 代码仓库类型
  },
  "sender": {
    "id": "", // 发送者编号
    "avatar_url": "", // 发送者头像
    "url": "", // 发送者主页地址
    "html_url": "", // 发送者主页地址
    "name": "", // 发送者名称
    "name_pinyin": "" // 发送者名称（拼音）
  },
  "project": {
    "id": "", // 项目编号
    "name": "", // 项目标识
    "display_name": "", // 项目名
    "description": "", // 项目描述
    "icon": "", // 项目图标
    "url": "" // 项目访问地址
  },
  "team": {
    "id": "", // 团队编号
    "domain": "", // 团队域名
    "name": "", // 团队名
    "name_pinyin": "", // 团队名（拼音）
    "introduction": "", // 团队简介
    "avatar": "", // 团队图标
    "url": "" // 团队访问地址
  }
}
```

#### [代码推送事件](#push-event)

|     事件 | 事件代码   |
| -------: | :--------- |
| 代码推送 | GIT_PUSHED |

```js
{
  "event": "", // 事件代码
  "eventName": "", // 事件名
  "ref": "", // 分支名称
  "before": "", // 推送之前旧的 sha 值
  "after": "", // 推送之后新的 sha 值
  "created": "", // 是否新增
  "deleted": "", // 是否删除
  "compare": "", // 对比地址
  "commits": [
    {
      "id": "", // commit sha
      "message": "", // 提交信息
      "timestamp": "", // 提交时间
      "url": "",
      "author": {
        "name": "", // 作者名称
        "email": "", // 作者邮箱
        "username": "" // 作者用户名
      },
      "committer": {
        "name": "", // 提交者名称
        "email": "", // 提交者邮箱
        "username": "" // 提交者用户名
      },
      "added": "", // 新增文件列表
      "removed": "", // 移除文件列表
      "modified": [""] // 修改文件列表
    }
  ],
  "head_commit": {
    "id": "", // commit sha
    "message": "", // 提交信息
    "timestamp": "", // 提交时间
    "url": "", // 访问地址
    "author": {
      "name": "", // 作者名称
      "email": "", // 作者邮箱
      "username": "" // 作者用户名
    },
    "committer": {
      "name": "", // 提交者名称
      "email": "", // 提交者邮箱
      "username": "" // 提交者用户名
    },
    "added": "", // 新增文件列表
    "removed": "", // 移除文件列表
    "modified": [""] // 修改文件列表
  },
  "pusher": {
    "name": "", // 推送者名称
    "email": "", // 推送者邮箱
    "username": "" // 推送者用户名
  },
  "repository": {
    "id": "", // 代码仓库编号
    "name": "", // 代码仓库标识
    "full_name": "", // 完整路径
    "owner": {
      "id": "", // 所有者编号
      "avatar_url": "", // 所有者头像
      "html_url": "", // 所有者主页地址
      "name": "", // 所有者名称
      "name_pinyin": "" // 所有者名称（拼音）
    },
    "private": "", //是否私有仓库
    "html_url": "", //代码仓库访问地址
    "description": "", // 代码仓库描述
    "fork": "", // 是否可以被 fork
    "created_at": "", // 创建时间
    "updated_at": "", // 更新时间
    "clone_url": "", // HTTP 克隆地址
    "ssh_url": "", // SSH 克隆地址
    "default_branch": "", // 默认分支
    "vcs_type": "" // 代码仓库类型
  },
  "sender": {
    "id": "", // 发送者编号
    "avatar_url": "", // 发送者头像
    "url": "", // 发送者主页地址
    "html_url": "", // 发送者主页地址
    "name": "", // 发送者名称
    "name_pinyin": "" // 发送者名称（拼音）
  },
  "project": {
    "id": "", // 项目编号
    "name": "", // 项目标识
    "display_name": "", // 项目名
    "description": "", // 项目描述
    "icon": "", // 项目图标
    "url": "" // 项目访问地址
  },
  "team": {
    "id": "", // 团队编号
    "domain": "", // 团队域名
    "name": "", // 团队名
    "name_pinyin": "", // 团队名（拼音）
    "introduction": "", // 团队简介
    "avatar": "", // 团队图标
    "url": "" // 团队访问地址
  }
}
```

### [持续集成](#ci)

#### [持续集成事件](#ci-event)

|             事件 | 事件代码        |
| ---------------: | :-------------- |
|     创建构建计划 | CI_JOB_CREATED  |
|     修改构建计划 | CI_JOB_UPDATED  |
|     删除构建计划 | CI_JOB_DELETED  |
|     启动构建计划 | CI_JOB_STARTED  |
| 构建计划执行结束 | CI_JOB_FINISHED |

```js
{
  "event": "", // 事件代码
  "eventName": "", // 事件名
  "ci": {
    "id": "", // 构建计划编号
    "name": "", // 构建计划名称
    "branch_regex": "", // 构建计划编号
    "creator_id": "", // 构建计划创建者编号
    "project_id": "", // 构建计划所属项目编号
    "depot_id": "", // 构建计划编号代码仓库编号
    "jenkins_file_path": "", // jenkins file 路径
    "created_at": "", // 创建时间
    "updated_at": "", // 更新时间
    "trigger_method": "", // 触发方式
    "build": {
      "id": "", // 构建记录编号
      "number": "", // 构建记录资源编号
      "cci_id": "", // Task 编号
      "cause": "", // 触发方式
      "commit_id": "", // commit sha
      "branch": "", // 触发分支
      "job_id": "", // 构建计划编号
      "trigger_user_id": "", // 触发用户编号
      "created_at": "", // 创建时间
      "updated_at": "", // 更新时间
      "failed_message": "", // 构建失败消息
      "duration": "", // 构建过程耗时
      "status": "" // 构建状态
    }
  },
  "repository": {
    "id": "", // 代码仓库编号
    "name": "", // 代码仓库标识
    "full_name": "", // 完整路径
    "owner": {
      "id": "", // 所有者编号
      "avatar_url": "", // 所有者头像
      "html_url": "", // 所有者主页地址
      "name": "", // 所有者名称
      "name_pinyin": "" // 所有者名称（拼音）
    },
    "private": "", //是否私有仓库
    "html_url": "", //代码仓库访问地址
    "description": "", // 代码仓库描述
    "fork": "", // 是否可以被 fork
    "created_at": "", // 创建时间
    "updated_at": "", // 更新时间
    "clone_url": "", // HTTP 克隆地址
    "ssh_url": "", // SSH 克隆地址
    "default_branch": "", // 默认分支
    "vcs_type": "" // 代码仓库类型
  },
  "sender": {
    "id": "", // 发送者编号
    "avatar_url": "", // 发送者头像
    "html_url": "", // 发送者主页地址
    "name": "", // 发送者名称
    "name_pinyin": "" // 发送者名称（拼音）
  },
  "project": {
    "id": "", // 项目编号
    "name": "", // 项目标识
    "display_name": "", // 项目名
    "description": "", // 项目描述
    "icon": "", // 项目图标
    "url": "" // 项目访问地址
  },
  "team": {
    "id": "", // 团队编号
    "domain": "", // 团队域名
    "name": "", // 团队名
    "name_pinyin": "", // 团队名（拼音）
    "introduction": "", // 团队简介
    "avatar": "", // 团队图标
    "url": "" // 团队访问地址
  }
}
```

### [制品库](#artifact)

#### [制品仓库事件](#repository-event)

|             事件 | 事件代码                             |
| ---------------: | :----------------------------------- |
|         推送制品 | ARTIFACTS_VERSION_CREATED            |
|         更新制品 | ARTIFACTS_VERSION_UPDATED            |
|         下载制品 | ARTIFACTS_VERSION_DOWNLOADED         |
|         删除制品 | ARTIFACTS_VERSION_DELETED            |
|         发布制品 | ARTIFACTS_VERSION_RELEASED           |
|     禁止下载制品 | ARTIFACTS_VERSION_DOWNLOAD_FORBIDDEN |
|     恢复下载制品 | ARTIFACTS_VERSION_DOWNLOAD_ALLOWED   |
|     下载制品阻断 | ARTIFACTS_VERSION_DOWNLOAD_BLOCKED   |
|     创建制品仓库 | ARTIFACTS_REPO_CREATED               |
| 更新制品仓库配置 | ARTIFACTS_REPO_UPDATED               |
|     删除制品仓库 | ARTIFACTS_REPO_DELETED               |

```js
{
  "event": "", // 事件代码
  "eventName": "", // 事件名
  "artifact": {
    "projectId": "", // 制品所属项目编号
    "artifactRepoId": "", // 制品所属制品仓库编号
    "artifactPkgId": "", // 制品包编号
    "artifactVersionId": "", // 制品版本
    "userId": "", // 制品创建用户编号
    "size": "", // 制品大小
    "artifactRepoName": "", // 制品仓库名
    "artifactPkgName": "", // 制品包名
    "artifactVersionName": "", // 制品版本名
    "action": "", // 操作行为
    "artifactType": "", // 制品类型
    "projectName": "", // 项目名
    "userName": "" // 制品创建用户名
  },
  "sender": {
    "id": "", // 发送者编号
    "avatar_url": "", // 发送者头像
    "html_url": "", // 发送者主页地址
    "name": "", // 发送者名称
    "name_pinyin": "" // 发送者名称（拼音）
  },
  "project": {
    "id": "", // 项目编号
    "name": "", // 项目标识
    "display_name": "", // 项目名
    "description": "", // 项目描述
    "icon": "", // 项目图标
    "url": "" // 项目访问地址
  },
  "team": {
    "id": "", // 团队编号
    "domain": "", // 团队域名
    "name": "", // 团队名
    "name_pinyin": "", // 团队名（拼音）
    "introduction": "", // 团队简介
    "avatar": "", // 团队图标
    "url": "" // 团队访问地址
  }
}
```

### [Wiki 文档](#wiki)

|              事件 | 事件代码                       |
| ----------------: | :----------------------------- |
|          文档新建 | WIKI_CREATED                   |
|          文档更新 | WIKI_UPDATED                   |
|          文档移动 | WIKI_MOVED                     |
|  文档更改分享状态 | WIKI_SHARE_UPDATED             |
|  文档更改访问设置 | WIKI_ACCESS_UPDATED            |
| 文档 / 文档树复制 | WIKI_COPIED                    |
|  文档移动到回收站 | WIKI_MOVED_TO_RECYCLE_BIN      |
|  文档从回收站恢复 | WIKI_RESTORED_FROM_RECYCLE_BIN |
|      文档彻底删除 | WIKI_DELETED                   |

```js
{
  "event": "", // 事件代码
  "eventName": "", // 事件名
  "content": {
    "title": "", // Wiki 标题
    "url": "", // Wiki 访问地址
    "parentName": "", // 父 Wiki 标题
    "parentUrl": "", // 父 Wiki 访问地址
    "shareUrl": "" // Wiki 分享地址
  },
  "sender": {
    "id": "", // 发送者编号
    "avatar_url": "", // 发送者头像
    "html_url": "", // 发送者主页地址
    "name": "", // 发送者名称
    "name_pinyin": "" // 发送者名称（拼音）
  },
  "project": {
    "id": "", // 项目编号
    "name": "", // 项目标识
    "display_name": "", // 项目名
    "description": "", // 项目描述
    "icon": "", // 项目图标
    "url": "" // 项目访问地址
  },
  "team": {
    "id": "", // 团队编号
    "domain": "", // 团队域名
    "name": "", // 团队名
    "name_pinyin": "", // 团队名（拼音）
    "introduction": "", // 团队简介
    "avatar": "", // 团队图标
    "url": "" // 团队访问地址
  }
}
```

### [文件网盘](#file-disk)

#### [文件网盘单文件操作事件](#single-file-event)

|             事件 | 事件代码           |
| ---------------: | :----------------- |
|         文件新建 | FILE_CREATED       |
|         文件更新 | FILE_UPDATED       |
|       文件重命名 | FILE_RENAMED       |
| 文件更改分享状态 | FILE_SHARE_UPDATED |

```js
{
  "event": "", // 事件代码
  "eventName": "", // 事件名
  "content": {
    "to_folder_id": "", // 目标目录编号
    "to_folder_name": "", // 目标目录名
    "done": "", // 是否完成
    "count": "", // 操作文件数
    "file": {
      "name": "", // 文件名
      "url": "", // 文件访问地址
      "id": "", // 文件编号
      "full_path": "", // 文件全路径
      "folder_id": "", // 文件目录编号
      "folder_name": "" // 文件目录名
    }
  },
  "sender": {
    "id": "", // 发送者编号
    "avatar_url": "", // 发送者头像
    "html_url": "", // 发送者主页地址
    "name": "", // 发送者名称
    "name_pinyin": "" // 发送者名称（拼音）
  },
  "project": {
    "id": "", // 项目编号
    "name": "", // 项目标识
    "display_name": "", // 项目名
    "description": "", // 项目描述
    "icon": "", // 项目图标
    "url": "" // 项目访问地址
  },
  "team": {
    "id": "", // 团队编号
    "domain": "", // 团队域名
    "name": "", // 团队名
    "name_pinyin": "", // 团队名（拼音）
    "introduction": "", // 团队简介
    "avatar": "", // 团队图标
    "url": "" // 团队访问地址
  }
}
```

#### [文件网盘多文件操作事件](#multi-file-event)

|                      事件 | 事件代码                       |
| ------------------------: | :----------------------------- |
|         文件 / 文件夹移动 | FILE_MOVED                     |
|         文件 / 文件夹复制 | FILE_COPIED                    |
| 文件 / 文件夹移动到回收站 | FILE_MOVED_TO_RECYCLE_BIN      |
| 文件 / 文件夹从回收站恢复 | FILE_RESTORED_FROM_RECYCLE_BIN |
|     文件 / 文件夹彻底删除 | FILE_DELETED                   |

```js
{
  "event": "", // 事件代码
  "eventName": "", // 事件名
  "content": {
    "to_folder_id": "", // 目标目录编号
    "to_folder_name": "", // 目标目录名
    "count": "", // 文件数
    "files": [
      {
        "name": "", // 文件名
        "url": "", // 文件访问地址
        "id": "", // 文件编号
        "folder_id": "", // 文件目录编号
        "is_renamed": "" // 是否重命名
      }
    ]
  },
  "sender": {
    "id": "", // 发送者编号
    "avatar_url": "", // 发送者头像
    "html_url": "", // 发送者主页地址
    "name": "", // 发送者名称
    "name_pinyin": "" // 发送者名称（拼音）
  },
  "project": {
    "id": "", // 项目编号
    "name": "", // 项目标识
    "display_name": "", // 项目名
    "description": "", // 项目描述
    "icon": "", // 项目图标
    "url": "" // 项目访问地址
  },
  "team": {
    "id": "", // 团队编号
    "domain": "", // 团队域名
    "name": "", // 团队名
    "name_pinyin": "", // 团队名（拼音）
    "introduction": "", // 团队简介
    "avatar": "", // 团队图标
    "url": "" // 团队访问地址
  }
}
```

### [项目成员](#project-member)

#### [项目成员事件](#member-event)

|               事件 | 事件代码            |
| -----------------: | :------------------ |
|       添加项目成员 | WIKI_DELETED        |
|       移除项目成员 | MEMBER_DELETED      |
| 更新项目成员用户组 | MEMBER_ROLE_UPDATED |

```js
{
  "event": "", // 事件代码
  "eventName": "", // 事件名
  "member": {
    "id": "", // 成员编号
    "avatar_url": "", // 成员头像
    "html_url": "", // 成员主页地址
    "name": "", // 成员名称
    "name_pinyin": "" // 成员名称（拼音）
  },
  "sender": {
    "id": "", // 发送者编号
    "avatar_url": "", // 发送者头像
    "html_url": "", // 发送者主页地址
    "name": "", // 发送者名称
    "name_pinyin": "" // 发送者名称（拼音）
  },
  "project": {
    "id": "", // 项目编号
    "name": "", // 项目标识
    "display_name": "", // 项目名
    "description": "", // 项目描述
    "icon": "", // 项目图标
    "url": "" // 项目访问地址
  },
  "team": {
    "id": "", // 团队编号
    "domain": "", // 团队域名
    "name": "", // 团队名
    "name_pinyin": "", // 团队名（拼音）
    "introduction": "", // 团队简介
    "avatar": "", // 团队图标
    "url": "" // 团队访问地址
  }
}
```

==== 2021/08/13 ====
