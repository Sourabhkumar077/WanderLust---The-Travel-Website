import { Router } from "express";
const router = Router({ mergeParams: true });
// requiring essential model of lisntings route
import wrapAsync from "../utils/wrapAsync.js";
import { validateReview, isLoggedIn, isReviewAuthor } from "../middleware.js";

import { createReview, destroyReview } from "../controllers/reviewController.js";


// add review route & here request come from the show page form
router.post("/",isLoggedIn, validateReview, wrapAsync(createReview));

// delete review route 
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(destroyReview));

export default router;