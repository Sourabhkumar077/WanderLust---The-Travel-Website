import { connect } from "mongoose";
import Listing from "../models/listing.js";
import { data } from "./data.js";

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";

async function InitDb() {
    await connect(MONGO_URL);
    await Listing.deleteMany({});
    // adding the owner property into each listing 
    const mappedData = data.map((obj) => ({ ...obj, owner: "684d2fe2cbdc858c554e5c88" }));
    await Listing.insertMany(mappedData);

    console.log("Database was initialized");
}

InitDb();