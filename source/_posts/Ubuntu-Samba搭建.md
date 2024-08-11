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

首先安装 Samba 服务:

```bash
sudo apt update
sudo apt install samba
sudo nano /etc/samba/smb.conf #编辑 Samba 配置文件
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
mkdir -p /path/to/shared_folder #创建配置文件中指定的共享目录
sudo smbpasswd -a username  #将你的 Ubuntu 用户添加到 Samba 用户数据库中
sudo service smbd restart #配置完成后，重启 Samba 服务以使更改生效
sudo ufw allow samba  #如果你的系统启用了防火墙，你需要允许 Samba 服务通过防火墙
```