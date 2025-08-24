import { Router } from "express";
const router = Router();
import wrapAsync from "../utils/wrapAsync.js";
import passport from "passport";
import { saveRedirectUrl } from "../middleware.js";
import { renderSignupForm, signup, renderLoginForm, login, logout } from "../controllers/userController.js";

// signup functionality routes GET + POST
router.route("/signup")
    .get(renderSignupForm)
    .post(wrapAsync(signup));

// implementing the login functionality routes
router.route("/login")
    .get(renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: '/login',
            failureFlash: true
        }),
        login
    );

// logout route
router.get("/logout", logout);

// exporting the routes 
export default router;