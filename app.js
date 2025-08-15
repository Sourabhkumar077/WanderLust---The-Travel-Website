if(process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}

const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError");
const session = require("express-session");
const MongoStore = require('connect-mongo'); // Added for session store
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

// Requiring the routers of the app
const listingRouter = require("./routes/listing");
const reviewsRouter = require("./routes/review");
const userRouter = require("./routes/user");

// Setting views engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderLust";

async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// Setting up the session store
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600, // Time in seconds
});

store.on("error", (err) => {
    console.log("ERROR in MONGO SESSION STORE", err);
});

// Setting up the session
const sessionConfig = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, // for security
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,   // 7 days
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

// Flash & Session middleware
app.use(session(sessionConfig));
app.use(flash());

// Authentication strategy
app.use(passport.initialize());
app.use(passport.session());  // passport middleware
passport.use(new LocalStrategy(User.authenticate()));

// Serialize and deserialize user on session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// **FIX:** Redirect root to /listings
app.get("/", (req, res) => {
    res.redirect("/listings");
});

// Mount the routers
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

/
app.get("/demouser", async (req, res) => {
  const user = new User({ username: "demouser", email: "HsA2F@example.com" });
  const registeredUser = await User.register(user, "password");
  res.send(registeredUser);
});

// Handle 404s - This should be AFTER all other routes
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// Error handling middleware
app.use((err, req, res, next) => {
  let { message = "Something went wrong", statusCode = 500 } = err;
  res.status(statusCode).render("error.ejs", { err });
});

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
