module.exports = {
  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  },

  add(num1, num2) {
    return +num1 + +num2;
  },

  sub(num1, num2) {
    return +num1 - +num2;
  },
};
