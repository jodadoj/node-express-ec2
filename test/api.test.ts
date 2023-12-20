import { describe, expect, test } from "@jest/globals";
import { startDB } from "../src/server"
import supertest from "supertest";
import runServer from "../src/server"

const app = runServer();

describe("get user", () => {
    
})