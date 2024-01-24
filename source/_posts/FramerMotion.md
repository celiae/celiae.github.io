---
title: FramerMotion
excerpt: npm install framer-motion
date: 2022-05-26 20:46:25
updated: 2024-01-09 16:04:00
categories: 
  - 开发
  - 前端
tags:
  - React
  - Framer-Motion
  - Jsx
---

## 安装

```bash
npm install framer-motion
```

## 代码

### NormalTransition.jsx

```jsx
import React from "react";
import {motion} from "source/_posts/FramerMotion";

export default function SpecificTransition({children}) {
    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
            {children}
        </motion.div>
    );
}
```

### layouts/index.jsx

```jsx
//...
<SpecificTransition>
  <Outlet />
</SpecificTransition>
//...
```
