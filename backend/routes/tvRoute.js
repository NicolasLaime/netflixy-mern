import express from "express";
import { getTrendingTv, getTvCategoria, getTvDetalles, getTvSimilares, getTvTrailers } from "../controllers/tv.controllers.js";

const router = express.Router()



router.get('/trending', getTrendingTv);
router.get('/:id/trailers', getTvTrailers);
router.get('/:id/detalles', getTvDetalles);
router.get('/:id/similares', getTvSimilares)
router.get('/:categoria', getTvCategoria)





export default router
