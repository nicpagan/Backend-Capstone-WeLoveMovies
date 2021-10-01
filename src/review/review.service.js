const knex = require("../db/connection");

function findCritic(id) {                // finds all critics where id matches critic id
  return knex("critics")
    .select("*")
    .where({ "critics.critic_id": id })
    .first();
}

function findReviews(movieId) {       // finds all movie reviews where id matches movie id
  return knex("reviews")
    .select("*")
    .where({ "reviews.movie_id": movieId });
}


function read(reviewId) {           // reads all found reviews where the id matches the review id. returns reviews that match reviewId.
  return knex("reviews")
    .select("*")                    // Selects all columns from the "reviews" table where the review_id column matches the reviewId passed in.
    .where({ review_id: reviewId })
    .first();
}

async function update(updatedReview) {
  await knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");

  return read(updatedReview.review_id);
}


function destroy(reviewId) {
  return knex("reviews")
    .where({ review_id: reviewId })
    .del();
}


module.exports = {
  findCritic,
  findReviews,
  read,
  update,
  delete: destroy,
};