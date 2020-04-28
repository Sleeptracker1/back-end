const request = require("supertest");

const server = require("./server");

const db = require("../data/dbconfig");

describe("server.js", () => {
  describe("index route", () => {
    it("should return status code 200 for get request to the index route", async () => {
      const response = await request(server).get("/");

      expect(response.status).toEqual(200);
    });
  });

  describe("Endpoint /api/users", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("should return status code 201 on successful registration", async () => {
      const response = await request(server)
        .post("/api/users/register")
        .send({ username: "testingUser", password: "testingPassword" });

      expect(response.status).toEqual(201);
    });
  });
});
