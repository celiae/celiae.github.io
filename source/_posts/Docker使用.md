---
title: Docker使用
excerpt: ArchLinux默认镜像安装路径在`/var/lib/docker`，注意磁盘空间，也可以更改。
---
## Docker

Docker能制造虚拟环境，启用多个服务，可以选择映射端口，比虚拟机轻便。用root权限太高了（sudo），比较习惯加入docker用户组，退出系统登陆生效。
```shell
sudo gpasswd -a celiae docker
```
Dockerfile是用来创建自定义镜像;docker-compose.yml可整合多个镜像, 常用于在启动容器时配置运行参数,便于命令行操作。多镜像容器尽量使用docker-compose配置文件来管理，我的用户加入了docker组，所以在用户目录下`~/srv/docker`存放docker-compose配置文件。
例如`~/srv/docker/nextcloud/docker-compose.yml`，`~/srv/docker/gitlab/docker-compose.yml`。

因为要下载镜像，所以需要大量磁盘空间，正常根分区100~200G肯定不够，一些AI模型轻易到达几十G，扩容是常有的事，ArchLinux默认镜像安装路径在`/var/lib/docker`，注意磁盘空间，也可以更改。
编辑配置文件`sudo vim /etc/docker/daemon.json`
```json
{
  "data-root":"/mnt/docker"
}
```

## 迁移数据
坑在复制命令这步，用常规的`cp -r`不能完全复制，文件元数据和权限等会有问题，一些服务启动不了。所以用`rsync`，将原先的数据完全复制，注意路径。
```shell
rsync -avzHP /var/lib/docker /mnt/storage/  # /var/lib/docker复制到/mnt/storage/下
```
ArchLinux里默认是`/var/lib/docker`，`/var/lib/docker`是当前所在位置，通过`docker info | grep 'Docker Root Dir'`命令查看，`docker info`是查看docker配置信息的。建议放在固态硬盘里，docker系统还是吃读写的。
迁移好后重新配置`/etc/docker/daemon.json`的data-root，重启docker服务。

## Docker pull 代理
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

启动镜像等于创建容器. 假如我们运行一个 code-server,我们想给一些参数

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


命令启动不好做修改. 利用 docker-compose 每次运行容器只需这个配置文件. code-server 的配置文件 docker-compose.yml:
```yml
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

```bash
docker-compose up -d  # 默认读取当前文件夹下的 docker-compose.yml 文件, 选项 -d 意为 daemon 使它运行在后台
```

通常在开发完工后会将项目打包成生产环境.

```bash
docker build -t celiae/ceblog:latest .  #  构建镜像 
```

稍等片刻,可以得到镜像名为"celiae/ceblog",标签名为"latest"的镜像.latest 以为最新版.

#### 启用容器

```bash
docker run -p 1024:3000 celiae/ceblog:latest
```

端口映射, 浏览器输入"localhost:1024",OK

```bash
docker ps -a  # 查询 -a 代表显示没启动的容器
```

它会列出正在运行中的容器进程

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

部分代码来自[linuxserver/code-server](https://hub.docker.com/r/linuxserver/code-server)
