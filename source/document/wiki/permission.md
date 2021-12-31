---
title: 权限配置 - CODING 帮助中心
pageTitle: 权限配置
pagePrevTitle: 访问权限
pagePrev: document/knowledge/permission.html
pageNextTitle: Markdown 语法参考
pageNext: document/wiki/markdown.html
alias: management/wiki.html
---

### [管理操作权限](#permission)

项目管理员可以项目管理员进入项目后，在【项目设置】->【项目与成员】->【用户组】中即可针对当前用户组，修改「访问」、「编辑」、「删除」、「分享」Wiki 的四项操作权限，并根据职能将项目成员对应加入拥有不同权限的用户组中。

![](https://help-assets.codehub.cn/enterprise/wiki28.png)

### [文档访问权限](#view-limited)

文档默认为项目内公开访问，仅文档维护者（默认为文档创建者）和项目管理员可修改文档的访问设置。

访问权限的作用是**「在成员现有 Wiki 操作权限的基础上，进一步对特定文档的操作权限加以限制」**，如需要修改项目成员的 Wiki 操作权限，请查阅[管理操作权限](#permission)。

Wiki 提供「默认」、「项目内可见」、「只读」、「隐藏」四种访问设置。

![](https://help-assets.codehub.cn/enterprise/wiki13.png)

*   注意：若勾选「保存并应用到子文档」，则所有子文档的原访问设置均会清除，将统一变更为父文档的权限设置。

-   默认
设置为「默认」的文档会应用父文档的访问设置。若该文档为一级文档，则对拥有 Wiki 访问权限的项目成员可见，与「项目内可见」设置的效果相一致，具备 Wiki 操作权限的项目成员都可以进行相应的操作。文档维护者不可修改，不受可见性设置影响。

-   项目内可见
对该项目内所有具备 Wiki 访问权限的成员可见。

-   只读
对具备 Wiki 访问权限的项目成员只读，仅允许文档维护者和项目管理员操作文档（编辑文档、更改分享设置、删除文档，或新建、操作子文档），并可以在访问设置页面设置多个维护者，在此权限设置下：
1.  如非文档维护者，即便项目成员拥有 Wiki 编辑权限也无法进行编辑；
2.  将一名不具备编辑权限的项目成员列为文档维护者，则该成员依然不能编辑该文档。

![](https://help-assets.codehub.cn/enterprise/wiki14.png)

-   隐藏
设置后该文档仅对文档维护者和只读成员可见，仅允许文档维护者和项目管理员操作文档（编辑文档、更改分享设置、删除文档，或新建、操作子文档），在设置权限时可以指定文档维护者和只读成员。 

![](https://help-assets.codehub.cn/enterprise/wiki15.png)

==== 2021/05/24 ====
