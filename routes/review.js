const express = require("express");
const router = express.Router({ mergeParams: true });
// requiring essential model of lisntings route
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");
const Listing = require("../models/listing");
const Review = require("../models/review");
const { reviewSchema } = require("../schema");

// server side validation for review
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// add review route & here request come from the show page form
router.post("/", validateReview, wrapAsync(async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  if (!listing) {
    throw new ExpressError("Listing not found", 404);
  }
  let newReview = new Review(req.body.review);
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