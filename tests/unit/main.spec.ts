import { main } from "../../src/app/main";

describe("main.ts", () => {
  test("should return 'main'", () => {
    expect(main()).toBe("main");
  });
});
