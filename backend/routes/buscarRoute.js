import express from "express";
import { buscarPelicula, buscarPersona, buscarTv, getBorrarHistorialdeBusqueda, getHistorialdeBusqueda } from "../controllers/buscar.controller.js";


const router = express.Router()


router.get('/person/:query', buscarPersona);
router.get('/movie/:query', buscarPelicula);
router.get('/tv/:query', buscarTv);

// historial de busqueda
router.get('/historial', getHistorialdeBusqueda)
router.delete('/historial/:id', getBorrarHistorialdeBusqueda)









export default router




