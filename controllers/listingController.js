import Listing from "../models/listing.js";

export async function index(req, res) {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}

export function renderNewForm(req, res) {
  res.render("listings/new.ejs");
}

export async function showListings(req, res) {
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
}

export async function createListings(req, res) {
  const newListing = new Listing(req.body.listing);
  // console.log(req.file); - for debug only
  if (req.file) {

    newListing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New listing created!");
  res.redirect(`/listings/${newListing._id}`);
}

export async function renderEditForm(req, res) {
  let id = req.params.id;
  const editlisting = await Listing.findById(id);
  if (!editlisting) {
    req.flash("error", "Requested listing not found");
    return res.redirect("/listings");
  }
  // updated the image dimensions
  let originalImageUrl = editlisting.image.url;
  let updatedImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
  res.render("listings/edit.ejs", { editlisting, updatedImageUrl });
}

export async function updateListings(req, res) {
  let id = req.params.id;
  let updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (!updatedListing) {
    throw new ExpressError("Listing not found", 404);
  }
  if (typeof req.file != "undefined") {
    updatedListing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
    await updatedListing.save();
  }

  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
}

export async function destroyListing(req, res) {
  let id = req.params.id;
  let deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) {
    throw new ExpressError("Listing not found", 404);
  }
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
}