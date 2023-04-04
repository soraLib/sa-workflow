<template>
  <BranchRenderer v-if="isRoute(node)" :route="node" />
  <div
    v-else
    :class="['node-wrapper', { 'condition-node-wrapper': isCond }]"
    @click.stop="handleSelect"
  >
    <NodeWrapper :node="node">
      <div :class="['node', { 'is-root': isRoot }]">
        <div
          :class="[
            'previous-node-swapper-wrapper',
            { 'has-previous': showPreviousSwapper },
          ]"
        >
          <ElButton
            v-if="showPreviousSwapper"
            title="swap nodes"
            class="nodes-swapper"
            link
            @click.stop="handleSwapWithPrevious"
          >
            <ElIcon :size="12">
              <SwapIcon />
            </ElIcon>
          </ElButton>
        </div>
        <div class="node-content">
          <div>id: {{ node.attrs.id }}</div>
          <div>name: {{ node.attrs.name }}</div>
          <div>nodeWidth : {{ nodeWidth }}</div>
        </div>
        <div
          :class="[
            'next-node-swapper-wrapper',
            { 'has-next': showNextNodeSwapper },
          ]"
        >
          <ElButton
            v-if="showNextNodeSwapper"
            title="swap nodes"
            class="nodes-swapper"
            link
            @click.stop="handleSwapWithNext"
          >
            <ElIcon :size="12">
              <SwapIcon />
            </ElIcon>
          </ElButton>
        </div>
      </div>
    </NodeWrapper>

    <EdgeRenderer v-if="!isCond" />
  </div>

  <NodeRenderer v-if="node.child" :node="node.child" />
</template>

<script lang="ts" setup>
import { SwapHorizontalOutline, SwapVerticalOutline } from '@vicons/ionicons5'
import EdgeRenderer from '../edge.vue'
import BranchRenderer from '../branch.vue'
import NodeWrapper from './container.vue'
import type { WNode } from '@/SaWorkflow/node'
import {
  NodeType,
  findCondIndex,
  getNodeWidth,
  isRoute,
  isRouteCond,
} from '@/SaWorkflow/node'

defineOptions({
  name: 'NodeRenderer',
})

const props = defineProps<{
  node: WNode
}>()

const isRoot = computed(() => props.node.type === NodeType.Root)
const isCond = computed(() => isRouteCond(props.node))
const condIndex = computed(() => findCondIndex(props.node))
const nodeWidth = computed(() => getNodeWidth(props.node))
const SwapIcon = computed(() =>
  props.node.graph.direction === 'horizontal'
    ? SwapVerticalOutline
    : SwapHorizontalOutline
)

const showNextNodeSwapper = computed(() => {
  if (!props.node.parent || !isRoute(props.node.parent)) return false

  return condIndex.value < props.node.parent.conditions.length - 1
})
const showPreviousSwapper = computed(() => condIndex.value > 0)

const handleSelect = () => {
  props.node.select()
}
const handleSwapWithPrevious = () => props.node.swapWithPrevious()
const handleSwapWithNext = () => props.node.swapWithNext()
</script>

<style lang="scss" scoped>
@import '../var.scss';

.node-wrapper {
  width: 100%;
  display: inline-flex;

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
}

.node {
  display: flex;
  height: 100%;
  position: relative;
  width: 220px;
  cursor: pointer;
  z-index: 1;
  overflow: hidden;

  .node-content {
    flex-grow: 1;
    padding: 4px;
  }

  .previous-node-swapper-wrapper,
  .next-node-swapper-wrapper {
    width: 14px;
    overflow: hidden;

    .nodes-swapper {
      transition: opacity 0.28s ease-in;
      border-radius: 0;
      opacity: 0;
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100%;
      border: none;
      color: white;
      background-color: var(--vp-c-brand);
      vertical-align: baseline;
    }

    &.has-previous,
    &.has-next {
      &:hover .nodes-swapper {
        opacity: 1;
        background-color: var(--vp-c-brand);
      }
    }
  }
  .previous-node-swapper-wrapper {
    border-radius: 4px 0 0 4px;
  }
  .next-node-swapper-wrapper {
    border-radius: 0 4px 4px 0;
  }

  &:not(.is-root)::before {
    content: '';
    position: absolute;
    top: -14px;
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
  min-height: calc($node-height + $edge-length * 2);
}
// ==========================================

// ========= direction horizontal ===========

.direction-horizontal {
  .node-wrapper {
    flex-direction: row;
    flex-wrap: nowrap;
    width: fit-content;
  }

  .node {
    flex-direction: column;

    .node-content {
      padding: 0 18px;
    }

    .previous-node-swapper-wrapper,
    .next-node-swapper-wrapper {
      width: 100%;
      height: 14px;
      line-height: 14px;
    }
    .previous-node-swapper-wrapper {
      border-radius: 4px 4px 0 0;
    }
    .next-node-swapper-wrapper {
      border-radius: 0 0 4px 4px;
    }

    &:not(.is-root)::before {
      top: calc(50% - 6px);
      left: -14px;
      transform: rotate(-90deg);
      width: 0;
      height: 4px;
    }
  }

  .condition-node-wrapper {
    min-width: 370px;
    min-height: calc($node-height + $margin * 2);
  }
}

// ==========================================
</style>
