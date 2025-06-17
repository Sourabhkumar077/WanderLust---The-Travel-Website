const express = require("express");
const router = express.Router({ mergeParams: true });
// requiring essential model of lisntings route
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const Review = require("../models/review");
const {validateReview,isLoggedIn} = require("../middleware");


// server side validation for review


// add review route & here request come from the show page form
router.post("/",isLoggedIn, validateReview, wrapAsync(async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  if (!listing) {
    throw new ExpressError("Listing not found", 404);
  }
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id; // add author to review
  // console.log(newReview);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "New Review created!");
  res.redirect(`/listings/${listing._id}`);
}));

// delete review route 
router.delete("/:reviewId", wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
}));

module.exports = router;