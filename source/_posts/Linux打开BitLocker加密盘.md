---
title: Linux打开BitLocker加密盘
excerpt: 在Linux中，访问Windows下通过BitLocker加密的硬盘分区。找到BitLocker分区的设备路径，例如`/dev/sdb1`. 使用Dislocker命令来解锁BitLocker分区，并且获取解密后的分区映像。ArchLinux 在更新系统后可能会出现找不到特定版本的 `libruby.so` 包的问题，可以这样解决
---

在Linux中，访问Windows下通过BitLocker加密的硬盘分区

```bash
yay -S dislocker       #archlinux
sudo apt install dislocker  #ubuntu
```

找到BitLocker分区的设备路径，例如`/dev/sdb1`. 使用Dislocker命令来解锁BitLocker分区，并且获取解密后的分区映像。

```bash
sudo dislocker -v -V /dev/sdb1 -u#53!12345 -- /mnt/bitlocker
sudo ls /mnt/bitlocker
sudo mount -o loop,rw /mnt/bitlocker/dislocker-file /mnt/mount
sudo ls /mnt/mount
```

ArchLinux 在更新系统后可能会出现找不到特定版本的 `libruby.so` 包的问题，可以这样解决

```bash
dislocker: error while loading shared libraries: libruby.so.3.0: cannot open shared object file: No such file or directory

cd /usr/lib/
sudo ln -s libruby.so libruby.so.3.0
```

系统更新后，我的 libruby 升级到了 3.2 版本，而 dislocker 还在寻找 3.0 版本，于是通过软链接强行让他找到