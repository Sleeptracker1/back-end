const db = require("../../data/dbconfig");
const jwt = require("jsonwebtoken");
const request = require("supertest");
const server = require("../server");

let token;

beforeAll(async () => {
  await db("users").truncate();

  const newUser = {
    username: "newUser",
    password: "pass123",
  };

  await request(server).post("/api/users/register").send(newUser);

  const loginResponse = await request(server)
    .post("/api/users/login")
    .send(newUser);

  token = loginResponse.body.token;
});

describe("Sleep route", () => {
  async function cleanUp() {
    await db("sleep_details").truncate();
  }

  beforeEach(async () => {
    await db("sleep_details").truncate();
  });
  afterAll(async () => {
    await db("sleep_details").truncate();
    await db("users").truncate();
  });

  describe("GET /", () => {
    it("Should return a status 200 on success", async () => {
      const response = await request(server)
        .get("/api/sleep")
        .set({ Authorization: token });

      expect(response.status).toEqual(200);
    });

    it("Should return an array of sleep entries", async () => {
      const decodedToken = jwt.decode(token);
      const { user } = decodedToken;

      const newEntry = {
        users_id: user,
        score: "4",
        start_time: "10:33",
        end_time: "05:37",
      };

      const firstResponse = await request(server)
        .get("/api/sleep")
        .set({ Authorization: token });
      expect(firstResponse.body.length).toEqual(0);

      await db("sleep_details").insert(newEntry);

      const secondResponse = await request(server)
        .get("/api/sleep")
        .set({ Authorization: token });
      expect(secondResponse.body.length).toEqual(1);
    });
  });

  describe("POST /", () => {
    it("should insert a sleep entry", async () => {
      const decodedToken = jwt.decode(token);
      const { user } = decodedToken;

      const newEntry = {
        users_id: user,
        score: "4",
        start_time: "10:33",
        end_time: "05:37",
      };

      const entries = await db("sleep_details");
      expect(entries.length).toEqual(0);

      await request(server)
        .post("/api/sleep")
        .send(newEntry)
        .set({ Authorization: token });

      const updatedEntries = await db("sleep_details");
      expect(updatedEntries.length).toEqual(1);
    });
  });

  describe("PUT /", () => {
    it("should update a sleep entry", async () => {
      const decodedToken = jwt.decode(token);
      const { user } = decodedToken;

      const newEntry = {
        users_id: user,
        score: "2",
        start_time: "10:33",
        end_time: "05:37",
      };

      const inserted = await db("sleep_details")
        .insert(newEntry)
        .then(([id]) => {
          return db("sleep_details")
            .where({ id })
            .first()
            .then((entry) => {
              return entry;
            });
        });
      expect(inserted.score).toEqual("2");
      const { id } = inserted;

      const updatedEntry = {
        users_id: user,
        score: "4",
        start_time: "10:33",
        end_time: "05:37",
      };

      await request(server)
        .put(`/api/sleep/${id}`)
        .send(updatedEntry)
        .set({ Authorization: token });

      const retrievedUpdated = await db("sleep_details").where({ id }).first();
      expect(retrievedUpdated.score).toEqual("4");
    });
  });
});
