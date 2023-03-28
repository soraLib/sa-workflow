<template>
  <div :class="`direction-${direction}`">
    <GraphRenderer :root="graph.root" />
  </div>
</template>

<script lang="ts" setup>
import { GRAPH_INJECTION_KEY } from '../graph'
import GraphRenderer from './renderer/index.vue'

const graph = inject(GRAPH_INJECTION_KEY)
if (!graph) throw new Error('[Sa Error]: graph must exist.')

const direction = computed(() => graph.value.direction)

console.log('graph', graph)
</script>

<style lang="scss" scoped>
.direction-horizontal {
  display: flex;
}
</style>
