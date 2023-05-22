# lava-fe-example

本项目是 lava 前端的种子项目，用于快速创建新项目。

请在第一次拉取代码后执行以下操作：

1. 修改项目名称
   - 项目目录
   - package.json 中的 `name` 字段，如 `lava-fe-wasp`
   - 环境变量 .env 中的 `VUE_APP_NAME` 字段，如 `VUE_APP_NAME=wasp`
2. 修改端口，将 vue.config.js 中的 `SERVER_PORT` 常量改为需要的端口号
3. 修改项目全局 loading，将 public/index.html 文件中的 style 部分的 `#example` 改为 `#项目名`，如 `#wasp`
4. 安装依赖
   ```shell
   npm install
   ```
5. 安装 smart-ui-vue
   ```shell
   git clone git@github.com:oushu-io/smart-ui-vue-lab.git src/smart-ui-vue
   ```
6. 修改 svg-sprite-loader 包，将 /node_modules/svg-sprite-loader/runtime/browser-sprite.build.js 文件中的
   `var spriteNodeId = '__SVG_SPRITE_NODE__';` 中 spriteNodeId 变量的值改为 `__SVG_SPRITE_NODE_项目名称大写__`，如 `__SVG_SPRITE_NODE_WASP__`，然后执行 `npx patch-package svg-sprite-loader`。
7. 将 routes.ts 文件中 PREFIX 常量中的 example 换成项目名的大驼峰写法
8. 重置仓库，将根目录下的 .git 目录删掉，重新执行 `git init` 并提交，提交信息为 '项目名 init'。
9. 申请新的空白仓库，执行 `git remote add origin 空白仓库地址` 关联到远程仓库，执行 `git push`。

项目中要改的地方挺多的，如有疏漏，还望帮忙补充。

TODOs:
- [ ] loading 的样式，全局替换 `#example`，可维护性差