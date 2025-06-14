const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");


// requiring the routers of the app
const listingRouter = require("./routes/listing");
const reviewsRouter = require("./routes/review");
const userRouter = require("./routes/user");


// setting views engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });



// setting up the session
let sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, // for security

    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,   // session cookie expires after 7 days
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

// root route of the app
app.get("/", (req, res) => {
  res.send("Hello World! this is root page");
});

//  flash & Session middleware
app.use(session(sessionConfig));
app.use(flash());

// authentication strategy
app.use(passport.initialize());
app.use(passport.session());  // passport middleware
passport.use(new LocalStrategy(User.authenticate()));

// serialize and deserialize user on session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// Mount the  routers
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

app.get("/demouser", async (req, res) => {
  const user = new User({ username: "demouser", email: "HsA2F@example.com" });
  const registeredUser = await User.register(user, "password");
  res.send(registeredUser);
});




// handle 404s
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// error handling middleware
app.use((err, req, res, next) => {
  let { message = "Something went wrong", statusCode = 500 } = err;
  res.status(statusCode).render("error.ejs", { err });
});

// server is listening on port value
app.listen(port, () => {
  console.log(`App is running on : http://localhost:${port}/listings`);
});
