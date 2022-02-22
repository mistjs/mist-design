<template>
  <div class="space-align-container">
    <div class="space-align-block">
      <m-space align="center">
        center
        <m-button type="primary">Primary</m-button>
        <span class="mock-block">Block</span>
      </m-space>
    </div>
    <div class="space-align-block">
      <m-space align="start">
        start
        <m-button type="primary">Primary</m-button>
        <span class="mock-block">Block</span>
      </m-space>
    </div>
    <div class="space-align-block">
      <m-space align="end">
        end
        <m-button type="primary">Primary</m-button>
        <span class="mock-block">Block</span>
      </m-space>
    </div>
    <div class="space-align-block">
      <m-space align="baseline">
        baseline
        <m-button type="primary">Primary</m-button>
        <span class="mock-block">Block</span>
      </m-space>
    </div>
  </div>
</template>

<style scoped>
.space-align-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
.space-align-block {
  flex: none;
  margin: 8px 4px;
  padding: 4px;
  border: 1px solid #13c2c2;
}
.space-align-block .mock-block {
  display: inline-block;
  padding: 32px 8px 16px;
  background: rgba(150, 150, 150, 0.2);
}
</style>
