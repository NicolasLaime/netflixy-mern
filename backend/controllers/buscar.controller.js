import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

// BUSCAR PERSONA
export async function buscarPersona(req, res) {
    const { query } = req.params;
    try {
        // Llamado a la API de TMDB
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

        // Verifica qué está recibiendo desde la API

        // Si no se encuentran resultados, devolver 404
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }

        // Actualizar el historial de búsqueda del usuario
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: 'person',
                    createdAt: new Date()
                }
            }
        });

        // Responder con los resultados
        res.status(200).json({ success: true, content: response.results });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error de servidor interno' });
    }

}


export async function buscarPelicula(req, res) {
    const { query } = req.params;

    try {
        // Llamada a la API de TMDB
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

        

        // Si no se encuentran resultados, devolver 404
        if (response.results.length === 0) {
            return res.status(404).json({ success: false, message: 'Película no encontrada' });
        }

        // Actualizar el historial de búsqueda del usuario
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,  // Corregido a poster_path para películas
                    title: response.results[0].title,  // Corregido a title para películas
                    searchType: 'movie',
                    createdAt: new Date()
                }
            }
        });

        // Responder con los resultados
        res.status(200).json({ success: true, content: response.results });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error de servidor interno' });
    }
}




export async function buscarTv(req, res) {
    const { query } = req.params;

    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)

        // Si no se encuentran resultados, devolver 404
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].name,
                    searchType: 'tv',
                    createdAt: new Date()


                }
            }

        })
        // Responder con los resultados
        res.status(200).json({ success: true, content: response.results });


    } catch (error) {
        console.log('Error en buscarTv Controller', error.message);
        res.status(500).json({ success: false, message: 'Error de servidor interno' })
    }

}



export async function getHistorialdeBusqueda(req, res) {
    try {
        res.status(200).json({ success: true, content: req.user.searchHistory })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error de servidor interno' })

    }
}


export async function getBorrarHistorialdeBusqueda(req, res) {
    let { id } = req.params

    id = parseInt(id)

    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull:{
                searchHistory: {id:id}
            }
        })

        res.status(200).json({ success: true, message:'Item removido del historial' })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error de servidor interno' })

    }
}


