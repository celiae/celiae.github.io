---
title: Linux组lvm盘
excerpt: 小众的手机型号很难有较多的rom包(系统)支持
date: 2024-08-11 15:09:00
updated: 2024-08-11 15:09:00
categories:
  - 运维
tags:
  - Linux
---

```bash
sudo pacman -S lvm2
pvcreate /dev/sdb
vgcreate vg_data /dev/sdb
lvcreate -L10.9t -n lv_data vg_data
lvdisplay
```