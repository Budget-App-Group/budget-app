import { add, sub, testAddKidInfo } from "../Functions";

test("add adds 2 and 3 to equal 5", () => {
  expect(add(2, 3)).toBe(5);
});

test("sub minus 2 from 3 to equal 1", () => {
  expect(sub(3, 2)).toBe(1);
});

test("addkid will create a random user id", () => {
  const newKid = testAddKidInfo("colby", "dude", "dudebro", "abc123");
  expect(newKid.userId).toBeLessThanOrEqual(100);
});

test("addkid will create a first name", () => {
  const newKid = testAddKidInfo("colby", "dude", "dudebro", "abc123");
  expect(newKid.first).toBe("colby");
});

test("addkid will create a last name", () => {
  const newKid = testAddKidInfo("colby", "dude", "dudebro", "abc123");
  expect(newKid.last).toBe("dude");
});
