import { describe, expect, test } from "@jest/globals";
import {default as request} from 'supertest';
import {app} from "../src/server.js";

describe("GET /user", () => {
  describe("given a userId, return details", () => {
    test("returns 200 status", async () => {
      const response = await request(app).get("/user/bdc85323-d64b-4dc9-9620-a82334b5f010").send({
        userid: "bdc85323-d64b-4dc9-9620-a82334b5f010"
      })
      expect(response.statusCode).toBe(200)
      expect(response.con)
    }, 10000);

    
    test("returns 200 status", async () => {
      const response = await request(app).get(
        "/user/bdc85323-d64b-4dc9-9620-a82334b5f010/donation/483f3e9c-5ecc-4a2c-9b76-65ab5038f586"
        ).send({
        userid: "bdc85323-d64b-4dc9-9620-a82334b5f010",
        donationid : "483f3e9c-5ecc-4a2c-9b76-65ab5038f586"
      })
      expect(response.statusCode).toBe(200)
    }, 10000)
  })
})