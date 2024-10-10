import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { SMALL_IMG_BASE_URL } from '../constats/constants';
import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';

// Formato de fecha para el historial
function formatDate(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}

const HistorialPage = () => {
  const [buscarHistorial, setBuscarHistorial] = useState([]);

  useEffect(() => {
    const getBuscarHistorial = async () => {
      try {
        const res = await axios.get(`/api/v1/buscar/historial`);
        setBuscarHistorial(res.data.content || []); // Asegurar que sea un array
      } catch (error) {
        console.log(error.message);
        setBuscarHistorial([]); // Manejar error devolviendo un array vacío
      }
    };

    getBuscarHistorial();
  }, []);


  const handleBorrar = async (entry) => {
    try {
      await axios.delete(`/api/v1/buscar/historial/${entry.id}`);
      setBuscarHistorial(buscarHistorial.filter((item) => item.id !== entry.id));
      toast.success('Búsqueda eliminada del historial');
    } catch (error) {
      console.log(error)
      toast.error('Fallo al borrar búsqueda del historial');
    }
  };



  // Manejo si el historial está vacío
  if (buscarHistorial.length === 0) {
    return (
      <div className='bg-black min-h-screen text-white'>
        <Navbar />
        <div className='max-w-6xl mx-auto px-4 py-8'>
          <h1 className='text-3xl font-bold mb-8'>Buscar Historial</h1>
          <div className='flex justify-center items-center h-96'>
            <p className='text-xl'>Historial no encontrado</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-black text-white min-h-screen'>
      <Navbar />

      <div className='max-w-6xl mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8'>Historial de Búsqueda</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {buscarHistorial.map((entry, index) => {
            // Verificación de datos de entrada
            if (!entry || !entry.searchType) return null;

            // Definir el color basado en el tipo de búsqueda
            let bgColor;
            if (entry.searchType === 'movie') {
              bgColor = 'bg-red-600'; // Rojo para películas
            } else if (entry.searchType === 'tv') {
              bgColor = 'bg-blue-600'; // Azul para shows de TV
            } else if (entry.searchType === 'person') {
              bgColor = 'bg-green-600'; // Verde para personas
            } else {
              bgColor = 'bg-gray-600'; // Color por defecto si no coincide
            }

            return (
              <div
                key={`${entry.id ? entry.id : 'entry'}-${index}`} // Genera claves únicas
                className='bg-gray-800 rounded flex items-start'
              >
                <img
                  src={entry.image ? SMALL_IMG_BASE_URL + entry.image : 'default-image.jpg'}
                  alt={entry.title || 'Sin título'}
                  className='size-16 rounded-full object-cover mr-4'
                />
                <div className='flex flex-col'>
                  <span className='text-white text-lg'>{entry.title || 'Sin título'}</span>
                  <span className='text-white text-sm'>{formatDate(entry.createdAt || new Date())}</span>
                </div>

                <span className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${bgColor}`}>
                  {entry.searchType}
                </span>
                <Trash className='size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600' onClick={() => handleBorrar(entry)}/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HistorialPage;
