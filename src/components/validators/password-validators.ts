const passwordValidators = [
  {
    callback: (value: string) => {
      return value.length > 6;
    },
    onError: "Invalid login length"
  }
];

export { passwordValidators };