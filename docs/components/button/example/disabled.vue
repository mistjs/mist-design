<template>
  <m-button type="primary">Primary</m-button>
  <m-button type="primary" disabled> Primary(disabled) </m-button>
  <br />
  <m-button>Default</m-button>
  <m-button disabled>Default(disabled)</m-button>
  <br />
  <m-button type="dashed">Dashed</m-button>
  <m-button type="dashed" disabled> Dashed(disabled) </m-button>
  <br />
  <m-button type="text">Text</m-button>
  <m-button type="text" disabled> Text(disabled) </m-button>
  <br />
  <m-button type="link">Link</m-button>
  <m-button type="link" disabled> Link(disabled) </m-button>
  <br />
  <m-button danger>Danger Default</m-button>
  <m-button danger disabled> Danger Default(disabled) </m-button>
  <br />
  <m-button danger type="text"> Danger Text </m-button>
  <m-button danger type="text" disabled> Danger Text(disabled) </m-button>
  <br />
  <m-button type="link" danger> Danger Link </m-button>
  <m-button type="link" danger disabled> Danger Link(disabled) </m-button>
  <div class="site-m-button-ghost-wrapper">
    <m-button ghost>Ghost</m-button>
    <m-button ghost disabled> Ghost(disabled) </m-button>
  </div>
</template>

<style scoped>
.site-m-button-ghost-wrapper {
  padding: 8px 8px 0 8px;
  background: rgb(190, 200, 200);
}
</style>
