<template>
  <div class="node-wrapper">
    <div class="node" :class="{ 'begin-node': isBeginNode }">
      {{ node.attrs.name }}
    </div>

    <EdgeRenderer />
  </div>

  <NodeRenderer v-if="node.child" :node="node.child" />
</template>

<script lang="ts" setup>
import EdgeRenderer from './edge.vue'
import type { WNode } from '../../node'

defineOptions({
  name: 'NodeRenderer',
})

const props = defineProps<{
  node: WNode
}>()

const isBeginNode = computed(() => !props.node.parent)
</script>

<style lang="scss" scoped>
.node-wrapper {
  width: 100%;
  display: inline-flex;

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 50px;
  position: relative;
}
.node {
  display: inline-flex;
  flex-direction: column;
  position: relative;
  width: 220px;
  min-height: 72px;
  flex-shrink: 0;
  background-color: var(--vp-c-brand-dark);
  border-radius: 8px;
  cursor: pointer;
  padding: 4px 12px;

  &:not(.begin-node)::before {
    content: '';
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 4px;
    border-style: solid;
    border-width: 8px 6px 4px;
    border-color: var(--vp-c-border) transparent transparent;
    background-color: var(--vp-c-bg-soft);
    z-index: 2;
  }
}

.direction-horizontal {
  .node-wrapper {
    padding: 50px 0;
    width: fit-content;
    flex-direction: row;
  }
  .node {
    flex-direction: row;

    &:not(.begin-node)::before {
      content: '';
      position: absolute;
      top: calc(50% - 6px);
      left: -12px;
      transform: rotate(-90deg);
      width: 0;
      height: 4px;
      border-style: solid;
      border-width: 8px 6px 4px;
      border-color: var(--vp-c-border) transparent transparent;
      background-color: var(--vp-c-bg-soft);
      z-index: 2;
    }
  }
}

html.dark {
  .node {
    background-color: var(--vp-c-brand-dark);
  }
}
</style>
