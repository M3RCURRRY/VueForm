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
      :class="{ errorInput: hasError }"
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

      if (!this.input.isLazyValidators && this.input.validators) {
        this.validate(element.value);
      }
    },

    validate(value: string) {
      for (let validator of this.input.validators as Validator[]) {
        if (validator.callback(value)) continue;
        else {
          this.hasError = true;
          this.errorMessage = validator.onError;
          return false;
        }
      }
      this.hasError = false;
      return true;
    },

    executeValidators() {
      return this.validate(this.value);
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

  margin: 8px auto;
}

label {
  color: #2F2F34;
  margin-bottom: 8px;

  &:hover {
    cursor: pointer;
  }
}

input {
  min-width: 200px;
  max-width: 300px;

  font-size: 1rem;
  color: #2F2F34;

  padding: 8px 8px;

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

.errorInput {
  border: 1px solid #FF2168;
}

.errorDetails {
  margin-top: 4px;
  font-size: 0.85rem;
  color: #FF2168;
}
</style>