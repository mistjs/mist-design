# Affix 固定

将页面元素钉在可视范围。

## 何时使用

当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。

页面可视范围过小时，慎用此功能以免遮挡页面内容。

## 代码演示

<br/>

<demo title="基本" id="components-affix-demo-basic" src="./example/basic.vue" desc="最简单的用法。"></demo>


<demo title="固定状态改变的回调" id="components-affix-demo-change" src="./example/change.vue" desc="可以获得是否固定的状态。"></demo>


<demo title="滚动容器" id="components-affix-demo-target" src="./example/target.vue" desc="用`target`设置`Affix`需要监听其滚动事件的元素，默认为 `window`。"></demo>


## API

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | number | - |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | number | 0 |
| target | 设置 `Affix` 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | () => HTMLElement | () => window |


## 事件
| 事件名称 | 说明             | 回调参数        | 默认值 |
| --- | --- | --- |--|
| change | 固定状态改变时触发的回调函数 | (affixed?: boolean) => void | - |


**注意：**`Affix` 内的元素不要使用绝对定位，如需要绝对定位的效果，可以直接设置 `Affix` 为绝对定位：

```vue
<template>
  <m-affix :style="{position: 'absolute', top: y, left: x }">...</m-affix>
</template>
```

## FAQ

### Affix 使用 `target` 绑定容器时，元素会跑到容器外。

从性能角度考虑，我们只监听容器滚动事件。

相关 issue：[#3938](https://github.com/ant-design/ant-design/issues/3938) [#5642](https://github.com/ant-design/ant-design/issues/5642) [#16120](https://github.com/ant-design/ant-design/issues/16120)

<style>
#components-affix-demo-target .scrollable-container{
    height: 100px;
    overflow-y: scroll;
}
#components-affix-demo-target .background{
    padding-top: 60px;
    height: 300px;
    background-image:url("https://zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg");
}
</style>
