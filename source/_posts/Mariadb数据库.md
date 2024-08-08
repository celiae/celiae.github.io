---
title: Mariadb数据库
excerpt: 重置 root 密码
date: 2022-05-25 20:46:25
updated: 2024-01-09 15:57:00
categories: 
  - 运维
  - 数据库
tags:
  - Database
---

本文参考了ArchWiki 上的 [mariadb](https://wiki.archlinux.org/title/MariaDB)

## 安装 mariadb

```bash
sudo su # root 提权
```

```bash
pacman -S mariadb # ArchLinux 上安装 mariadb
```

```bash
mariadb-install-db \
--user=mysql\
--basedir=/usr \
--datadir=/var/utils/mysql # 启用进程之前做一些配置
```

```bash
systemctl enable --now mariadb  # 启用进程
```

```bash
mysql -u root -p  # 进入 mariadb
```

## 初始化

```bash
CREATE USER 'monty'@'localhost' IDENTIFIED BY 'some_pass';  # 新建用户
```

```bash
GRANT ALL PRIVILEGES ON mydb.* TO 'monty'@'localhost';  # 给予权限
```

```bash
FLUSH PRIVILEGES; # 刷新先前的权限设置
```

## 修改密码

```bash
use mysql # 跳转到"mysql"数据库
```

```bash
flush privileges; # 刷新权限
```

```bash
ALTER USER 'celiae'@'localhost' IDENTIFIED BY 'new_password'; # 修改
```

## 重置 root 密码

```bash
systemctl stop mariadb  # 停止 mariadb 进程
```

```bash
mysqld_safe --skip-grant-tables --skip-networking & # 启用 mysql 安全模式
```

```bash
mysql -u root # 连接进去
```

### 更改密码

```bash
use mysql
flush privileges;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
exit
```

```bash
kill $(cat /var/utils/mysql/$HOSTNAME.pid)  # 杀掉安全模式进程
```

```bash
systemctl start mariadb # 启用 mariadb 进程
```
