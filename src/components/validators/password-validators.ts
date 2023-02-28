const passwordValidators = [
  {
    callback: (value: string) => {
      return value.length > 6;
    },
    onError: "Введите более 6 символов"
  }
];

export { passwordValidators };