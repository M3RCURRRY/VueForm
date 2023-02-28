const phoneValidators = [
  {
    callback: (value: string) => {
      return value.length === 11;
    },
    onError: "Введите 11 цифр"
  },
  {
    callback: (value: string) => {
      return /^\d+$/.test(value);
    },
    onError: "Недопустимые символы"
  }
]

export { phoneValidators };