if (process.env.NODE_ENV !== "production") {
  import('dotenv').then(dotenv => dotenv.config());
}

import express, { urlencoded } from "express";
const app = express();
const port = 3000;
import { connect } from "mongoose";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
import ExpressError from "./utils/expressError.js";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
const { initialize, session: _session, use, serializeUser, deserializeUser } = passport;
import LocalStrategy from "passport-local";
import User, { authenticate, serializeUser as _serializeUser, deserializeUser as _deserializeUser, register } from "./models/user.js";

// Requiring the routers of the app
import listingRouter from "./routes/listing.js";
import reviewsRouter from "./routes/review.js";
import userRouter from "./routes/user.js";

// Setting views engine
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use(urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(join(__dirname, "public")));

const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderLust";

async function main() {
  await connect(dbUrl);
}

main()
  .then(() => console.log("Connected to MongoDB Successfully at", dbUrl))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// Setting up the session store
import MongoStore from 'connect-mongo'; 
const store = MongoStore.create({
    mongoUrl: dbUrl, 
    secret: process.env.SECRET || "your-secret-key-here",
    touchAfter: 24 * 3600, 
    collectionName: 'sessions'
});

store.on("error", (err) => {
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionConfig = {
    store, 
    secret: process.env.SECRET || "your-secret-key-here",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    name: 'sessionId'
};

// Flash & Session middleware
app.use(session(sessionConfig));
app.use(flash());

// Authentication strategy
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(authenticate));
passport.serializeUser(_serializeUser);
passport.deserializeUser(_deserializeUser);

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


app.get("/demouser", async (req, res) => {
  const user = new User({ username: "demouser", email: "HsA2F@example.com" });
  const registeredUser = await register(user, "password");
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
