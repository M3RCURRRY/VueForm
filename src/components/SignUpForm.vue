<template>
  <form @submit="submitHandler">
    <CustomInput
      :input="{
        inputType: 'text',
        useTitle: true,
        title: 'Логин',
        validators: loginValidators,
        isLazyValidators: isLazy,
      }"
      v-bind:value="login"
      @onChange="loginHandler"
      ref="loginRef"
    />
    <CustomInput
      :input="{
        inputType: 'text',
        useTitle: true,
        title: 'Телефон',
        validators: phoneValidators,
        isLazyValidators: isLazy,
      }"
      v-bind:value="phone"
      @onChange="phoneHandler"
      ref="phoneRef"
    />
    <CustomInput
      :input="{
        inputType: 'password',
        useTitle: true,
        title: 'Пароль',
        validators: passwordValidators,
        isLazyValidators: isLazy,
      }"
      v-bind:value="password"
      @onChange="passwordHandler"
      ref="passwordRef"
    />
    <CustomButton
      :button="{ type: 'submit', value: 'Войти' }"
    />
  </form>
</template>

<script lang="ts">
import CustomInput from "./../ui/CustomInput.vue";
import CustomButton from "./../ui/CustomButton.vue";

import { loginValidators } from "./validators/login-validators";
import { phoneValidators } from "./validators/phone-validators";
import { passwordValidators } from "./validators/password-validators";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SignUpForm",
  components: {
    CustomInput,
    CustomButton,
  },
  methods: {
    forceValidate() {
      if (this.isLazy) {
        this.isLazy = false;
      }
      const r1 = (this.$refs["loginRef"] as any).executeValidators();
      const r2 = (this.$refs["phoneRef"] as any).executeValidators();
      const r3 = (this.$refs["passwordRef"] as any).executeValidators();

      return r1 && r2 && r3;
    },
    loginHandler(value: string) {
      this.login = value;
    },
    phoneHandler(value: string) {
      this.phone = value;
    },
    passwordHandler(value: string) {
      this.password = value;
    },
    submitHandler(e?: Event) {
      if (e instanceof SubmitEvent) {
        e.preventDefault();
      }

      if (this.forceValidate()) {
        alert("Yahoo");
      }
    },
  },
  data() {
    return {
      login: "",
      phone: "",
      password: "",
      isLazy: true,
      loginValidators: loginValidators,
      phoneValidators: phoneValidators,
      passwordValidators: passwordValidators,
    };
  },
});
</script>
<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>