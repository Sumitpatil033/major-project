const Listing = require("../../models/listing");



module.exports.index= async (req, res) => {
    const alllistings = await Listing.find({});
    res.render("listings/index", { alllistings });
}

module.exports.renderNewForm= (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListings=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    res.render("listings/show.ejs", { listing });
};

module.exports.createLisings= async (req, res) => {
    let url= req.file.path;
    let filename = req.file.filename;
    
     const newListing = new Listing(req.body.listing);
     newListing.owner= req.user._id;
     newListing.image= {url ,filename};
     await newListing.save();
     req.flash("success", "New Listing Created");
     console.log(newListing);
     res.redirect("/listings");
};

module.exports.editListings=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    req.flash("success", " Listing Edited");
    res.render("listings/edit.ejs", { listing });
};

module.exports.updateListings=async (req, res) => {
    let { id } = req.params;
   let listing= await Listing.findByIdAndUpdate(id, { ...req.body.listing });

   if(typeof req.file !=="undefined"){
   let url= req.file.path;
   let filename = req.file.filename;
   listing.image={url,filename};
   await listing.save();
   }
    req.flash("success", " Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListings=async(req,res)=>{
    let{id}=req.params;
    let deletedListing=  await Listing.findByIdAndDelete(id);
    req.flash("success", " Listing Deleted");
    console.log(deletedListing);
    res.redirect("/listings");
};