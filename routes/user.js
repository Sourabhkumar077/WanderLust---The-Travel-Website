const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/userController");

// signup functionality routes GET + POST
router.route("/signup")
    .get("/signup", userController.renderSignupForm)
    .post("/signup", wrapAsync(userController.signup));

// implementing the login functionality routes
router.route("/login")
    .get("/login", userController.renderLoginForm)
    .post("/login",
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: '/login',
            failureFlash: true
        }),
        userController.login
    );

// logout route
router.get("/logout", userController.logout);

// exporting the routes 
module.exports = router;