import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {

  let now;
  test("24 days 'til christmas", () => {
    now = new Date("2023/12/01")
    expect(daysUntilChristmas(now)).to.equal(24);
  });

  test("Works between Christmas and NYE", () => {
    now = new Date("2022/12/26")
    expect(daysUntilChristmas(now)).to.equal(364);
  });

  test("Zero days to Christmas", () => {
    now = new Date("2022/12/25")
    expect(daysUntilChristmas(now)).to.equal(0);
  });

});
