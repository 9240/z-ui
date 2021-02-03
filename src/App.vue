<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <Loading text="loading" type="primary" />
  <Message message="一些信息" type="primary" :isShowClose="true" />
  <Button type="primary" outline size="lg">按钮</Button>
  <Button type="primary" outline size="md">按钮</Button>
  <!-- <dropdown title="请选择">
    <dropdown-item>选项一</dropdown-item>
    <dropdown-item>选项二</dropdown-item>
    <dropdown-item>选项三</dropdown-item>
  </dropdown> -->
</template>

<script lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {},
});
</script>

<style></style>
