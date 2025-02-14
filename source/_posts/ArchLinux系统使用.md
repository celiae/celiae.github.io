---
title: ArchLinux系统使用
excerpt: 这几个配置文件不直接在已有的配置文件基础上修改，比如`/etc/environment`/`/etc/profile`等等，能保留系统安装时的模样。系统先执行`/etc`的全局脚本，最后执行`~/`用户脚本，所以用户脚本是可以覆盖系统脚本的。
---
## 系统全局配置
典型的配置文件有
- `/etc/profile.d/`,建议全局配置脚本在此创建
- `~/.bashrc`，用户本身配置

这几个配置文件不直接在已有的配置文件基础上修改，比如`/etc/environment`/`/etc/profile`等等，能保留系统安装时的模样。系统先执行`/etc`的全局脚本，最后执行`~/`用户脚本，所以用户脚本是可以覆盖系统脚本的。

### 配置步骤
如果我要配置代理，应用给所有用户，编辑`sudo vim /etc/profile.d/proxy.sh`
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
AUR 包管理器，安装未被收录在核心软件包的软件，通常下载 github 的 release 软件。使用魔法上网后可以安装且使用 `yay`，和 `pacman`
使用方式基本一样，即可管理官方软件包，也可管理AUR包,可以用`yay`代替`pacman`。
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
俗称PyPi，安装`sudo pacman -S python-pip`，默认依赖源跑不满宽带，配置国内依赖源
```shell
pip config set global.index-url https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple
```

## Java 环境
开发Java程序则需要JDK，可直接安装多个版本的OpenJDK
```shell
sudo pacman -S jdk-openjdk jdk17-openjdk jdk8-openjdk
```
- jdk-openjdk是最新版本的jdk
- jdk17-openjdk是常用于SpringBoot3的开发
- jdk8-openjdk是很多开发项目的依赖

安装完成后默认的版本是最新版本的jdk`/usr/lib/jvm/default`软链接的目标目录，一些程序可能需要配置JAVA_HOME，17是个不错的选择。
利用ArchLinux自带的`archlinux-java`工具切换java版本。
```shell
archlinux-java status # 查看已安装的
archlinux-java set java-8-openjdk # 切换默认的jdk版本
```
配置JAVA_HOME，编辑`sudo vim /etc/profile.d/custom.sh`
```shell
export JAVA_HOME=/usr/lib/jvm/default
```

### vmoptions
vmoptions在运行java程序时，可用于调整java虚拟机的选项，注意`.vmoptions`文件最好是可执行的

## Samba搭建
Samba是一个网络磁盘挂载软件，让你的磁盘文件共享在互联网。
### 安装
```shell
sudo pacman -S samba
```
配置文件默认存放在`/etc/samba/smb.conf`，在配置文件中找到类似这样的结构：
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
在Linux中，常用`mount`挂载cifs来接入samba，
```shell
sudo mount -t cifs //192.168.1.200/sdb1_shared /mnt
```
在Windows中，文件管理器中路径栏输入`//192.168.1.200/sdb1_shared`

## Ollama
Ollama是Meta开源的AI语言模型，ArchLinux已将它收录包管理器中，pacman可以直接安装，在[ArchLinux桌面安装Xfce](ArchLinux桌面安装Xfce)中，涉及nvidia的驱动安装，一般AI软件带`cuda`版本号的才是用显卡计算的。本人搭载`技嘉3060ti g6x`，能够启用ollama，默认的端口在11434。

### 安装
有`ollama`和`ollama-cuda`这两种软件包，`ollama`是软件核心也是CPU版本，`ollama-cuda`能启用Nvidia GPU。
```shell
sudo pacman -S ollama ollama-cuda
ollama run llama3.2:latest  # 终端启用ollama
```
安装ollama也会创建ollama用户，ollama数据存放在`/var/lib/ollama`，所有者是ollama.
llama模型也可以设置安装路径，`sudo systemctl edit ollama`修改Environment="OLLAMA_MODELS=的值（注意阅读注释），移到保存区域，取消注释保存。
```shell
sudo chown -R ollama:ollama /path/to/ollama
sudo systemctl restart ollama.service
```
在终端与AI对话，个人搭建的AI还是比不上在线AI，处理简单问题比如写作文，算数，哲学问题和场景问题找更合适。好在比较稳定，网络环境差可用。

## Minio
Minio是对象存储中间件，可在开发中管理系统中文件上传下载，获取文件的访问地址等等。在ArchLinux本机部署也比较简单，默认的端口在9199。
```shell
sudo pacman -S minio  # 安装minio包
```
配置minio`sudo vim /etc/minio/minio.conf`。
- MINIO_VOLUMES，文件存放地址，在Arch里默认是`/srv/minio`与minio交互的文件或通过调用minio API处理的文件一律存放在此，一般选择空间大的挂载点；
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


## 注意
1. 要用到`rm -rf`命令时先移动`mv`到待删文件夹，若干天后再使用`rm -rf`，有的发行版直接alias rm -> mv。
2. 修改`/etc/default/grub`后使用`grub-mkconfig -o /boot/grub/grub.cfg`保存设置
