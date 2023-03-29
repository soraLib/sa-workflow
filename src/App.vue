<script setup lang="ts">
import ReloadPrompt from './ReloadPrompt.vue'
import SaHeader from './components/Header/index.vue'

import SaWorkflow from './SaWorkflow/index.vue'
</script>

<template>
  <div class="h-screen flex">
    <SaHeader />

    <div class="sa-workflow-wrapper">
      <SaWorkflow />
    </div>
  </div>

  <ReloadPrompt />
</template>

<style lang="scss" scoped>
.sa-workflow-wrapper {
  padding-top: var(--vp-navbar-height);
  width: 100%;
  max-height: calc(100vh - var(--vp-navbar-height));
}
</style>
