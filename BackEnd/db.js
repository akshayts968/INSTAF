require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://akshaysuresh968:6CbXAGbWpXm9HJpK@cluster0.aznmhtb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
  connectTimeoutMS: 30000,
});

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    return client;
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
    throw err; // Ensure error is thrown for proper error handling in your application
  }
}

module.exports = { connect };
