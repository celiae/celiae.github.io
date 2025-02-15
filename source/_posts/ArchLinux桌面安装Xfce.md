---
title: ArchLinux桌面安装Xfce
excerpt: 桌面相比纯终端能显示更多信息，操控更多内容，对于个人电脑来说，不必在乎其占用的系统资源，你需要开发，浏览网页，远程桌面，纯计算场景不多，不装桌面节约不了多少资源，就算需要极致的计算，也可以关闭桌面程序。
toc: true
categories:
  - 系统
tags:
  - ArchLinux
---

为什么要装图形桌面？桌面相比纯终端能显示更多信息，操控更多内容，对于个人电脑来说，不必在乎其占用的系统资源，你需要开发，浏览网页，远程桌面，纯计算场景不多，不装桌面节约不了多少资源，就算需要极致的计算，也可以关闭桌面程序。
图形桌面需要安装两样，桌面软件（xfce/kde）和DisplayManager。Display Manager用于启动桌面。

```shell
sudo pacman -S xfce4 xfce4-goodies pavucontrol lightdm lightdm-gtk-greeter adobe-source-han-serif-cn-fonts noto-fonts-cjk noto-fonts-emoji noto-fonts-extra 
sudo systemctl enable lightdm.service
```

- `lightdm`显示管理器
- `xfce4`图形桌面
- `xfce4-goodies`桌面应用
- `libcanberra`PulseAudio的一个库，启动声音用
- `xfce4-pulseaudio-plugin`，`pavucontrol`启动键盘控制音量
- `gvfs`完善文件管理器组件
- `noto-fonts`特殊字体

## Fcitx输入法

`fcitx5-chinese-addons`是中文输入法的插件，包括五笔/拼音。

```shell
sudo pacman -S fcitx5 fcitx5-chinese-addons
```

编辑环境变量`sudo vim /etc/profile.d/fcitx.sh`

```shell
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
export SDL_IM_MODULE=fcitx
```

最后重启生效。不想重启也能直接启动`fcitx5 &`

## Nvidia 独立显卡驱动

在ArchLinux用N卡很跑AI，也需要此步骤。
**借鉴于** [ALT 显卡驱动安装](https://archlinuxstudio.github.io/ArchLinuxTutorial/#/rookie/graphic_driver)

### 启用32位软件包

在安装显卡驱动时，需要开启32位软件包源。修改文件 `/etc/pacman.conf`, 取消 `[multilib]` 模块的注释

```shell
[multilib]
Include = /etc/pacman.d/mirrorlist
```

更新包源，安装nvidia

```shell
sudo pacman -Sy
sudo pacman -S nvidia nvidia-settings lib32-nvidia-utils #必须安装
mkinitcpio -p linux
```

## 关于

最好的折腾就是不折腾，专注实用。

### colemak键盘布局

在大学接触到colemak，感觉它是一种设计很好的键盘布局，于是就学会了它的使用，之前在公司搞软件实施兼前端开发，强度不小，决定改用colemak。可惜每次我遇到问题需要同事来操作我的电脑时，都很不方便，我用别人电脑同理，用过很长一段时间，发现优势只有一个，英文打字手指轻松点，但本人不只有纯英文打字场景，还有：

1. 使用五笔中文打字,五笔根据qwerty设计的，分横竖撇捺折区
2. 类Vim工具，`jkl;`操作，包括`less`,`journalctl`等等
3. 工作合作，你用colemak，别人用qwerty，那么双方不好操作彼此电脑，很破坏人际关系
4. 软件实施工作，离开自己电脑，操作实体服务器时，很难再习惯qwerty

在大多数场景中没有很多优势，导致好好学的Vim也不想用了（参考colemak和qwerty的差异），同事想帮我也帮不了，总结下来弊大于利，目前转回了qwerty。

### I3

I3类的桌面，平铺布局,资源占用少,难学,手指吃亏，电脑性能可以的话不推荐。
