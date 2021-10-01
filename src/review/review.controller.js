const service = require("./review.service");


async function reviewExists(req, res, next) {                 // validates if the review exists
  const review = await service.read(req.params.reviewId);

  if (review) {             // if review id is found, return review
    res.locals.review = review;
    return next();
  }
  next({                    //else, return error status 404 and message
    status: 404, 
    message: `Review cannot be found.` });
}


async function destroy(req, res) {          // destroys the reviews locals data
  const reviewId = res.locals.review.review_id;
    await service.delete(reviewId);
    res.sendStatus(204);
}


async function update(req, res, next) {                   // updates the review request
  if (req.body.data) {
    const updatedReview = { ...res.locals.review, ...req.body.data };
    const data = await service.update(updatedReview);

    data.critic = await service.findCritic(updatedReview.critic_id);
    return res.json({ data });
  }
  next({ status: 400, message: `Missing update data` });
}



async function list(req, res) {                   //lists all reviews for a movie including the critic details
  const movieId = res.locals.movie.movie_id;
  const reviews = await service.findReviews(movieId);

  for (let review of reviews) {               // for loop through reviews and pull information from findcritic in service
    const critic = await service.findCritic(review.critic_id);
    review["critic"] = critic;
  }
  return res.json({ data: reviews });
}


module.exports = {
  delete: [reviewExists, destroy],
  update: [reviewExists, update],
  list: [list]
};