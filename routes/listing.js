const express = require("express");
const router = express.Router();
// requiring essential model of lisntings route
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");
const Listing = require("../models/listing");
const { listingSchema } = require("../schema");

// schema validation error handling middleware
const validateListing = (req, res, next) => {
  if (!req.body.listing) {
    throw new ExpressError("Invalid listing data", 400);
  }
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// index route of the app
router.get("/", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

// new route - must come before /:id route
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show route
router.get("/:id", wrapAsync(async (req, res) => {
  let id = req.params.id;
  const oneListing = await Listing.findById(id).populate("reviews");
  if (!oneListing) {
    throw new ExpressError("Listing not found", 404);
  }
  res.render("listings/show.ejs", { oneListing });
}));

// create route
router.post("/", validateListing, wrapAsync(async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  req.flash("success", "New listing created!");
  res.redirect("/listings");
}));

// edit route
router.get("/:id/edit", wrapAsync(async (req, res) => {
  let id = req.params.id;
  const editlisting = await Listing.findById(id);
  if (!editlisting) {
    throw new ExpressError("Listing not found", 404);
  }
  res.render("listings/edit.ejs", { editlisting });
}));

// update route
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
  let id = req.params.id;
  const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (!updatedListing) {
    throw new ExpressError("Listing not found", 404);
  }
  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
}));

// delete route
router.delete("/:id", wrapAsync(async (req, res) => {
  let id = req.params.id;
  let deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) {
    throw new ExpressError("Listing not found", 404);
  }
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
}));

module.exports = router; // ✅ Export the router directly
