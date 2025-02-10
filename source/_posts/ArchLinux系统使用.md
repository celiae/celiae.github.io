# ArchLinux系统使用
## 系统全局配置
典型的配置文件有
- `/etc/profile.d/`,建议全局配置在此创建，好
- `~/.bashrc`
这几样不直接在已有的配置文件基础上修改，能保留系统安装时的模样。，默认文本编辑器，JAVA_HOME路径

### 配置步骤
如果我要配置代理，编辑`sudo vim /etc/profile.d/proxy.sh`
```shell
export https_proxy=http://127.0.0.1:7890
export http_proxy=http://127.0.0.1:7890
export all_proxy=socks5://127.0.0.1:7890
```
要配置foo用户的默认编辑器，编辑`vim ~/.bashrc`
```shell
export EDITOR=nano
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

## Yay - AUR helper (AUR 包管理器)

安装未被收录在核心软件包的软件，通常下载 github 的 release 软件。使用魔法上网后可以安装且使用 `yay`，和 `pacman`
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

## Samba搭建
Samba是一个网络磁盘挂载软件，让你的磁盘文件共享在互联网。
### 安装
```shell
sudo pacman -S samba
```
配置文件默认存放在`/etc/samba/smb.conf`，在配置文件中找到类似这样的结构：
```shell
[shared_folder]
  comment = Shared Folder
  path = /path/to/shared_folder
  browsable = yes
  read only = no
  guest ok = yes
  create mask = 0755
```
这就是要配置的共享文件夹，远程挂载时，访问的路径就是//192.168.1.100/shared_folder，IP以实际为标准，`//`不能忽略。
修改默认按需求配。
- `shared_folder`是跟着IP后的网络文件夹名
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