---
title: Git使用
excerpt: 配置密钥对,根据提示生成密钥对存放在指定位置,默认在~/.ssh 下
date: 2022-05-14 20:46:25
updated: 2024-02-10 16:05:00
categories:
  - 软件工程
tags:
  - Git
  - Github
  - Linux
---

## 概念

Git 帮助单人程序员异地开发，多人团队合作开发. 个人目前使用到多个remote的拉取推送.

### 主流关键词

- Git 版本控制工具
- Github 国际代码托管平台
- GitLab 代码托管平台, 有公共平台, 也可自行部署, 常用于企业或个人代码仓库管理

#### main 和 master
我在新手时期很头疼, 世界公认的主分支范式到底是main 还是 master? git工具自身使用的是master, 而github又使用main. 
同时使用git&github, 一不注意就会又两个主分支. 原来, master 在西方文化中含有种族歧视的意义, 所以github平台更改了他们的主分支名称.
master -> main. 这就是为什么, 以前的github用master, 而现在用main. 我开始全部用main作主分支.

## 客户端使用

研究用于开发的主机是如何初始化Git, 配置远端同步, 代码更新流程.

### 本地建库

在项目根文件夹下,新建仓库.敲完后项目文件夹产生一个`.git`文件夹.先赐予当前目录版本控制系统

```bash
git init  # 会新建一个 .git/ 目录
git init --initial-branch=main  # 同上, 并且设定初始分支名称(推荐)
```

觉得代码写的有一定数量了，将项目里的所有文件(-A)添加到暂存区(stage).

```bash
git add -A  # 将修改代码提交到暂存区
git add .  # 同上, 这个更常用
```

代码完成，功能测试完毕。接下来提交暂存区里的内容到仓库(repo)他会打开系统默认文本编辑器,根据提示写下更新注释,保存退出.如果环境变量 EDITOR=vim,他就打开 vim.

```bash
git commit # 将暂存区提交
git commit -m 'message' # 同上, 或者直接提交更新注释'message'
```

### 查看信息

公钥放在 Github 上,私钥留在自己电脑里只有自己知道

```bash
git status  # 在需要了解项目状态时, 可以用到, 比如add了哪些,还有没有修改了没有add的等等.
```

```bash
git log # 查看提交日志, 历史提交记录
```

### 代码分支

```bash
git branch -M main  # 修改当前分支名
```

```bash
git branch -u origin/main  # 切换远端默认分支
```

### 同步远程

使用 ssh 私钥。配置密钥对,根据提示生成密钥对存放在指定位置,默认在~/.ssh 下, .pub是公钥文件,需传输到服务端, 
一般是附加到.ssh/authorized_keys文件中; 或者应用服务上直接添加(github/gitlab).
```bash
ssh-keygen -t ed25519 -C "<your_email>@example.com"
```

上传添加完公钥后,就可以使用不对称加密协议密钥. 启动一个ssh-agent, 再载入私钥文件. 如果私钥文件设置了密钥, 输入正确的密钥即可.
```bash
eval $(ssh-agent)
ssh-add /home/ceelia/.ssh/id_ed25519
```

地址写您实际git服务器. 添加一个默认(origin代表默认)的远端仓库(Github)
```bash
git remote add origin git@github.com:celiae/celiae.github.io.git
```

推送远端Git服务器,一下是几种方法,按情况选择:
```bash
git push --set-upstream origin  # 将本地的默认分支推送到远端同名分支
git push --set-upstream origin main:dev # 将本地的main分支推送到远端dev分支
git push -u origin main:dev # 更新分支. 将本地的main分支推送到远端dev分支
```

## Git Server

### 守护进程

搭建私域代码仓库，需要服务器最好是有公网，能异地提交代码。我的偏好是再新建一个`git`用户，此用户用来在服务器上专门管理代码仓库。

写一个守护进程服务，创建文件 `/etc/systemd/system/git-daemon.service`，模板如下
```
[Unit]
Description=Start Git Daemon

[Service]
ExecStart=/use/bin/git daemon --reuseaddr --base-path=/srv/git/ /srv/git/
Restart=always
RestartSec=500ms

StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=git-daemon

User=git
Group=git

[Install]
WantedBy=multi-user.target
```

启动`git-daemon.service`

### 代码存储

将现有的代码克隆出一个bare版本

```bash
git clone --bare <repo> <repo.git>  # <repo>是仓库文件夹，克隆出bare版本到"仓库.git"
```

再将bare版本的文件夹上传到服务器上的`/srv/git`目录下，注意目录权限。因为git用的也是ssh协议，所以可以像用ssh一样使用git

```bash
git clone ssh://git@<IP>:<PORT>/srv/git/<repo.git>
```

若ssh使用的是标准的22端口，那么可以简写

```bash
git clone git@<IP>:/srv/git/<repo.git>
```

设置远端地址以及推送方式大致一样

## 链接

**Github 文档**[Github Doc](https://docs.github.com)
