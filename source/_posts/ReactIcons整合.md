---
title: ReactIcons整合
excerpt: npm install react-icons
date: 2022-05-26 20:46:25
updated: 2024-01-09 15:49:00
categories: 
  - 开发
  - 前端
---

React 图标库, 拥有丰富的图标资源, 且样式可控

## 安装

```bash
npm install react-icons
```

## 代码

### App.jsx

```jsx
import { SiHomebridge } from "react-icons/si";

//...
return (
  <div>
    <SiHomebridge />
  </div>
);
//...
```

### 设置大小

```jsx
import { SiHomebridge } from "react-icons/si";

//...
return (
  <div>
    <SiHomebridge size={200} />
  </div>
);
//...
```
