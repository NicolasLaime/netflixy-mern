import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import { generarTokenSecretoCookie } from "../utils/generarToken.js";



// REGISTRARSEEEEE!!!!
export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;

        // Validar datos básicos
        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'La contraseña debe tener más de 6 caracteres' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Email inválido' });
        }

        const existeUsuarioEmail = await User.findOne({ email });
        if (existeUsuarioEmail) {
            return res.status(400).json({ success: false, message: 'El email ya está registrado' });
        }

        const existeUsuarioUsername = await User.findOne({ username });
        if (existeUsuarioUsername) {
            return res.status(400).json({ success: false, message: 'El nombre de usuario ya está en uso' });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const IMAGENES_PERFIL = ['/avatar1.png', '/avatar2.png', '/avatar3.png'];
        const image = IMAGENES_PERFIL[Math.floor(Math.random() * IMAGENES_PERFIL.length)];

        const nuevoUsuario = new User({
            email,
            password: hashedPassword,
            username,
            image
        });

        await nuevoUsuario.save();

        generarTokenSecretoCookie(nuevoUsuario._id, res);

        return res.status(201).json({ success: true, user: { ...nuevoUsuario._doc, password: "" } });

    } catch (error) {
        console.log('Error en el registro:', error.message);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}






// INICIAR SESION
export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }

        const contraseñaCorrecta = await bcryptjs.compare(password, user.password);
        if (!contraseñaCorrecta) {
            return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }

        generarTokenSecretoCookie(user._id, res);

        return res.status(200).json({ success: true, user: { ...user._doc, password: "" } });

    } catch (error) {
        console.log('Error en login:', error.message);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}






// CERRAR SESIÓN
export async function logout(req, res) {
    try {
        res.clearCookie('jwt-netflixy');
        res.status(200).json({success:true, message: 'cierre de sesion con exito'})
    }catch (error) {
        console.error('Error in logout controller:', error.message);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}



// CHECK AUTH

export async function authCheck(req,res) {
    try {
        console.log('req.user:', req.user)
        res.status(200).json({success:true, user:req.user})
    } catch (error) {
      console.log('error en authCheck controller', error.message);
      res.status(500).json({success:false, message:'Error interno del servidor'})
    }
}



