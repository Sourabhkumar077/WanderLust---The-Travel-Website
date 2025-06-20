const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListings = async (req, res) => {
  let id = req.params.id;
  const oneListing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
        select: "username"
      }
    })
    .populate("owner");
  
  if (!oneListing) {
    req.flash("error", "Requested listing not found");
    return res.redirect("/listings");
  }
  // console.log(oneListing);
  res.render("listings/show.ejs", { oneListing });
};

module.exports.createListings = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  console.log(req.file);
  if (req.file) {
    console.log("yes,file found");
    
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New listing created!");
  res.redirect(`/listings/${newListing._id}`);
};

module.exports.renderEditForm = async (req, res) => {
  let id = req.params.id;
  const editlisting = await Listing.findById(id);
  if (!editlisting) {
    req.flash("error", "Requested listing not found");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { editlisting });
};

module.exports.updateListings = async (req, res) => {
  let id = req.params.id;
  const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (!updatedListing) {
    throw new ExpressError("Listing not found", 404);
  }
  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let id = req.params.id;
  let deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) {
    throw new ExpressError("Listing not found", 404);
  }
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};