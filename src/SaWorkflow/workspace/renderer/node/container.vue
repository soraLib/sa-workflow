<template>
  <div :class="['node-container', { 'is-selected': isSelected }]">
    <ElButton
      v-if="!isRoot && !(isCond && isChildRoute)"
      title="remove node"
      class="remove-node"
      link
      type="danger"
      @click.stop="removeNode"
    >
      <ElIcon :size="24">
        <CloseSharp />
      </ElIcon>
    </ElButton>

    <ElButton
      v-if="!isRoot"
      title="add condition"
      class="add-condition"
      color="#5856D5"
      circle
      :icon="AddBranchIcon"
      @click.stop="addBranch"
    />

    <slot />

    <ElButton
      title="add child node"
      class="add-child"
      color="#5856D5"
      circle
      :icon="Add"
      @click.stop="addChild"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  Add,
  ChevronDownOutline,
  ChevronForwardOutline,
  CloseSharp,
} from '@vicons/ionicons5'
import type { WNode } from '@/SaWorkflow/node'
import {
  NodeType,
  isNodeSelected,
  isRoute,
  isRouteCond,
} from '@/SaWorkflow/node'

const props = defineProps<{
  node: WNode
}>()

const AddBranchIcon = computed(() =>
  props.node.graph.direction === 'horizontal'
    ? ChevronDownOutline
    : ChevronForwardOutline
)
const isRoot = computed(() => props.node.type === NodeType.Root)
const isCond = computed(() => isRouteCond(props.node))
const isChildRoute = computed(
  () => props.node.child && isRoute(props.node.child)
)
const isSelected = computed(() => isNodeSelected(props.node))

const addChild = () => props.node.addChild()
const addBranch = () => props.node.addCond()
const removeNode = () => props.node.remove()
</script>

<style lang="scss" scoped>
@use 'button.scss';
@import '../var.scss';

// button half length
$half: 16px;
// button line offset
$offset: calc(1px - $margin * 0.5);
$len: calc($margin * 0.5 - 2px);

.node-container {
  position: relative;
  border: 2px solid var(--vp-c-border);
  background-color: var(--vp-node-bg-color);
  border-radius: 8px;
  transition: border-color 0.28s ease-in;
  margin: 0 $margin;

  &.is-selected,
  &:hover {
    border-color: var(--vp-c-brand);
  }
  &:hover {
    .button-basic {
      opacity: 1;
    }
  }

  .add-condition {
    @extend .button-basic;
    right: -$margin - $half;
    top: calc(50% - $half);

    &::before {
      content: '';
      position: absolute;
      z-index: 1;
      left: $offset;
      width: $len;
      height: 2px;
      background-color: var(--vp-c-brand);
    }
  }

  .add-child {
    @extend .button-basic;
    bottom: -$margin - $half;
    left: calc(50% - $half);

    &::before {
      content: '';
      position: absolute;
      z-index: 1;
      top: $offset;
      width: 2px;
      height: $len;
      background-color: var(--vp-c-brand);
    }
  }

  .remove-node {
    @extend .button-basic;
    right: 100%;
  }
}

// ========= direction horizontal ===========
.direction-horizontal .node-container {
  margin: $margin 0;

  .add-condition {
    left: calc(50% - $half);
    top: calc(100% + $margin - $half);

    &::before {
      width: 2px;
      height: $len;
      left: unset;
      top: $offset;
    }
  }

  .add-child {
    left: calc(100% - $half + $margin);
    top: calc(50% - $half);

    &::before {
      width: $len;
      height: 2px;
      top: unset;
      left: $offset;
    }
  }
}
// ==========================================
</style>
