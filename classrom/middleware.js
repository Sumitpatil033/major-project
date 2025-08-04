const Listing = require("../models/listing");


module.exports.isLoggedIn =(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl= req.originalUrl;
        req.flash("error","you need to logged in ");
        return res.redirect("/login");
    };
    next();
}


module.exports.saveRedirectUrl= (req,res,next) =>{
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};


module.exports.isOwner= async(req,res,next) =>{
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!req.user || !listing.owner.equals(req.user._id)) {
        req.flash("error", "You Are Not A Owner!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}