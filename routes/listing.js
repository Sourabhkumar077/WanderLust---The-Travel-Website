const express = require("express");
const router = express.Router();
// requiring essential model of lisntings route
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// requiring the controllers file 
const listingController = require("../controllers/listingController");

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(upload.single('listing[image][url]'),(req,res)=>{
        res.send(req.files);
    })
    // .post(isLoggedIn, validateListing, wrapAsync(listingController.createListings));

// new route - must come before /:id route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show route & update , delete route
router.route("/:id")
    .get(wrapAsync(listingController.showListings))
    .put(isOwner, validateListing, wrapAsync(listingController.updateListings))
    .delete(isOwner, isLoggedIn, wrapAsync(listingController.destroyListing));

// edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router; // ✅ Export the router directly
