---
title: ArchLinux部署Nginx
excerpt: Nginx是非常常用的Web服务软件，前端生产环境，系统负载均衡，反向代理这些互联网专业名词都离不开Nginx背景。
---
Nginx是非常常用的Web服务软件，前端生产环境，系统负载均衡，反向代理这些互联网专业名词都离不开Nginx背景。
## 安装Nginx

包管理器下载安装 `nginx`，启动 nginx

```bash
sudo pacman -S nginx  # ArchLinux
sudo systemctl enable --now nginx  # 自启动，并且开启nginx
```

编辑 nginx 配置文件`sudo vim /etc/nginx/nginx.conf`
```bash
# /etc/nginx/nginx.conf
user www-data;  # 负责运行nginx 的用户
worker_processes auto;  # 线程设置，自动
pid /run/nginx.pid; # 线程文件
include /etc/nginx/modules-enabled/*.conf;  # 包含其他配置文件

events {
  # events 配置模块
	worker_connections 768; # 最大连接数量
	# multi_accept on;
}

http {
  # http 配置模块

	sendfile on;
	tcp_nopush on;
	types_hash_max_size 2048;
	
	include /etc/nginx/mime.types;  # mime.types包含支持的文件类型，例如：jpg,png
	default_type application/octet-stream;

	ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
	ssl_prefer_server_ciphers on;

	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;

	gzip on;  # 启用 gzip 压缩

	include /etc/nginx/conf.d/*.conf; # 包含此路径下的配置文件
	include /etc/nginx/sites-enabled/*; # 启用的站点，一般在此路径配置 nginx 站点
}
```

保存并应用配置
```bash
sudo nginx -t # 测试 nginx 配置文件语法
sudo systemctl restart nginx # 测试 nginx 配置文件语法
```

## Docker部署

拉取 nginx 镜像
```bash
docker pull nginx
```

启动 nginx 镜像; 容器命名为 celiae-nginx; 只读挂载本地路径`/some/content`到Docker容器路径`/usr/share/nginx/html`; 只读挂载本地路径`/host/path/nginx.conf`到Docker容器路径`/etc/nginx/nginx.conf`; 静默启动; 映射本机8080端口到Docker容器80端口.
```bash
docker run --name celiae-nginx -v /some/content:/usr/share/nginx/html:ro -v /host/path/nginx.conf:/etc/nginx/nginx.conf:ro -d -p 8080:80 nginx
```

- `/usr/share/nginx/html` 前端页面部署的路径 (index.html)
- `/etc/nginx/nginx.conf` 是 nginx 全局配置文件

#### docker-compose.yml

使用nginx镜像;挂载`/templates`到Docker容器`/etc/nginx/templates`;映射本地:容器;通过环境变量设置地址和端口.
```bash
web:
  image: nginx
  volumes:
   - ./templates:/etc/nginx/templates
  ports:
   - "8080:80"
  environment:
   - NGINX_HOST=foobar.com
   - NGINX_PORT=80
```