import { add, sub, testAddKidInfo, handleInput, addUser } from "../Functions";

test("add adds 2 and 3 to equal 5", () => {
  expect(add(2, 3)).toBe(5);
});

test("add will not return NaN", () => {
  expect(add(2, 3)).not.toBeNaN();
});

test("sub minus 2 from 3 to equal 1", () => {
  expect(sub(3, 2)).toBe(1);
});

test("addkid will create a random user id", () => {
  const newKid = testAddKidInfo("colby", "dude", "dudebro", "abc123");
  expect(newKid.userId).toBeLessThanOrEqual(100);
});

test("addkid will create a random user id that is not NaN", () => {
  const newKid = testAddKidInfo("colby", "dude", "dudebro", "abc123");
  expect(newKid.userId).not.toBeNaN();
});

test("addkid will create a first name", () => {
  const newKid = testAddKidInfo("colby", "dude", "dudebro", "abc123");
  expect(newKid.first.firstName).toBe("colby");
});

test("addkid will create a last name", () => {
  const newKid = testAddKidInfo("colby", "dude", "dudebro", "abc123");
  expect(newKid.last.lastName).toBe("dude");
});

test("addkid will create a username", () => {
  const newKid = testAddKidInfo("colby", "dude", "dudebro", "abc123");
  expect(newKid.user.username).toBe("dudebro");
});

test("addkid will create a password", () => {
  const newKid = testAddKidInfo("colby", "dude", "dudebro", "abc123");
  expect(newKid.pass.password).toBe("abc123");
});

test("addkid will create a truthy value", () => {
  const newKid = testAddKidInfo("colby", "dude", "dudebro", "abc123");
  expect(newKid).toBeTruthy();
});

test("handleInput will assign a value to the targetName", () => {
  const testInput = handleInput("billy");
  expect(testInput).toBe("billy");
});

test("handleInput will be truthy", () => {
  const testInput = handleInput("Robert");
  expect(testInput).toBeTruthy();
});

test("handleInput will return any value", () => {
  const testInput = handleInput("Robert");
  expect(testInput).toEqual(expect.anything());
});

test("addUser will return any value", () => {
  const addedUser = addUser("Robert", "Robs room");
  expect(addedUser.id).toEqual(expect.anything());
});

test("addUser will return lowercase name", () => {
  const addedUser = addUser("Robert", "Robs room");
  expect(addedUser.newName).toEqual("robert");
});

test("addUser will return lowercase room", () => {
  const addedUser = addUser("Robert", "Robs room");
  expect(addedUser.newRoom).toEqual("robs room");
});
