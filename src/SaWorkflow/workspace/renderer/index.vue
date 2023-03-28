<template>
  <div>
    <NodeRenderer :node="root" />

    <EndNode />
  </div>
</template>

<script lang="ts" setup>
import NodeRenderer from './node.vue'
import EndNode from './end.vue'

import type { WNode } from '../../node'

defineProps<{
  root: WNode
}>()
</script>
