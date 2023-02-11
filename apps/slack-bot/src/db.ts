import { getDb } from 'db';

export default await getDb(process.env.MONGO_URI, 'pizza-bot-db');
