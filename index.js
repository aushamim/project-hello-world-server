const express = require("express");
require("dotenv").config();
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const { MongoClient } = require("mongodb");
const fileUpload = require("express-fileupload");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

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
    const usersCollection = database.collection("users");

    // APIs

    // get all the users post
    app.get("/post", async (req, res) => {});

    //get user data with query
    app.get("/users", async (req, res) => {
      let query = {};
      const email = req.query.email;
      if (email) {
        query = { email: email };
      }

      const cursor = usersCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });

    //post user data
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.json(result);
    });

    // upsert user
    app.put("/users", async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const options = { upsert: true };
      const updateDoc = { $set: user };
      const result = await usersCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.json(result);
    });
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
