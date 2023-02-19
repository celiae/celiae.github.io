---
layout: default
---

[主页](../index.md)

# mui

## Layout

```jsx
import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveDrawer from "./AppDrawer";

export default function Layout() {
  return (
    <div>
      <ResponsiveDrawer>
        <Outlet />
      </ResponsiveDrawer>
    </div>
  );
}
```

## CenterBox

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
