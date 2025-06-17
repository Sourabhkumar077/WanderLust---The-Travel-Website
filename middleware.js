const Listing = require("./models/listing");
const { listingSchema,reviewSchema } = require("./schema");
const ExpressError = require("./utils/expressError");

module.exports.isLoggedIn = (req, res, next) => {
    //  console.log(req.user);
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;  // users will be redirected to that page from they coming from
        req.flash("error", "You must be signed in first!");
        return res.redirect("/login");
    }
    next();
};
// sessions are deleted after each login so saving the redirect url in locals and using them as the middleware in login route
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res,next)=>{
    let {id} = req.params;
    let listing =  await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currentUser._id)){
        req.flash("error","You are not the owner of this Listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
// schema validation error handling middleware
module.exports.validateListing = (req, res, next) => {
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

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};