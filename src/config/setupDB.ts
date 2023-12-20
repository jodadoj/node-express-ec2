import { configEnv } from "./setupEnv";

export function configDB() {
  const dbEnvVarName = process.env.USE_LOCAL_DB
    ? "LOCAL_DATABASE_URL"
    : "DATABASE_URL";
  const connectionString = configEnv(dbEnvVarName);

  const sslSetting = process.env.USE_LOCAL_DB
    ? false
    : { rejectUnauthorized: false };

  console.log("Using db env var name:", dbEnvVarName, "with ssl:", sslSetting);

  const dbConfig = {
    connectionString,
    ssl: sslSetting,
  };
  return dbConfig;
}
