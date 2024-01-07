---
title: "mui"
excerpt: "避免造轮子的 UI 库"
date: 2022-05-26 20:46:25
updated: 2022-06-10 20:46:25
categories:
  - 开发
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
