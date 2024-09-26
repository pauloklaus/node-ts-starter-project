import { addMinutes } from "@/helpers";

describe("addMinutes.ts", () => {
  test("should add minutes in a current timestamp", () => {
    const fromMinute = new Date().getMinutes();
    const testMinute = fromMinute === 59 ? 0 : fromMinute + 1;

    expect(addMinutes(1).getMinutes()).toBe(testMinute);
  });

  test("should add minutes in a new timestamp", () => {
    const fromDate = new Date("1980-09-22 10:30:00");

    expect(addMinutes(1, fromDate).getMinutes()).toBe(31);
    expect(addMinutes(5, fromDate).getMinutes()).toBe(35);
    expect(addMinutes(30, fromDate).getMinutes()).toBe(0);
    expect(addMinutes(40, fromDate).getMinutes()).toBe(10);
  });
});
