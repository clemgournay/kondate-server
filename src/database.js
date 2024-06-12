import { MongoClient } from 'mongodb';

console.log('DB URI: ' + process.env.DB_URI);
const client = new MongoClient(process.env.DB_URI);
await client.connect();
console.log('Connected to db.');

export const DB = client.db(process.env.DB_NAME);

