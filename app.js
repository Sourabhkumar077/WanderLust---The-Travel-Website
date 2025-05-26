const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/expressError");
const { listingSchema } = require("./schema");


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

// root route of the app
app.get("/", (req, res) => {
  res.send("Hello World! this is root page");
});
// schema validation error handling middleware
const validateListing = (req, res, next) => {
  console.log(req.body);
  const { error } = listingSchema.validate(req.body.listing);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}
// index route of the app
app.get("/listings", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

// new route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show route
app.get("/listings/:id", wrapAsync(async (req, res) => {
  let id = req.params.id;
  const oneListing = await Listing.findById(id);
  if (!oneListing) {
    throw new ExpressError("Listing not found", 404);
  }
  res.render("listings/show.ejs", { oneListing });
}));

// create route
app.post("/listings", validateListing, 
  wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  }));

// edit route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let id = req.params.id;
  const editlisting = await Listing.findById(id);
  if (!editlisting) {
    throw new ExpressError("Listing not found", 404);
  }
  res.render("listings/edit.ejs", { editlisting });
}));

// update route
app.put("/listings/:id", validateListing, wrapAsync(async (req, res) => {
  let id = req.params.id;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

// delete route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let id = req.params.id;
  let deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) {
    throw new ExpressError("Listing not found", 404);
  }
  res.redirect("/listings");
}));

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
