<template>
  <form>
    <CustomInput
      :input="{ inputType: 'text', useTitle: true, title: 'Логин', validators: loginValidators, isLazyValidators: isLazy }"
      v-bind:value="login"
      @onChange="loginHandler"
      ref="loginRef"
      
    />
    <CustomInput
      :input="{ inputType: 'email', useTitle: true, title: 'Телефон' }"
      v-bind:value="phone"
      @onChange="phoneHandler"
      ref="phoneRef"
    />
    <CustomInput
      :input="{ inputType: 'password', useTitle: true, title: 'Пароль' }"
      v-bind:value="password"
      @onChange="passwordHandler"
      ref="passwordRef"
    />
    <CustomButton
      :button="{ type: 'button', value: 'Войти'}"
      @onClick="forceValidate"
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
      (this.$refs["loginRef"] as any).executeValidators();
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
  },
  data() {
    return {
      login: "",
      phone: "",
      password: "",
      isLazy: true,
      loginValidators: loginValidators,
      phoneValidators: phoneValidators,
      passwordValidators: passwordValidators
    };
  },
});
</script>
<style>
</style>