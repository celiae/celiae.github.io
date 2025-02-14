---
title: ArchLinux桌面安装Xfce
excerpt: 图形桌面需要安装两样，桌面软件/Display Manager. Display Manager用于启动桌面.
---
## Xfce桌面

图形桌面需要安装两样，桌面和Display Manager。Display Manager用于启动桌面。

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
编辑环境变量
`sudo vim /etc/profile.d/fcitx.sh`
```shell
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
export SDL_IM_MODULE=fcitx
```
最后重启生效。也能直接启动`fcitx5 &`

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

### colemak键盘布局
用过很长一段时间，优势只有一个，英文打字手指轻松点，但本人不只有纯英文打字场景，还有：
1. 中文打字（五笔）,五笔根据qwerty设计的
2. Vim，`jkl;`操作
3. 工作合作，你用colemak，别人用qwerty，那么双方不好操作彼此电脑
弊大于利

### I3类的桌面
平铺布局,资源占用少,难学,手指吃亏，鼠标发明是有意义的。