const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Review = require("./review");

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

listingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing){
   await Review.deleteMany({_id : {$in:listing.reviews}});
  }
})
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
