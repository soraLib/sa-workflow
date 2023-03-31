<template>
  <div class="node-container">
    <ElButton
      v-if="!isRoot && !(hasBranchCond && isCond)"
      title="remove node"
      class="remove-node"
      link
      type="danger"
      @click="removeNode"
    >
      <ElIcon :size="24">
        <CloseSharp />
      </ElIcon>
    </ElButton>

    <ElButton
      v-if="!isRoot"
      title="add branch"
      class="add-branch"
      circle
      :icon="AddBranchIcon"
      @click="addBranch"
    />

    <slot />

    <ElButton
      title="add child node"
      class="add-child"
      circle
      :icon="Add"
      @click="addChild"
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
import { NodeType, isCondNode } from '@/SaWorkflow/node'

const props = defineProps<{
  node: WNode
}>()

const AddBranchIcon = computed(() =>
  props.node.graph.direction === 'horizontal'
    ? ChevronDownOutline
    : ChevronForwardOutline
)
const isRoot = computed(() => props.node.type === NodeType.Root)
const isCond = computed(() => isCondNode(props.node))
const hasBranchCond = computed(() => props.node.conditions.length > 0)

const addChild = () => {
  props.node.addChild()
}

const addBranch = () => {
  props.node.addCond()
}

const removeNode = () => {
  props.node.remove()
}
</script>

<style lang="scss" scoped>
$half: 16px;

.node-container {
  position: relative;

  .button-basic {
    opacity: 0;
    width: fit-content;
    position: absolute;
    z-index: 3;
    transition: opacity 0.2s ease-in-out;
  }
  &:hover {
    .button-basic {
      opacity: 1;
    }
  }

  .add-branch {
    @extend .button-basic;
    right: -$half;
    top: calc(50% - $half);
  }

  .add-child {
    @extend .button-basic;
    bottom: -$half;
    left: calc(50% - $half);
  }

  .remove-node {
    @extend .button-basic;
    right: 100%;
  }
}

// ========= direction horizontal ===========
.direction-horizontal .node-container {
  .add-branch {
    left: calc(50% - $half);
    top: calc(100% - $half);
  }

  .add-child {
    left: calc(100% - $half);
    top: calc(50% - $half);
  }
}
// ==========================================
</style>
