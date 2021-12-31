---
title: 创建知识空间 - CODING 帮助中心
pageTitle: 创建知识空间
pagePrevTitle: 产品介绍
pagePrev: document/knowledge/intro.html
pageNextTitle: 管理知识空间
pageNext: document/knowledge/manage.html
---

进入「知识管理」后，点击创建知识空间，输入空间名称并勾选成员的访问权限范围后完成创建。若未发现此功能，请开启[功能开关](/docs/document/knowledge/intro.html)。

![](https://help-assets.codehub.cn/enterprise/20211009164142.png)

### [新建文档](#write)

点击左侧的蓝色按钮，填写标题与内容后即可完成文档创建。

![](https://help-assets.codehub.cn/enterprise/20211013153450.png)

### [编写文档内容](#write)

知识空间的文档内容由各种类型的「内容块」共同组织呈现，熟练掌握编写的基础操作方法与选择合适的文本类型能够极大地优化你的文档创作体验。

#### [基础操作](#basic-tools)

**加号按钮**：当你将鼠标移至空白页面处，或准备在已有内容块下方新建内容时，点击左侧的加号按钮选择内容类型。

![](https://help-assets.codehub.cn/enterprise/20211009152340.png)

**菜单按钮**：创建内容块后，点击左侧的菜单按钮能够针对该内容块进行以下操作：

-   拷贝
-   转换内容块类型，例如你可以将文本类型转换为待办列表、标题转为文本。
-   复制链接，打开后将自动定位至内容块所在位置。
-   对齐，包含左对齐、居中与右对齐。
-   颜色，支持更改内容块的文本颜色与背景颜色。
-   删除
-   [拖拽](#drag)

![](https://help-assets.codehub.cn/enterprise/20211009160859.png)

**命令行**：输入 `/` 字符可以呼出类型列表，例如输入 `/text` 命令可以快速创建文本类型内容块。

![](https://help-assets.codehub.cn/enterprise/20211009161940.png)

掌握上述的基础编写方法后，点击页面的空白处后就将生成文本类型内容块。你还可以填入列表、表格、数学公式与代码等内容。

#### [文本块](#word)

文本块包含以下类型：

-   文本 `/text`
-   一级到四级标题 `/h1-/h4`
-   无序 `/ul` / 有序 `ol` / 待办 `/todo` / 折叠列表 `/ci`

#### [表格块](#table)

命令行：`/table`

表格支持表头设置，默认定义首行为表头。表格列支持列宽调整与顺序调整，还支持在表格内写入文本、列表、数学公式、代码、插入图片与附件。

创建表格后建议输入表格标题，能够方便在全文中检索。

![](https://help-assets.codehub.cn/enterprise/20210924164031.png)

点击首列或首行，可以选择设置为表头。为方便特殊表格的查看，还能够选择以全款显示展示表格。

![](https://help-assets.codehub.cn/enterprise/20210924170732.png)

#### [代码块](#code)

命令行：`/code`

代码块中支持选择语言类型，不同类型的语法会决定代码的着色情况。可以选择添加标题以方便检索。

![](https://help-assets.codehub.cn/enterprise/20211008165224.png)

#### [数学公式块](#math)

命令行：`/equation`

数学公式支持以 LaTeX 语法的公式输入和编辑，点击了解[语法详情](https://uinika.gitee.io/Zen/LaTex/)。

![](https://help-assets.codehub.cn/enterprise/20210924171742.png)

#### [多媒体](#media)

要让文档图文并茂，少不了引用图片与文件。点击内容块左侧的加号按钮后选择图片，或输入 `/image` 命令唤出多媒体类型内容块进行图片上传。

![](https://help-assets.codehub.cn/enterprise/20211011114723.png)

点击内容块左侧的加号按钮后选择文件，或输入 `/file` 命令可以进行附件上传。图片与文件的访问 / 编辑 / 分享权限与文档页保持一致。

![](https://help-assets.codehub.cn/enterprise/20210926152439.png)

### [引用团队内资源](#quote-content-issue)

若希望引入 CODING 团队中的项目内事项或其他知识空间时，输入 `#` 字符或使用 `/resource` 命令唤出检索窗口。

![](https://help-assets.codehub.cn/enterprise/20211011115402.png)

以下是检索规则：

<!---   `#` + `全局资源编号` 引用团队内全局资源，例如事项或知识空间中的文档-->
-   `项目标识` + `#` + `资源编号` 引用特定项目内的事项
-   `#` + `资源编号` 引用当前项目事项资源（仅在项目空间内生效）

例如，若要引用事项 A 的 01 号事项，填入 `A#01` 即可。

![](https://help-assets.codehub.cn/enterprise/20211013155325.png)

![](https://help-assets.codehub.cn/enterprise/20211013155402.png)

> 引用后，若无资源访问权限，亦无法打开。

### [提及成员](#cooperate)

在文档中提及成员进行任务说明是常见的协作场景，直接在文档中输入 `@ + 成员名称` 或使用 `/member` 命令就可以提及成员。

![](https://help-assets.codehub.cn/enterprise/20211008162321.png)

### [拖拽操作](#drag)

长按菜单按钮还可以用于拖拽操作，拖拽块至块的不同位置将触发相应的操作效果：

位置 | 效果
---------|----------
 上方 | 排序（移动到目标块同层） 
 下方 | 排序（移动到目标块同层） 
 块内 | 设置为目标块的子项，排列在子项的末尾
 左侧 | 触发分栏
 右侧 | 触发分栏

### [调整文本样式与颜色](#style)

选中文本内容后，可以进行加粗、斜体、下划线、引用资源、改变字体或背景颜色等操作。

![](https://help-assets.codehub.cn/enterprise/20211009161054.png)

![](https://help-assets.codehub.cn/enterprise/20210927102603.png)

### [调整文档宽度](#wide)

点击侧边栏还可以进行宽度调整，在视窗宽度不足时自动折叠并切换为悬浮状态。

![](https://help-assets.codehub.cn/enterprise/20210927200113.png)

==== 2021/10/11 ====
