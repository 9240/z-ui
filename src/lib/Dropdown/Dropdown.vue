<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      href="#"
      class="btn btn-primary my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
      >{{ title }}</a
    >
    <ul class="dropdown-menu" v-if="isOpen" :style="{ display: 'block' }">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import useClickOutside from "@/util/useClickOutside";
export default defineComponent({
  name: "Dropdown",
  components: {},
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const isOpen = ref(false);
    const dropdownRef = ref<null | HTMLElement>(null);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    const isClickOutSide = useClickOutside(dropdownRef);
    watch(isClickOutSide, () => {
      console.log(isClickOutSide);
      if (isOpen.value && isClickOutSide.value) {
        isOpen.value = false;
      }
    });
    return {
      isOpen,
      toggleOpen,
      dropdownRef
    };
  }
});
</script>

<style scoped></style>
