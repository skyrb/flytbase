const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://skyrb:P9BYoWbdgR9Y7L3J@cluster0.fqghb4v.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'flytbase';

let db;

async function connectToMongoDB() {
  try {
    console.log("done")
    if (!db) {
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      db = client.db(dbName);
    }
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

module.exports = connectToMongoDB;