# 面试官：说说 linux系统下 文件操作常用的命令有哪些？

![](https://static.vue-js.com/6cb38ac0-03c1-11ec-a752-75723a64e8f5.png)


## 一、是什么
`Linux` 是一个开源的操作系统（OS），是一系列Linux内核基础上开发的操作系统的总称（常见的有Ubuntu、centos）

系统通常会包含以下4个主要部分
- 内核
- shell
- 文件系统
- 应用程序

文件系统是一个**目录树的结构**，文件系统结构从一个根目录开始，根目录下可以有任意多个文件和子目录，子目录中又可以有任意多个文件和子目录

 ![](https://static.vue-js.com/b71b64c0-03c1-11ec-a752-75723a64e8f5.png)



## 二、文件操作

常见处理目录的命令如下：

- ls（英文全拼：list files）: 列出目录及文件名
- cd（英文全拼：change directory）：切换目录
- pwd（英文全拼：print work directory）：显示目前的目录
- mkdir（英文全拼：make directory）：创建一个新的目录
- rmdir（英文全拼：remove directory）：删除一个空的目录
- cp（英文全拼：copy file）: 复制文件或目录
- rm（英文全拼：remove）: 删除文件或目录
- mv（英文全拼：move file）: 移动文件与目录，或修改文件与目录的名称



### ls

列出目录文件，选项与参数：

- -a ：全部的文件，连同隐藏文件( 开头为 . 的文件) 一起列出来(常用)
- -d ：仅列出目录本身，而不是列出目录内的文件数据(常用)
- -l ：长数据串列出，包含文件的属性与权限等等数据；(常用)

例如将家目录下的所有文件列出来(含属性与隐藏档)

```cmd
[root@www ~]# ls -al ~
```


### cd

切换工作目录

语法：

```cmd
 cd [相对路径或绝对路径]
```

```cmd
# 表示回到自己的家目录，亦即是 /root 这个目录
[root@www runoob]# cd ~

# 表示去到目前的上一级目录，亦即是 /root 的上一级目录的意思；
[root@www ~]# cd ..
```



### pwd

`pwd` 是 `Print Working Directory` 的缩写，也就是显示目前所在目录的命令。

```
[root@www ~]# pwd [-P]
```

选项与参数：

- -P ：显示出确实的路径，而非使用连结 (link) 路径





### mkdir

 创建新目录

语法：

```
mkdir [-mp] 目录名称
```

选项与参数：

- -m ：配置文件的权限
- -p ：帮助你直接将所需要的目录(包含上一级目录)递归创建起来



### rmdir (删除空的目录)

语法：

```
 rmdir [-p] 目录名称
```

选项与参数：

- -p ：连同上一级『空的』目录也一起删除





### cp

即拷贝文件和目录

语法：

```cmd
cp 目标文件 拷贝文件
```

用法如下：

```cmd
cp file file_copy --> file 是目标文件，file_copy 是拷贝出来的文件
cp file one --> 把 file 文件拷贝到 one 目录下，并且文件名依然为 file
cp file one/file_copy --> 把 file 文件拷贝到 one 目录下，文件名为file_copy
cp *.txt folder --> 把当前目录下所有 txt 文件拷贝到 folder 目录下
复制代码
```

常用参数如下：

- `-r` 递归的拷贝，常用来拷贝一整个目录





### rm (移除文件或目录)

语法：

```
 rm [-fir] 文件或目录
```

选项与参数：

- -f ：就是 force 的意思，忽略不存在的文件，不会出现警告信息；
- -i ：互动模式，在删除前会询问使用者是否动作
- -r ：递归删除啊！最常用在目录的删除了！这是非常危险的选项！！



### mv (移动文件与目录，或修改名称)

语法：

```
[root@www ~]# mv [-fiu] source destination
[root@www ~]# mv [options] source1 source2 source3 .... directory
```

选项与参数：

- -f ：force 强制的意思，如果目标文件已经存在，不会询问而直接覆盖；
- -i ：若目标文件 (destination) 已经存在时，就会询问是否覆盖！
- -u ：若目标文件已经存在，且 source 比较新，才会升级 (update)



### ln

`Linux` 文件的存储方式分为3个部分，文件名、文件内容以及权限，其中文件名的列表是存储在硬盘的其它地方和文件内容是分开存放的，每个文件名通过 `inode` 标识绑定到文件内容

`Linux` 下有两种链接类型：硬链接和软链接

#### 硬链接

使链接的两个文件共享同样文件内容，就是同样的 `inode` ，一旦文件1和文件2之间有了硬链接，那么修改任何一个文件，修改的都是同一块内容

语法：

```cmd
# 创建 file2 为 file1 的硬链接
ln file1 file2
```



 ![](https://static.vue-js.com/c92e7800-03c1-11ec-8e64-91fdec0f05a1.png)

删除文件1不会影响删除文件2，对于硬链接来说，删除任意一方的文件，共同指向的文件内容并不会从硬盘上删除

只有同时删除了两个文件后后，它们共同指向的文件内容才会消失。



#### 软链接

类似`window`系统的快捷方式

使用方式：

```cmd
ln -s file1 file2
```

 ![](https://static.vue-js.com/d5a22eb0-03c1-11ec-8e64-91fdec0f05a1.png)其实 `file2` 只是 `file1` 的一个快捷方式，它指向的是 `file1` ，所以显示的是 `file1` 的内容，但其实 `file2` 的 `inode` 与 `file1` 并不相同

如果

删除了 `file2` 的话， `file1` 是不会受影响的，但如果删除 `file1` 的话， `file2` 就会变成死链接，因为指向的文件不见了



## 三、文件查看

常见的文件内容查看有如下：

- cat 由第一行开始显示文件内容
- less 一页一页的显示文件内容
- head 只看头几行
- tail 只看尾巴几行



### cat

由第一行开始显示文件内容

语法：

```
cat [-AbEnTv]
```

常见的选项与参数如下：

- -b ：列出行号，仅针对非空白行做行号显示，空白行不标行号！
- -n ：列印出行号，连同空白行也会有行号，与 -b 的选项不同



### less

一页一页翻动，以下实例输出/etc/man.config文件的内容：

```cmd
[root@www ~]# less /etc/man.config
#
# Generated automatically from man.conf.in by the
# configure script.
#
# man.conf from man-1.6d
....(中间省略)....
:   <== 这里可以等待你输入命令！
```

less运行时可以输入的命令有：

- 空白键  ：向下翻动一页；
- [pagedown]：向下翻动一页；
- [pageup] ：向上翻动一页；
- /字串   ：向下搜寻『字串』的功能；
- ?字串   ：向上搜寻『字串』的功能；
- n     ：重复前一个搜寻 (与 / 或 ? 有关！)
- N     ：反向的重复前一个搜寻 (与 / 或 ? 有关！)
- q     ：离开 less 这个程序



### head

取出文件前面几行

语法：

```
head [-n number] 文件 
```

选项与参数：

- -n ：后面接数字，代表显示几行的意思

```cmd
[root@www ~]# head /etc/man.config
```



### tail

取出文件后面几行

语法：

```
tail [-n number] 文件 
```

选项与参数：

- -n ：后面接数字，代表显示几行的意思
- -f ：表示持续侦测后面所接的档名，要等到按下[ctrl]-c才会结束tail的侦测



## 参考文献

- https://www.runoob.com/linux/linux-file-content-manage.html
- https://juejin.cn/post/6938385978004340744#heading-35
- https://zh.wikipedia.org/wiki/Linux