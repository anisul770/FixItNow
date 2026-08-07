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
    jwt_access_secret : process.env.JWT_ACCESS_SECRET!,
    jwt_refresh_secret : process.env.JWT_REFRESH_SECRET!,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN!,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN!,
}