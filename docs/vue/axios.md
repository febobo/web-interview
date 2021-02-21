# 面试官：Vue项目中有封装过axios吗？主要是封装哪方面的？

![](https://static.vue-js.com/2bf1e460-45a7-11eb-85f6-6fac77c0c9b3.png)

## 一、axios是什么

`axios` 是一个轻量的 `HTTP`客户端

基于 `XMLHttpRequest` 服务来执行 `HTTP` 请求，支持丰富的配置，支持 `Promise`，支持浏览器端和 `Node.js` 端。自`Vue`2.0起，尤大宣布取消对 `vue-resource` 的官方推荐，转而推荐 `axios`。现在 `axios` 已经成为大部分 `Vue` 开发者的首选

### 特性

- 从浏览器中创建 `XMLHttpRequests`
- 从 `node.js` 创建 `http`请求
- 支持 `Promise` API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换` JSON` 数据
- 客户端支持防御`XSRF`

### 基本使用

安装

```js
// 项目中安装
npm install axios --S
// cdn 引入
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

导入

```js
import axios from 'axios'
```

发送请求

```js
axios({        
  url:'xxx',    // 设置请求的地址
  method:"GET", // 设置请求方法
  params:{      // get请求使用params进行参数凭借,如果是post请求用data
    type: '',
    page: 1
  }
}).then(res => {  
  // res为后端返回的数据
  console.log(res);   
})
```



并发请求`axios.all([])`

```js
function getUserAccount() {
    return axios.get('/user/12345');
}

function getUserPermissions() {
    return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
    .then(axios.spread(function (res1, res2) { 
    // res1第一个请求的返回的内容，res2第二个请求返回的内容
    // 两个请求都执行完成才会执行
}));
```



## 二、为什么要封装

`axios` 的 API 很友好，你完全可以很轻松地在项目中直接使用。

不过随着项目规模增大，如果每发起一次`HTTP`请求，就要把这些比如设置超时时间、设置请求头、根据项目环境判断使用哪个请求地址、错误处理等等操作，都需要写一遍

这种重复劳动不仅浪费时间，而且让代码变得冗余不堪，难以维护。为了提高我们的代码质量，我们应该在项目中二次封装一下 `axios` 再使用

举个例子：

```js
axios('http://localhost:3000/data', {
  // 配置代码
  method: 'GET',
  timeout: 1000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'xxx',
  },
  transformRequest: [function (data, headers) {
    return data;
  }],
  // 其他请求配置...
})
.then((data) => {
  // todo: 真正业务逻辑代码
  console.log(data);
}, (err) => {
  // 错误处理代码  
  if (err.response.status === 401) {
  // handle authorization error
  }
  if (err.response.status === 403) {
  // handle server forbidden error
  }
  // 其他错误处理.....
  console.log(err);
});
```

如果每个页面都发送类似的请求，都要写一堆的配置与错误处理，就显得过于繁琐了

这时候我们就需要对`axios`进行二次封装，让使用更为便利



## 三、如何封装

封装的同时，你需要和 后端协商好一些约定，请求头，状态码，请求超时时间.......

设置接口请求前缀：根据开发、测试、生产环境的不同，前缀需要加以区分

请求头 :  来实现一些具体的业务，必须携带一些参数才可以请求(例如：会员业务)

状态码:   根据接口返回的不同`status` ， 来执行不同的业务，这块需要和后端约定好

请求方法：根据`get`、`post`等方法进行一个再次封装，使用起来更为方便

请求拦截器:  根据请求的请求头设定，来决定哪些请求可以访问

响应拦截器： 这块就是根据 后端`返回来的状态码判定执行不同业务



### 设置接口请求前缀

利用`node`环境变量来作判断，用来区分开发、测试、生产环境

```js
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://dev.xxx.com'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://prod.xxx.com'
}
```

在本地调试的时候，还需要在`vue.config.js`文件中配置`devServer`实现代理转发，从而实现跨域

```js
devServer: {
    proxy: {
      '/proxyApi': {
        target: 'http://dev.xxx.com',
        changeOrigin: true,
        pathRewrite: {
          '/proxyApi': ''
        }
      }
    }
  }
```



### 设置请求头与超时时间

大部分情况下，请求头都是固定的，只有少部分情况下，会需要一些特殊的请求头，这里将普适性的请求头作为基础配置。当需要特殊请求头时，将特殊请求头作为参数传入，覆盖基础配置

```js
const service = axios.create({
    ...
    timeout: 30000,  // 请求 30s 超时
	  headers: {
        get: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
        },
        post: {
          'Content-Type': 'application/json;charset=utf-8'
          // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
        }
  },
})
```



### 封装请求方法

先引入封装好的方法，在要调用的接口重新封装成一个方法暴露出去

```js
// get 请求
export function httpGet({
  url,
  params = {}
}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    }).then((res) => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// post
// post请求
export function httpPost({
  url,
  data = {},
  params = {}
}) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'post',
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      // 发送的数据
      data,
      // url参数
      params

    }).then(res => {
      resolve(res.data)
    })
  })
}
```

把封装的方法放在一个`api.js`文件中

```js
import { httpGet, httpPost } from './http'
export const getorglist = (params = {}) => httpGet({ url: 'apps/api/org/list', params })
```

页面中就能直接调用

```js
// .vue
import { getorglist } from '@/assets/js/api'

getorglist({ id: 200 }).then(res => {
  console.log(res)
})
```

这样可以把`api`统一管理起来，以后维护修改只需要在`api.js`文件操作即可



### 请求拦截器

请求拦截器可以在每个请求里加上token，做了统一处理后维护起来也方便

```js
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况，此处token一般是用户完成登录后储存到localstorage里的
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.error(error)
  })
```



### 响应拦截器

响应拦截器可以在接收到响应后先做一层操作，如根据状态码判断登录状态、授权

```js
// 响应拦截器
axios.interceptors.response.use(response => {
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (response.status === 200) {
    if (response.data.code === 511) {
      // 未授权调取授权接口
    } else if (response.data.code === 510) {
      // 未登录跳转登录页
    } else {
      return Promise.resolve(response)
    }
  } else {
    return Promise.reject(response)
  }
}, error => {
  // 我们可以在这里对异常状态作统一处理
  if (error.response.status) {
    // 处理请求失败的情况
    // 对不同返回码对相应处理
    return Promise.reject(error.response)
  }
})
```



### 小结

- 封装是编程中很有意义的手段，简单的`axios`封装，就可以让我们可以领略到它的魅力
- 封装 `axios` 没有一个绝对的标准，只要你的封装可以满足你的项目需求，并且用起来方便，那就是一个好的封装方案


## 参考文献

- https://www.html.cn/qa/vue-js/20544.html
- https://juejin.cn/post/6844904033782611976
- https://juejin.cn/post/6844903801451708429