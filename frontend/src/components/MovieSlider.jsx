import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL, CATEGORY_TRANSLATIONS } from "../constats/constants"; 
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ categoria }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false); // Cambiado a setShowArrows para consistencia
  const sliderRef = useRef();

  // Obtener el nombre de la categoría traducido
  const formatedCategoriaName = CATEGORY_TRANSLATIONS[categoria] || categoria; // Usa la traducción o el nombre original
  const formatoContentType = contentType === "movie" ? "Películas" : "Programas de TV";

  const getContent = async () => {
    try {
      const res = await axios.get(`/api/v1/${contentType}/${categoria}`);
      setContent(res.data.content);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  useEffect(() => {
    getContent();
  }, [contentType, categoria]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black text-white relative px-5 md:px-20" 
         onMouseEnter={() => setShowArrows(true)} 
         onMouseLeave={() => setShowArrows(false)}>
      <h1 className="mb-4 text-2xl font-bold">
        {formatedCategoriaName} {formatoContentType}
      </h1>
      
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
        {content.length > 0 ? ( 
          content.map((item) => (
            <Link
              key={item.id}
              to={`/watch/${item.id}`}
              className="min-w-[250px] relative group"
            >
              <div className="rounded-lg overflow-hidden">
                <img
                  src={SMALL_IMG_BASE_URL + item.backdrop_path}
                  alt={item.title || "Movie/Show Poster"} 
                  className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                />
              </div>
              <p className="mt-2 text-center">
                 {item.title || item.name}
              </p>
            </Link>
          ))
        ) : (
          <p>Contenido no disponible</p>
        )}
      </div>

      {showArrows && (
        <>
          <button 
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center w-12 h-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10" 
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>

          <button 
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center w-12 h-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10" 
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default MovieSlider;
