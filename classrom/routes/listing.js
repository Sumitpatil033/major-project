const express = require("express");
const router = express.Router();
const wrapAsync = require("../../utils/wrapAsync");
const Listing = require("../../models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");

const listingControllers = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../../cloudconfig.js");
const upload = multer({ storage });

// ✅ NEW: Form to create new listing
router.get("/new", isLoggedIn, listingControllers.renderNewForm);

// ✅ INDEX + CREATE in one route block
router
  .route("/")
  .get(wrapAsync(listingControllers.index))
  .post(isLoggedIn,  upload.single("listing[image]"), wrapAsync(listingControllers.createLisings))
 

// ✅ SHOW
router.get("/:id", listingControllers.showListings);

// ✅ EDIT FORM
router.get("/:id/edit", isLoggedIn, isOwner, listingControllers.editListings);

// ✅ UPDATE
router.put("/:id", isLoggedIn, isOwner, upload.single("listing[image]") ,listingControllers.updateListings);

// ✅ DELETE
router.delete("/:id", isLoggedIn, isOwner, listingControllers.deleteListings);

module.exports = router;
