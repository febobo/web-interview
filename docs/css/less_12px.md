# 面试官：让Chrome支持小于12px 的文字方式有哪些？区别？

![](https://static.vue-js.com/62945fd0-a334-11eb-85f6-6fac77c0c9b3.png)

## 一、背景

Chrome 中文版浏览器会默认设定页面的最小字号是12px，英文版没有限制

原由 Chrome 团队认为汉字小于12px就会增加识别难度

- 中文版浏览器

与网页语言无关，取决于用户在Chrome的设置里（chrome://settings/languages）把哪种语言设置为默认显示语言

- 系统级最小字号

浏览器默认设定页面的最小字号，用户可以前往 chrome://settings/fonts 根据需求更改

而我们在实际项目中，不能奢求用户更改浏览器设置

对于文本需要以更小的字号来显示，就需要用到一些小技巧


## 二、解决方案

常见的解决方案有：

- zoom
-  -webkit-transform:scale()
-  -webkit-text-size-adjust:none

### Zoom

`zoom` 的字面意思是“变焦”，可以改变页面上元素的尺寸，属于真实尺寸

其支持的值类型有：

- zoom:50%，表示缩小到原来的一半
- zoom:0.5，表示缩小到原来的一半

使用 `zoom` 来”支持“ 12px 以下的字体

代码如下：

```html
<style type="text/css">
    .span1{
        font-size: 12px;
        display: inline-block;
        zoom: 0.8;
    }
    .span2{
        display: inline-block;
        font-size: 12px;
    }
</style>
<body>
    <span class="span1">测试10px</span>
    <span class="span2">测试12px</span>
</body>
```

效果如下：

 ![](https://static.vue-js.com/d5243980-a334-11eb-ab90-d9ae814b240d.png)

> 需要注意的是，`Zoom` 并不是标准属性，需要考虑其兼容性

 ![image.png](https://static.vue-js.com/3defe3c0-a343-11eb-85f6-6fac77c0c9b3.png)


### -webkit-transform:scale()

针对`chrome`浏览器,加`webkit`前缀，用`transform:scale()`这个属性进行放缩

注意的是，使用`scale`属性只对可以定义宽高的元素生效，所以，下面代码中将`span`元素转为行内块元素

实现代码如下：

```html
<style type="text/css">
    .span1{
        font-size: 12px;
        display: inline-block;
        -webkit-transform:scale(0.8);
    }
    .span2{
        display: inline-block;
        font-size: 12px;
    }
</style>
<body>
    <span class="span1">测试10px</span>
    <span class="span2">测试12px</span>
</body>
```

效果如下：

 ![](https://static.vue-js.com/d5243980-a334-11eb-ab90-d9ae814b240d.png)


### -webkit-text-size-adjust:none

该属性用来设定文字大小是否根据设备(浏览器)来自动调整显示大小

属性值：

- percentage：字体显示的大小；
- auto：默认，字体大小会根据设备/浏览器来自动调整；
- none:字体大小不会自动调整

```css
html { -webkit-text-size-adjust: none; }
```

这样设置之后会有一个问题，就是当你放大网页时，一般情况下字体也会随着变大，而设置了以上代码后，字体只会显示你当前设置的字体大小，不会随着网页放大而变大了

所以，我们不建议全局应用该属性，而是单独对某一属性使用

> 需要注意的是，自从`chrome 27`之后，就取消了对这个属性的支持。同时，该属性只对英文、数字生效，对中文不生效

## 三、总结

`Zoom` 非标属性，有兼容问题，缩放会改变了元素占据的空间大小，触发重排

`-webkit-transform:scale()` 大部分现代浏览器支持，并且对英文、数字、中文也能够生效，缩放不会改变了元素占据的空间大小，页面布局不会发生变化

`-webkit-text-size-adjust`对谷歌浏览器有版本要求，在27之后，就取消了该属性的支持，并且只对英文、数字生效

## 参考文献

- https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-size-adjust
- https://vue3js.cn/interview