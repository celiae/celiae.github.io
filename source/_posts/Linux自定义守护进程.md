---
title: Linux自定义守护进程
excerpt: 守护进程是系统自启动后台程序。以安装clash为例，让clash保持后台运行。通常后加的守护进程存放在`/etc/systemd/system`下。
---
守护进程是系统自启动后台程序。以安装clash为例，让clash保持后台运行。通常后加的守护进程存放在`/etc/systemd/system`下。

## 安装 clash

```bash
sudo pacman -S clash
```
获取提供的配置文件，放在/etc/clash/下
```bash
sudo mkdir /etc/clash # 创建配置文件存放地
```

## systemd
创建文件`/etc/systemd/system/clash.service`, 参考模板。

```bash
[Unit]
Description=Clash daemon, A rule-based proxy in Go.
After=network.target

[Service]
Type=simple
Restart=always
ExecStart=/usr/local/bin/clash -d /etc/clash -f /etc/clash/config.yaml

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable --now clash.service # 启动
```
