---
title: ArchLinux部署Nginx
excerpt: 包管理器下载安装 `nginx`，启动 nginx
---
# ArchLinux部署Nginx

## 安装 nginx

### 服务器原生安装 nginx

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

	##
	# Basic Settings
	##

	sendfile on;
	tcp_nopush on;
	types_hash_max_size 2048;
	# server_tokens off;

	# server_names_hash_bucket_size 64;
	# server_name_in_redirect off;

	include /etc/nginx/mime.types;  # mime.types包含支持的文件类型，例如：jpg,png
	default_type application/octet-stream;

	##
	# SSL Settings
	##

	ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
	ssl_prefer_server_ciphers on;

	##
	# Logging Settings
	##

	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;

	##
	# Gzip Settings
	##

	gzip on;  # 启用 gzip 压缩

	# gzip_vary on;
	# gzip_proxied any;
	# gzip_comp_level 6;
	# gzip_buffers 16 8k;
	# gzip_http_version 1.1;
	# gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

	##
	# Virtual Host Configs
	##

	include /etc/nginx/conf.d/*.conf; # 包含此路径下的配置文件
	include /etc/nginx/sites-enabled/*; # 启用的站点，一般在此路径配置 nginx 站点
}


#mail {
#	# See sample authentication script at:
#	# http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
#
#	# auth_http localhost/auth.php;
#	# pop3_capabilities "TOP" "USER";
#	# imap_capabilities "IMAP4rev1" "UIDPLUS";
#
#	server {
#		listen     localhost:110;
#		protocol   pop3;
#		proxy      on;
#	}
#
#	server {
#		listen     localhost:143;
#		protocol   imap;
#		proxy      on;
#	}
#}
```

保存并应用配置
```bash
sudo nginx -t # 测试 nginx 配置文件语法
sudo systemctl restart nginx # 测试 nginx 配置文件语法
```

### Docker

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