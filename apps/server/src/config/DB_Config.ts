import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const dbSetup = async () => {
  const client = await pool.connect();
  try {
    console.log("Connection established");
  } catch (err: any) {
    console.error(
      "Connection failed:",
      err.stack,
      "m error message:",
      err.message
    );

    process.exit(1);

  } finally {
    client.release();
  }
};

