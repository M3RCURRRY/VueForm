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
    clickHandler() {
      this.$emit("onClick");
    }
  }
});
</script>

<style>

</style>