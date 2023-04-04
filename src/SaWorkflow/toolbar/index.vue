<template>
  <div class="toolbar">
    <div class="tools-after">
      <span>horizontal</span>
      <ElSwitch
        class="direction-switch"
        :active-value="activeDirection"
        :inactive-value="inactiveDirection"
        :model-value="direction"
        active-color="#5856d5"
        @update:model-value="handleDirectionChange"
      />
      <span>vertical</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GRAPH_INJECTION_KEY } from '../graph'
import type { Graph } from '../graph'

const graph = inject(GRAPH_INJECTION_KEY)
if (!graph) throw new Error('[Sa Error]: graph must exist.')

const activeDirection: Graph.Direction = 'vertical'
const inactiveDirection: Graph.Direction = 'horizontal'

const direction = computed(() => graph.value.direction)
const handleDirectionChange = () => {
  graph.value.switchDirection()
}
</script>

<style lang="scss" scoped>
.toolbar {
  display: flex;
  align-content: center;
}

.tools-after {
  margin-left: auto;
  display: flex;
  align-items: center;

  .direction-switch {
    margin: 0 0.5rem;
  }
}
</style>
