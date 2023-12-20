import { describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import app from './server'; 

const request = supertest(app);


describe("get user", () => {
    const response = await request.get'(/)'

    expect(response.status).toBe(200)
    expect(response.body.1).toBe()

})