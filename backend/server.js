import express from "express";
import cookieParser from "cookie-parser";
import path from 'path'

import AuthRoute from './routes/AuthRoute.js';
import movieRoute from './routes/movieRoute.js';
import tvRoute from './routes/tvRoute.js';
import buscarRoute from './routes/buscarRoute.js';




import { ENV_VARS } from "./config/envVariables.js";
import { connectDB } from "./config/db.js";
import { rutaProtegida } from "./middleware/rutaProtegida.js";



const app = express();
const PORT = ENV_VARS.PORT

const __dirname = path.resolve()

// Middleware para manejar JSON y Cookies
app.use(express.json());
app.use(cookieParser())


// Usar el enrutador
app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/movie', rutaProtegida, movieRoute);
app.use('/api/v1/tv', rutaProtegida, tvRoute);
app.use('/api/v1/buscar', rutaProtegida, buscarRoute);



if(ENV_VARS.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}




// INICIAR SERVIDOR!
app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto: ' + PORT);
    connectDB();
});


