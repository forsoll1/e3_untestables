import { afterAll, beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { parsePeopleCsv, parsedCsvDataToObjects } from "../src/untestable3.mjs";
import { error } from "console";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

function cleanUp(folder, filePath){
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
  if (fs.existsSync(folder)){
    fs.rmdirSync(folder, { recursive: true })
  }
}

const fs = require("fs")
const path = require("path")

describe("Untestable 3: CSV file parsing", () => {

  const folder = "./test/filesystemtest"
  const filePath = path.join(folder, "csvfile.txt")
  const fileData = "Loid,Forger,,Male\nAnya,Forger,6,Female\nYor,Forger,27,Female"

  afterAll( () => { cleanUp(folder, filePath) })

  cleanUp(folder, filePath)
  fs.mkdirSync(folder)
  fs.writeFileSync(filePath, fileData)

  let parsedData;
  let personObjects;

  test("Parsed file has correct number of rows", async () => {
    try {
      parsedData = await parsePeopleCsv(filePath)
    } catch (error) {
      console.log(error)
    }
    expect(parsedData.length).to.equal(fileData.split("\n").length)
  });

  test("Parsed array member have correct data", async () => {
    try {
      parsedData = await parsePeopleCsv(filePath)
    } catch (error) {
      console.log(error)
    }
    expect(parsedData[0]).to.deep.equal([ 'Loid', 'Forger', '', 'Male' ])
  });

  test("Returned objects have correct properties and values", async () => {
    try {
      parsedData = await parsePeopleCsv(filePath)
      personObjects = parsedCsvDataToObjects(parsedData)
    } catch (error) {
      console.log(error)
    }
    expect(personObjects[1]).to.include({firstName: 'Anya', lastName: 'Forger', age:6, gender:'f'})
  });
  

  test("When age isn't given it doesn't appear in object", async () => {
    try {
      parsedData = await parsePeopleCsv(filePath)
      personObjects = parsedCsvDataToObjects(parsedData)
    } catch (error) {
      console.log(error)
    }
    expect(personObjects[0]).to.not.have.keys('age')
  });
});
