import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import pg from "pg";

import { userLogger } from "./logger.js";

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
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // add CORS support to each following route handler

app.get('/', async (req, res) => {
  try{
  const data = {
  1: 'use:',
  2: '/users/ to view all users info',
  3: '/user/:userid to view a certain user\'s info',
  4: '/user/:userid/donations to view all of given user\'s donation info ',
  5: '/user/:userid/donation/:donationid to view details of one particular donation'}
  res.status(200).json(data)
  
  userLogger.log('info', 'Successfully displayed main page')

} catch (error) {
  console.error(error);
  userLogger.log('error', 'Failed to display main page')
  res.status(500);
}
})

app.get("/users/", async (req, res) => {
  try {
    const query = "SELECT * FROM users";
    const response = await client.query(query);
    res.status(200).json(response.rows);
    
    userLogger.log('info', 'Successfully displayed all users')

  } catch (error) {
    console.error(error);
    userLogger.log('error', 'Failed to display all users')
    res.status(500);
  }
});

app.get("/user/:userid", async (req, res) => {
  const userid = req.params.userid;
  try {
    const query = "SELECT * FROM users where users.userid = $1";
    const response = await client.query(query, [userid]);
    res.status(200).json(response.rows);
    
    if (req.body.userid != userid) {
      throw new Error
    }

    userLogger.log('info', `Successfully displayed given user's ${userid}`)

  } catch (error) {
    console.error(error);
    userLogger.log('error', `Failed to display given user's ${userid}`)
    res.status(500);
  }
});

app.get("/user/:userid/donations/", async (req, res) => {
  const userid = req.params.userid;
  try {
    const query = "SELECT * FROM donations where donations.userid = $1";
    const response = await client.query(query, [userid]);
    res.status(200).json(response.rows)
    
    
    if (req.body.userid != userid) {
      throw new Error
    }

    userLogger.log('info', `Successfully displayed given user's ${userid} donations`)

  } catch (error) {
    console.error(error);
    userLogger.log('error', `Failed to display given user's ${userid} donations`)
    res.status(500);
  }
});

app.get("/user/:userid/donations/count", async (req, res) => {
  const userid = req.params.userid;
  try {
    const countquery = "SELECT COUNT(*) AS donation_count FROM donations WHERE donations.userid = $1";
    const countresponse = await client.query(countquery, [userid]);
    const donationCount = parseInt(countresponse.rows[0].donation_count)
    
    if (req.body.userid != userid) {
      throw new Error
    }
    
    console.log(`Thank you for your multiple donations! We appreciate all ${donationCount}!`)
    if (donationCount > 1) {
      res.status(200).json(`Thank you for your multiple donations! We appreciate all ${donationCount}!`);
    }
    else{
      res.status(200).json(countresponse.rows)
    }
    
    userLogger.log('info', `Successfully displayed given user's ${userid} donation count`)

  } catch (error) {
    console.error(error);
    userLogger.log('error', `Failed to display given user's ${userid} donation count`)
    res.status(500);
  }
});

app.get("/user/:userid/donation/:donationid", async (req, res) => {
  const userid = req.params.userid;
  const donationid = req.params.donationid;
  try {
    const query = "SELECT * FROM donations where donations.donationid = $1";
    const response = await client.query(query, [donationid]);
    res.status(200).json(response.rows);
    
    if (req.body.userid != userid) {
      throw new Error
    }

    userLogger.log('info', `Successfully displayed given user's ${userid} donation ${donationid}`)

  } catch (error) {
    console.error(error);
    userLogger.log('error', `Failed to display given user's ${userid} donation ${donationid}`)
    res.status(500);
  }
});

app.post("/user/", async (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const address = req.body.address;
  try {

    const query =
      "INSERT INTO users (first_name, last_name, address) VALUES ($1, $2, $3) RETURNING *";
    const response = await client.query(query, [
      first_name,
      last_name,
      address,
    ]);
    res.status(200).json(response.rows);

    userLogger.log('info', `Successfully created a new user ${first_name}, ${last_name}, ${address}`)

  } catch (error) {
    console.error(error);
    userLogger.log('error', `Failed to create new user ${first_name}, ${last_name}, ${address}`)
    res.status(500);
  }
});

app.post("/user/:userid/donation/", async (req, res) => {
  const userid = req.body.userid;
  const donation_amount = req.body.donation_amount;
  const payment_method = req.body.payment_method;
  try {
    const query =
      "INSERT INTO donations (userid, donation_amount, payment_method) VALUES ($1, $2, $3)";
    const response = await client.query(query, [
      userid,
      donation_amount,
      payment_method,
    ]);
    res.status(200).json(response.rows);

    if (req.params.userid != userid) {
      throw new Error
    }

    userLogger.log('info', `Successfully created a new donation ${donation_amount}, ${payment_method} for user ${userid}`)

  } catch (error) {
    console.error(error);
    userLogger.log('error', `Successfully created a new donation ${donation_amount}, ${payment_method} for user ${userid}`)
    res.status(500);
  }
});

app.delete("/user/:userid", async (req, res) => {
  const userid = req.body.userid;
  try {
    const query = 
        "DELETE FROM donations where userid = $1\; DELETE * FROM users where userid = $1";
    const response = await client.query(query, [userid]);
    res.status(200).json(response.rows);

    if (req.params.userid != userid) {
      throw new Error
    }

    userLogger.log('info', `Successfully deleted user ${userid}`)

  } catch (error) {
    console.error(error);
    userLogger.log('error', `Failed to delete user ${userid}`)
    res.status(500);
  }
});

app.delete("/user/:userid/donation/:donationid", async (req, res) => {
  const userid = req.body.userid;
  const donationid = req.body.donationid;
  try {
    const query = "DELETE FROM donations where donations.donationid = $1";
    const response = await client.query(query, [donationid]);
    res.status(200).json(response.rows);

    if (req.params.userid != userid || req.params.donationid != donationid) {
      throw new Error
    }

    userLogger.log('info', `Successfully deleted donation ${donationid} under user ${userid}`)

  } catch (error) {
    console.error(error);
    userLogger.log('error', `Failed to delete donation ${donationid} under user ${userid}`)
    res.status(500);
  }
});

app.put("/user/:userid",
  async (req, res) => {
    const userid = req.body.userid;
    const address = req.body.address;
    try {
      const query =
        "UPDATE users SET address = $1 WHERE userid = $2";
      const response = await client.query(query, [address, userid]);
      res.status(200).json(response.rows);

      if (req.params.userid != userid) {
        throw new Error
      }

      userLogger.log('info', `Successfully edited address ${address} under user ${userid}`)

    } catch (error) {
      console.error(error);
      userLogger.log('error', `Failed to edit address ${address} under user ${userid}`)
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