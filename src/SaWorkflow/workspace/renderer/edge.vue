<template>
  <div class="edge-wrapper">
    <div class="edge" />
  </div>
</template>

<style lang="scss" scoped>
@import 'var.scss';

.edge-wrapper {
  width: 220px;
  display: inline-flex;
  flex-shrink: 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    margin: auto;
    width: 2px;
    background-color: var(--vp-c-border);
  }

  .edge {
    height: $edge-length;
  }
}

.direction-horizontal {
  .edge-wrapper {
    width: 72px;

    &::before {
      margin: auto;
      height: 2px;
      width: 100%;
      background-color: var(--vp-c-border);
    }
  }
}
</style>
