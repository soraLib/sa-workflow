<template>
  <div class="branch-wrapper">
    <div class="branch-inner">
      <div class="branch-content">
        <div
          v-for="(cond, index) in route.conditions"
          :key="cond.attrs.id"
          class="branch"
        >
          <NodeRenderer :node="cond" />

          <template v-if="index === 0">
            <div class="top-left-edge-cover" />
            <div class="bottom-left-edge-cover" />
          </template>

          <template v-if="index === route.conditions.length - 1">
            <div class="top-right-edge-cover" />
            <div class="bottom-right-edge-cover" />
          </template>
        </div>
      </div>

      <ElButton
        title="add child node"
        class="add-child"
        color="#5856D5"
        circle
        :icon="Add"
        @click="addChild"
      />

      <EdgeRenderer />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Add } from '@vicons/ionicons5'
import NodeRenderer from './node/index.vue'
import EdgeRenderer from './edge.vue'
import type { WRoute } from '@/SaWorkflow/node'

const props = defineProps<{
  route: WRoute
}>()

const addChild = () => props.route.addChild()
</script>

<style lang="scss" setup>
@use './node/button.scss';
@import 'var.scss';

.branch-wrapper {
  display: inline-flex;
  width: 100%;
}
.branch-inner {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  flex-shrink: 0;
  position: relative;

  .add-child {
    @extend .button-basic;
    bottom: $margin * 0.5;

    &:hover {
      opacity: 1;
    }
  }
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
  width: min-content;
  position: relative;
  background-color: var(--vp-c-bg-soft);

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
    flex-wrap: nowrap;

    .add-child {
      bottom: unset;
      right: $margin * 0.5;
    }
  }
  .branch-content {
    flex-direction: column;
    border-top: none;
    border-bottom: none;
    border-left: 2px solid var(--vp-c-border);
    border-right: 2px solid var(--vp-c-border);
  }
  .branch {
    display: flex;
    width: 100%;

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
    left: 100%;
    bottom: 0;
    right: -4px;
    top: -1px;
  }
  .top-right-edge-cover {
    top: unset;
    right: -4px;
    bottom: -1px;
  }
  .bottom-right-edge-cover {
    left: -4px;
    bottom: -1px;
  }
}

// ========================================
</style>
