<template>
  <div class="node-container">
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
      :icon="Plus"
      @click="addChild"
    />
  </div>
</template>

<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
import { ChevronDownOutline, ChevronForwardOutline } from '@vicons/ionicons5'
import type { WNode } from '@/SaWorkflow/node'
import { NodeType } from '@/SaWorkflow/node'

const props = defineProps<{
  node: WNode
}>()

const AddBranchIcon = computed(() =>
  props.node.graph.direction === 'horizontal'
    ? ChevronDownOutline
    : ChevronForwardOutline
)
const isRoot = computed(() => props.node.type === NodeType.Root)

const addChild = () => {
  props.node.addChild()
}

const addBranch = () => {
  props.node.addBranch()
}
</script>

<style lang="scss" scoped>
$half: 16px;

.node-container {
  position: relative;

  .add-basic {
    opacity: 0;
    width: fit-content;
    position: absolute;
    z-index: 3;
    transition: opacity 0.2s ease-in-out;
  }
  &:hover {
    .add-basic {
      opacity: 1;
    }
  }

  .add-branch {
    @extend .add-basic;
    right: -$half;
    top: calc(50% - $half);
  }

  .add-child {
    @extend .add-basic;
    bottom: -$half;
    left: calc(50% - $half);
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
