import mongoose from "mongoose";
import { ENV_VARS } from "./envVariables.js";

export const connectDB = async() => {
    try {
       const conexionmongo = await mongoose.connect(ENV_VARS.MONGO_URL)
       console.log('MongoDB connectado exitosamente' + conexionmongo.connection.host)
    } catch (error) {
        console.log('error de conexion a mongodb', error.message);
        process.exit(1) 

        
    }
}