import Redis from "ioredis"
import dotenv from "dotenv";    

dotenv.config();

export const rtokens = new Redis(process.env.REDIS_URL);
