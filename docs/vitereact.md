---
layout: default
---

[主页](../index.md)

# 开发命令

## 脚本

```bash
project_name=$1
npm create vite@latest $project_name
cd $project_name
npm install react-router-dom @mui/material @emotion/react @emotion/styled @mui/x-data-grid @reduxjs/toolkit react-redux react-icons
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
echo
"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
" > tailwind.config.cjs
echo
"
@tailwind base;
@tailwind components;
@tailwind utilities;
" > ./src/index.css
npm run build
npm run dev
```

## 搭建第一个 Vite - React 项目

```bash
npm create vite@latest
```

## 安装插件

### react-router mui redux react-icons

```bash
npm i react-router-dom @mui/material @emotion/react @emotion/styled @mui/x-data-grid @reduxjs/toolkit react-redux react-icons
```

### tailwindcss

```bash
npm install -D tailwindcss postcss autoprefixer
```

```bash
npx tailwindcss init -p
```

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 开发

```bash
npm run dev
```

## 构建应用

```bash
npm run build
```
