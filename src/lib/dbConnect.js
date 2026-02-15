const { MongoClient, ServerApiVersion } = require('mongodb');

let client = null;

const getClient = () => {
  if (client) return client;
  
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;
  
  if (!uri || !dbName) {
    throw new Error("Missing MONGODB_URI or DB_NAME");
  }
  
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  return client;
};

export const dbConnect = (cname) => {
  const client = getClient();
  return client.db(process.env.DB_NAME).collection(cname);
};