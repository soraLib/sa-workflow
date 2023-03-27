<script setup lang="ts">
import ReloadPrompt from './ReloadPrompt.vue'
import SaHeader from './components/Header/index.vue'
</script>

<template>
  <div class="h-full w-full flex flex-col justify-center items-center">
    <SaHeader />

    <div class="grow" />
  </div>

  <ReloadPrompt />
</template>

<style lang="scss" scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
