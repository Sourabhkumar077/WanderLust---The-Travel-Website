
import User from "../models/user.js";

export function renderSignupForm(req, res) {
    res.render("users/signup.ejs");
}

export async function signup(req, res) {
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
}

export function renderLoginForm(req, res) {
    res.render("users/login.ejs");
}

export async function login(req, res) {
    req.flash("success", "Welcome Back!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    delete req.session.redirectUrl;  // Clear the redirect URL from session
    res.redirect(redirectUrl);
}

export function logout(req, res, next) {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Goodbye!");
        res.redirect("/listings");
    });
}