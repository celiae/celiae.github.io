---
title: Android系统刷机
excerpt: 小众的手机型号很难有较多的rom包(系统)支持，往往为了找到合适的包而花费大量时间，安装步骤倒很简单。
toc: true
categories:
  - 系统
---

小众的手机型号很难有较多的rom包(系统)支持，往往为了找到合适的包而花费大量时间，安装步骤倒很简单。有的开发者贡献的源码没有足够的测试，
实际能用的没几个。选购手机时最好买流行的、开放性强的。

查询自身手机的型号（红米k20pro），可以查到其对应的ROM包代号(raphael)
。一型号对应一代号。假如有的系统没有这个代号的版本，那么理论上就没有官方支持的rom包，也就不能安装想要的系统，例如我如果想安装LineageOS，
但是LineageOS没有raphael版本，那就相当于红米k20pro不支持LineageOS。此时要么用非官方的（不建议），要么选择用别的系统。

## 准备工作

备份手机中的重要数据，准备5样东西：

1. android tool
2. 电脑
3. 数据线
4. 系统包
5. twrp包
6. 手机

## 开始刷机

打开命令行终端并用数据线连接电脑与手机.

```bash
adb reboot bootloader # 重启手机到fastboot, 手机会息屏并重启fastboot
```

```bash
fastboot devices  # 查看在fastboot状态下的设备
```

### 刷入twrp

twrp 是前置系统，安装了它才能识别Pixel系统，才能用电脑配合adb sideload

```bash
fastboot flash recovery <twrp.img>  # 刷入twrp
```

```bash
fastboot boot <twrp.img>  # 重启到 twrp
```

### 手机初始化

利用twrp上的设置清空数据，来准备安装新系统

1. Swipe to Unlock 滑动解锁
2. Wipe -> Format Data -> 输入yes -> 确定 格式化手机
3. 返回主页面 -> Wipe -> Advanced Wipe -> 选择 Cache,System -> Swipe to Wipe 清楚系统缓存
4. 主页 -> Advanced -> ADB Slideload -> Swipe to Start Sideload 开始等待加载被刷入系统

### 刷入Pixel Experience

`<system.zip>`取决于下载的系统, 你可以选择其它系统包. 我实际测试过**魔趣**这个系统可以用. 其它的系统几乎都跑步起来

```bash
adb sideload <system.zip>
```

```bash
adb reboot  # 重启
```

## 安装后

系统设置向导会使用到 **google** , 如果没有科学上网，先通过离线模式完成初始化向导，上网了之后再重新开始初始化向导。

### 提前准备代理软件

举个例子, 准备一个梯子软件在电脑上. 刷完机, 设置完密码什么的, 先传输梯子软件到手机上, 再拔线. 之后在手机上找到传输来的软件
APK , 直接安装, 在导入配置文件. 在完成代理后, 可以再继续 google 设置.

### 使用Tiktok

测试于2022-11-2. tiktok 有很完善的检测机制. 要运行 tiktok 必须满足以下条件:

1. 系统语言为 English
2. 禁用 +86(中国) 的SIM卡
3. 开启代理(科学上网)
