const express = require("express");
const router = express.Router({ mergeParams: true });
// requiring essential model of lisntings route
const wrapAsync = require("../utils/wrapAsync");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware");

const reviewController = require("../controllers/reviewController");


// add review route & here request come from the show page form
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// delete review route 
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;