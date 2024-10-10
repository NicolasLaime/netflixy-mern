import jsonwebtoken from "jsonwebtoken";
import { ENV_VARS } from "../config/envVariables.js";
import { User } from "../models/user.model.js";


jsonwebtoken    


export const rutaProtegida = async (req, res, next) => {
    try {
      // Obtener el token desde las cookies
      const token = req.cookies['jwt-netflixy'];
      
      // Verificar si el token está presente
      if (!token) {
        return res.status(401).json({ success: false, message: 'No autorizado - token no autorizado' });
      }
  
      // Verificar y decodificar el token usando una clave secreta
      const decoded = jsonwebtoken.verify(token, ENV_VARS.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({ success: false, message: 'No autorizado - token invalido' });
      }
  
      // Buscar el usuario en la base de datos a partir del userId en el token decodificado
      const user = await User.findById(decoded.userId).select('-password'); // Excluir el campo password
      
      // Si el usuario no existe, enviar una respuesta 404
      if (!user) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }
  
      // Almacenar la información del usuario en `req.user` para usarla en la siguiente función
      req.user = user;
  
      // Continuar con la siguiente función en la cadena de middlewares
      next();
      
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal server Error' });
    }
  };
  