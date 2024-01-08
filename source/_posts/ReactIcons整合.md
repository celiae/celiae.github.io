---
title: "ReactIcons整合"
excerpt: "React 图标库, 拥有丰富的图标资源, 且样式可控"
date: 2022-05-26 20:46:25
updated: 2024-01-08 15:31:00
categories: 
  - 开发
  - 前端
tags:
  - React 
---

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
