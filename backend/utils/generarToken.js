import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVariables.js';

// Generar el token y enviarlo en la cookie
export const generarTokenSecretoCookie = (userId, res) => {
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

    res.cookie('jwt-netflixy', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,  // 15 días en milisegundos
        httpOnly: true,
        sameSite: 'lax',  // Considera usar 'lax' si la app tiene requerimientos cross-site
        secure: ENV_VARS.NODE_ENV !== 'development'
    });

    return token;
};

