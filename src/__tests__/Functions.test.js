import { add, sub } from "../Functions";

test("add adds 2 and 3 to equal 5", () => {
  expect(add(2, 3)).toBe(5);
});

test("sub minus 2 from 3 to equal 1", () => {
  expect(sub(2, 3)).toBe(1);
});
