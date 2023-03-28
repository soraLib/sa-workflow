<template>
  <section class="sa-workflow flex flex-col h-full">
    <ElContainer class="m-8">
      <ElContainer>
        <ElHeader class="p-0 w-full">
          <WorkflowToolbar class="sa-block" />
        </ElHeader>

        <ElMain class="py-1 px-0 w-full">
          <WorkflowWorkspace class="sa-block workspace" />
        </ElMain>

        <ElFooter class="p-0 w-full">
          <WorkflowStatusBar class="sa-block" />
        </ElFooter>
      </ElContainer>

      <ElAside class="w-64 ml-1">
        <WorkflowPropertyPanel class="sa-block" />
      </ElAside>
    </ElContainer>
  </section>
</template>

<script lang="ts" setup>
// split modules
import WorkflowToolbar from './toolbar/index.vue'
import WorkflowWorkspace from './workspace/index.vue'
import WorkflowStatusBar from './status-bar//index.vue'
import WorkflowPropertyPanel from './property-panel/index.vue'
import { GRAPH_INJECTION_KEY, Graph } from './graph'
import { NodeType, WNode } from './node'

const root = new WNode({
  type: NodeType.Root,
  attrs: {
    id: '1',
    name: 'root',
  },
})

root.child = new WNode({
  type: NodeType.Node,
  parent: root,
  attrs: {
    id: '2',
    name: 'Node A',
  },
})

// initialize
const graph = ref(new Graph({ root }))

provide(GRAPH_INJECTION_KEY, graph)
</script>

<style lang="scss" scoped>
.sa-workflow {
  background-color: var(--vp-c-bg-soft-down);
}

.sa-block {
  width: 100%;
  height: 100%;
  padding: 0.2rem 1.2rem;
  background-color: var(--vp-c-bg-soft);
}
.workspace {
  padding: 2rem;
}
</style>
