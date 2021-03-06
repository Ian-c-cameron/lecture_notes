const chai = require("chai");
const assert = chai.assert;
const fs = require("fs");

const sql = fs.readFileSync("./answers/00.sql", "utf8");

const knex = require("knex")({
  client           : "sqlite3",
  connection       : { filename: "./supporting-files/test.sqlite3" },
  useNullAsDefault : true
});

describe("Query 00", () => {
  after(() => knex.destroy());

  it("retrieves the expected columns and in the correct order (id, name, year_opened, year_closed)", () => {
    return knex.raw(sql).then(result => {
      const first = result[0];
      assert.isObject(first, "No results therefore cannot check columns");

      const keys = Object.keys(first);
      assert.deepEqual(keys, ["id", "name", "year_opened", "year_closed"]);
    });
  });

  it("retrieves all 3 locations", () => {
    return knex.raw(sql).then(result => {
      assert.lengthOf(result, 3);
    });
  });

  it("retrieves location 1", () => {
    return knex.raw(sql).then(result => {
      const record = result.find(r => r.id === 1);
      assert.isObject(record);
    });
  });

  it("retrieves location 2", () => {
    return knex.raw(sql).then(result => {
      const record = result.find(r => r.id === 2);
      assert.isObject(record);
    });
  });

  it("retrieves location 3", () => {
    return knex.raw(sql).then(result => {
      const record = result.find(r => r.id === 3);
      assert.isObject(record);
    });
  });

  it("retrieves the locations in the correct order (2, 1, 3)", () => {
    return knex.raw(sql).then(result => {
      const ids = result.map(r => r.id);
      assert.deepEqual(ids, [2, 1, 3]);
    });
  });
});
