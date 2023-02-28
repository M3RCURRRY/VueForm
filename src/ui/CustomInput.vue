<template>
  <div class="container">
    <label :for="input.title">
      <strong>
        {{ input.useTitle && input.title }}
      </strong>
    </label>
    <input
      :id="input.title"
      :type="input.inputType"
      :placeholder="input.placeholder"
      @change="changeHandler"
    />
    <div v-if="hasError" class="errorDetails">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface Validator {
  callback: (v: string) => boolean;
  onError: string;
}

interface InputProps {
  inputType: string;
  useTitle: boolean;
  title?: string;
  placeholder?: string;
  validators?: Validator[];
  isLazyValidators?: boolean;
  ref?: any;
}

export default defineComponent({
  name: "CustomInput",
  props: {
    input: {
      type: Object as PropType<InputProps>,
      required: true,
    },
  },
  methods: {
    changeHandler(e: InputEvent) {
      const element = e.target as HTMLInputElement;
      this.$emit("onChange", element.value);
      this.value = element.value;

      console.log(element.value);

      if (!this.input.isLazyValidators && this.input.validators) {
        this.validate(element.value);
      }
    },

    validate(value: string) {

      console.log("Validators", this.input.isLazyValidators);

      for (let validator of this.input.validators as Validator[]) {
        if (validator.callback(value)) continue;
        else {
          console.log("Got error");
          this.hasError = true;
          this.errorMessage = validator.onError;
          return;
        }
      }
      console.log("No error");
      this.hasError = false;
    },

    executeValidators() {
      console.log("Value: ", this.value);
      this.validate(this.value);
    }
  },
  data() {
    return {
      value: "",
      hasError: false,
      errorMessage: "",
    };
  },
  expose: ['executeValidators']
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 5px auto;
}

label {
  color: #171717;
  margin-bottom: 3px;

  &:hover {
    cursor: pointer;
  }
}

input {
  min-width: 200px;
  max-width: 300px;

  font-size: 1rem;

  padding: 5px 8px;

  border: 1px solid gray;
  border-radius: 3px;
  border-style: solid;
  outline-width: 0;

  &:focus {
    -webkit-box-shadow: 0px 0px 4px 2px rgba(0, 144, 255, 0.42);
    -moz-box-shadow: 0px 0px 4px 2px rgba(0, 144, 255, 0.42);
    box-shadow: 0px 0px 4px 2px rgba(0, 144, 255, 0.42);
  }
}

.errorDetails {
  color: red;
}
</style>