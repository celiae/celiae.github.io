---
title: MaterialUi组件库
excerpt: npm install @mui/material @emotion/react @emotion/styled
date: 2022-05-26 20:46:25
updated: 2024-01-09 15:57:00
categories:
  - 开发
  - 前端
tags:
  - Mui
  - 组件
---

## 安装

```bash
npm install @mui/material @emotion/react @emotion/styled
```

## 布局

### layouts/index.jsx

```jsx
import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveDrawer from "./AppDrawer";

export default function Layout() {
  const user = useSelector(selectAll);
  const mode = useSelector((state) => state.theme.mode);
  if (!user.login) {
    return (
      <ThemeProvider theme={theme}>
        <Outlet />
        <AppAlert />
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={mode == "light" ? theme : darkTheme}>
      <ResponsiveDrawer>
        <AppAlert />
        <SpecificTransition>
          <Outlet />
        </SpecificTransition>
      </ResponsiveDrawer>
      <AppSnackbar />
      <FormDialog />
    </ThemeProvider>
  );
}
```

## 居中盒

### layouts/CenterBox.jsx

```jsx
import { Box } from "@mui/material";
import React from "react";

export default function CenterBox({ children }) {
  return (
    <Box sx={{ display: "grid", height: "80vh", placeItems: "center" }}>
      {children}
    </Box>
  );
}
```
