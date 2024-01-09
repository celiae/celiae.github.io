---
title: "Vue3 + Composition API环境搭建"
excerpt: "const size=ref(small)"
date: 2024-01-06 20:46:25
updated: 2024-01-08 15:51:00
categories:
  - 开发
  - 前端
tags:
  - Vue3
  - Composition API
  - Nodejs
  - Element-plus
  - 前端
  - Vue
---


### 框架搭建
找一个专门放代码的地方

``` bash
npx create-vue reservoir-vue
```

```bash
是否使用 TypeScript 语法？ » 否 / 是 #长期、非小型项目选`是`, 原型项目远`否`
是否启用 JSX 支持？ » 否 / 是    #一般用不到，选`否`
是否引入 Vue Router 进行单页面应用开发？ » 否 / 是  #经常用到，选`是`
是否引入 Pinia 用于状态管理？ » 否 / 是  #Vue3 composition Api 模式全局状态库，composition Api方式开发选`是`，反之`否`
是否引入 Vitest 用于单元测试？ » 否 / 是 #选`是`
是否要引入一款端到端（End to End）测试工具？ #选`Cypress`
是否引入 ESLint 用于代码质量检测？ » 否 / 是   #选`是`, 能够定位质量差的代码
是否引入 Prettier 用于代码格式化？ » 否 / 是  #选`是`, 有现成脚本将项目中的源码全部格式化，写代码无需考虑美观性
# ...
项目构建完成，可执行以下命令：

  cd reservoir-vue
  npm install
  npm run format
  npm run dev
# 对照以上提示命令复制粘贴执行，启动一个未修改过的前端
```
用编码工具打开`reservoir-vue/`文件夹
### 引入常用库

#### element-plus

```bash
npm install element-plus --save
```

修改`reservoir-vue/src/main.ts`
```ts
//...
//去掉css
//import './assets/main.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

app.use(ElementPlus)
```
`reservoir-vue/tsconfig.json`指定全局组件类型
```json
{
  "compilerOptions": {
    // ...
    "types": ["element-plus/global"]
  }
}
```
组件按需导入
```bash
npm install -D unplugin-vue-components unplugin-auto-import
```
`reservoir-vue/vite.config.ts`配置
```ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```
全局配置
1. `reservoir-vue/main.ts`完整引入
```ts
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
```
2. 按需引入(局部配置)
```vue
<template>
  <el-config-provider :size="size" :z-index="zIndex">
    <app />
  </el-config-provider>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
const zIndex=ref(3000)
const size=ref(small)
</script>
```
国际化
1. `reservoir-vue/main.ts`国际化
```ts
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//...
app.use(ElementPlus, {
  locale: zhCn,
})
```
2. 组件国际化
```vue
<template>
  <el-config-provider :locale="locale">
    <app />
  </el-config-provider>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const locale=ref(zhCn)
</script>
```
日期时间本地化
```bash
npm i dayjs
```
`reservoir-vue/main.ts`
```ts
import 'dayjs/locale/zh-cn'
```
#### nprogress
安装
```bash
npm i nprogress
```
`reservoir-vue/src/route/index.ts`
```
//...
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

//...
router.beforeEach((to, from, next) => {
  NProgress.start(); // 开始显示进度条
  next();
});

router.afterEach(() => {
  NProgress.done(); // 完成进度条，页面加载完成后停止进度条
});
```
### 基本配置
修改`reservoir-vue/index.html`标题
```html
<title>Vite App</title>
```
