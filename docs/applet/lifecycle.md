# 面试官：说说微信小程序的生命周期函数有哪些？



 ![](https://static.vue-js.com/1df64890-30e0-11ec-8e64-91fdec0f05a1.png)


## 一、是什么

跟`vue`、`react`框架一样，微信小程序框架也存在生命周期，实质也是一堆会在特定时期执行的函数

小程序中，生命周期主要分成了三部分：

- 应用的生命周期
- 页面的生命周期
- 组件的生命周期

### 应用的生命周期

小程序的生命周期函数是在`app.js`里面调用的，通过`App(Object)`函数用来注册一个小程序，指定其小程序的生命周期回调



### 页面的生命周期

页面生命周期函数就是当你每进入/切换到一个新的页面的时候，就会调用的生命周期函数，同样通过`App(Object)`函数用来注册一个页面



### 组件的生命周期

组件的生命周期，指的是组件自身的一些函数，这些函数在特殊的时间点或遇到一些特殊的框架事件时被自动触发，通过`Component(Object)`进行注册组件





## 二、有哪些

### 应用的生命周期

| 生命周期               | 说明                                    |
| ---------------------- | --------------------------------------- |
| onLaunch               | 小程序初始化完成时触发，全局只触发一次  |
| onShow                 | 小程序启动，或从后台进入前台显示时触发  |
| onHide                 | 小程序从前台进入后台时触发              |
| onError                | 小程序发生脚本错误或 API 调用报错时触发 |
| onPageNotFound         | 小程序要打开的页面不存在时触发          |
| onUnhandledRejection() | 小程序有未处理的 Promise 拒绝时触发     |
| onThemeChange          | 系统切换主题时触发                      |







### 页面的生命周期

| 生命周期 | 说明                              | 作用                           |
| -------- | --------------------------------- | ------------------------------ |
| onLoad   | 生命周期回调—监听页面加载         | 发送请求获取数据               |
| onShow   | 生命周期回调—监听页面显示         | 请求数据                       |
| onReady  | 生命周期回调—监听页面初次渲染完成 | 获取页面元素（少用）           |
| onHide   | 生命周期回调—监听页面隐藏         | 终止任务，如定时器或者播放音乐 |
| onUnload | 生命周期回调—监听页面卸载         | 终止任务                       |





### 组件的生命周期

| 生命周期 | 说明                              |
| -------- | --------------------------------- |
| created  | 生命周期回调—监听页面加载         |
| attached | 生命周期回调—监听页面显示         |
| ready    | 生命周期回调—监听页面初次渲染完成 |
| moved    | 生命周期回调—监听页面隐藏         |
| detached | 生命周期回调—监听页面卸载         |
| error    | 每当组件方法抛出错误时执行        |

注意的是：

- 组件实例刚刚被创建好时， created 生命周期被触发，此时，组件数据 this.data 就是在 Component  构造器中定义的数据 data ， 此时不能调用 setData
- 在组件完全初始化完毕、进入页面节点树后， attached 生命周期被触发。此时， this.data 已被初始化为组件的当前值。这个生命周期很有用，绝大多数初始化工作可以在这个时机进行
- 在组件离开页面节点树后， detached 生命周期被触发。退出一个页面时，如果组件还在页面节点树中，则  detached 会被触发

还有一些特殊的生命周期，它们并非与组件有很强的关联，但有时组件需要获知，以便组件内部处理，这样的生命周期称为“组件所在页面的生命周期”，在 `pageLifetimes` 定义段中定义，如下：

| 生命周期 | 说明                       |
| -------- | -------------------------- |
| show     | 组件所在的页面被展示时执行 |
| hide     | 组件所在的页面被隐藏时执行 |

代码如下：

```js
Component({
  pageLifetimes: {
    show: function() {
      // 页面被展示
    },
    hide: function() {
      // 页面被隐藏
    },
  }
})
```






## 三、执行过程

### 应⽤的⽣命周期执行过程：

-  ⽤户⾸次打开⼩程序，触发 onLaunch（全局只触发⼀次）

-  ⼩程序初始化完成后，触发onShow⽅法，监听⼩程序显示

-  ⼩程序从前台进⼊后台，触发 onHide⽅法

-  ⼩程序从后台进⼊前台显示，触发 onShow⽅法

-  ⼩程序后台运⾏⼀定时间，或系统资源占⽤过⾼，会被销毁



### ⻚⾯⽣命周期的执行过程：

- ⼩程序注册完成后，加载⻚⾯，触发onLoad⽅法
- ⻚⾯载⼊后触发onShow⽅法，显示⻚⾯
- ⾸次显示⻚⾯，会触发onReady⽅法，渲染⻚⾯元素和样式，⼀个⻚⾯只会调⽤⼀次
- 当⼩程序后台运⾏或跳转到其他⻚⾯时，触发onHide⽅法
- 当⼩程序有后台进⼊到前台运⾏或重新进⼊⻚⾯时，触发onShow⽅法
- 当使⽤重定向⽅法 wx.redirectTo() 或关闭当前⻚返回上⼀⻚wx.navigateBack()，触发onUnload



当存在也应用生命周期和页面周期的时候，相关的执行顺序如下：

- 打开小程序：(App)onLaunch --> (App)onShow --> (Pages)onLoad --> (Pages)onShow --> (pages)onRead

- 进入下一个页面：(Pages)onHide --> (Next)onLoad --> (Next)onShow --> (Next)onReady

- 返回上一个页面：(curr)onUnload --> (pre)onShow

- 离开小程序：(App)onHide

- 再次进入：小程序未销毁 --> (App)onShow(执行上面的顺序），小程序被销毁，（App)onLaunch重新开始执行.



## 参考文献

- https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onLaunch-Object-object
- https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onLoad-Object-query
- https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onLaunch-Object-object