---
layout: default
---

[主页](../index.md).

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

<!-- ## Drawer

```jsx
import * as React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { FaBeer } from "@react-icons/all-files/fa/FaBeer";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const upperNav = [
  { name: "Inbox", href: "/" },
  { name: "Starred", href: "/" },
  { name: "Send email", href: "/" },
  { name: "Drafts", href: "/" },
];
const lowerNav = [
  { name: "All mail", herf: "/" },
  { name: "Trash", herf: "/" },
  { name: "Spam", herf: "/" },
];

function ResponsiveDrawer(props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {upperNav.map((nav, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(nav.href);
              }}
            >
              <ListItemIcon>
                <FaBeer />
              </ListItemIcon>
              <ListItemText primary={nav.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {lowerNav.map((nav, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(nav.href);
              }}
            >
              <ListItemIcon>
                <FaBeer />
              </ListItemIcon>
              <ListItemText primary={nav.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <FaBeer />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
window: PropTypes.func,
children: PropTypes.node,
};

export default ResponsiveDrawer;

````
-->

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
