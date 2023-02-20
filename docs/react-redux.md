---
layout: default
---

# react redux

## 安装

```bash
npm install @reduxjs/toolkit react-redux
```

## 代码

### userSlice.js

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

### store.js

```javascript
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
```

### App.jsx

```jsx
import { useDispatch, useSelector } from "react-redux";
import { selectAll, setLogin, setUsername } from "../app/userSlice";

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
