const Sleep = require("./sleep-model");
const db = require("../../data/dbconfig");

describe("Sleep model", () => {
  const cleanUp = async () => {
    await db("sleep_details").truncate();
    await db("users").truncate();
  };

  beforeEach(cleanUp);
  afterAll(cleanUp);

  describe("findSleepByUserId", () => {
    it("should return sleep entry with specified User ID", async () => {
      const newUser = {
        username: "charlie",
        password: "pass123",
      };

      await db("users").insert(newUser);

      const sleepEntry = {
        users_id: 1,
        score: "4",
        start_time: "00:17",
        end_time: "08:37",
      };

      await db("sleep_details").insert(sleepEntry);

      const found = await Sleep.findSleepByUserId(1).first();

      expect(found.user_id).toEqual(1);
    });
  });

  describe("findSleepBySleepId", () => {
    it("should return sleep entry with specified sleep entry ID", async () => {
      const newUser = {
        username: "charlie",
        password: "pass123",
      };

      await db("users").insert(newUser);

      const sleepEntry = {
        users_id: 1,
        score: "4",
        start_time: "00:17",
        end_time: "08:37",
      };

      await db("sleep_details").insert(sleepEntry);

      const found = await Sleep.findSleepBySleepId(1).first();

      expect(found.id).toEqual(1);
    });
  });

  describe("addSleep", () => {
    it("should add a sleep entry", async () => {
      const newUser = {
        username: "charlie",
        password: "pass123",
      };
      await db("users").insert(newUser);

      const sleepEntry = {
        users_id: 1,
        score: "4",
        start_time: "00:17",
        end_time: "08:37",
      };

      const entries = await db("sleep_details");
      expect(entries.length).toEqual(0);

      await Sleep.addSleep(sleepEntry);
      const updatedEntries = await db("sleep_details");
      expect(updatedEntries.length).toEqual(1);
    });
  });

  describe("deleteSleep", () => {
    it("should remove a sleep entry", async () => {
      const newUser = {
        username: "charlie",
        password: "pass123",
      };
      await db("users").insert(newUser);

      const sleepEntry = {
        users_id: 1,
        score: "4",
        start_time: "00:17",
        end_time: "08:37",
      };

      await db("sleep_details").insert(sleepEntry);
      const entries = await db("sleep_details");
      expect(entries.length).toEqual(1);

      await Sleep.deleteSleep(1);

      const updatedEntries = await db("sleep_details");
      expect(updatedEntries.length).toEqual(0);
    });
  });
});
