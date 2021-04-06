<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <Loading text="loading" type="primary" /> -->
  <!-- <Message message="一些信息" type="primary" :isShowClose="true" /> -->
  <!-- <Button type="primary" outline size="lg" @click="btnFn" disabled>按钮</Button>
  <Button type="primary" outline size="md">按钮</Button> -->
  <!-- <dropdown title="请选择">
    <dropdown-item>选项一</dropdown-item>
    <dropdown-item>选项二</dropdown-item>
    <dropdown-item>选项三</dropdown-item>
  </dropdown> -->
  <ValidateForm style="width: 300px">
    <ValidateInput
      v-model="name"
      type="input"
      placeholder="请输入姓名"
      :rules="nameRules"
    ></ValidateInput>
    <ValidateInput
      v-model="email"
      type="input"
      placeholder="请输入邮箱"
      :rules="emailRules"
    ></ValidateInput>
  </ValidateForm>
  <!-- <DatePicker v-model="dateValue" /> -->
</template>

<script lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const name = ref("");
    const nameRules = [
      {
        type: "required",
        message: "name必填",
        trigger: "change",
      },
    ];
    const emailRules = [
      {
        type: "email",
        message: "email必填",
        trigger: "change",
      },
    ];
    const btnFn = function () {
      console.log(1);
    };
    const dateValue = ref(new Date());
    return {
      name,
      btnFn,
      nameRules,
      emailRules,
      dateValue,
    };
  },
});
</script>

<style></style>
