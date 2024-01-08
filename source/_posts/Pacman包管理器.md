---
title: "Pacman包管理器"
excerpt: "在已有的 ArchLinux 上操作"
date: 2022/10/15 20:46:25
updated: 2024/01/08 10:58:00
categories: 
  - 配置
tags:
  - ArchLinux
---

ArchLinux 的包管理器

### 常用命令

更新

```bash
sudo pacman -Sy # 刷新未更新的数据库
```

```bash
sudo pacman -Syy  # 强制刷新所有数据库
```

```bash
sudo pacman -Syu  # 更新系统
```

```bash
sudo pacman -Syyu # 更新系统并强制同步更所有数据库
```

查询

```bash
sudo pacman -Qi vim # 包信息
```

```bash
sudo pacman -Ql vim # 包所包含的所有文件
```

```bash
sudo pacman -F nc # 通过命令查包
```

```bash
sudo pacman -Fy # 更新包信息数据库
```

## 运行 C 语言

### 我的运行环境

- linux 操作系统
- xfce 桌面环境
- gcc 编译器
- code-oss 代码编辑器

#### GCC 默认是安装的, 如果没有则按照以上包管理器方法完成安装

#### 安装 code-oss

```bash
sudo pacman -S code
```
