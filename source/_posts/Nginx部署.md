---
title: Nginx部署
excerpt: 在 docker 安装 nginx
date: 2022-05-15 20:46:25
updated: 2024-01-09 15:56:00
categories:
  - 运维
tags:
  - nginx 
  - ArchLinux 
  - Linux
  - Web
---

使用nginx可以反向代理多个站点

## 在已有 Linux 上启用 nginx

下载 nginx

```bash
sudo pacman -S nginx
```

启动 nginx

```bash
sudo systemctl start nginx
```

编辑 nginx 配置文件

```bash
sudo vim /etc/nginx/nginx.conf
```

测试 nginx 配置文件语法

```bash
sudo nginx -t
```

在 docker 安装 nginx

```bash
docker pull nginx
```

