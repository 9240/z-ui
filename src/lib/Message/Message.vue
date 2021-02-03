<template>
  <teleport to="body">
    <div
      v-if="isVisible"
      class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
      :class="`alert-${type}`"
    >
      <span>{{ message }}</span>
      <button
        v-if="isShowClose"
        type="button"
        class="btn-close"
        @click.prevent="hide"
      ></button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { type } from "@/types";
export default defineComponent({
  name: "message",
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<type>,
      default: "primary",
    },
    isShowClose: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close-message"],
  setup(props, ctx) {
    const isVisible = ref(true);
    const hide = () => {
      isVisible.value = false;
      ctx.emit("close-message", true);
    };
    return {
      isVisible,
      hide,
    };
  },
});
</script>

<style scoped></style>
