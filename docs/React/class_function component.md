# 面试官：说说对React中类组件和函数组件的理解？有什么区别？

 ![](https://static.vue-js.com/6c196d80-de39-11eb-85f6-6fac77c0c9b3.png)

## 一、类组件

类组件，顾名思义，也就是通过使用`ES6`类的编写形式去编写组件，该类必须继承`React.Component`

如果想要访问父组件传递过来的参数，可通过`this.props`的方式去访问

在组件中必须实现`render`方法，在`return`中返回`React`对象，如下：

```jsx
class Welcome extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```





## 二、函数组件

函数组件，顾名思义，就是通过函数编写的形式去实现一个`React`组件，是`React`中定义组件最简单的方式

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

函数第一个参数为`props`用于接收父组件传递过来的参数



## 三、区别

针对两种`React`组件，其区别主要分成以下几大方向：

- 编写形式
- 状态管理
- 生命周期

- 调用方式

- 获取渲染的值



### 编写形式

两者最明显的区别在于编写形式的不同，同一种功能的实现可以分别对应类组件和函数组件的编写形式

函数组件：

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

类组件：

```jsx
class Welcome extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```



### 状态管理

在`hooks`出来之前，函数组件就是无状态组件，不能保管组件的状态，不像类组件中调用`setState`

如果想要管理`state`状态，可以使用`useState`，如下：

```jsx
const FunctionalComponent = () => {
    const [count, setCount] = React.useState(0);

    return (
        <div>
            <p>count: {count}</p >
            <button onClick={() => setCount(count + 1)}>Click</button>
        </div>
    );
};

```

在使用`hooks`情况下，一般如果函数组件调用`state`，则需要创建一个类组件或者`state`提升到你的父组件中，然后通过`props`对象传递到子组件



### 生命周期

在函数组件中，并不存在生命周期，这是因为这些生命周期钩子都来自于继承的`React.Component`

所以，如果用到生命周期，就只能使用类组件

但是函数组件使用`useEffect`也能够完成替代生命周期的作用，这里给出一个简单的例子：

```jsx
const FunctionalComponent = () => {
    useEffect(() => {
        console.log("Hello");
    }, []);
    return <h1>Hello, World</h1>;
};
```

上述简单的例子对应类组件中的`componentDidMount`生命周期

如果在`useEffect`回调函数中`return `一个函数，则`return`函数会在组件卸载的时候执行，正如`componentWillUnmount`

```jsx
const FunctionalComponent = () => {
 React.useEffect(() => {
   return () => {
     console.log("Bye");
   };
 }, []);
 return <h1>Bye, World</h1>;
};

```





### 调用方式

如果是一个函数组件，调用则是执行函数即可：

```jsx
// 你的代码 
function SayHi() { 
    return <p>Hello, React</p > 
} 
// React内部 
const result = SayHi(props) // » <p>Hello, React</p >
```

如果是一个类组件，则需要将组件进行实例化，然后调用实例对象的`render`方法：

```jsx
// 你的代码 
class SayHi extends React.Component { 
    render() { 
        return <p>Hello, React</p > 
    } 
} 
// React内部 
const instance = new SayHi(props) // » SayHi {} 
const result = instance.render() // » <p>Hello, React</p >
```



### 获取渲染的值

首先给出一个示例

函数组件对应如下：

```jsx
function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  }

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  }

  return (
    <button onClick={handleClick}>Follow</button>
  )
}
```

类组件对应如下：

```jsx
class ProfilePage extends React.Component {
  showMessage() {
    alert('Followed ' + this.props.user);
  }

  handleClick() {
    setTimeout(this.showMessage.bind(this), 3000);
  }

  render() {
    return <button onClick={this.handleClick.bind(this)}>Follow</button>
  }
}
```

两者看起来实现功能是一致的，但是在类组件中，输出`this.props.user`，`Props `在 `React `中是不可变的所以它永远不会改变，但是 `this` 总是可变的，以便您可以在 `render` 和生命周期函数中读取新版本

因此，如果我们的组件在请求运行时更新。`this.props` 将会改变。`showMessage `方法从“最新”的 `props` 中读取 `user`

而函数组件，本身就不存在`this`，`props`并不发生改变，因此同样是点击，`alert`的内容仍旧是之前的内容



### 小结

两种组件都有各自的优缺点

函数组件语法更短、更简单，这使得它更容易开发、理解和测试

而类组件也会因大量使用 `this `而让人感到困惑



## 参考文献

- https://zh-hans.reactjs.org/docs/components-and-props.html#function-and-class-components
- https://juejin.cn/post/6844903806140973069