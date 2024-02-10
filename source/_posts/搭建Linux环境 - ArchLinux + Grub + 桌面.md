---
title: 搭建Linux环境 - ArchLinux + Grub + 桌面
excerpt: 通过工具注入到U盘中，U盘就有了系统，插入U盘到主板，计算机找到U盘系统启动，过程也就是加载U盘的Linux操作系统到内存中
date: 2022-05-14 20:46:25
updated: 2024-01-09 15:09:00
categories:
  - 配置
tags:
  - ArchLinux
  - 运维
  - Linux 
---

本文呈现了操作系统环境搭建。总结官方文档中本人需要的部分， 借鉴网络上的博客，总结使用ArchLinux的经验，归纳本人使用的计算机环境。

## 安装

提前准备：

- 镜像文件 `archlinux-2023.08.01-x86_64.iso`
- U盘 **>16G**
- 互联网

ArchLinux 版本根据实际调整，此处用的是`2023.08.01`版本

### 原理概述

`archlinux-2023.08.01-x86_64.iso`通过工具注入到U盘中，U盘就有了系统，插入U盘到主板，计算机找到
U盘系统启动，过程也就是加载U盘的Linux操作系统到内存中，此时的计算机就可以作为一个简易且性能低下的电脑，
性能瓶颈点在U盘。我们再将完整的Linux内核、Linux硬件驱动、应用程序安装到目标硬盘中做永存，待下次主板上电时，
BIOS能检测到系统盘，通过设置其优先启动，之后的每一次启动电脑就会默认加载其系统。

### 镜像文件下载

文件长这样：`archlinux-2023.08.01-x86_64.iso`, 版本灵活应变.
[点我进入下载页面](https://archlinux.org/download/),往下翻找到您的国家，比如China,
选一个`https`协议的下载链接进行下载.后缀名一个.iso,一个.iso.sig 两个都要下载

#### 确认资源安全性， `<version>` 替换成你实际文件版本

```bash
gpg --keyserver-options \
auto-key-retrieve --verify \
archlinux-<version>-x86_64.iso.sig
```

#### 或在已有的 ArchLinux 系统中执行

```bash
pacman-key -v archlinux-<version>-x86_64.iso.sig
```

### 系统U盘制作与使用

根据情况选择使用 Ether/rufus/dd 工具，**谨慎**设置盘符和镜像文件。

```shell
dd if=archlinux-2023.08.01-x86_64.iso of=/dev/sda bs=4096   #使用dd工具
```

#### 进入U盘

重启计算机，在开机过程中抓紧按 **F2/F12/DEL**（根据主板型号） 键进入BIOS，可以设置启动顺序，
U盘最先，也可以使用**覆盖启动**U盘。BIOS设置后，进入U盘的GRUB，选择 ArchLinux Install 并回车，
系统加载，直接到zsh命令行。

#### 关闭系统自动选择镜像源

```bash
systemctl stop reflector.service
```

#### UEFI or Legacy

判断是否为 UEFI 启动, 在目录 `/sys/firmware/efi/efivars` 下有文件则是 UEFI,
没文件则是 Legacy BIOS.目前大多数 PC 都是 UEFI 模式，所有步骤主要针对 UEFI 平台安装

```bash
ls /sys/firmware/efi/efivars
```

### 磁盘分区格式化

此步骤较灵活，最小需要的分区仅仅只有启动盘**EFI分区**和系统盘**根分区**，有这两个分区就能实现系统安装。
比较专业的场景不止会有**swap分区**和**home分区**，还会有**usr分区**,**var分区**等，根据场景而变化。

#### 磁盘情况

Linux 中一切皆文件，`/dev`目录用于存放系统所能识别的所有设备，设备以文件名标识，每个文件代表不同的设备。
比如：`/dev/sda1` 是Linux扫描到的第一块硬盘里的第一个分区。清晰自己的磁盘哪个分区放着哪些东西,
命令行参数根据自己的情况进行修改

```bash
lsblk # 列出所有磁盘
```

利用 `cfdisk` 工具,打开既有手册，**谨慎**分区硬盘,建议分区布局：

| 类型    | 假想设备路径    | 挂载点    | 推荐空间 |
|-------|-----------|--------|------|
| 启动盘   | /dev/sda1 | /boot  | 1G   |
| 内存交换盘 | /dev/sda2 | [SWAP] | 2G   |
| 系统盘   | /dev/sda3 | /      | 100G |
| 用户盘   | /dev/sda4 | /home  | 200G |

#### 注意

- `cfdisk` 工具操作磁盘, 磁盘文件"/dev/sda"根据自己的情况进行修改.
  实际上挂载点是灵活的,只要保证其他分区挂载点嵌套在根目录内都可
- 启动盘最好是1G左右，增加系统启动时的稳定性和容错率。启动盘是根基，若容量过小，
  随着系统数量增加和数据增加，可能会导致启动异常，极难恢复。
- 内存交换盘的设置对于个人电脑没有要求，是个可选项。在服务器里是必备的。
- 系统盘类似于 Windows 的C盘，数据量随着系统使用时长增加而增加
- 用户盘通常存放系统普通使用者的数据，可选项，为分担系统盘存储压力以及方便移植从而独立出来。

```bash
cfdisk /dev/sda
```

#### 挂接硬盘

```bash
mkfs.vfat /dev/sda1 #选择你的启动盘（efi分区）
mkfs.swap /dev/sda2 #选择你的内存交换盘（swap分区）
swapon /dev/sda2 #选择你的内存交换盘（swap分区）
mkfs.btrfs /dev/sda3  #选择你的系统盘（根分区）
mkfs.btrfs /dev/sda4  #选择你的用户盘（home分区）
mount /dev/sda3 /mnt  #挂载根分区，系统安装到此
mount --mkdir /dev/sda1 /mnt/boot #挂载EFI分区，grub安装到此
mount --mkdir /dev/sda4 /mnt/home #挂载HOME分区，独立出普通用户家目录
```

### 网络配置

此时硬盘已经配置完毕，接下来把系统安装到硬盘中。ArchLinux 镜像文件中不包含任何软件包，
所以需借助网络下载软件包。

#### wifi连接

拥有网线以太网无需此步骤，直接**检测是否联网**

```bash
iwctl #进入联网工具 iwctl
device list #查看网卡
station wlan0 scan #扫描 wifi
station device get-networks #扫描结果
station device connect <SSID> #连接相应 wifi SSID 为 wifi 名
exit #或者 Ctrl + d
```

#### 网络测试

```bash
ping archlinux.org  # 检测是否联网，有正确返回信息则成功
date  # 显示当前时间
timedatectl set-ntp true  # 如果时间不正确,请时间矫正
```

#### 换源

镜像源是下载软件包的服务器地址, 打开pacman镜像配置文件，把 **China** 那一块 URL 移到文件最上面。
通常每个地址有两种协议（**http**和**https**）,建议删掉**http**的地址,也就是不使用http协议的地址。
如此 pacman 则会优先从 China 源下载,速度更快。文件编辑器可使用 nano/vim/emacs 等

```bash
vim /etc/pacman.d/mirrorlist
```

### 安装系统包

将 ArchLinux 系统以及硬件驱动通过 `/mnt` 挂载点注入到硬盘中

```bash
pacstrap /mnt base linux linux-firmware
```

### 系统配置

安装完系统后，还需要配置系统的自动挂载盘、时区、语言、键盘布局、用户、主机名。

```bash
genfstab -U /mnt >> /mnt/etc/fstab  # 配置启动时自动挂载主分区
arch-chroot /mnt  # 切换根分区
```

_此时，执行完 arch-chroot 后，切换到新的系统中去，相当于从U盘系统切换到硬盘系统，
U盘系统的作用基本上到此为止_

#### 安装应用软件

```bash
pacman -S base-devel grub efibootmgr os-prober networkmanager \
  bash-completion nano vim git firefox chromium man-pages yarn ntfs-3g \
  unrar code
```

#### 启用网络

```shell
sudo systemctl enable --now NetworkManager    
```

#### 生成系统语言,对 `en_US.UTF-8` 一行取消注释

vim /etc/locale.gen

```bash
locale-gen
```

#### 系统必要配置

配置系统语言.主机名设为 'testhostname',可自行命名.设置 root 密码.创建用户,sudo 授权.
设置时区 Region/City 可替换为 Asia/Shanghai.一些软件需要用到 LANG 环境变量,设置为 en_US.UTF-8

```bash
echo 'LANG=en_US.UTF-8' > /etc/locale.conf
echo 'testhostname' > /etc/hostname
passwd
useradd -m testuser -G wheel && passwd testuser 
vim /etc/sudoers  # 为 testuser 开启 sudo 权限, 根据文件里的提示，取消 wheel的注释
ln -sf /usr/share/zoneinfo/Region/City /etc/localtime
mkinitcpio -P
```

#### 安装 grub,引导程序

```bash
grub-install --target=x86_64-efi \
--efi-directory=/boot/efi --bootloader-id=GRUB
```

如果你需要双系统,请 os-prober 自动扫描双系统:允许 grub 检测系统. true 改为 false,并取消注释

```bash
vim /etc/default/grub

...
GRUB_DISABLE_OS_PROBER=false
...
```

```bash
grub-mkconfig -o /boot/grub/grub.cfg  # 生成 grub 配置文件
exit  # 退出硬盘系统至 iso 安装系统，或者Ctrl+d
reboot  # 重启
```

## 安装后

以上完成ArchLinux的最小安装, 以下是系统偏好配置.

对于图形桌面

- KDE: 配置全面,动画多,硬件要求高,配置复杂
- GNOME: 配置简单,使用wayland
- xfce: 硬件要求低
- i3wm: 平铺布局,资源占用少,难学,手指吃亏

### 图形桌面

图形桌面至少需要安装两样: 桌面软件/Display Manager. Display Manager用于启动桌面.

#### KDE

```shell
sudo pacman -S plasma sddm konsole dolphin
sudo pacman -S adobe-source-han-serif-cn-fonts wqy-zenhei # 
sudo pacman -S noto-fonts-cjk noto-fonts-emoji noto-fonts-extra   
sudo systemctl enable sddm.service
```

#### GNOME

```shell
sudo pacman -S gnome-extra gdm
sudo pacman -S adobe-source-han-serif-cn-fonts wqy-zenhei # 
sudo pacman -S noto-fonts-cjk noto-fonts-emoji noto-fonts-extra   
sudo systemctl enable gdm.service
```

#### Xfce

```shell
sudo pacman -S xfce4 xfce4-goodies lightdm lightdm-gtk-greeter
sudo pacman -S adobe-source-han-serif-cn-fonts wqy-zenhei # 
sudo pacman -S noto-fonts-cjk noto-fonts-emoji noto-fonts-extra   
sudo systemctl enable lightdm.service
```

#### i3wm

默认配置的 i3wm。

```shell
sudo pacman -S i3-wm lightdm lightdm-gtk-greeter alacritty
sudo pacman -S adobe-source-han-serif-cn-fonts wqy-zenhei # 
sudo pacman -S noto-fonts-cjk noto-fonts-emoji noto-fonts-extra   
sudo systemctl enable lightdm.service
```

### 系统全局配置

配置因人而异，本人配置系统代理，键盘输入方法，默认文本编辑器，JAVA_HOME路径

#### `/etc/environment` 配置全局变量

```shell
https_proxy=http://127.0.0.1:7890
http_proxy=http://127.0.0.1:7890
all_proxy=socks5://127.0.0.1:7890
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
SDL_IM_MODULE=fcitx
EDITOR=nano
JAVA_HOME=/usr/lib/jvm/default
```

#### 配置colemak键盘布局

两种方式：

1. xorg，推荐。够稳定，切换不方便，较底层，适合长期colemak用户
2. 输入法，需要输入法启动，退格键没有映射


- xorg

  新建文件 `/etc/X11/xorg.conf.d/00-keyboard.conf`

  ```shell
  Section "InputClass"
    Identifier "system-keyboard"
    MatchIsKeyboard "on"
    Option "XbkLayout" "us"
    Option "XkbVariant" "colemak"
  EndSection
  ```

- 输入法

  桌面系统安装 `fcitx`, 找到 `colemak` 键盘布局，切换即可.

  默认情况下, caps lock 映射的 backspace 无法长按连续删除字符, 在 `.bashrc .zshrc`之类的文件中添加 `xset r 66` 命令.

  ```bash
  sudo vim /etc/profile	# <- xset r 66
  ```

  ```bash
  unset ...
  ...
  xset r 66
  ```

#### 启用32位软件包

在安装显卡驱动时，需要开启32位软件包源

修改文件 `/etc/pacman.conf`, 取消 `[multilib]` 模块的注释

```shell
[multilib]
Include = /etc/pacman.d/mirrorlist
```

```shell
sudo pacman -Sy # 更新包源
```

### Nvidia 独立显卡驱动

**借鉴于** [ALT 显卡驱动安装](https://archlinuxstudio.github.io/ArchLinuxTutorial/#/rookie/graphic_driver)

```shell
sudo pacman -S nvidia nvidia-settings lib32-nvidia-utils #必须安装
```

> 如果安装驱动后内核冲突，把 kms 从 /etc/mkinitcpio.conf 里的 HOOKS 数组中移除，并重新生成 initramfs。
> 这能防止 initramfs 包含 nouveau 模块，以确保内核在早启动阶段不会加载它。

```shell
mkinitcpio -p linux
```

### Yay 包管理器

使用魔法上网后可以安装且使用 `yay`，和 `pacman` 使用方式基本一样，即可管理官方软件包，也可管理AUR包。

```shell
pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```
