# Divider 分割线

区隔内容的分割线。

## 何时使用

<br/>

- 对不同章节的文本段落进行分割。
- 对行内文字/链接进行分割，例如表格的操作列。

## 代码演示

<br/>

<demo title="水平分割线" id="components-divider-demo-basic" src="./example/basic.vue" desc="默认为水平分割线，可在中间加入文字。"></demo>


<demo title="带文字的分割线" id="components-divider-demo-font" src="./example/font.vue" desc="分割线中带有文字，可以用`orientation`指定文字位置。"></demo>


<demo title="分割文字使用正文样式" id="components-divider-demo-plain" src="./example/plain.vue" desc="使用`plain`可以设置为更轻量的分割文字样式。"></demo>


<demo title="垂直分割线" id="components-divider-demo-vertical" src="./example/vertical.vue" desc="将`type`设置为`vertical`行内的垂直分割线。"></demo>


## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | -- |
| dashed | 是否虚线 | boolean | false |  |
| orientation | 分割线标题的位置 | `left` \| `right` \| `center` | `center` |  |
| orientationMargin | 标题和最近 left/right 边框之间的距离，去除了分割线，同时 `orientation` 必须为 `left` 或 `right` | string \| number | - |  |
| plain | 文字是否显示为普通正文样式 | boolean | false |  |
| type | 水平还是垂直类型 | `horizontal` \| `vertical` | `horizontal` |  |
