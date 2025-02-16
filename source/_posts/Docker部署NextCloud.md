---
title: Docker部署NextCloud
excerpt: Nextcloud是一款网盘软件，有极大的生态，ios/Android也有客户端软件，还能自动同步手机数据，支持同步ios实况图片，能配置redis，添加的外部存储包括Amazon S3/Minio等等，它让我刷新了对php的认识。
toc: true
categories:
  - 虚拟技术
tags:
  - Docker
---

Nextcloud是一款网盘软件，有极大的生态，ios/Android也有客户端软件，还能自动同步手机数据，支持同步ios实况图片，能配置redis，添加的外部存储包括Amazon
S3/Minio等等。
要想在Docker里的NextCloud添加外部存储，必须在Docker Compose里添加volume。

```shell
# ~/srv/docker/nextcloud/docker-compose.yml
volumes:
  nextcloud:
  db:

services:
  db:
    image: mariadb:10.6
    restart: always
    command: --transaction-isolation=READ-COMMITTED --log-bin=binlog --binlog-format=ROW
    volumes:
      - /mnt/sdd1/nextcloud/db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_PASSWORD=root
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud

  app:
    image: nextcloud
#    build: .
    restart: always
    ports:
      - 7080:80
    links:
      - db
    volumes:
      - /mnt/nvme0n1p7/celiae/nextcloud/html:/var/www/html
      - /mnt/sdb1:/mnt/sdb1
      - /mnt/sdc1:/mnt/sdc1
      - /mnt/sdd1/nextcloud/data:/var/www/html/data
      - /mnt/sdd1/nextcloud_sdd1_external:/mnt/sdd1
    environment:
      - MYSQL_PASSWORD=root
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_HOST=db
```

```shell
docker-compose up -d # 启用
```

此时，其他主机可能无法访问，提示没有trust，那是没有添加IP为信任IP。添加重启即可。

- 宿主路径 /mnt/nvme0n1p7/celiae/nextcloud/html/config/config.php
- Docker路径 /var/www/html/config/config.php

```shell
# /var/www/html/config/config.php
  'trusted_domains' =>
  array (
    0 => 'localhost:7080',
    1 => '192.168.1.200:7080',
  ),
```

再次启动，应用配置。

```shell
docker-compose stop # 关闭
docker-compose up -d # 启用
```
