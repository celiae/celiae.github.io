---
layout: default
---

# tailwindcss

## 安装

```bash
npm install -D tailwindcss postcss autoprefixer
```

## 配置

```bash
npx tailwindcss init -p
```

### tailwind.config.cjs

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 代码

### App.jsx

```jsx
<div className="text-xl">hello</div>
```
