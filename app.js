const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError");

// requiring the routers of the app
const listings = require("./routes/listing");
const reviews = require("./routes/review");


// setting views engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// Mount the listings router
app.use("/listings", listings);

// Mount the reviews router
app.use("/listings/:id/reviews", reviews);

// root route of the app
app.get("/", (req, res) => {
  res.send("Hello World! this is root page");
});



// handle 404s
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// error handling middleware
app.use((err, req, res, next) => {
  let { message = "Something went wrong", statusCode = 500 } = err;
  res.status(statusCode).render("error.ejs", { err });
});

// server is listening on port value
app.listen(port, () => {
  console.log(`App is running on : http://localhost:${port}/listings`);
});
