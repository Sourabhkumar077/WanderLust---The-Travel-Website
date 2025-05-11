const mongoose = require("mongoose");
const listing = require("../models/listing");
const initData = require("./data");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";
async function InitDb() {
    await mongoose.connect( MONGO_URL);
    await listing.deleteMany({});
    await listing.insertMany(initData.data);

    console.log("Database was initialized");
}

InitDb();