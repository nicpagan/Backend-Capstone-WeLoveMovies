const service = require("./movies.service");

async function list(req, res) {             // returns a list of movies that are showing
  let resultList;

  if (req.query.is_showing) {
    resultList = await service.isShowingList(req.query.is_showing === "true");              //if is_showing is true, return only those movies that are showing in theaters
  } else {
    resultList = await service.list();                                      // else, return all
  }
  res.json({ data: resultList });
}

async function movieExists(req, res, next) {                    // validates movie by movieId
  const movie = await service.read(req.params.movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}


async function read(req, res, next) {               // returns the movies local data
  res.json({ data: res.locals.movie });
}


module.exports = {
  list: [list],
  read: [movieExists, read],
  movieExists,
};