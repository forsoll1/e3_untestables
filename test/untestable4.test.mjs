import { afterEach, beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";
const fs = require('fs')
import argon2 from "@node-rs/argon2";

describe("Untestable 4: enterprise application", () => {
  let postgresService;
  let passwordService;
  let testPeople = [[1, "password1"], [2, argon2.hashSync("password2")]]
  let createTables = fs.readFileSync('./src/create-tables.sql', 'utf-8')
  let dropTables = fs.readFileSync('./src/drop-tables.sql', 'utf-8')
  let poolData = {user: 'untestable', host: '127.0.0.1', port:5432, password:'secret', database:'db'}

  beforeEach(async () => {
    passwordService = new PasswordService(new PostgresUserDao(poolData));
    postgresService = passwordService.users
    try {
      await postgresService.db.query(createTables)
    } catch (error) {console.log(error)}

    await postgresService.db.query('TRUNCATE users')
    
    for (const p of testPeople) {
      await postgresService.db.query({
        text:'INSERT INTO users(user_id, password_hash) VALUES($1, $2)',
        values: [p[0], p[1]]
      })
    }    

  });

  afterEach(async () => {
    await postgresService.db.query(dropTables)
    postgresService.close();
  });

  test("PostgresUserDao can return db rows", async () => {
    let fetchPerson = await postgresService.getById(1)
    expect(fetchPerson).to.deep.equal({userId: 1, passwordHash: "password1"})
  });

  test("PostgresUserDao can change password", async () => {
    let user = {userId: 1, passwordHash: 'changedpassword'}
    await postgresService.save(user)
    let fetchPerson = await postgresService.getById(1)
    expect(fetchPerson.passwordHash).to.equal('changedpassword')
  });

  test("PasswordService can change password", async () => {
    await passwordService.changePassword(2, 'password2', 'changedpassword')
    let fetchPerson = await postgresService.getById(2)
    expect(argon2.verifySync(fetchPerson.passwordHash, 'changedpassword')).to.equal(true)
  });

  test("PasswordService won't change password if old password is wrong", async () => {
    let err = null
    try {
      await passwordService.changePassword(2, 'WRONGPASSWORD', 'changedpassword')
    } catch (error) {
      err = error
    }
    expect(err.message).to.equal("wrong old password")
  });
});
