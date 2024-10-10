import {fetchFromTMDB} from '../services/tmdb.service.js'





export async function getTrendingMovie(req, res){
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=es-ES');
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

        res.json({ success: true, content: randomMovie });
    } catch (error) {
        console.error(error);  // Añadir un log para ver detalles del error
        res.status(500).json({ success: false, message: error.message || 'Internal error' });
    }
}


export async function getMovieTrailers(req, res) {
    const { id } = req.params;
  
    try {
      const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=es-ES`);
      
  
      res.json({ success: true, trailers: data.results });
    } catch (error) {
      if (error.message.includes('404')) {
        return res.status(404).send(null);
      }
  
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export async function getMovieDetalles(req,res) {
    const {id} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`);
        res.status(200).json({success:true, content: data});
    } catch (error) {
        
       if(error.message.includes('404')){
        return res.status(404).send(null)
       }

       res.status(500).json({success:false, message:'Internal server error'})

    }
}



export async function getMovieSimilares(req, res) {
    const {id} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=es-ES&page=1`)
        res.status(200).json({success:true, similar: data.results});

    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error'})
    }

}


export async function getMovieCategoria(req, res) {
   const {categoria} = req.params
   try {
      const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${categoria}?language=en-US&page=1`)
      res.status(200).json({success:true, content: data.results});

   } catch (error) {
    res.status(500).json({success:false, message: 'Internal server error'})

   }

}


