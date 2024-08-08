---
title: Linux打开 BitLocker 加密盘
excerpt: 在Linux中，访问Windows下通过BitLocker加密的硬盘分区
date: 2024-08-08 15:09:00
updated: 2024-08-08 15:09:00
categories:
  - 运维
  - 配置
tags:
  - ArchLinux
  - 运维
  - Linux
---

在Linux中，访问Windows下通过BitLocker加密的硬盘分区

```bash
yay -S dislocker       #archlinux
sudo apt install dislocker  #ubuntu
```

找到BitLocker分区的设备路径，例如`/dev/sdb1`. 使用Dislocker命令来解锁BitLocker分区，并且获取解密后的分区映像。

```bash
sudo dislocker -v -V /dev/sdb1 -u#53!12345 -- /mnt/bitlocker
sudo ls /mnt/bitlocker
sudo mount -o loop,rw /mnt/bitlocker/dislocker-file /mnt/mount
sudo ls /mnt/mount
```