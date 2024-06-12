import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

const config = dotenv.config().parsed;

const client = new MongoClient(config.DB_URI);
await client.connect();
console.log('Connected to db.');

export const DB = client.db(config.DB_NAME);

