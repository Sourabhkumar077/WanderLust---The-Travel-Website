module.exports.isLoggedIn = (req, res, next) => {
    //  console.log(req.user);
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;  // users will be redirected to that page from they coming from
        req.flash("error", "You must be signed in first!");
        return res.redirect("/login");
    }
    next();
};
// sessions are deleted after each login so saving the redirect url in locals and using them as the middleware in login route
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}; 