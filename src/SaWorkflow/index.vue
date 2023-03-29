<template>
  <main class="workflow-wrapper m-8 flex flex-col h-full">
    <main class="workflow">
      <header class="toolbar">
        <WorkflowToolbar class="sa-block" />
      </header>

      <main class="py-1 overflow-auto">
        <ElScrollbar class="workspace-scrollbar">
          <WorkflowWorkspace class="sa-block workspace" />
        </ElScrollbar>
      </main>

      <footer class="status-bar">
        <WorkflowStatusBar class="sa-block" />
      </footer>
    </main>

    <aside class="ml-1">
      <WorkflowPropertyPanel class="sa-block" />
    </aside>
  </main>
</template>

<script lang="ts" setup>
// split modules
import WorkflowToolbar from './toolbar/index.vue'
import WorkflowWorkspace from './workspace/index.vue'
import WorkflowStatusBar from './status-bar//index.vue'
import WorkflowPropertyPanel from './property-panel/index.vue'
import { GRAPH_INJECTION_KEY, Graph } from './graph'
import { NodeType, WCondNode, WNode } from './node'

const root = new WNode({
  type: NodeType.Root,
  attrs: {
    id: '1',
    name: 'root',
  },
})
root.conditions.push(
  new WCondNode({
    type: NodeType.Condition,
    parent: root,
    attrs: {
      id: '3',
      name: 'Cond A',
    },
  }),
  new WCondNode({
    type: NodeType.Condition,
    parent: root,
    attrs: {
      id: '4',
      name: 'Cond B',
    },
  })
)

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
.workflow-wrapper {
  background-color: var(--vp-c-bg-soft-down);
  display: grid;
  grid-template-columns: auto 278px;
}
.workflow {
  display: grid;
  grid-template-rows:
    60px
    calc(100vh - var(--vp-navbar-height) - 120px - 4rem)
    60px;
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
