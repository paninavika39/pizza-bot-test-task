import { MongoClient, ServerApiVersion } from 'mongodb';

export const createClient = async (url: string | undefined) => {
  if (url === undefined) {
    throw new Error('Ссылка подключения не определена');
  }

  const client = new MongoClient(url, {
    serverApi: ServerApiVersion.v1,
  });

  await client.connect();

  return client;
};

export const getDb = async (url: string | undefined, dbName: string) => {
  const client = await createClient(url);
  const db = client.db(dbName);

  return db;
};
