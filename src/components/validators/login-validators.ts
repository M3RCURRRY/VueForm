const loginValidators = [
  {
    callback: (value: string) => {
      return value.length > 5;
    },
    onError: "Invalid login length"
  },
  {
    callback: (value: string) => {
      return /^[a-zA-Z0-9_]*$/.test(value);
    },
    onError: "Restricted characters in login"
  }
]

export { loginValidators };