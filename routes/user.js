const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

// signup functionality routes GET + POST
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newuser = new User({ username, email });
        let registeredUser = await User.register(newuser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust!");
            res.redirect("/listings");
        });
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
}));

// implementing the login functionality routes
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post("/login", 
    saveRedirectUrl,
    passport.authenticate("local", { 
        failureRedirect: '/login', 
        failureFlash: true 
    }),
    async (req, res) => {
        req.flash("success", "Welcome Back!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        delete req.session.redirectUrl;  // Clear the redirect URL from session
        res.redirect(redirectUrl);
    }
);

// logout route
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Goodbye!");
        res.redirect("/listings");
    });
});

// exporting the routes 
module.exports = router;