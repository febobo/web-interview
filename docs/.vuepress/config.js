module.exports = {
  // title: "Vue3源码解析 - vue中文社区",
  title: "web前端面试 - 面试官系列",
  description: "web前端面试,vue面试题,react面试题,js面试题,大厂面试题,阿里面试题,京东面试题",
  //   base: '/slamdunk-the-vue3/',
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
        title: "Vue系列",
        collapsable: false,
        children: [
          ["vue/vue", "面试官：说说你对vue的理解?"],
          ["vue/spa", "面试官：说说你对SPA（单页应用）的理解?"],
          ["vue/show_if", "面试官：Vue中的v-show和v-if怎么理解？"],
          ["vue/new_vue", "面试官：Vue实例挂载的过程中发生了什么?"],
          ["vue/lifecycle", "面试官：说说你对Vue生命周期的理解?"],
          ["vue/if_for", "面试官：为什么Vue中的v-if和v-for不建议一起用?"],
          ["vue/first_page_time", "面试官：SPA（单页应用）首屏加载速度慢怎么解决？"],
          ["vue/data", "面试官：为什么data属性是一个函数而不是一个对象？"],
          ["vue/data_object_add_attrs", "面试官：Vue中给对象添加新属性界面不刷新?"],
          ["vue/components_plugin", "面试官：Vue中组件和插件有什么区别？"],
          ["vue/communication", "面试官：Vue组件间通信方式都有哪些?"],
          ["vue/bind", "面试官：说说你对双向绑定的理解?"],
          // ["start/overview", "导读 | Vue3设计理念"]
        ],
      }
    ],
  },
  markdown: {
    lineNumbers: true,
  },
};
