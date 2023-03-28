<template>
  <section class="sa-workflow flex flex-col h-full">
    <ElContainer class="m-8">
      <ElContainer class="sa-background">
        <ElHeader class="p-0">
          <SaFormHeader options="{layout.header}" class="sa-background" />
        </ElHeader>

        <ElMain class="p-0">
          <SaFormWorkspace class="workspace" />
        </ElMain>

        <ElFooter class="p-0">
          <SaFormFooter class="sa-background" />
        </ElFooter>
      </ElContainer>

      <ElAside class="w-64 ml-1 sa-background">
        <SaFormController controller="{layout.controller}" />
      </ElAside>
    </ElContainer>
  </section>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.sa-workflow {
  background-color: var(--vp-c-bg-soft-down);
}

.sa-background {
  background-color: var(--vp-c-bg-soft);
}
</style>
