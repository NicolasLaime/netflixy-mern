import express from "express";
import { getMovieCategoria, getMovieDetalles, getMovieSimilares, getMovieTrailers, getTrendingMovie } from "../controllers/movie.controller.js";

const router = express.Router()


router.get('/trending', getTrendingMovie);
router.get('/:id/trailers', getMovieTrailers);
router.get('/:id/detalles', getMovieDetalles);
router.get('/:id/similares', getMovieSimilares)
router.get('/:categoria', getMovieCategoria)





export default router