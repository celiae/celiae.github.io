---
title: Ubuntu-Samba搭建
excerpt: 直接命令展示
date: 2024-01-18 14:40:00
updated: 2024-01-18 14:40:00
categories:
  - 运维
  - 配置
tags:
  - Linux
---

直接命令展示

```bash
sudo apt update
sudo apt install samba
```

```bash
sudo nano /etc/samba/smb.conf
```

```bash
...
[global]
workgroup = WORKGROUP
...

[shared_folder]
  comment = Shared Folder
  path = /path/to/shared_folder
  browsable = yes
  read only = no
  guest ok = yes
  create mask = 0755
...
```

```bash
sudo smbpasswd -a username
sudo service smbd restart
```