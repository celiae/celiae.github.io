---
title: "framer motion"
excerpt: "React 生态中的动画库"
date: 2022-05-26 20:46:25
updated: 2022-06-10 20:46:25
categories: 
  - 开发
---

## 安装

```bash
npm install framer-motion
```

## 代码

### NormalTransition.jsx

```jsx
import React from "react";
import { motion } from "framer-motion";

export default function SpecificTransition({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
