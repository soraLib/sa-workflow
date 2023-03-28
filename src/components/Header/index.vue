<template>
  <header class="navbar">
    <a
      class="navbar-title"
      href="/sa-workflow/"
      aria-label="Sa Workflow, back to home`"
    >
      <span class="title">Sa Workflow</span>
    </a>

    <div class="flex-grow" />

    <div class="nav-icons">
      <VPNavBarAppearance />

      <div class="item">
        <a
          class="icon-button"
          href="https://github.com/soraLib/sa-workflow"
          target="_blank"
          rel="noopener"
          aria-label="View GitHub Repo"
        >
          <svg
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 32 32"
            width="1.2em"
            height="1.2em"
            data-v-3b0ebed8=""
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.71 3.71 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45a3 3 0 0 0 4.08 1.16a2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76a5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7a5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2Z"
            />
          </svg>
        </a>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import VPNavBarAppearance from './VPSwitchAppearance.vue'
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  height: 3.6rem;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 0.7rem 2em;
  height: var(--vp-navbar-height);
  z-index: 1;

  .navbar-title {
    font-size: 1.3rem;
    font-weight: 600;
    vertical-align: center;
    white-space: nowrap;
    margin-right: 2rem;
    text-decoration: none;
  }

  .title {
    line-height: 2rem;
    vertical-align: middle;
  }
}

.navbar.no-toggle-btn {
  padding-left: 1.5rem;
}

.navbar.root {
  border-color: transparent;
}

.nav-icons {
  display: grid;
  grid-template-columns: repeat(2, 40px);
  grid-column-gap: 1.2rem;
  padding: 2px 0 0;
  align-items: center;
  border-bottom: 0;
  margin-left: 12px;

  .item {
    width: 40px;
    height: 40px;

    .icon-button {
      width: 40px;
      height: 40px;
      display: flex;

      svg {
        margin: auto;
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>
