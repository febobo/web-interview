module.exports = {
  // title: "Vue3源码解析 - vue中文社区",
  title: "web前端面试 - 面试官系列",
  description: "web前端面试,vue面试题,react面试题,js面试题,大厂面试题,阿里面试题,京东面试题",
  base: '/interview/',
  head: [
    ["link", { rel: "icon", href: "/onepunch.jpeg" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "web前端面试,vue面试题,react面试题,js面试题,大厂面试题,阿里面试题,京东面试题",
      },
    ],
    // [
    //   "script",
    //   { src: "https://hm.baidu.com/hm.js?db1f163122162bcdb6d04f76b5c1df17" },
    // ],
  ],
  themeConfig: {
    repo: "febobo/web-interview",
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: "Github",

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: "febobo/web-interview",
    docsDir: "docs",
    docsBranch: "master",
    // 默认是 false, 设置为 true 来启用
    editLinks: false,
    // 默认为 "Edit this page"
    editLinkText: "帮助我们改善此页面！",
    // displayAllHeaders: true,
    sidebar: [
      {
        title: "Vue系列  ( 已完结..)",
        collapsable: false,
        children: [
          ["vue/vue", "说说你对vue的理解?"],
          ["vue/spa", "说说你对SPA（单页应用）的理解?"],
          ["vue/show_if", "Vue中的v-show和v-if怎么理解？"],
          ["vue/new_vue", "Vue实例挂载的过程中发生了什么?"],
          ["vue/lifecycle", "说说你对Vue生命周期的理解?"],
          ["vue/if_for", "为什么Vue中的v-if和v-for不建议一起用?"],
          ["vue/first_page_time", "SPA（单页应用）首屏加载速度慢怎么解决？"],
          ["vue/data", "为什么data属性是一个函数而不是一个对象？"],
          ["vue/data_object_add_attrs", "Vue中给对象添加新属性界面不刷新?"],
          ["vue/components_plugin", "Vue中组件和插件有什么区别？"],
          ["vue/communication", "Vue组件间通信方式都有哪些?"],
          ["vue/bind", "说说你对双向绑定的理解?"],
          ["vue/nexttick", "说说你对nexttick的理解?"],
          ["vue/mixin", "说说你对vue的mixin的理解，有什么应用场景？"],
          ["vue/slot", "说说你对slot的理解？slot使用场景有哪些？"],
          ["vue/observable", "Vue.observable你有了解过吗？说说看"],
          ["vue/key", "你知道vue中key的原理吗？说说你对它的理解？"],
          ["vue/keepalive", "怎么缓存当前的组件？缓存后怎么更新？说说你对keep-alive的理解是什么？"],
          ["vue/modifier", "Vue常用的修饰符有哪些？有什么应用场景？"],
          ["vue/directive", "你有写过自定义指令吗？自定义指令的应用场景有哪些？"],
          ["vue/filter", "Vue中的过滤器了解吗？过滤器的应用场景有哪些？"],
          ["vue/vnode", "什么是虚拟DOM？如何实现一个虚拟DOM？说说你的思路"],
          ["vue/diff", "你了解vue的diff算法吗？说说看"],
          ["vue/axios", "Vue项目中有封装过axios吗？主要是封装哪方面的？"],
          ["vue/axiosCode", "你了解axios的原理吗？有看过它的源码吗？"],
          ["vue/ssr", "SSR解决了什么问题？有做过SSR吗？你是怎么做的？"],
          ["vue/structure", "说下你的vue项目的目录结构，如果是大型项目你该怎么划分结构和划分组件呢？"],
          ["vue/permission", "vue要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？"],
          ["vue/cors", "Vue项目中你是如何解决跨域的呢？"],
          ["vue/404", "vue项目本地开发完成后部署到服务器后报404是什么原因呢？"],
          ["vue/error", "你是怎么处理vue项目中的错误的？"],
          ["vue/vue3_vue2", "Vue3有了解过吗？能说说跟Vue2的区别吗？"]
        ],
      },
      {
        title: "Vue3系列  ( 已完结..)",
        collapsable: false,
        children: [
          ["vue3/goal", "Vue3.0的设计目标是什么？做了哪些优化?"],
          ["vue3/performance", "Vue3.0 性能提升主要是通过哪几方面体现的？"],
          ["vue3/proxy", "Vue3.0里为什么要用 Proxy API 替代 defineProperty API ？"],
          ["vue3/composition", "Vue3.0 所采用的 Composition Api 与 Vue2.x 使用的 Options Api 有什么不同？"],
          ["vue3/treeshaking", "说说Vue 3.0中Treeshaking特性？举例说明一下？"],
          ["vue3/modal_component", "用Vue3.0 写过组件吗？如果想实现一个 Modal你会怎么设计？"],
        ],
      },
      {
        title: "ES6系列  ( 已完结..)",
        collapsable: false,
        children: [
          ["es6/var_let_const", "说说var、let、const之间的区别"],
          ["es6/array", "ES6中数组新增了哪些扩展?"],
          ["es6/object", "ES6中对象新增了哪些扩展?"],
          ["es6/function", "ES6中函数新增了哪些扩展?"],
          ["es6/set_map", "ES6中新增的Set、Map两种数据结构怎么理解?"],
          ["es6/promise", "你是怎么理解ES6中 Promise的？使用场景？"],
          ["es6/generator", "怎么理解ES6中 Generator的？使用场景？"],
          ["es6/proxy", "你是怎么理解ES6中Proxy的？使用场景?"],
          ["es6/module", "你是怎么理解ES6中Module的？使用场景？"],
          ["es6/decorator", "你是怎么理解ES6中 Decorator 的？使用场景？"],
        ],
      },
      {
        title: "JavaScript系列  ( 进行中..)",
        collapsable: false,
        children: [
          ["JavaScript/data_type", "说说JavaScript中的数据类型？存储上的差别？"],
          ["JavaScript/array_api", "数组的常用方法有哪些？"],
          ["JavaScript/string_api", "JavaScript字符串的常用方法有哪些？"],
          ["JavaScript/type_conversion", "谈谈 JavaScript 中的类型转换机制"],
          ["JavaScript/== _===", "== 和 ===区别，分别在什么情况使用"],
          ["JavaScript/copy", "深拷贝浅拷贝的区别？如何实现一个深拷贝？"],
          ["JavaScript/closure", "说说你对闭包的理解？闭包使用场景"],
          ["JavaScript/scope", "说说你对作用域链的理解"],
          ["JavaScript/prototype", "JavaScript原型，原型链 ? 有什么特点？"],
          ["JavaScript/inherit", "Javascript如何实现继承？"],
          ["JavaScript/this", "谈谈this对象的理解"],
          ["JavaScript/context_stack", "JavaScript中执行上下文和执行栈是什么？"],
          ["JavaScript/event_Model", "说说JavaScript中的事件模型"],
          ["JavaScript/typeof_instanceof", "typeof 与 instanceof 区别"],
          ["JavaScript/event_agent", "解释下什么是事件代理？应用场景？"],
          ["JavaScript/new", "说说new操作符具体干了什么？"],
          ["JavaScript/ajax", "ajax原理是什么？如何实现？"],
          ["JavaScript/bind_call_apply", "bind、call、apply 区别？如何实现一个bind?"],
          ["JavaScript/regexp", "说说你对正则表达式的理解？应用场景？"],
          ["JavaScript/event_loop", "说说你对事件循环的理解"],
          ["JavaScript/Dom", "DOM常见的操作有哪些？"],
          ["JavaScript/BOM", "说说你对BOM的理解，常见的BOM对象你了解哪些？"],

          ["JavaScript/tail_recursion", "举例说明你对尾递归的理解，有哪些应用场景"],
          ["JavaScript/memory_leak", "说说 JavaScript 中内存泄漏的几种情况？"],
          ["JavaScript/cache", "Javascript本地存储的方式有哪些？区别及应用场景？"],
          ["JavaScript/functional_programming", "说说你对函数式编程的理解？优缺点？"],
          ["JavaScript/function_cache", "Javascript中如何实现函数缓存？函数缓存有哪些应用场景？"],
          ["JavaScript/loss_accuracy", "说说 Javascript 数字精度丢失的问题，如何解决？"],
          ["JavaScript/debounce_throttle", "什么是防抖和节流？有什么区别？如何实现？"],
          ["JavaScript/visible", "如何判断一个元素是否在可视区域中？"]
        ],
      }
    ],
  },
  markdown: {
    lineNumbers: true,
  },
};
