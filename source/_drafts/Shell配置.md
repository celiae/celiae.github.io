---
title: Shell配置
excerpt: 用Bash来执行程序，用Fish来交互
toc: true
categories:
  - 系统
---
用Bash来执行程序，用Fish来交互

## Bash配置

### Bash history

常用命令

```bash
fc # 在 $EDITOR 里修改上一次命令
history # 列出历史
history 2 # 列出最新2条命令
history | grep ping # 过滤历史命令
history -d N && history -d 2-4 # 删除第N条或M-N(2-4)条
history -c # 删除 buffer（内存）中的命令
cat /dev/null > ~/.bash_history # 清空历史命令
```

环境变量

```bash
HISTFILE # 历史命令保存路径
HISTCONTROL    # =ignoredups：重复的命令不会加入history中,=ignorespace 可以忽略空格开头的命令行（一些发行版默认 Arch需要配置,这可提高安全性），=ignoreboth:打开以上的两个特性
HISTIGNORE    # 忽略的命令，不保存的命令
PROMPT_COMMAND  # ='history -a' 可以立刻同步.bash_history(避免不同终端输入的不同命令)
HISTTIMEFORMAT  # history格式， ="%F %T " 带日期时间
HISTSIZE    # buffer 中的历史命令
HISTFILESIZE    # file 中的历史命令
```

快捷键

- `ctrl`+`g`:退出 `ctrl`+`r` 搜索

表达式

- `!!`: 上一个命令，=`!-1`
- `!N`: 第N个命令
- `!-N`: 倒数第N个命令

提示符，类似的还有`!:^`,`!:N`等

```bash
!curl # 执行最近的curl. 命令：!<command>

# 查找替换
ssh celiae@192.168.1.100    # 之前输过的命令
^192.168.1.100^192.168.10^  # 例如将老ip替换成新ip
ssh celiae@192.168.10       # 修改后的命令
```

### 安全配置

`declare -rx`: 设置只读环境变量

```bash
declare -rx HISTFILE="$HOME/.bash_history"
declare -rx HISTSIZE=500000
declare -rx HISTFILESIZE=500000
declare -rx HISTCONTROL=""
declare -rx HISTIGNORE=""
declare -rx HISTCMD

if [ "${OSTYPE:0:7}" != "solaris" ]
then
if groups | grep -q root
then
    declare -x TMOUT=86400   # root 会话超时时间
    chattr +a "$HISTFILE"   # 历史文件只能追加，不能删除
fi
fi

shopt -s histappend
shopt -s cmdhist
shopt -s histverify #替换前确认
```

> 在 Bash 中，shopt -s 是用来启用某些可选的 shell 功能的命令。shopt 是 "shell options" 的缩>写，通过它你可以查看和设置不同的
> shell 选项。

## SSH

```bash
ssh-keygen  #生成公私钥对文件
ssh-keygen -p -f ~/.ssh/id_rsa  #修改私钥密码
openssl rand -base64 16 #随机生成一个16长度的密码
```