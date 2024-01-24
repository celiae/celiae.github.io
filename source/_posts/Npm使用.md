---
title: Npm使用
excerpt: 这是npm初始化是必创建的文件，里面包含着所需要安装的包，版本等信息
date: 2022-11-04 20:46:25
updated: 2024-01-09 15:53:00
categories: 
  - 开发
  - 前端
tags:
  - npm
  - nodejs
  - 前端
  - 包管理器
---

## 国内镜像源

默认的npm资源站 `https://registry.npmjs.org/` 服务器距离远且被隔离，当下载有问题可以替换以下地址

- 腾讯云
  ```bash
  npm config set registry http://mirrors.cloud.tencent.com/npm/
  ```

- 淘宝
  ```bash
  npm config set registry https://registry.npmmirror.com
  ```

- 华为云
  ```bash
  npm config set registry https://mirrors.huaweicloud.com/repository/npm/
  ```

## package.json

这是npm初始化是必创建的文件，里面包含着所需要安装的包，版本等信息

### dependencies vs devDependencies

拿npm举例

```bash
npm install <package>
```

npm install <package> 等于 npm install --save <package>. 它会将包列入到 package.json 中的 "dependencies" 对象里.

```bash
npm install --save-dev <package>
```

--save-dev 会列入到 "devDependencies"  中

dependencies: 是项目软件建造时需要的包

devDependencies: 是开发项目时所必须的包
