<template>
  <div :class="['node-wrapper', { 'condition-node-wrapper': isCond }]">
    <NodeWrapper :node="node">
      <div :class="['node', { 'is-root': isRoot }]">
        {{ node.attrs.id }} : {{ node.attrs.name }}
      </div>
    </NodeWrapper>

    <EdgeRenderer v-if="!isCond" />
  </div>

  <BranchRenderer v-if="node.conditions.length" :conditions="node.conditions" />

  <NodeRenderer v-if="node.child" :node="node.child" />
</template>

<script lang="ts" setup>
import EdgeRenderer from '../edge.vue'
import BranchRenderer from '../branch.vue'
import NodeWrapper from './container.vue'
import type { WNode } from '@/SaWorkflow/node'
import { NodeType, isCondNode } from '@/SaWorkflow/node'

defineOptions({
  name: 'NodeRenderer',
})

const props = defineProps<{
  node: WNode
}>()

const isRoot = computed(() => props.node.type === NodeType.Root)
const isCond = computed(() => isCondNode(props.node))
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
  cursor: pointer;
  padding: 4px 12px;
  z-index: 1;

  &:not(.is-root)::before {
    content: '';
    position: absolute;
    top: -13px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 4px;
    border-style: solid;
    border-width: 8px 6px 4px;
    border-color: var(--vp-c-border) transparent transparent;
    background-color: var(--vp-c-bg-soft);
    z-index: 2;
    pointer-events: none;
  }
}

// =========== condition node ===============
.condition-node-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 216px;
}
// ==========================================

// ========= direction horizontal ===========

.direction-horizontal {
  .node-wrapper {
    padding: 50px 0;
    flex-direction: row;
    flex-wrap: nowrap;
    width: fit-content;
  }
  .node {
    flex-direction: row;

    &:not(.is-root)::before {
      top: calc(50% - 6px);
      left: -13px;
      transform: rotate(-90deg);
      width: 0;
      height: 4px;
    }
  }

  .condition-node-wrapper {
    min-width: 370px;
  }
}

// ==========================================
</style>
