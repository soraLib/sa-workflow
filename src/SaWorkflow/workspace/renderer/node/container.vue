<template>
  <div class="node-container">
    <ElButton
      v-if="!isRoot"
      title="add branch"
      class="add-branch"
      circle
      :icon="ChevronForwardOutline"
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
import { ChevronForwardOutline } from '@vicons/ionicons5'
import type { WNode } from '@/SaWorkflow/node'
import { NodeType } from '@/SaWorkflow/node'

const props = defineProps<{
  node: WNode
}>()

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
</style>
