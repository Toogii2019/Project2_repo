const testFunc = require("../test_helper.js");

test("Can add two numbers and return the result", () => {
    const result = testFunc(5, 10);
    expect(15).toBe(result);
  });