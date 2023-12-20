import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import pg from "pg";

dotenv.config(); // Read .env file lines as though they were env vars.

const PGUSER = process.env.PGUSER;
const PGPASS = process.env.PGPASS;
const PGDB = process.env.PGDB;
const PGHOST = process.env.PGHOST;
const PGPORT = process.env.PGPORT;

const client = new pg.Client({
  connectionString: `postgres://${PGUSER}:${PGPASS}@${PGHOST}:${PGPORT}/${PGDB}`,
  ssl: {rejectUnauthorized: false},
});

// Configure express routes
const app = express();

app.use(express.json()); // add JSON body parser to each following route handler
app.use(cors()); // add CORS support to each following route handler

app.get('/', (res, req) => {
  "use: \n"
  "/user/:user_id to view a certain user's info \n"
  "/user/:user_id/donations to view all of given user's donation info \n"
  "/user/:user_id/donations/:donation_id to view details of one particular donation"
})

app.get("/user/:user_id", async (res, req) => {
  try {
    const user_id = req.params.user_id;
    const query = "SELECT * FROM users where user_id is $1";
    const response = await client.query(query, [user_id]);
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

app.get("/user/:user_id/donation/", async (res, req) => {
  try {
    const user_id = req.params.user_id;
    const query = "SELECT * FROM donations where user_id is $1";
    const response = await client.query(query, [user_id]);
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

app.get("/user/:user_id/donation/:donation_id", async (res, req) => {
  try {
    const user_id = req.params.user_id;
    const donation_id = req.params.donation_id;
    const query = "SELECT * FROM donations where donation_id is $1";
    const response = await client.query(query, [donation_id]);
    res.status(200).json(response.rows);

    if (response.rows.user_id != user_id) {
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

app.post("/user/", async (res, req) => {
  try {
    const first_name = req.params.first_name;
    const last_name = req.params.last_name;
    const address = req.params.address;
    const query =
      "INSERT INTO users (first_name, last_name, address) VALUES ($1, $2, $3)";
    const response = await client.query(query, [
      first_name,
      last_name,
      address,
    ]);
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

app.post("/user/:user_id/donation/", async (res, req) => {
  try {
    const user_id = req.params.user_id;
    const payment_amount = req.params.payment_amount;
    const payment_method = req.params.payment_method;
    const query =
      "INSERT INTO donations (user_id, payment_amount, payment_method) VALUES ($1, $2, $3)";
    const response = await client.query(query, [
      user_id,
      payment_amount,
      payment_method,
    ]);
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

app.delete("user/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const query = 
        "DELETE * FROM donations where user_id = $1\; DELETE * FROM users where user_id = $1";
    const response = await client.query(query, [user_id]);
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

app.delete("user/:user_id/donations/:donation_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const donation_id = req.params.donation_id;
    const query = "DELETE * FROM donations where donation_id = $1";
    const response = await client.query(query, [donation_id]);
    res.status(200).json(response.rows);

    if (response.rows.user_id != user_id) {
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

app.put("/user/:user_id",
  async (req, res) => {
    try {
      const user_id = req.params.user_id;
      const address = req.params.address;
      const query =
        "UPDATE users SET address = $1 WHERE user_id = $2";
      const response = await client.query(query, [address, user_id]);
      res.status(200).json(response.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  });

startDB();

export async function startDB() {
  await client.connect();

  app.listen(PGPORT, () => {
    console.log(
      `Node.js server is listening for HTTP requests on port ${PGPORT}.`,
    );
  });
}