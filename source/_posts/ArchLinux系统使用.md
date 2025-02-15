---
title: ArchLinux系统使用
excerpt: 在安装了ArchLinux后，系统也该发挥作用，安装服务软件，部署开发环境。这几个配置文件不直接在已有的配置文件基础上修改，比如`/etc/environment`/`/etc/profile`等等，能保留系统安装时的模样。
toc: true
categories:
  - 系统
tags:
  - ArchLinux
---

在安装了ArchLinux后，系统也该发挥作用，安装服务软件，部署开发环境。

## 系统全局配置

典型的配置文件有

- `/etc/profile.d/`,建议全局配置脚本在此创建
- `~/.bashrc`，用户本身配置

这几个配置文件不直接在已有的配置文件基础上修改，比如`/etc/environment`和`/etc/profile`
等等，能保留系统安装时的模样。系统先执行`/etc`的全局脚本，最后执行`~/`用户脚本，所以用户脚本是可以覆盖系统脚本的。

### 配置步骤

如果我要配置代理，应用给所有用户，那么编辑`sudo vim /etc/profile.d/proxy.sh`

```shell
export https_proxy=http://127.0.0.1:7890
export http_proxy=http://127.0.0.1:7890
export all_proxy=socks5://127.0.0.1:7890
```

要配置默认编辑器，保证EDITOR环境变量有设置

```shell
export EDITOR=nano
```

## Yay - AUR helper

AUR 包管理器，安装未被收录在核心软件包的软件，通常下载 github 的 release 软件。使用魔法上网后可以安装且使用 `yay`。和 `pacman`使用方式基本一样，即可管理官方软件包，也可管理AUR包,可以用`yay`代替`pacman`。

```shell
pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

如遇到：

```bash
error: ... signature from "Jiachen YANG (Arch Linux Packager Signing Key) <farseerfc@archlinux.org>" is marginal trust
:: File ... is corrupted (invalid or corrupted package (PGP signature)).
Do you want to delete it? [Y/n]
error: failed to commit transaction (invalid or corrupted package)
Errors occurred, no packages were upgraded.
-> error installing repo packages
```

在很久没更新或者重装系统时经常会遇到,我们应该重新安装`archlinux-keyring`

```bash
sudo pacman -S archlinux-keyring  #更新了`keyring`之后再次更新系统
```

## Python PIP

俗称PyPi，安装`sudo pacman -S python-pip`，默认依赖源跑不满宽带，配置国内依赖源实测能跑满，很快。

```shell
pip config set global.index-url https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple
```

## Java 环境

用java写的程序一般默认带有jre或者jdk，所以不一定非要装java才能运行java软件。而开发Java程序则使用一个固定路径的JDK更为方便，而且可直接安装多个版本的OpenJDK：

```shell
sudo pacman -S jdk-openjdk jdk17-openjdk jdk8-openjdk
```

- jdk-openjdk是最新版本的jdk
- jdk17-openjdk是常用于SpringBoot3的开发
- jdk8-openjdk是很多开发项目的依赖

安装完成后默认的版本是最新版本的jdk`/usr/lib/jvm/default`软链接的目标目录，一些程序可能需要配置JAVA_HOME，17是个不错的选择。
利用ArchLinux自带的`archlinux-java`工具切换java版本：

```shell
archlinux-java status # 查看已安装的
archlinux-java set java-8-openjdk # 切换默认的jdk版本
```

配置JAVA_HOME，编辑`sudo vim /etc/profile.d/custom.sh`

```shell
export JAVA_HOME=/usr/lib/jvm/default
```

### vmoptions

vmoptions是在运行java程序时，可用于调整java虚拟机的选项，注意`.vmoptions`文件最好是可执行的

## Samba搭建

Samba是一个网络磁盘挂载软件，让你的磁盘文件共享在互联网。

### 安装

```shell
sudo pacman -S samba
```

配置文件默认存放在`/etc/samba/smb.conf`，在配置文件中找到类似这样的字样：

```shell
[Public]
  comment = Shared Folder
  path = /path/to/shared_folder
  browsable = yes
  read only = no
  guest ok = yes
  create mask = 0755
```

这就是要配置的共享文件夹，远程挂载时，访问的路径就是//192.168.1.100/Public，IP以实际为标准，`//`不能忽略。
修改默认，按需求配。

- `Public`是跟着IP后的网络文件夹名
- `/path/to/shared_folder`设为要共享的路径
- 权限按需求配

比如改成:

```shell
[sdb1_shared]
  comment = Shared Folder
  path = /mnt/sdb1
  browsable = yes
  read only = no
  guest ok = yes
  create mask = 0755
```

保存后重启

```shell
sudo systemctl restart smb.service
```

### 客户机访问

在Linux中，常用`mount`挂载cifs来接入samba：

```shell
sudo mount -t cifs //192.168.1.200/sdb1_shared /mnt
```

在Windows中，文件管理器中路径栏输入`//192.168.1.200/sdb1_shared`

## Ollama

Ollama是Meta开源的AI语言模型，ArchLinux已将它收录包管理器中，pacman可以直接安装。
在[ArchLinux桌面安装Xfce](ArchLinux桌面安装Xfce)中，涉及nvidia的驱动安装，一般AI软件带`cuda`版本号的才是用显卡计算的。本人搭载`技嘉3060ti g6x 8G`，实测能够启用ollama，默认的端口在11434。

### 安装

有`ollama`和`ollama-cuda`这两种软件包，`ollama`是软件核心也是CPU版本，`ollama-cuda`能启用Nvidia GPU，`ollama-cuda`依赖`ollama`。

```shell
sudo pacman -S ollama ollama-cuda
ollama run llama3.2:latest  # 终端启用ollama
```

安装ollama也会创建ollama用户，ollama数据存放在`/var/lib/ollama`，所有者是ollama.
llama管理的模型也可以设置存放路径，`sudo systemctl edit ollama`修改Environment="OLLAMA_MODELS=的值（注意阅读注释），移到保存区域，取消注释保存。

```shell
sudo chown -R ollama:ollama /path/to/ollama
sudo systemctl restart ollama.service
```

在终端与AI对话，个人搭建的AI通常比在线AI笨，处理简单问题比如写作文，算数；哲学问题和场景问题找在线AI更合适。本地AI好在比较稳定，网络环境差可勉强用。

## Minio

Minio是对象存储中间件，可在开发中管理系统中文件上传下载，获取文件的访问地址等等。在ArchLinux本机部署也比较简单，默认的端口在9199。

```shell
sudo pacman -S minio  # 安装minio包
```

配置minio`sudo vim /etc/minio/minio.conf`。

- MINIO_VOLUMES，文件存放地址，在Arch里默认是`/srv/minio`，与minio交互的文件或通过调用minio API处理的文件一律存放在此，一般选择空间大的挂载点；
- MINIO_ROOT_USER，管理员用户名，在登录管理界面时要用到，开发时也可以作access-key；
- MINIO_ROOT_PASSWORD，管理员密码，开发时也可以作secret-key；
- MINIO_OPTS，服务启动参数，`--address`是实际服务开启端口，也是API调用端口，`--console-address`是管理界面登录端口，如果不指定则会在每次启动服务时随机设置，在浏览器直接访问API调用端口时也会重定向到随机端口。

```shell
# /etc/minio/minio.conf
MINIO_VOLUMES="/mnt/sdb1/minio"
MINIO_ROOT_USER=root
MINIO_ROOT_PASSWORD=RqfedCcLbQ8
MINIO_OPTS="--address :5020 --console-address :5021"
```

以上所有配置都可以自定义，注意`MINIO_VOLUMES`的路径要是minio:minio的所有权和所有组，不这样配置可能会报错，其次可以看到`/srv/minio`的所有者就是minio。

```shell
# journalctl -xeu minio
Feb 14 00:10:32 kuafu minio[6301]: Error: unable to rename (/mnt/sdb1/celiae/minio/.minio.sys/tmp -> /mnt/sdb1/celiae/minio/.minio.sys/tmp-old/fbc20a83-fe9c-4416-a8d9-305ac337deb6) file access denied, drive may be faulty, please investigate (*fmt.wrapError)
......
Feb 14 00:10:32 kuafu minio[6301]: Error: unable to create (/mnt/sdb1/celiae/minio/.minio.sys/tmp) file access denied, drive may be faulty, please investigate (*fmt.wrapError)
......
Feb 14 00:10:32 kuafu systemd[1]: minio.service: Main process exited, code=exited, status=1/FAILURE
```

启动minio，API调用时使用5020端口，进入管理界面时用5021端口。

```shell
sudo systemctl daemon-reload
sudo systemctl enable --now minio
```

## Redis

Redis是常用的内存数据库软件，使用内存来存储经常调用的数据，以达到加速软件系统的数据交互，ArchLinux可直接安装，默认的端口在6379。

```shell
sudo pacman -S redis
```

## VirtualBox虚拟机

先安装,他会给你两个选项

1. virtualbox-host-dkms
2. virtualbox-host-modules-arch (选这个)

```bash
sudo pacman -S virtualbox virtualbox-guest-utils
......
# 启动发现用不了，找不到 `vboxdrv`. 安装模块
sudo pacman -S virtualbox-host-modules-arch
sudo modprobe vboxdrv
sudo modprobe vboxnetadp
sudo modprobe vboxnetflt
```

## Npm

配置国内镜像源。默认的npm资源站 `https://registry.npmjs.org/` 服务器距离远且被隔离，当下载有障碍时可以替换以下地址

```bash
npm config set registry http://mirrors.cloud.tencent.com/npm/ # 腾讯云
npm config set registry https://registry.npmmirror.com  # 淘宝
npm config set registry https://mirrors.huaweicloud.com/repository/npm/ # 华为云
```

`package.json`是npm初始化是必创建的文件，里面包含着所需要安装的包，版本等信息。

### npm install

npm install <package> 等于 npm install --save <package>. 它会将包列入到 package.json 中的 "dependencies" 对象里。--save-dev会列入到 "devDependencies"  中，dependencies: 是项目软件建造时需要的包，devDependencies: 是开发项目时所必须的包。

```bash
npm install <package>
npm install --save-dev <package>
```

## Linux状态监控

其中iostat 属于`extra/sysstat`包，netstat属于`core/net-tools`包

```bash
btop  # 全面的系统信息
top # CPU占用/内存占用/进程信息
top -o %MEM # 按内存占用大小降序排列，通常用来排除内存占用最高的进程
top -o %CPU # 同理
vmstat 1    # 内存,输出1次
vmstat 10    # 内存,输出10次
free  # 内存
iowait
sar
iostat  # io,硬盘读写 
nload   # 网络速率
```

## 注意

1. 要用到`rm -rf`命令时先移动`mv`到待删文件夹，若干天后再使用`rm -rf`，有的发行版直接alias rm -> mv。
2. 修改`/etc/default/grub`后使用`grub-mkconfig -o /boot/grub/grub.cfg`保存设置
