<template>
  <button
    type="button"
    class="btn"
    :class="`btn-${outline ? 'outline-' : ''}${type} ${size && 'btn-' + size}`"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { type, size } from "@/types";
export default defineComponent({
  name: "Button",
  props: {
    type: {
      type: String as PropType<type>,
      default: "primary",
    },
    outline: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<size>,
      default: "md",
    },
  },
});
</script>

<style scoped></style>
