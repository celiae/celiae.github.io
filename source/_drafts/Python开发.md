---
title: Python开发
excerpt: 
toc: true
categories:
- 开发
---

## 生成依赖
```shell
pip freeze > requirements.txt
```
保存当前虚拟环境的依赖：
```shell
pip freeze -l > requirements.txt
```

## Conda
```shell
Error while loading conda entry point: conda-content-trust (OpenSSL 3.0's legacy provider failed to load. This is a fatal error by default, but cryptography supports running without legacy algorithms by setting the environment variable CRYPTOGRAPHY_OPENSSL_NO_LEGACY. If you did not expect this error, you have likely made a mistake with your OpenSSL configuration.)
```
```shell
pacman -S python-cryptography

# /etc/profile.d/custom.sh
export CRYPTOGRAPHY_OPENSSL_NO_LEGACY=1
```

[清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/anaconda/)

```shell
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
```

```shell
conda clean -i
conda create -n myenv numpy
```