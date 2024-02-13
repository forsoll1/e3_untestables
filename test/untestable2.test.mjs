import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue, diceRoll } from "../src/untestable2.mjs";

describe("diceHandValue tests", () => {
  let tester;
  test("Function gets a pair of values as an argument", () => {
    tester = diceHandValue(2,2)
    expect(tester).to.equal(102);
  });
  test("Gets two different values as argument, returns greater", () => {
    tester = diceHandValue(2,7)
    expect(tester).to.equal(7);
  });
});

describe("diceRoll tests", () => {
  let arr1 = [1,2,3,4,5,6]
  let arr2;

  test("Diceroll returns all values 1..6", () => {
    arr2 = []
    let allNumbersFound = true
    for (let i = 0; i < 50; i++) {
      arr2.push(diceRoll())}
    for (let i = 0; i < arr1.length; i++) {
      if(!arr2.includes(arr1[i])){
        allNumbersFound = false
        break
      }
    }
    expect(allNumbersFound).to.equal(true);
  });

  test("Diceroll returns random sequences", () => {
    arr2 = []
    let arr3 = []
    for (let i = 0; i < 20; i++) {
      arr2.push(diceRoll())
    }
    for (let i = 0; i < 20; i++) {
      arr3.push(diceRoll())
    }
    expect(arr2).to.not.deep.equal(arr3);
  });

});
