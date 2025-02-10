# ArchLinux部署OpenVPN

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