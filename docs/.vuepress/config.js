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
        title: "Vue",
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
          // ["vue/cors", "Vue项目中你是如何解决跨域的呢？"],
          // ["vue/filter", "vue项目本地开发完成后部署到服务器后报404是什么原因呢？"],
          // ["vue/filter", "你是怎么处理vue项目中的错误的？"],
          // ["start/overview", "导读 | Vue3设计理念"]
        ],
      }
    ],
  },
  markdown: {
    lineNumbers: true,
  },
};
