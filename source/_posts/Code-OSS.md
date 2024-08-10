---
title: Code-OSS
excerpt: VSCode 是当今很流行的代码编辑器,而 Code-OSS 则是它的开源版本
date: 2022-05-26 20:46:25
updated: 2024-01-09 16:06:00
categories: 
  - 运维
  - 配置
tags:
  - Code-OSS
  - Linux
---

## Code-OSS

VSCode 是当今很流行的代码编辑器,而 Code-OSS 则是它的开源版本.它们之间的关系就好比 chrome 与 chromium 的关系.

### 安装 Code-OSS

用 pacman 安装.当然安装的是开源版本 Code-OSS,而不是 VSCode

```bash
  sudo pacman -S code
```

使用 VSCode 插件源, Code-OSS 默认的插件源不是微软的 VSCode 插件源,需要的化可以安装 AUR 包 code-marketplace

```bash
yay -S code-marketplace # 
code .  #在终端中启动
```

### Python `Import`

在 code-oss 导入 python 模块时，code 只会扫描`全局` pip 模块安装位置.在虚拟环境中安装的模块不会被 code 探测到.所以如果想要某个模块的代码补全,最简单的就是直接将模块安装到全局

也就是:

```bash
pip install scrapy
```

而不是在虚拟环境中:

```bash
python3 -m venv tutorial-env
pip install scrapy
```

### Proxy 代理

如果在Linux上已经配置 ..._proxy 全局环境变量，默认就是，不用管。在Windows上需要改