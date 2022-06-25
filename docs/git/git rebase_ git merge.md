# 面试官：说说你对git rebase 和 git merge的理解？区别？



 ![](https://static.vue-js.com/77590970-fdd4-11eb-bc6f-3f06e1491664.png)

## 一、是什么

在使用 `git` 进行版本管理的项目中，当完成一个特性的开发并将其合并到 `master` 分支时，会有两种方式：

- git merge
- git rebase

`git rebase` 与 `git merge`都有相同的作用，都是将一个分支的提交合并到另一分支上，但是在原理上却不相同



用法上两者也十分的简单：

### git merge

将当前分支合并到指定分支，命令用法如下：

```cmd
git merge xxx
```



### git rebase

将当前分支移植到指定分支或指定`commit`之上，用法如下：

```cmd
git rebase -i <commit>
```

常见的参数有`--continue`，用于解决冲突之后，继续执行`rebase`

```cmd
git rebase --continue
```





## 二、分析

### git merge

通过`git merge`将当前分支与`xxx`分支合并，产生的新的`commit`对象有两个父节点

如果“指定分支”本身是当前分支的一个直接子节点，则会产生快照合并

举个例子，`bugfix`分支是从`master`分支分叉出来的，如下所示：

 ![](https://static.vue-js.com/88410a30-fdd4-11eb-991d-334fd31f0201.png)

合并` bugfix`分支到`master`分支时，如果`master`分支的状态没有被更改过，即 `bugfix`分支的历史记录包含`master`分支所有的历史记录

所以通过把`master`分支的位置移动到`bugfix`的最新分支上，就完成合并

如果`master`分支的历史记录在创建`bugfix`分支后又有新的提交，如下情况：

 ![](https://static.vue-js.com/929eb220-fdd4-11eb-991d-334fd31f0201.png)

这时候使用`git merge`的时候，会生成一个新的提交，并且`master`分支的`HEAD`会移动到新的分支上，如下：

 ![](https://static.vue-js.com/9fdfa3e0-fdd4-11eb-991d-334fd31f0201.png)



从上面可以看到，会把两个分支的最新快照以及二者最近的共同祖先进行三方合并，合并的结果是生成一个新的快照



### git rebase

同样，`master`分支的历史记录在创建`bugfix`分支后又有新的提交，如下情况：

 ![](https://static.vue-js.com/ab2d5120-fdd4-11eb-bc6f-3f06e1491664.png)

通过`git rebase`，会变成如下情况：

 ![](https://static.vue-js.com/b72aed70-fdd4-11eb-991d-334fd31f0201.png)

在移交过程中，如果发生冲突，需要修改各自的冲突，如下：

 ![](https://static.vue-js.com/c9ba0e80-fdd4-11eb-bc6f-3f06e1491664.png)

`rebase`之后，`master`的`HEAD`位置不变。因此，要合并`master`分支和`bugfix`分支

 ![](https://static.vue-js.com/dc660660-fdd4-11eb-991d-334fd31f0201.png)

从上面可以看到，`rebase`会找到不同的分支的最近共同祖先，如上图的`B`

然后对比当前分支相对于该祖先的历次提交，提取相应的修改并存为临时文件（老的提交`X`和`Y`也没有被销毁，只是简单地不能再被访问或者使用）

然后将当前分支指向目标最新位置`D`, 然后将之前另存为临时文件的修改依序应用





## 三、区别

从上面可以看到，`merge`和`rebasea`都是合并历史记录，但是各自特性不同：

### merge

通过`merge`合并分支会新增一个`merge commit`，然后将两个分支的历史联系起来

其实是一种非破坏性的操作，对现有分支不会以任何方式被更改，但是会导致历史记录相对复杂



### rebase

`rebase `会将整个分支移动到另一个分支上，有效地整合了所有分支上的提交

主要的好处是历史记录更加清晰，是在原有提交的基础上将差异内容反映进去，消除了 ` git merge `所需的不必要的合并提交


## 参考文献

- https://zhuanlan.zhihu.com/p/361182707
- https://yuweijun.github.io/git-zh/1-git-branching.html#_rebasing
- https://backlog.com/git-tutorial/cn/stepup/stepup1_4.html
