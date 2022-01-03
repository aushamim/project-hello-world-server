const express = require("express");
require("dotenv").config();
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const { MongoClient } = require("mongodb");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sx8wv.mongodb.net/algo-digital?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const main = async () => {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to Mongo");

    const database = client.db("hello-world");
    const userCollection = database.collection("post");

    // APIs

    // get all the users post
    app.get("/post", async (req, res) => {});
  } catch (err) {
    console.error(err);
  } finally {
    //   await client.close();
  }
};

main().catch((err) => console.dir);

app.get("/", (req, res) => {
  res.send("Hello World Server");
});

app.listen(port, () => {
  console.log(`Hello World Server listening at http://localhost:${port}`);
});
