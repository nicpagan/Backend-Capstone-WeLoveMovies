if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const moviesRouter = require("./movies/movies.router");
const theaterRouter = require("./theaters/theaters.router");
const reviewRouter = require("./review/review.router");

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/theaters", theaterRouter);
app.use("/reviews", reviewRouter);

// Not found handler
app.use((req, res, next) => {
	next({
		status: 404,
		message: "That page doesn't exist."
	});
});

// Error handler
app.use((err, req, res, next) => {
	const { status = 500, message = "Something went wrong on our end!" } = err;
	res.status(status).json({ error: message });
});

module.exports = app;