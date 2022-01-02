# CODING 帮助中心

[![CI](https://github.com/Coding/coding-docs/actions/workflows/ci.yml/badge.svg)](https://github.com/Coding/coding-docs/actions/workflows/ci.yml)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

本仓库是 CODING 帮助中心的文档，采用 Hexo 框架，Markdown 格式，通过持续集成强制检查下列规范：

-   Git commit：[commitlint](https://juejin.im/post/6844903710112350221) 
-   Markdown 英文：[remark](https://www.npmjs.com/package/remark-cli)
-   Markdown 中文：[lint-md](https://github.com/lint-md/lint-md)

参与本项目之前，建议先学习视频课程：[DevOps 代码质量实战：代码规范与 Git Flow](https://cloud.tencent.com/edu/learning/live-2837)

## 目录结构

```text
├── Jenkinsfile
├── _config.yml # Hexo 配置
├── generate-overview.js
├── patches
│   └── hexo-renderer-marked.patch # 中文锚点补丁
├── source # 所有文档
│   ├── _data
│   │   └── navigation.yml # 导航配置
│   ├── foo
│   └── bar
└── themes
    └── coding-help
```

## 本地构建

```bash
npm install

# 本地预览
hexo serve
open http://127.0.0.1:4000/docs/start/new.html
最佳实践：http://localhost:4000/docs/best-practices/overview.html

# 生成 HTML
hexo generate

# 最佳实践的概览页
# 注意 json 文件的 image 字段和 link 字段的格式，image 字段只需写图片名字，图片放在 themes/coding-help/source/images/best-practices

vi source/_data/best-practices.json
npm run best
npm run dev
open http://localhost:4000/docs/best-practices/overview.html
```

## 本地开发

```shell
git checkout master
git pull
git checkout -b issue-123
vi xxx.md
git add xxx.md

# 运行标准化提交插件，按照提示输入信息
npm install -g commitizen cz-conventional-changelog
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
git cz

git push origin issue-123

# 网页创建合并请求
```

### 持续集成

合并请求会触发持续集成，强制检查规范，如果失败，修改后重新提交。

如果持续集成报错：git commit 不规范，参考文章进行修改：[修改 git 历史提交 commit 信息（重写历史）](https://help.coding.net/docs/ci/practice/lint/git-commit.html#modify)。

commit 修改难度较高，也可回到 master，重新创建分支（注意不要重名），复制文件，重新提交。

### Code Review

持续集成通过后，由同事进行 code review，如果有问题，修改后重新提交。

code review 原则：

-   每次合并请求都必须经过 review；
-   及时进行：不要跨天；
-   必须通读，大部分时候都会发现问题；如果从来发现不了问题，随意批准，将被吊销 review 资格。
