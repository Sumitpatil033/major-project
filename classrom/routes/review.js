const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../../utils/wrapAsync");
const Listing = require("../../models/listing");
const Review = require("../../models/review"); 
const reviewController = require("../controllers/reviews.js");



// Create review
router.post("/", wrapAsync(reviewController.reviewPost));




// Delete review
router.delete("/:reviewId", wrapAsync(reviewController.reviewDelete));

module.exports = router;
