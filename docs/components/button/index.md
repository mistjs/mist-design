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


<demo title="加载中状态" id="components-button-demo-loading" src="./example/loading.vue" desc="添加`loading`属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。"></demo>


<demo title="幽灵按钮" id="components-button-demo-ghost" src="./example/ghost.vue" desc="幽灵按钮将按钮的内容反色，背景变为透明，常用在有色背景上。"></demo>


<demo title="多个按钮组合" id="components-button-demo-dropdown-btn" src="./example/dropdownBtn.vue" desc="按钮组合使用时，推荐使用 1 个主操作 + n 个次操作，3 个以上操作时把更多操作放到`Dropdown.Button`中组合使用。"></demo>


<demo title="Block按钮" id="components-button-demo-block" src="./example/block.vue" desc="`block`属性将使按钮适合其父宽度。"></demo>


<demo title="危险按钮" id="components-button-demo-danger" src="./example/danger.vue" desc="危险作为一种按钮属性而不是按钮类型。"></demo>


## API

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`type` -> `shape` -> `size` -> `loading` -> `disabled`。

按钮的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| block | 将按钮宽度调整为其父宽度的选项 | boolean | false |  |
| danger | 设置危险按钮 | boolean | false |  |
| disabled | 按钮失效状态 | boolean | false |  |
| ghost | 幽灵属性，使按钮背景透明 | boolean | false |  |
| href | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 | string | - |  |
| htmlType | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | string | `button` |  |
| icon | 设置按钮的图标组件 | ReactNode | - |  |
| loading | 设置按钮载入状态 | boolean \| { delay: number } | false |  |
| shape | 设置按钮形状 | `default` \| `circle` \| `round` | 'default' |  |
| size | 设置按钮大小 | `large` \| `middle` \| `small` | `middle` |  |
| target | 相当于 a 链接的 target 属性，href 存在时生效 | string | - |  |
| type | 设置按钮类型 | `primary` \| `ghost` \| `dashed` \| `link` \| `text` \| `default` | `default` |  |

支持原生 button 的其他所有属性。

## 事件

| 事件名称 | 说明             | 回调参数        | 版本 |
| -------- | ---------------- | --------------- | ---- |
| click    | 点击按钮时的回调 | (event) => void |      |

支持原生 button 的其他所有属性。

## FAQ

### 如何移除两个汉字之间的空格？

根据 Ant Design 设计规范要求，我们会在按钮内(文本按钮和链接按钮除外)只有两个汉字时自动添加空格，如果你不需要这个特性，可以设置 [ConfigProvider](/components/config-provider/#API) 的 `autoInsertSpaceInButton` 为 `false`。

<m-config-provider :autoInsertSpaceInButton="autoInsertSpaceInButton">
    <m-button type="primary" @click="onSwitch">切换</m-button>
</m-config-provider>

<script setup lang="ts">
import { ref } from "vue";
const autoInsertSpaceInButton = ref<boolean>(true);
const onSwitch = ()=>{
    autoInsertSpaceInButton.value = !autoInsertSpaceInButton.value;
}
</script>

<style>

[id^="components-button-demo-"] .mist-btn {
    margin-right: 8px;
    margin-bottom: 12px;
}
[id^="components-button-demo-"] .mist-btn-rtl {
    margin-right: 0;
    margin-left: 8px;
}
[id^="components-button-demo-"] .mist-btn-group > .mist-btn {
    margin-right: 0;
}
[data-theme="dark"] .site-button-ghost-wrapper {
    background: rgba(255, 255, 255, 0.2);
}
</style>
