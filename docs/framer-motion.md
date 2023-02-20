---
layout: default
---

[主页](../index.md)

# framer motion

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
