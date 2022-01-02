---
title: Markdown 语法参考 - CODING 帮助中心
pageTitle: Markdown 语法参考
pagePrevTitle: 权限配置
pagePrev: document/wiki/permission.html
pageNextTitle: 文件网盘
pageNext: document/files/intro.html
alias: 
-   project/basis/markdown.html
-   management/markdown.html
---

### 总体介绍

Markdown 是一种轻量级标记语言，让写作者专注于写作而不用关注样式。CODING 的许多功能模块均采用了 Markdown 语法，比如事项的讨论、代码托管的 Pull Request、Wiki 等。


### 标题

用 Markdown 书写时，只需要在文本前面加上 『#』 即可创建一级标题。同理，创建二级标题、三级标题等只需要增加 『#』 个数即可，Markdown 共支持六级标题。如下所示：


    # 一级标题
    ## 二级标题
    ### 三级标题
    #### 四级标题
    ##### 五级标题
    ###### 六级标题

对应的效果：

![](https://help-assets.codehub.cn/enterprise/20191224145618.png)

### 锚点

CODING 会针对每个标题，在解析时都会添加锚点 id，如：

    # 锚点

会被解析成:

    &lth1 id="user-content-锚点"&gt锚点&lt/h1&gt


注意我们添加了一个 user-content- 的前缀，所以如果要自己添加跳转链接要使用 Markdown 的形式，且链接要加一个 user-content- 前缀，如：

    [访问链接](#user-content-锚点);


### 引用

Markdown 标记区块引用和 email 中用 『>』的引用方式类似，只需要在整个段落的第一行最前面加上 『>』 ：

    > CODING 为软件开发者提供基于云计算技术的软件开发平台，包括项目管理，代码托管，运行空间和质量控制等等。

对应的效果：

![](https://help-assets.codehub.cn/enterprise/20191224145538.png)

区块引用可以嵌套，只要根据层次加上不同数量的『>』：

    > 这是第一级引用。
    >
    > > 这是第二级引用。
    >
    > 现在回到第一级引用。

对应的效果：

![](https://help-assets.codehub.cn/enterprise/20191224145454.png)

引用的区块内也可以使用其他的 Markdown 语法，包括标题、列表、代码区块等：

    > ## 这是一个标题。
    > 1. 这是第一行列表项。
    > 2. 这是第二行列表项。
    >
    > 给出一些例子代码：
    >
    > return shell_exec(`echo $input | $markdown_script`);

对应的效果：

![](https://help-assets.codehub.cn/enterprise/20191224145427.png)


### 列表

列表项目标记通常放在最左边，项目标记后面要接一个字符的空格。

#### 无序列表

使用星号、加号或是减号作为列表标记

    - Red
    - Green
    - Blue

对应的效果：

![](https://help-assets.codehub.cn/enterprise/20191224145351.png)

#### 有序列表

使用数字接着一个英文句点

    1. Red
    2. Green
    3. Blue

对应的效果：

![](https://help-assets.codehub.cn/enterprise/20191224145327.png)

如果要在列表项目内放进引用，那『>』就需要缩进：

    *  Coding.net有以下主要功能:
        > 代码托管平台
        > 在线运行环境    
        > 代码质量监控    
        > 项目管理平台

对应的效果：

![](https://help-assets.codehub.cn/enterprise/20191224140000.png)

#### 代办列表

表示列表是否勾选状态（注意：{ } 前后都要有空格）

    - [ ] 不勾选
    - [x] 勾选

对应的效果：

![](https://help-assets.codehub.cn/enterprise/20191224135912.png)


### 代码

只要把你的代码块包裹在『```』之间，你就不需要通过无休止的缩进来标记代码块了。 在围栏式代码块中，你可以指定一个可选的语言标识符，然后我们就可以为它启用语法着色了。 举个例子，这样可以为一段 Ruby 代码着色：

    ```ruby
    require 'redcarpet'
    markdown = Redcarpet.new("Hello World!")
    puts markdown.to_html
    ```

对应的效果：

![](https://help-assets.codehub.cn/enterprise/20191224140300.png)


### 强调

在 Markdown 中，可以使用 * 和  _  来表示斜体和加粗。

#### 斜体

    *CODING，让开发更简单*
    _CODING，让开发更简单_

对应的效果：

![](https://help-assets.codehub.cn/enterprise/20191224141710.png)


#### 加粗

    **CODING，让开发更简单**
    __CODING，让开发更简单__

对应的效果：

![](https://help-assets.codehub.cn/enterprise/20191224141817.png)

#### 斜体加粗

    ***CODING，让开发更简单***
    ___CODING，让开发更简单___

对应的效果：

![](https://help-assets.codehub.cn/enterprise/20191224153024.png)

#### 删除线

    ~~CODING，让开发更简单~~

对应的效果：

![](https://help-assets.codehub.cn/enterprise/20191224153300.png)


### 超链接

方括号显示说明，圆括号内显示网址， Markdown 会自动把它转成链接，例如：

    [超强大的云开发平台 CODING](http://coding.net)

对应的效果：

![](https://help-assets.codehub.cn/enterprise/20191224142040.png)


### 数学公式

CODING Markdown 编辑器已支持 katex 服务，公式语法可参考：<https://katex.org/> 。

示例：

```
$$ f(x) = \int _{-\infty}^\infty \hat f(\xi)\, e^{2 \pi i \xi x} \, d\xi$$
```

对应的效果：

![img](https://help-assets.codehub.cn/enterprise/20190815154816.png)

### 表格

在 Markdown 中，可以制作表格，例如：

    First Header | Second Header | Third Header
    ------------ | ------------- | ------------
    Content Cell | Content Cell  | Content Cell
    Content Cell | Content Cell  | Content Cell

对应的效果如下：

![](https://help-assets.codehub.cn/enterprise/20191224143128.png)

或者也可以让表格两边内容对齐，中间内容居中，例如：

    First Header | Second Header | Third Header
    :----------- | :-----------: | -----------:
    Left         | Center        | Right
    Left         | Center        | Right

对应的效果如下：

![](https://help-assets.codehub.cn/enterprise/20191224143238.png)


### 分割线

在 Markdown 中，可以使用 3 个以上『-』符号制作分割线，例如：

    这是分隔线上部分内容
    ---
    这是分隔线上部分内容

对应的效果：

![](https://help-assets.codehub.cn/enterprise/20191224143354.png)


### 图片

Markdown 使用了类似链接的语法来插入图片，您可以直接复制图片粘贴至 Markdown 编辑框，系统将自动生成图片语法。

图片语法举例：

    ![img](https://help-assets.codehub.cn/enterprise/20190814161343.png)


### 流程图

Markdown 编辑器已支持绘制流程图、时序图和甘特图。通过 mermaid 实现图形的插入，点击查看更多[语法详情](https://mermaidjs.github.io/)。

    ```graph
    graph TD;
        A-->B;
        A-->C;
        B-->D;
        C-->E;
        E-->F;
        D-->F;
        F-->G;
    ```

对应的效果：

![](https://help-assets.codehub.cn/enterprise/20191224143946.png)


### 时序图

    ```graph
    sequenceDiagram
        participant z as 洋葱猴 A
        participant l as 洋葱猴 B
        loop 日复一日
            z->>l: 敲代码了吗今天？
            l-->>z: 敲了，您呢？
            activate z
            Note left of z: 想了一下
            alt 还没呢
                z-xl: 还没呢，正准备打开 CODING
            else 敲了，正遛弯儿呢
                z-xl: 我也敲了，哈哈
            end
            opt 大过年的
                l-->z: 祝您新年好啊
            end
        end
    ```

对应的效果：

![](https://help-assets.codehub.cn/enterprise/20191224145131.png)


### 甘特图

    ```graph
    gantt
            dateFormat  YYYY-MM-DD
            title Adding GANTT diagram functionality to mermaid
            section A section
            Completed task            :done,    des1, 2014-01-06,2014-01-08
            Active task               :active,  des2, 2014-01-09, 3d
            Future task               :         des3, after des2, 5d
            Future task2               :         des4, after des3, 5d
            section Critical tasks
            Completed task in the critical line :crit, done, 2014-01-06,24h
            Implement parser and jison          :crit, done, after des1, 2d
            Create tests for parser             :crit, active, 3d
            Future task in critical line        :crit, 5d
            Create tests for renderer           :2d
            Add to mermaid                      :1d
    ```

对应的效果：

![](https://help-assets.codehub.cn/enterprise/20191224145235.png)

==== 2020/08/13 ====
