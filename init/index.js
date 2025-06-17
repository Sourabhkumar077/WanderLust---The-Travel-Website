const mongoose = require("mongoose");
const listing = require("../models/listing");
const initData = require("./data");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";

async function InitDb() {
    await mongoose.connect(MONGO_URL);
    await listing.deleteMany({});
    // adding the owner property into each listing 
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "684d2fe2cbdc858c554e5c88" })); 
    await listing.insertMany(initData.data);

    console.log("Database was initialized");
}

InitDb();