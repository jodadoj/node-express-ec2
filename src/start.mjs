import {app, client} from "./server.mjs";

const PGPORT = process.env.PGPORT;

await client.connect();

app.listen(PGPORT, () => {
  console.log(
    `Node.js server is listening for HTTP requests on port ${PGPORT}.`,
  );
});
