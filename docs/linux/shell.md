# 面试官：说说你对 shell 的理解？常见的命令？

 ![](https://static.vue-js.com/71003620-0883-11ec-a752-75723a64e8f5.png)


## 一、是什么

 `Shell `是一个由`c`语言编写的应用程序，它是用户使用 Linux 的桥梁。Shell 既是一种命令语言，又是一种程序设计语言

它连接了用户和` Linux `内核，让用户能够更加高效、安全、低成本地使用 `Linux` 内核

其本身并不是内核的一部分，它只是站在内核的基础上编写的一个应用程序，它和 QQ、微信等其它软件没有什么区别，特殊的地方就是开机立马启动，并呈现在用户面前

主要作用是接收用户输入的命令，并对命令进行处理，处理完毕后再将结果反馈给用户，比如输出到显示器、写入到文件等，同样能够调用和组织其他的应用程序，相当于一个领导者的身份，如下图：

 ![](https://static.vue-js.com/80db0ca0-0883-11ec-8e64-91fdec0f05a1.png)

那么`shell`脚本就是多个 `Shell` 命令的组合并通过 `if` 条件分支控制或循环来组合运算，实现一些复杂功能，文件后缀名为`.sh`

常用的 `ls` 命令，它本身也是一个 `Shell` 脚本，通过执行这个 `Shell` 脚本可以列举当前目录下的文件列表，如下创建一个`hello.sh`脚本

```shell
#!/bin/bash

# 执行的命令主体
ls
echo "hello world"
```

- #!/bin/bash ：指定脚本要使用的 Shell  类型为 Bash

- ls、echo： 脚本文件的内容，表明我们执行  hello.sh  脚本时会列举出当前目录的文件列表并且会向控制台打印 `hello world

执行方式为`.hello.zsh`



## 二、种类

`Linux` 的 `Shell` 种类众多，只要能给用户提供命令行环境的程序，常见的有：

- Bourne Shell（sh），是目前所有 Shell 的祖先，被安装在几乎所有发源于 Unix 的操作系统上

- Bourne Again shell（bash） ，是 sh 的一个进阶版本，比 sh 更优秀， bash 是目前大多数 Linux 发行版以及 macOS 操作系统的默认 Shell

- C Shell（csh） ，它的语法类似 C 语言

- TENEX C Shell（tcsh） ，它是 csh 的优化版本

- Korn shell（ksh） ，一般在收费的 Unix 版本上比较多见

- Z Shell（zsh） ，它是一种比较新近的 Shell ，集 bash 、 ksh 和 tcsh 各家之大成

![](https://static.vue-js.com/8e739440-0883-11ec-a752-75723a64e8f5.png)

关于 `Shell` 的几个常见命令：

- ls：查看文件
- cd：切换工作目录
- pwd：显示用户当前目录
- mkdir：创建目录
- cp：拷贝
- rm：删除
- mv：移动
- du：显示目录所占用的磁盘空间

## 三、命令

`Shell` 并不是简单的堆砌命令，我们还可以在 `Shell` 中编程，这和使用 `C++`、`C#`、`Java`、`Python` 等常见的编程语言并没有什么两样。

Shell 虽然没有 C++、Java、Python 等强大，但也支持了基本的编程元素，例如：

- if...else 选择结构，case...in 开关语句，for、while、until 循环；
- 变量、数组、字符串、注释、加减乘除、逻辑运算等概念；
- 函数，包括用户自定义的函数和内置函数（例如 printf、export、eval 等）



下面以`bash`为例简单了解一下`shell`的基本使用

### 变量

`Bash` 没有数据类型的概念，所有的变量值都是字符串，可以保存一个数字、一个字符、一个字符串等等

同时无需提前声明变量，给变量赋值会直接创建变量

访问变量的语法形式为：`${var}` 和 `$var` 。

变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界，所以推荐加花括号。

```bash
word="hello"
echo ${word}
# Output: hello
```



### 条件控制

跟其它程序设计语言一样，Bash 中的条件语句让我们可以决定一个操作是否被执行。结果取决于一个包在`[[ ]]`里的表达式

跟其他语言一样，使用`if...else`进行表达，如果中括号里的表达式为真，那么`then`和`fi`之间的代码会被执行，如果则`else`和`fi`之间的代码会被执行

```shell
if [[ 2 -ne 1 ]]; then
  echo "true"
else
  echo "false"
fi
# Output: true
```

`fi`标志着条件代码块的结束



### 函数

bash 函数定义语法如下：

```bash
[ function ] funname [()] {
    action;
    [return int;]
}
```

- 函数定义时，function 关键字可有可无
- 函数返回值 - return 返回函数返回值，返回值类型只能为整数（0-255）。如果不加 return 语句，shell 默认将以最后一条命令的运行结果，作为函数返回值
- 函数返回值在调用该函数后通过 $?  来获得
- 所有函数在使用前必须定义。这意味着必须将函数放在脚本开始部分，直至 shell 解释器首次发现它时，才可以使用。调用函数仅使用其函数名即可

## 参考文献

- http://c.biancheng.net/view/706.html
- https://juejin.cn/post/6930013333454061575