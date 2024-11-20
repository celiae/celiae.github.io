---
title: Linux状态监控
excerpt: nload 网络网速
date: 2024-08-11 15:09:00
updated: 2024-08-11 15:09:00
categories:
  - 运维
  - 监控
tags:
  - Linux
---

Linux 没有像 Windows 的资源管理器，但一些工具一样可以发挥作用，且能看到更详细的信息

* top: CPU占用/内存占用/进程信息
* free/vmstat: 内存
* iostat: io,硬盘读写
* ss/nload/netstat: 网络网速

其中

iostat 属于 `extra/sysstat` 包: 
netstat 属于 `core/net-tools` 包: 

top 命令最常用展示的信息也最全面
```bash
top
top -o %MEM # 按内存占用大小降序排列，通常用来排除内存占用最高的进程
top -o %CPU # 同理
vmstat 1    # 输出1次
vmstat 10    # 输出10次
free
iowait
sar
iostat 
nload   # 网络速率
```

