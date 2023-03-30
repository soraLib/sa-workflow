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
import { createMockRoot } from './mock'

// initialize
const graph = ref(new Graph())
graph.value.root = createMockRoot(graph.value)

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
  width: fit-content;
  height: fit-content;
}
</style>
