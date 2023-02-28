const phoneValidators = [
  {
    callback: (value: string) => {
      return value.length === 11;
    },
    onError: "Invalid login length"
  },
  {
    callback: (value: string) => {
      return /^\d+$/.test(value);
    },
    onError: "Restricted characters in login"
  }
]

export { phoneValidators };