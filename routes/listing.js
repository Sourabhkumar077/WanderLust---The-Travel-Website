const express = require("express");
const router = express.Router();
// requiring essential model of lisntings route
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner,validateListing } = require("../middleware");

// requiring the controllers file 
const listingController = require("../controllers/listingController");



// index route of the app
router.get("/", wrapAsync(listingController.index)); 

// new route - must come before /:id route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show route
router.get("/:id", wrapAsync(listingController.showListings));

// create route
router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListings));

// edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// update route
router.put("/:id", isOwner, validateListing, wrapAsync(listingController.updateListings));

// delete route
router.delete("/:id", isOwner, isLoggedIn, wrapAsync(listingController.destroyListing));

module.exports = router; // ✅ Export the router directly
