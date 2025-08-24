import { Router } from "express";
const router = Router();
// requiring essential model of lisntings route
import wrapAsync from "../utils/wrapAsync.js";
import { isLoggedIn, isOwner, validateListing } from "../middleware.js";

import multer from 'multer';
import cloudConfig from "../cloudconfig.js";
const { storage } = cloudConfig;
const upload = multer({ storage }); // files stored in cloudinary space

// requiring the controllers file 
import { index, createListings, renderNewForm, showListings, updateListings, destroyListing, renderEditForm } from "../controllers/listingController.js";

router.route("/")
    .get(wrapAsync(index))
    .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(createListings)
    );

// new route - must come before /:id route
router.get("/new", isLoggedIn, renderNewForm);

// Show route & update , delete route
router.route("/:id")
    .get(wrapAsync(showListings))
    .put(isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(updateListings))
    .delete(isOwner, isLoggedIn, wrapAsync(destroyListing));

// edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditForm));

export default router; // ✅ Export the router directly
