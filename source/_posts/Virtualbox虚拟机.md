---
title: Virtualbox虚拟机
excerpt: 要在 Arch 上使用 virtualbox 最简单就是安装`virtualbox-host-modules-arch`这个包
date: 2022-07-08 20:46:25
updated: 2024-01-09 15:45:00
categories: 
  - 运维
tags:
  - Virtualbox
  - ArchLinux
  - 虚拟机
---

## Virtualbox

先安装,他会给你两个选项

1. virtualbox-host-dkms
2. virtualbox-host-modules-arch (选这个)

```bash
sudo pacman -S virtualbox virtualbox-guest-utils
```

启动发现用不了，找不到 `vboxdrv`. 安装模块:

```bash
sudo pacman -S virtualbox-host-modules-arch
```

它与另一个包`virtualbox-host-dkms`相冲突,不过如要在 Arch 上使用 virtualbox 最简单就是安装`virtualbox-host-modules-arch`这个包

启用模块,还有网络模块.

```bash
sudo modprobe vboxdrv
sudo modprobe vboxnetadp
sudo modprobe vboxnetflt
```
