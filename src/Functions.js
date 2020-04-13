module.exports = {
  add(num1, num2) {
    return +num1 + +num2;
  },

  sub(num1, num2) {
    return +num1 - +num2;
  },

  testAddKidInfo(firstName, lastName, username, password) {
    const userId = Math.floor(Math.random() * 100);
    const first = { firstName };
    const last = { lastName };
    const user = { username };
    const pass = { password };

    return { userId, first, last, user, pass };
  },
};
