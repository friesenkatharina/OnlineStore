// db.connect.js
import mongoose from "mongoose";
import "./config.js";
import process from "process";

const dbURI = process.env.MONGODB_ATLAS_URI;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

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
