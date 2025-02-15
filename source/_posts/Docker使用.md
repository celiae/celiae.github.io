---
title: Docker使用
excerpt: Docker能制造虚拟环境，启用多个服务，能映射端口，比虚拟机轻便。当开发使用多个中间件时，用docker也能方便制造生产环境，快速启动应用程序。
toc: true
categories:
  - 虚拟技术
tags:
  - Docker
---

## Docker

Docker能制造虚拟环境，启用多个服务，能映射端口，比虚拟机轻便。当开发使用多个中间件时，用docker也能方便制造生产环境，快速启动应用程序。

## 安装

ArchLinux能直接安装，比Ubuntu方便，Ubuntu还要添加独立的docker软件包源。

```shell
sudo pacman -S docker
```

用root权限太高了（sudo），比较习惯加入docker用户组。

```shell
sudo gpasswd -a celiae docker # 退出系统登陆生效
```

Dockerfile是用来创建自定义镜像；docker-compose.yml可整合多个镜像,
常用于在启动容器时配置运行参数,便于命令行操作。多镜像容器尽量使用docker-compose配置文件来管理，我的用户加入了docker组，所以在用户目录下`~/srv/docker`
存放docker-compose配置文件。
例如`~/srv/docker/nextcloud/docker-compose.yml`，`~/srv/docker/gitlab/docker-compose.yml`。

因为要下载镜像，所以需要大量磁盘空间，正常根分区100~
200G肯定不够，一些AI模型轻易到达几十G，扩容是常有的事，ArchLinux默认镜像安装路径在`/var/lib/docker`，注意磁盘空间。
也可以更改，编辑配置文件`sudo vim /etc/docker/daemon.json`

```json
{
  "data-root": "/mnt/docker"
}
```

## 迁移数据

在前期部署时可能没有意识到，镜像磁盘占用问题，但是已经运行了一些很重要的容器，Docker目前还没有多镜像路径的支持，所以只能全部迁移，路径的配置已表述，容易出事就在数据。

### 坑

在复制命令这步，用常规的也是ArchWiki中提到的`cp -r`**不能**
完全复制，文件元数据和权限会有问题，一些容器启动不了。所以用`rsync`，将原先的数据完全复制，注意路径。

```shell
rsync -avzHP /var/lib/docker /mnt/storage/  # /var/lib/docker复制到/mnt/storage/下
```

ArchLinux里默认是`/var/lib/docker`，`/var/lib/docker`是docker默认所在位置，通过`docker info | grep 'Docker Root Dir'`
命令查看，`docker info`是查看docker配置信息的。建议放在固态硬盘里，docker系统还是吃读写的。
迁移好后重新配置`/etc/docker/daemon.json`的data-root，重启docker服务。

```shell
# 编辑好配置文件（/etc/docker/daemon.json）后执行 
sudo systemctl restart docker
```

所以最好在安装时就设计好镜像放在哪，[测试新路径](#如何测试新路径)没问题后，也可以删除原来的镜像`/var/lib/docker`。

#### 如何测试新路径

查看docker日志，用systemctl或者journalctl，检查新路径权限，新路径位置有没有报错，有报错就参考之前的路径，要和`/var/lib/docker`
里的一模一样。
配置没问题了，就检查每一个容器是否能正常启动`docker ps`，注意`status`
中没有up的，容器间往往会有依赖，被依赖的无法启动那么应用就无法正常使用，对于出错的容器，检查容器中的端口映射，文件夹卷位置和权限是否正常。
注意，数据库容器比较容易出问题，用`cp -r`迁移是大概率不行的，有好几个容器都是数据库重启失败。

## Docker pull 代理

下载不了镜像。

```shell
[+] Running 0/1
 ⠸ db Pulling                                                                     16.4s
Get "https://registry-1.docker.io/v2/library/mysql/manifests/sha256:92a76edd85c16036676bc7e56db381012c9fc3b0979682a3e286a8f2e05611bc": Get "https://auth.docker.io/token?scope=repository%3Alibrary%2Fmysql%3Apull&service=registry.docker.io": net/http: TLS handshake timeout
```

`docker pull`的代理不走环境变量http_proxy，也不走`/etc/docker/daemon.json`里的proxy. 它有一个属于自己的设置。方法如下：

```bash
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo nano /etc/systemd/system/docker.service.d/http-proxy.conf
```

内容`http-proxy.conf`内容如下：

```bash
[Service]
Environment="HTTP_PROXY=http://<proxy_address>:<proxy_port>"
Environment="HTTPS_PROXY=http://<proxy_address>:<proxy_port>"
Environment="NO_PROXY=localhost,127.0.0.1,::1"
```

重启

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
systemctl show --property=Environment docker  #输出中应包含 HTTP_PROXY 和 HTTPS_PROXY
```

### 案例：运行 code-server

启动一个镜像会创建这个镜像的容器. 假如我们运行一个 code-server,我们想给一些参数

```bash
docker run -d \
  --name=code-server \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Asia/Shanghai \
  -e PASSWORD=password `#optional` \
  -e SUDO_PASSWORD=password `#optional` \
  -e DEFAULT_WORKSPACE=/config/workspace `#optional` \
  -p 8443:8443 \  #若容器需要接管本地流量, 则可开启映射端口
  -v /path/to/appdata/config:/config \
  --restart unless-stopped \
  lscr.io/linuxserver/code-server:latest
```

用`docker run`命令启动不好修改. 利用`docker-compose`，修改容器参数只需修改配置文件，在启动时利用配置文件。例如:

```yml
# docker-compose.yml
services:
  code-server:
    image: lscr.io/linuxserver/code-server:latest
    container_name: code-server
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai
      - PASSWORD=password
      - SUDO_PASSWORD=password
      - DEFAULT_WORKSPACE=/config/workspace
    volumes:
      - /path/to/appdata/config:/config
    ports:
      - 8443:8443
    restart: unless-stopped
```

默认读取当前文件夹下的docker-compose.yml文件, 选项`-d`意为 daemon 使它运行在后台

```bash
docker-compose up -d  # 使用./docker-compose.yml
docker-compose up -f path/to/docker-compose.yml -d  # 使用path/to/docker-compose.yml
```

文件名未必取`docker-compose.yml`，只是它是习惯用法，`Dockerfile`也是同理，通常在开发完工后会将项目打包成生产环境，默认通过Dockerfile里配置的环境生成镜像。

```bash
docker build -t celiae/ceblog:latest .  #  构建镜像 
```

稍等,可以得到镜像名为"celiae/ceblog",标签名为"latest"的镜像。latest通常为最新版.

#### 启用容器

端口映射1024到3000, 浏览器输入`localhost:1024`实际就会访问docker里的`localhost:3000`

```bash
docker run -p 1024:3000 celiae/ceblog:latest
```

检查运行情况，`docker ps -a`它会列出正在运行中的容器进程，`-a`代表显示包括没启动的容器

### DockerHub

```bash
docker push celiae/ceblog:latest  # 测试成功后推到 dockerhub
```

在 dockerhub 登陆账号在仓库(repository)中能看到 celiae/ceblog 的最新版本

```bash
docker pull celiae/ceblog:latest  # 获取镜像
docker run -d -p 1024:3000 celiae/ceblog:latest # 服务器上运行镜像
```

-d 运行在 daemon 后台

### Docker Compose

目前 Docker Compose 不推荐在 docker-compose.yml 文件里声明版本（version）：

```bash
WARN[0000] /home/celiae/Templates/mall4cloud-3.3/doc/中间件docker-compse一键安装/docker-compose.yaml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion
```

## MySQL

一般在docker中会搭一个MySQL用来开发，以区别宿主机自身的数据库。
数据迁移。

```shell
docker exec mysql-db-1 mysqldump -u root database_name -p mysql-password > /tmp/db_backup.sql
```

警告在命令中输入密码不安全，没关系，只要不是生产环境。

```shell
mysqldump: [Warning] Using a password on the command line interface can be insecure.
```

在新环境中执行备份出来的sql文件即可。
