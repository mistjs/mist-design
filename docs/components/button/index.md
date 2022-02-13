# Button 按钮

按钮用于一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

在 Mist UI 中我们提供了五种按钮。

- 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
- 默认按钮：用于没有主次之分的一组行动点。
- 虚线按钮：常用于添加操作。
- 文本按钮：用于最次级的行动点。
- 链接按钮：一般用于链接，即导航至某位置。

以及四种状态属性与上面配合使用。
- 危险：删除/移动/修改权限等危险操作，一般需要二次确认。
- 幽灵：用于背景色比较复杂的地方，常用在首页/产品页等展示场景。
- 禁用：行动点不可用的时候，一般需要文案解释。
- 加载中：用于异步操作等待反馈的时候，也可以避免多次提交。

## 代码演示

<br />

<demo title="按钮类型" id="components-button-demo-basic" src="./example/basic.vue" desc="按钮有五种类型：主按钮、次按钮、虚线按钮、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。"></demo>


<demo title="图标按钮" id="components-button-demo-icons" src="./example/icons.vue" desc="当需要在`Button`内嵌入`Icon`时，可以设置`icon`属性或者插槽，或者直接在`Button`内使用`Icon`组件。<br/> 如果想控制`Icon`具体的位置，只能直接使用`Icon`组件，而非`icon`属性或者插槽。"></demo>


<demo title="按钮尺寸" id="components-button-demo-size" src="./example/size.vue" desc="按钮有大、中、小三种尺寸。<br/>通过设置`size`为`large` `small`分别把按钮设为大、小尺寸。若不设置`size`，则尺寸为中。"></demo>


<demo title="不可用状态" id="components-button-demo-disabled" src="./example/disabled.vue" desc="添加`disabled`属性即可让按钮处于不可用状态，同时按钮样式也会改变。"></demo>


<demo title="幽灵按钮" id="components-button-demo-ghost" src="./example/ghost.vue" desc="幽灵按钮将按钮的内容反色，背景变为透明，常用在有色背景上。"></demo>


<demo title="多个按钮组合" id="components-button-demo-dropdown-btn" src="./example/dropdownBtn.vue" desc="按钮组合使用时，推荐使用 1 个主操作 + n 个次操作，3 个以上操作时把更多操作放到`Dropdown.Button`中组合使用。"></demo>


<demo title="Block按钮" id="components-button-demo-block" src="./example/block.vue" desc="`block`属性将使按钮适合其父宽度。"></demo>


<demo title="危险按钮" id="components-button-demo-danger" src="./example/danger.vue" desc="危险作为一种按钮属性而不是按钮类型。"></demo>
