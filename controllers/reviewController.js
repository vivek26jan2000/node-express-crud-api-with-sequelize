const db = require("./../models");

const Review = db.reviews;

exports.addReview = async (req, res) => {
  const data = {
    product_id: req.params.id,
    rating: req.body.rating,
    description: req.body.description,
  };
  const review = await Review.create(data);
  res.status(201).send(review);
};

exports.getAllReviews = async (req, res) => {
  const reviews = await Review.findAll({});
  res.status(200).send(reviews);
};
