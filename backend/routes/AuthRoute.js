import express from "express";
import { authCheck, login, logout, signup } from "../controllers/auth.controller.js";
import { rutaProtegida } from "../middleware/rutaProtegida.js";

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.get('/authCheck', rutaProtegida, authCheck );


export default router;


