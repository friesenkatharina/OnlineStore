import express from "express";
import mongoose from "mongoose";
import "./config.js";
import process from "process";

const app = express();

const dbURI = process.env.MONGODB_ATLAS_URI;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const PORT = process.env.PORT || 5005;
    app.listen(PORT, () => {
      console.log(`Server connected to port ${PORT} and MongoDB`);
    });

    mongoose.connection.db
      .listCollections()
      .toArray()
      .then((collections) => {
        const collectionInfo = collections.map((collection) => collection.name);
        console.log("Available collections:", collectionInfo);
      })
      .catch((error) => console.log("Error listing collections:", error));
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB", error);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});
