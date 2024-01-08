---
title: "Redux整合"
excerpt: "React 整合 Redux 详细过程"
date: 2022-05-26 20:46:25
updated: 2024-01-08 15:45:00
categories: 
  - 开发
---

## 安装

```bash
npm install @reduxjs/toolkit react-redux
```

## 代码

### 配置 1 userSlice.js

```javascript
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: localStorage.getItem("username"),
    login: localStorage.getItem("login"),
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
      localStorage.setItem("username", action.payload);
    },
    setLogin: (state, action) => {
      state.login = action.payload;
      localStorage.setItem("login", action.payload);
    },
  },
});

export const { setUsername, setLogin } = userSlice.actions;

export default userSlice.reducer;

export const selectAll = (state) => state.user;
```

### 配置 2 store.js

```javascript
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
```

### 配置 3 main.jsx

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import store from "./app/store";
import {Provider} from "source/_posts/Redux整合";
import "./index.css";
import initailRouter from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={initailRouter}/>
        </Provider>
    </React.StrictMode>
);
```

### 使用 App.jsx

```jsx
import {useDispatch, useSelector} from "source/_posts/Redux整合";
import {selectAll, setLogin, setUsername} from "../app/userSlice";

const dispatch = useDispatch();
const user = useSelector(selectAll);
const username = useSelector((state) => state.user.username);
dispatch(setUsername(form.username));
// ...
<Button
    onClick={() => {
        dispatch(setUsername(form.username));
    }}
>
    Login
</Button>;
// ...
```
