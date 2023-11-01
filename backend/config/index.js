import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const DATABASE_CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING;
export { PORT, DATABASE_CONNECTION_STRING };
