---
title: Docker部署NextCloud
excerpt: 要想在Docker里的NextCloud添加外部存储，必须在Docker Compose里添加volume。
---
# Docker部署NextCloud

要想在Docker里的NextCloud添加外部存储，必须在Docker Compose里添加volume。
```shell
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
