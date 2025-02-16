---
title: ArchLinux部署OpenVPN
excerpt: OpenVPN是一款开源VPN软件，包括服务端软件和客户端软件。在互联网中建立加密通道，客户端用加密通道与服务端通信
toc: true
categories:
  - 系统
tags:
  - ArchLinux
---

OpenVPN是一款开源VPN软件，包括服务端软件和客户端软件。在互联网中建立加密通道，客户端用加密通道与服务端通信，也可以在服务端中启用客户端到客户端
通信，这样所有加入VPN通道的客户端之间也能通信。

## 提前准备

1. Ubuntu22
2. OpenVPN
3. CA

```bash
sudo apt update
sudo apt install openvpn easy-rsa
mkdir ~/easy-rsa
ln -s /usr/share/easy-rsa/* ~/easy-rsa/
sudo chown celiae ~/easy-rsa  # celiae 替换成当前用户
chmod 700 ~/easy-rsa
cd ~/easy-rsa
nano vars
```

```bash
# ~/easy-rsa/vars

set_var EASYRSA_ALGO "ec"
set_var EASYRSA_DIGEST "sha512"
```

Elliptic Curve Cryptography (ECC)

```bash
./easyrsa init-pki
```