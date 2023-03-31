<template>
  <div class="end-node">
    <div class="end-node-circle" />
    <div class="end-node-text">END</div>
  </div>
</template>

<style lang="scss" scoped>
.end-node {
  margin-top: auto;
  margin-bottom: auto;
  border-radius: 50%;
  font-size: 14px;
  text-align: left;
  .end-node-circle {
    width: 24px;
    height: 24px;
    margin: auto;
    border-radius: 50%;
    background: var(--vp-c-border);
  }
  .end-node-text {
    margin-top: 0.5rem;
    text-align: center;
  }
}

.direction-horizontal {
  .end-node {
    display: flex;
  }
  .end-node-text {
    margin-top: 0;
    margin-left: 0.5rem;
    text-align: center;
  }
}
</style>
