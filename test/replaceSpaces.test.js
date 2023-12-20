import { describe, expect, test } from "@jest/globals";
import {
  returnWhitespaces,
  replaceWhitespaces,
} from "../src/util/replaceSpaces";

describe("return whitespace", () => {
  test("changes nothing", () => {
    expect(returnWhitespaces("cat")).toBe("cat");
  });
  test("adds spaces", () => {
    expect(returnWhitespaces("cats%20and%20dogs")).toBe("cats and dogs");
  });
});

describe("replace whitespace", () => {
  test("changes nothing", () => {
    expect(replaceWhitespaces("cat")).toBe("cat");
  });
  test("removes spaces", () => {
    expect(replaceWhitespaces("cats and dogs")).toBe("cats%20and%20dogs");
  });
});
