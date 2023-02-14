const express = require("express");
const reviewController = require("./../controllers/reviewController");

const router = express.Router();

// router
//   .route("/")
//   .get(reviewController.getAllReviews)
//   .post(reviewController.addReview);

router.get("/", reviewController.getAllReviews);
router.post("/:id", reviewController.addReview);

module.exports = router;
