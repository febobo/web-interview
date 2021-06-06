#  面试官：双向数据绑定是什么

![](https://static.vue-js.com/cef7dcc0-3ac9-11eb-85f6-6fac77c0c9b3.png)

## 一、什么是双向绑定

我们先从单向绑定切入单向绑定非常简单，就是把`Model`绑定到`View`，当我们用`JavaScript`代码更新`Model`时，`View`就会自动更新双向绑定就很容易联想到了，在单向绑定的基础上，用户更新了`View`，`Model`的数据也自动被更新了，这种情况就是双向绑定举个栗子

 ![](https://static.vue-js.com/d65738d0-3ac9-11eb-ab90-d9ae814b240d.png)

当用户填写表单时，`View`的状态就被更新了，如果此时可以自动更新`Model`的状态，那就相当于我们把`Model`和`View`做了双向绑定关系图如下

 ![](https://static.vue-js.com/dcc1d4a0-3ac9-11eb-ab90-d9ae814b240d.png)

## 二、双向绑定的原理是什么

我们都知道 `Vue` 是数据双向绑定的框架，双向绑定由三个重要部分构成

- 数据层（Model）：应用的数据及业务逻辑
- 视图层（View）：应用的展示效果，各类UI组件
- 业务逻辑层（ViewModel）：框架封装的核心，它负责将数据与视图关联起来

而上面的这个分层的架构方案，可以用一个专业术语进行称呼：`MVVM`这里的控制层的核心功能便是 “数据双向绑定” 。自然，我们只需弄懂它是什么，便可以进一步了解数据绑定的原理

### 理解ViewModel

它的主要职责就是：

- 数据变化后更新视图
- 视图变化后更新数据

当然，它还有两个主要部分组成

- 监听器（Observer）：对所有数据的属性进行监听
- 解析器（Compiler）：对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数

### 三、实现双向绑定

我们还是以`Vue`为例，先来看看`Vue`中的双向绑定流程是什么的

1.  `new Vue()`首先执行初始化，对`data`执行响应化处理，这个过程发生`Observe`中
2.  同时对模板执行编译，找到其中动态绑定的数据，从`data`中获取并初始化视图，这个过程发生在`Compile`中
3.  同时定义⼀个更新函数和`Watcher`，将来对应数据变化时`Watcher`会调用更新函数
4.  由于`data`的某个`key`在⼀个视图中可能出现多次，所以每个`key`都需要⼀个管家`Dep`来管理多个`Watcher`
5.  将来data中数据⼀旦发生变化，会首先找到对应的`Dep`，通知所有`Watcher`执行更新函数

流程图如下：

 ![](https://static.vue-js.com/e5369850-3ac9-11eb-85f6-6fac77c0c9b3.png)

### 实现

先来一个构造函数：执行初始化，对`data`执行响应化处理

```js
class Vue {  
  constructor(options) {  
    this.$options = options;  
    this.$data = options.data;  
        
    // 对data选项做响应式处理  
    observe(this.$data);  
        
    // 代理data到vm上  
    proxy(this);  
        
    // 执行编译  
    new Compile(options.el, this);  
  }  
}  
```

对`data`选项执行响应化具体操作

```js
function observe(obj) {  
  if (typeof obj !== "object" || obj == null) {  
    return;  
  }  
  new Observer(obj);  
}  
  
class Observer {  
  constructor(value) {  
    this.value = value;  
    this.walk(value);  
  }  
  walk(obj) {  
    Object.keys(obj).forEach((key) => {  
      defineReactive(obj, key, obj[key]);  
    });  
  }  
}  
```

#### 编译`Compile`

对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数

 ![](https://static.vue-js.com/f27e19c0-3ac9-11eb-85f6-6fac77c0c9b3.png)

```js
class Compile {  
  constructor(el, vm) {  
    this.$vm = vm;  
    this.$el = document.querySelector(el);  // 获取dom  
    if (this.$el) {  
      this.compile(this.$el);  
    }  
  }  
  compile(el) {  
    const childNodes = el.childNodes;   
    Array.from(childNodes).forEach((node) => { // 遍历子元素  
      if (this.isElement(node)) {   // 判断是否为节点  
        console.log("编译元素" + node.nodeName);  
      } else if (this.isInterpolation(node)) {  
        console.log("编译插值⽂本" + node.textContent);  // 判断是否为插值文本 {{}}  
      }  
      if (node.childNodes && node.childNodes.length > 0) {  // 判断是否有子元素  
        this.compile(node);  // 对子元素进行递归遍历  
      }  
    });  
  }  
  isElement(node) {  
    return node.nodeType == 1;  
  }  
  isInterpolation(node) {  
    return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent);  
  }  
}  
  
```

#### 依赖收集

视图中会用到`data`中某`key`，这称为依赖。同⼀个`key`可能出现多次，每次都需要收集出来用⼀个`Watcher`来维护它们，此过程称为依赖收集多个`Watcher`需要⼀个`Dep`来管理，需要更新时由`Dep`统⼀通知

 ![](https://static.vue-js.com/fa191f40-3ac9-11eb-ab90-d9ae814b240d.png)

实现思路

 1. `defineReactive`时为每⼀个`key`创建⼀个`Dep`实例
 2. 初始化视图时读取某个`key`，例如`name1`，创建⼀个`watcher1`
 3. 由于触发`name1`的`getter`方法，便将`watcher1`添加到`name1`对应的Dep中
 4. 当`name1`更新，`setter`触发时，便可通过对应`Dep`通知其管理所有`Watcher`更新

```js
// 负责更新视图  
class Watcher {  
  constructor(vm, key, updater) {  
    this.vm = vm  
    this.key = key  
    this.updaterFn = updater  
  
    // 创建实例时，把当前实例指定到Dep.target静态属性上  
    Dep.target = this  
    // 读一下key，触发get  
    vm[key]  
    // 置空  
    Dep.target = null  
  }  
  
  // 未来执行dom更新函数，由dep调用的  
  update() {  
    this.updaterFn.call(this.vm, this.vm[this.key])  
  }  
}  
```

声明`Dep`

```js
class Dep {  
  constructor() {  
    this.deps = [];  // 依赖管理  
  }  
  addDep(dep) {  
    this.deps.push(dep);  
  }  
  notify() {   
    this.deps.forEach((dep) => dep.update());  
  }  
}  
```

创建`watcher`时触发`getter`

```js
class Watcher {  
  constructor(vm, key, updateFn) {  
    Dep.target = this;  
    this.vm[this.key];  
    Dep.target = null;  
  }  
}  
  
```

依赖收集，创建`Dep`实例

```js
function defineReactive(obj, key, val) {  
  this.observe(val);  
  const dep = new Dep();  
  Object.defineProperty(obj, key, {  
    get() {  
      Dep.target && dep.addDep(Dep.target);// Dep.target也就是Watcher实例  
      return val;  
    },  
    set(newVal) {  
      if (newVal === val) return;  
      dep.notify(); // 通知dep执行更新方法  
    },  
  });  
}  
```

## 参考文献

- https://www.liaoxuefeng.com/wiki/1022910821149312/1109527162256416
- https://juejin.cn/post/6844903942254510087#heading-9

  

面试官VUE系列总进度：3／33

[面试官：说说你对vue的理解\?](http://mp.weixin.qq.com/s?__biz=MzU1OTgxNDQ1Nw==&mid=2247484101&idx=1&sn=83b0983f0fca7d7c556e4cb0bff8c9b8&chksm=fc10c093cb674985ef3bd2966f66fc28c5eb70b0037e4be1af4bf54fb6fa9571985abd31d52f&scene=21#wechat_redirect)  
[面试官：说说你对SPA（单页应用）的理解\?](http://mp.weixin.qq.com/s?__biz=MzU1OTgxNDQ1Nw==&mid=2247484119&idx=1&sn=d171b28a00d42549d279498944a98519&chksm=fc10c081cb6749976814aaeda6a6433db418223cec57edda7e15b9e5a0ca69ad549655639c61&scene=21#wechat_redirect)

![](https://static.vue-js.com/821b87b0-3ac6-11eb-ab90-d9ae814b240d.png)