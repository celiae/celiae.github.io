---
title: "Npm操作"
excerpt: "理解package.json"
date: 2022-11-04 20:46:25
updated: 2024-01-08 15:20:00
categories: 
  - 开发
  - 前端
tags:
  - npm
  - nodejs
  - 前端
  - 包管理器
---

## 现象

拿npm举例

```bash
npm install <package>
```

npm install <package> 等于 npm install --save <package>. 它会将包列入到 package.json 中的 "dependencies" 对象里.

```bash
npm install --save-dev <package>
```

--save-dev 会列入到 "devDependencies"  中

## 意义

dependencies: 是项目软件建造时需要的包

devDependencies: 是开发项目时所必须的包
