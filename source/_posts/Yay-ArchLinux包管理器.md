---
title: Yay-ArchLinux包管理器
excerpt: yay就是用来下载那些不开源包的.也可以用yay代替pacman
date: 2022-05-26 20:46:25
updated: 2024-01-09 15:40:00
categories: 
  - 运维
tags:
  - 包管理器 
  - Yay 
  - ArchLinux 
---

## yay - AUR helper (AUR 包管理器)

基于 ArchLinux 的发行版有 pacman 做为核心的包管理器,里面收录的都是开源软件(仅仅只是免费但不开源的软件一般都没有),比如其中有[mariadb](https://mariadb.org/documentation/),但没有 [mysql](https://dev.mysql.com/doc/).`yay`就是用来下载那些不开源包的.也可以用`yay`代替`pacman`

## yay 安装过程

```bash
pacman -S --needed git base-devel # 安装依赖, ArchLinux 的基本开发环境
```

```bash
git clone https://aur.archlinux.org/yay.git # 从 ArchLinux 官方下载 yay 原始包
```

```bash
cd yay  # 进入目录
```

```bash
makepkg -si # 利用 ArchLinux 的工具"makepkg"安装 yay
```

```bash
yay # yay 更新系统(pacman+AUR)
```

```bash
sudo pacman -Syu  # pacman 更新系统(pacman)
```

能用开源用开源

## 遇到的问题

```bash
error: telegram-desktop: signature from "Jiachen YANG (Arch Linux Packager Signing Key) <farseerfc@archlinux.org>" is marginal trust
:: File /var/cache/pacman/pkg/telegram-desktop-4.0.2-4-x86_64.pkg.tar.zst is corrupted (invalid or corrupted package (PGP signature)).
Do you want to delete it? [Y/n]
error: failed to commit transaction (invalid or corrupted package)
Errors occurred, no packages were upgraded.
-> error installing repo packages
```

在很久没更新或者重装系统时经常会遇到,我们应该重新安装`archlinux-keyring`

```bash
sudo pacman -S archlinux-keyring
```

更新了`keyring`之后再次更新系统,大功告成

### 参考

- [Github yay](https://github.com/Jguer/yay)
- [AUR](https://wiki.archlinux.org/title/Arch_User_Repository)
