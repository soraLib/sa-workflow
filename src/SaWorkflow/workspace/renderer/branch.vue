<template>
  <div class="branch-wrapper">
    <div class="branch-inner">
      <div class="branch-content">
        <div
          v-for="(cond, index) in conditions"
          :key="cond.attrs.id"
          class="branch"
        >
          <NodeRenderer :node="cond" />

          <template v-if="index === 0">
            <div class="top-left-edge-cover" />
            <div class="bottom-left-edge-cover" />
          </template>

          <template v-if="index === conditions.length - 1">
            <div class="top-right-edge-cover" />
            <div class="bottom-right-edge-cover" />
          </template>
        </div>
      </div>

      <EdgeRenderer />
    </div>
  </div>
</template>

<script lang="ts" setup>
import NodeRenderer from './node.vue'
import EdgeRenderer from './edge.vue'
import type { WCondNode } from '@/SaWorkflow/node'

defineProps<{
  conditions: WCondNode[]
}>()
</script>

<style lang="scss" setup>
.branch-wrapper {
  display: inline-flex;
  width: 100%;
}
.branch-inner {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  min-height: 270px;
  width: 100%;
  flex-shrink: 0;
}
.branch-content {
  display: flex;
  overflow: visible;
  height: auto;
  border-top: 2px solid var(--vp-c-border);
  border-bottom: 2px solid var(--vp-c-border);
  position: relative;
}
.branch {
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    margin: auto;
    width: 2px;
    height: 100%;
    background-color: var(--vp-c-border);
  }
}

// ===== cover the overflowing edges ======

.edge-cover {
  position: absolute;
  height: 8px;
  width: 50%;
  background-color: var(--vp-c-bg-soft);
}

.top-left-edge-cover {
  @extend .edge-cover;
  left: -1px;
  top: -4px;
}
.bottom-left-edge-cover {
  @extend .edge-cover;
  left: -1px;
  bottom: -4px;
}
.top-right-edge-cover {
  @extend .edge-cover;
  right: -1px;
  top: -4px;
}
.bottom-right-edge-cover {
  @extend .edge-cover;
  right: -1px;
  bottom: -4px;
}

// ========================================

// ======== direction horizontal ==========

.direction-horizontal {
  .branch-wrapper {
    width: fit-content;
  }
  .branch-inner {
    min-height: 72px;
    min-width: 270px;
    flex-direction: row;
  }
  .branch-content {
    flex-direction: column;
    border-top: none;
    border-bottom: none;
    border-left: 2px solid var(--vp-c-border);
    border-right: 2px solid var(--vp-c-border);
  }
  .branch {
    &::before {
      width: 100%;
      height: 2px;
    }
  }

  .edge-cover {
    width: 8px;
    height: 50%;
  }
  .top-left-edge-cover {
    left: -4px;
    top: -1px;
  }
  .bottom-left-edge-cover {
    left: -4px;
    bottom: calc(-100% - 1px);
  }
  .top-right-edge-cover {
    right: -4px;
    top: calc(-100% - 1px);
  }
  .bottom-right-edge-cover {
    right: -4px;
    bottom: -1px;
  }
}

// ========================================
</style>
