const express = require("express");
const router = express.Router();
// requiring essential model of lisntings route
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");

const multer = require('multer')
const { storage } = require("../cloudconfig");
const upload = multer({ storage }); // files stored in cloudinary space

// requiring the controllers file 
const listingController = require("../controllers/listingController");

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListings)
    );

// new route - must come before /:id route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show route & update , delete route
router.route("/:id")
    .get(wrapAsync(listingController.showListings))
    .put(isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListings))
    .delete(isOwner, isLoggedIn, wrapAsync(listingController.destroyListing));

// edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router; // ✅ Export the router directly
