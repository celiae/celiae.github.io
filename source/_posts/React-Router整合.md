---
title: React-Router整合
excerpt: npm install react-router-dom
date: 2022-05-26 20:46:25
updated: 2024-01-09 15:50:00
categories: 
  - 开发
  - 前端
---

## 安装

```bash
npm install react-router-dom
```

## 代码

### router.jsx

```jsx
import { createBrowserRouter } from "react-router-dom";
import Login from "./router/Login";

const initailRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
]);
export default initailRouter;
```

### main.jsx

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

### layouts/index.jsx

```jsx
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
```
