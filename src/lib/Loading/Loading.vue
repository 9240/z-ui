<template>
  <teleport to="body">
    <div
      class="d-flex justify-content-center align-items-center h-100 loading-container"
      :style="{ backgroundColor: background || '' }"
    >
      <div class="loading-content">
        <div class="spinner-border" :class="`text-${type}`" role="status">
          <span class="visually-hidden">{{ text || "loading" }}</span>
        </div>
        <p v-if="text" class="small" :class="`text-${type}`">{{ text }}</p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { type } from "@/types";
export default defineComponent({
  name: "loading",
  props: {
    text: {
      type: String,
      default: "",
    },
    background: {
      type: String,
      default: "rgba(0,0,0,0.8)",
    },
    type: {
      type: String as PropType<type>,
      default: "primary",
    },
  },
});
</script>

<style scoped>
.loading-container {
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.loading-content {
  text-align: center;
}
</style>
