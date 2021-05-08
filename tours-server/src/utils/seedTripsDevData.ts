import mongoose, { Error, Model } from "mongoose";
import * as dotenv from "dotenv";
import * as fs from "fs";
import path from "path";
import Trips, { ITrips } from "../models/tripsModel";

dotenv.config({ path: "./config.env" });

let DB = "";
if (!process.env.MONGO_CONNECTION_STRING) {
  throw new Error("process.env.MONGO_CONNECTION_STRING not defined");
}
if (!process.env.MONGO_PASSWORD) {
  throw new Error("process.env.MONGO_PASSWORD not defined");
}
if (!process.env.MONGO_DEV_DB) {
  throw new Error("process.env.MONGO_DEV_DB not defined");
}

if (!process.env.NODE_ENV) {
  throw new Error("process.env.NODE_ENV not defined");
}

DB = process.env.MONGO_CONNECTION_STRING.replace(
  "<DATABASE>",
  process.env.MONGO_DEV_DB
);

DB = DB.replace("<PASSWORD>", process.env.MONGO_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("\x1b[32m%s\x1b[0m", " -> DB connection successfull!");
  })
  .catch((err) => {
    console.log("\x1b[31m%s\x1b[0m", " -> DB connection FAIL");
    console.log(err);
  });

const tripsData = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, ".." + "/assets/trips-simple.json"),
    "utf-8"
  )
) as unknown;

const executeSeedDatabase = async (
  Trips: Model<ITrips>,
  tripsData: unknown
): Promise<string> => {
  if (process.argv[2] === "--import") {
    await Trips.create(tripsData);
    return Promise.resolve("Import");
  }
  if (process.argv[2] === "--delete") {
    await Trips.deleteMany();
    return Promise.resolve("Delete");
  }
  return Promise.reject("Specifiy --import or --delete args");
};

executeSeedDatabase(Trips, tripsData)
  .then((args) => {
    console.log(args + " Completed");
    process.exit(0);
  })
  .catch((err) => {
    console.log("Failed:", err);
    process.exit(1);
  });

// ts-node ${pwd}/src/utils/seedTripsDevData.ts --import
