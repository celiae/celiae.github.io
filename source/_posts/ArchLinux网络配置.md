---
title: "ArchLinux网络配置"
excerpt: "先启动 NetworkManager."
date: 2022-05-26 15:15:00
updated: 2024-01-08 15:15:00
categories: 
   - 运维
tags:
   - Linux 
   - ArchLinux 
   - NetworkManager
   - 网络
---

## NetworkManager WIFI 联网

NetworkManager 一般是桌面软件需要的联网工具

### 安装 networkmanager 包

```bash
sudo pacman -S networkmanager
```

### 先启动 NetworkManager

```bash
sudo systemctl enable --now NetworkManager
```

### 联网的两种方式

1. 图形界面 -安装 GNOME 桌面,点点点操作
2. 终端界面 - nmcli

   联网

   ```bash
    nmcli dev wifi con "Cafe Hotspot 1" \
    password caffeine name "My cafe"
   ```

   查看具体手册

   ```bash
   man nmcli
   ```
