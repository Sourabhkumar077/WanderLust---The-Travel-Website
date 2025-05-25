const express = require('express')
const app = express()
const port = 3000;
const mongoose = require('mongoose');
const listing = require('./models/listing');
const path = require('path');
const methodOverride = require('method-override');

const ejsMate = require('ejs-mate');


// setting views engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderLust');
}

main()
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

// root route of the app
app.get('/', (req, res) => {
    res.send('Hello World! this is root page')
})

// index route of the app
app.get("/listings", async (req, res) => {
    const allListings = await listing.find({})
    res.render("listings/index.ejs", { allListings });

});
// new  route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});
// Show route
app.get("/listings/:id", async (req, res) => {
    let id = req.params.id;
    const oneListing = await listing.findById(id);
    res.render("listings/show.ejs", { oneListing });

})
// create route
app.post("/listings", async (req, res, next) => {
    try {
        const newListing = new listing(req.body.listing);
        await newListing.save(newListing);
        res.redirect("/listings");
    }
    catch (err) {
        next(err);
    }
})

// edit route
app.get("/listings/:id/edit", async (req, res) => {
    let id = req.params.id;
    const editlisting = await listing.findById(id);
    res.render("listings/edit.ejs", { editlisting });
});

// update route
app.put("/listings/:id", async (req, res) => {
    let id = req.params.id;
    await listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
});
// delete route 
app.delete("/listings/:id", async (req, res) => {
    let id = req.params.id;
    let deletedListing = await listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});
// error handling middleware
app.use((err, req, res, next) => {
    console.log(err.message);
    res.send("Something went Wrong!!")
});


// server is listening of port value 
app.listen(port, () => {
    console.log(`App is running on : http://localhost:3000/listings`);
});