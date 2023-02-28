<template>
  <input :type="button.type" :value="button.value" @click="clickHandler" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface ButtonProps {
  type: string;
  value: string;
}

export default defineComponent({
  name: "CustomButton",
  props: {
    button: {
      type: Object as PropType<ButtonProps>,
      required: true
    },
  },
  methods: {
    clickHandler(e?: Event) {
      this.$emit("onClick");
    }
  }
});
</script>

<style lang="scss" scoped>
  input {
    padding: 10px 14px;
    background-color: transparent;
    border: 1px solid #2F2F34;
    border-radius: 4px;

    color: #2F2F34;

    &:hover {
      cursor: pointer;
    }
  }
</style>