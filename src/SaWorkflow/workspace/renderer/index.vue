<template>
  <NodeRenderer :node="root" />
  <EndNode />
</template>

<script lang="ts" setup>
import NodeRenderer from './node/index.vue'
import EndNode from './end.vue'

import type { WNode } from '@/SaWorkflow/node'

defineProps<{
  root: WNode
}>()
</script>
