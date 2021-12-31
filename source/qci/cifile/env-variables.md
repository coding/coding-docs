---
title: 使用环境变量 - CODING 帮助中心
pageTitle: 使用环境变量
sitemap: false
---

CIFile 中除了支持命令行使用环境变量外，stage、task 的名称，artifacts、temps、cache 等关键字也支持使用环境变量。
您可以点此查看[内置环境变量说明](../环境变量/env-variables-usage.md)

### 环境变量注意事项

---

在yaml语法里，布尔值用 true 和 false 表示，可以通过添加引号的方式转化为 string 类型 或者使用两个感叹号（!!）的方法强制指定数据类型

如：
```yaml
env:
    value_1: 'true'
    value_2: !!str true
```

在CIFile中，浮点数默认识别成整型，可以通过添加引号的方式转化数据类型，或者使用 两个感叹号的方式强制指定数据类型

如：
```yaml
env:
    value_1: '1.0'
    value_2: !!str 1.0
```

### 环境变量的定义

---

在CIFile中，可以使用 env 来定义环境变量，环境变量目前支持`string`、 `select`、`multi-select`三种类型的环境变量

如：

```yaml
env:
    USERNAME: myname
```

环境变量可以定义描述信息，如：

```yaml
env:
    USERNAME:
        value: myname
        desc: mydescription
```

环境变量可以使用加密值来定义，如：

```yaml
env:
    USERNAME: myname
    PASSWD:
      secret: xxxxyyyzz #the string encrypted by CODING-CI public key
```

环境变量可以定义只读属性，防止启动时误修改，如：

```yaml
env:
    test_readonly:
        value: my_value
        desc: 测试只读属性
        readonly: true
```

环境变量支持定义单选，可以在界面启动时选择一个值启动，如：

```yaml
test_select:
    value: test1        # 默认值
    type: select        # 类型
    desc: 测试单选       # 描述信息
    option: test1;test2;test3;test4;    # 备选值，用英文分号分隔
```




环境变量支持定义多选，可以在界面启动时选择多个值启动，如：

```yaml
test_multi_select:
    value: test1;test2      # 默认值，多个值以分号连接
    type: multi-select      # 类型
    desc: test_multi_select # 描述信息
    option: test1;test2;test3;test4;  # 备选值，用英文分号分隔
```





### 用环境变量来定义环境变量

---

在CIFile关键字 env 中定义的环境变量是允许使用另外的环境变量来定义的

如：

```
env:
    current_user: $QCI_TRIGGER
    my_repo: ${QCI_WORKSPACE}/git
    my_code: ${my_repo}/code
```

### label 使用环境变量

---

当需要动态指定 label 时，可以将 label 的值设为环境变量。
```
worker:
    label: ${label}

```
**注意：label中的环境变量只支持用户在CIFile中、任务配置界面中、以及启动时添加的环境变量，不支持在运行时 CODING-CI 动态生成的环境变量**


### stage 和 task 名称中使用环境变量

---

CIFile中的 stage 和 task 名称中可以使用环境变量做为名称，例如

```
stages:
    - stage: 编译${COMPONENT}
      cmds:
        - echo 'hello CODING-CI!'
      artifacts: # 上传文件到QCI
        - templates/*
```

```
- stage: deploy
      tasks:
        - task: deploy${COMPONENT}
          if: $QCI_TRIGGER_TYPE = "master"
          cmds:
              - echo "CI deploy"
```

启动时会替换相应的环境变量```COMPONENT```

**注意：名称中的环境变量只支持用户在 CIFile 中、任务配置界面中、以及启动时添加的环境变量，不支持在运行时 CODING-CI 动态生成的环境变量**

### prompt 中使用环境变量

prompt关键字中的 msg 和 to 支持环境变量：
```
 - prompt:  #the stage will hold until recerver confirm
    - msg: Should go on?
      to: ["${QCI_TRIGGER}", reeduszhang, willionpan, damoncheng]

```
**注意：prompt 中的环境变量除了支持用户在 CIFile 中、任务配置界面中、以及启动时添加的环境变量外，还支持在运行时环境变量**

### artifacts、temps、cache 使用环境变量

请参看[文件路径配置格式](./CIfile-path.md)一章

==== 2021/10/26 ====
