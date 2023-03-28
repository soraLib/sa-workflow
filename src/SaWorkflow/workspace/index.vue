<template>
  <div>
    workspace

    <GraphRenderer :root="graph.root" />
  </div>
</template>

<script lang="ts" setup>
import { GRAPH_INJECTION_KEY } from '../graph'
import GraphRenderer from './renderer/index.vue'

const graph = inject(GRAPH_INJECTION_KEY)!

console.log('graph', graph)
</script>
