import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: isProduction ? ["error", "warn"] : true,
    entities: [isProduction ? "dist/entity/**/*.js" : "src/entity/**/*.ts"],
    migrations: [
        isProduction ? "dist/migration/**/*.js" : "src/migration/**/*.ts"
    ],
    migrationsRun: true,
    extra: {
        connectionLimit: 10
    }
});
