---
layout: default
---

[主页](../index.md)

# react router

## router

```jsx
export default initailRouter = [
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
];
```

## main.jsx

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
