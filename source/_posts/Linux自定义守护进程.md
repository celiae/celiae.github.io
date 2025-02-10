# 自定义守护进程
## 安装 clash

```bash
sudo pacman -S clash
```

### 获取**提供的配置文件

```bash
sudo mkdir /etc/clash # 创建配置文件存放地
```

配置文件放在/etc/clash/下

## systemd

创建文件`/etc/systemd/system/clash.service`, 参考模板

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
