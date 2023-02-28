const loginValidators = [
  {
    callback: (value: string) => {
      return value.length > 5;
    },
    onError: "Введите более 5 символов"
  },
  {
    callback: (value: string) => {
      return /^[a-zA-Z0-9_]*$/.test(value);
    },
    onError: "Недопустимые символы"
  }
]

export { loginValidators };