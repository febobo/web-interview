# 面试官：说说Git 中 HEAD、工作树和索引之间的区别？

 ![](https://static.vue-js.com/2de056a0-fa40-11eb-991d-334fd31f0201.png)

## 一、HEAD

在`git`中，可以存在很多分支，其本质上是一个指向`commit`对象的可变指针，而`Head`是一个特别的指针，是一个指向你正在工作中的本地分支的指针

简单来讲，就是你现在在哪儿，HEAD 就指向哪儿

例如当前我们处于`master`分支，所以`HEAD`这个指针指向了`master`分支指针

 ![](https://static.vue-js.com/36cb0da0-fa40-11eb-991d-334fd31f0201.png)

然后通过调用`git checkout test`切换到`test`分支，那么`HEAD`则指向`test`分支，如下图：

 ![](https://static.vue-js.com/3e86ba80-fa40-11eb-991d-334fd31f0201.png)

但我们在`test`分支再一次`commit`信息的时候，`HEAD`指针仍然指向了`test`分支指针，而`test`分支指针已经指向了最新创建的提交，如下图：

 ![](https://static.vue-js.com/439839b0-fa66-11eb-991d-334fd31f0201.png)

这个`HEAD`存储的位置就在`.git/HEAD`目录中，查看信息可以看到`HEAD`指向了另一个文件

```cmd
$ cat .git/HEAD
ref: refs/heads/master

$ cat .git/refs/heads/master
7406a10efcc169bbab17827aeda189aa20376f7f
```

这个文件的内容是一串哈希码，而这个哈希码正是`master`分支上最新的提交所对应的哈希码

所以，当我们切换分支的时候，`HEAD`指针通常指向我们所在的分支，当我们在某个分支上创建新的提交时，分支指针总是会指向当前分支的最新提交

所以，HEAD指针 ——–> 分支指针 ——–> 最新提交



## 二、工作树和索引

在`Git`管理下，大家实际操作的目录被称为工作树，也就是工作区域

在数据库和工作树之间有索引，索引是为了向数据库提交作准备的区域，也被称为暂存区域

 ![](https://static.vue-js.com/46e5ac40-fa40-11eb-bc6f-3f06e1491664.png)

`Git`在执行提交的时候，不是直接将工作树的状态保存到数据库，而是将设置在中间索引区域的状态保存到数据库

因此，要提交文件，首先需要把文件加入到索引区域中。

所以，凭借中间的索引，可以避免工作树中不必要的文件提交，还可以将文件修改内容的一部分加入索引区域并提交



## 三、区别

从所在的位置来看：

- HEAD 指针通常指向我们所在的分支，当我们在某个分支上创建新的提交时，分支指针总是会指向当前分支的最新提交

- 工作树是查看和编辑的（源）文件的实际内容

- 索引是放置你想要提交给 git仓库文件的地方，如工作树的代码通过 git add 则添加到 git 索引中，通过git commit 则将索引区域的文件提交到 git 仓库中




## 参考文献

- https://backlog.com/git-tutorial/cn/intro/intro1_4.html
- https://juejin.cn/post/6844903598522908686
- https://www.zsythink.net/archives/3412