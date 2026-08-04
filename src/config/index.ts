import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
    path : path.join(process.cwd(),".env"),
});

export default {
    port: process.env.PORT,
    databaseUrl : process.env.DATABASE_URL,
    salt_rounds : process.env.BYCRPT_SALT_ROUNDS,
    app_url : process.env.APP_URL,
}