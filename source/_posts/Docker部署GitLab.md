---
title: Docker部署GitLab
excerpt: GitLab是一个代码托管服务软件，它也有公共的平台类似Github，因为能够自行部署社区版本的GitLab，所以常用于企业和私人的托管环境，闭源软件的版本控制。
toc: true
categories:
  - 虚拟技术
tags:
  - Docker
---

GitLab是一个代码托管服务软件，它也有公共的平台类似Github，因为能够自行部署社区版本的GitLab，所以常用于企业和私人的托管环境，闭源软件的版本控制。

## 部署

ArchWiki有在实体机上部署的文档，实测不太好用，用Docker在ArchLinux上部署GitLab节省时间。

### Docker Compose

配置docker compose `vim docker-compose.yml`

```shell
services:
  gitlab:
    image: 'gitlab/gitlab-ce:latest'
    container_name: gitlab
    restart: always
    hostname: '192.168.1.200'  # 改为你的域名或IP
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        gitlab_rails['gitlab_shell_ssh_port'] = 2224  # SSH端口
        # 添加其他配置
    ports:
      - '2048:80'      # HTTP
      - '2049:443'    # HTTPS
      - '2224:22'    # SSH
    volumes:
      - '/mnt/sdb1/gitlab/config:/etc/gitlab'
      - '/mnt/sdb1/gitlab/logs:/var/log/gitlab'
      - '/mnt/sdb1/gitlab/data:/var/opt/gitlab'
    shm_size: '256m'
```

端口配置只要保证不与本机暴露端口冲突即可，默认的22端口一般作ssh服务，所以要改。
2224端口就是用于git命令远程推送端口，2048是浏览器访问端口，2049是https（一般不用），因为是局域网，所以配置了GitLab服务器IP`192.168.1.200`。
注意这三个路径，我配置到了外部存储，防止根目录占用过多。

- '/mnt/sdb1/gitlab/config:/etc/gitlab'
- '/mnt/sdb1/gitlab/logs:/var/log/gitlab'
- '/mnt/sdb1/gitlab/data:/var/opt/gitlab'

```shell
docker-compose up -d
```

### 访问GitLab

局域网内用户在浏览器访问`192.168.1.200:2048`，注册用户，一般不用管理员账号。

### 管理界面

第一次使用是不能登陆的，会发现注册后无法登陆，账号是未激活状态。只有管理员激活才能登陆，管理员默认账号是root，密码是随机生成的。
如何查看root密码：

```shell
docker exec -it gitlab cat /etc/gitlab/initial_root_password
```

注意`-it`后接你实际的容器名

找到注册用户的设置，找Approval字样，点击激活。
