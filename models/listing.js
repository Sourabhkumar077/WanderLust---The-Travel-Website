const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  image: {
    filename: String,
    url: {
      type: String,
      default: "https://unsplash.com/photos/majestic-mountains-loom-above-a-dense-forest-HBsmzKuGyuI",
      set: (v) =>
        v === ""
          ? "https://unsplash.com/photos/majestic-mountains-loom-above-a-dense-forest-HBsmzKuGyuI"
          : v,
    },
  },
  location: String,
  country: String,
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review"
    }
  ]
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
