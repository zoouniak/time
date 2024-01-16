const { MongoClient } = require("mongodb");
require("dotenv").config();
const connectToMongo = async () => {
  const client = new MongoClient(process.env.MONGO_URL);
  let conn;

  try {
    conn = await client.connect();
  } catch (e) {
    console.error(e);
  }

  return conn.db("nodedb");
};

module.exports = connectToMongo();
