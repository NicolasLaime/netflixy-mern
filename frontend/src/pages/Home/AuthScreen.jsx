import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ChevronRight } from 'lucide-react'

const AuthScreen = () => {

  const [email, setEmail] = useState('')


  const navigate = useNavigate();


  const handleFormSubmit = (e) => {
        e.preventDefault();
        navigate('/signup?email=' + email)

  }

  return (
    <div className="hero-bg relative">
      {/* NAVBAR */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <img src="/netflix-logo.png" alt="logo" className="w-32 md:w-52" />
        <Link to={'/login'} className="text-white bg-red-600 py-1 px-2 rounded">
          Iniciar sesión
        </Link>
      </header>


      {/* HERO SETION */}

      <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">

        <h1 className="text-4xl md:text-6xl font-bold mb-4 ">Películas ilimitadas, programas de televisión y más.</h1>
        <p className="text-lg mb-4 ">mira en cualquier lugar. cancelar en cualquier momento</p>
        <p className="text-lg mb-4 ">¿Listo para registrate? ingresa tu correo electrónico para crear o reiniciar tu membresía</p>

        <form className="flex flex-col md:flex-row gap-4 w-1/2" onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="email"
            className="p-2 rounded flex-1 bg-black/80 border border-x-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center ">
            Empezar
            <ChevronRight className="mt-1 size-5 md:size-8 items-center" />
          </button>

        </form>

      </div>


      {/* separador */}

      <div className="h-2 w-full bg-[#232323]" aria-hidden='true' />

      {/* 1º sección */}
      <div className="py-10 bg-black text-white">

        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2 ">
          {/* i<quierda */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:5xl font-extrabold mb-4">disfruta en tu tv</h2>

            <p className="text-lg md:text-xl">
              Míralo en smatvv. plastation xbox chromecast apple tv reproductores blu ray y más
            </p>
          </div>

          {/* derecha */}

          <div className="flex-1 relative">
            <img src="/tv.png" alt="tv image" className="mt-4 z-20 relative" />
            <video className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-0"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>

        </div>


      </div>

      {/* separador */}

      <div className="h-2 w-full bg-[#232323]" aria-hidden='true' />


      {/* 2º seccion */}

      <div className="py-10 bg-black text-white">

        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
          {/* izquierda */}
          <div className="flex-1 ">
            <div className="relative">
              <img src="/stranger-things-lg.png" alt="stranger things" className="mt-4" />
              <div className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border borderslate500 rounded-md px-2">
                <img src="/stranger-things-sm.png" alt="image" className="h-full" />
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-0">
                    <span>Stranger Things</span>
                    <span className="text-sm text-blue-500">Descargando...</span>
                  </div>

                  <img src="/download-icon.gif" alt="" className="h-12" />

                </div>
              </div>
            </div>
          </div>

          {/* derecha */}

          <div className="flex-1 md:text-left text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              descarga tus programas para verlos sin conexión
            </h2>
            <p className="text-lg md:text-xl">
              guarda tus favoritos fácilmente y siempre tendrás algo que ver
            </p>
          </div>



        </div>


      </div>

      {/* separador */}

      <div className="h-2 w-full bg-[#232323]" aria-hidden='true' />


      {/* 3 seccion */}


      <div className="py-10 bg-black text-white">

        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2 ">
          {/* i<quierda */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:5xl font-extrabold mb-4">mira en todas partes </h2>

            <p className="text-lg md:text-xl">
            Transmita películas y programas de televisión ilimitados en su teléfono. tableta, computadora portátil y televisión
            </p>
          </div>

          {/* derecha */}

          <div className="flex-1 relative">
            <img src="/device-pile.png" alt="tv image" className="mt-4 z-20 relative" />
            <video className="absolute top-2 left-1/2 -translate-x-1/2  h-4/6 z-10 max-w-[63%]"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>

        </div>


      </div>



       {/* separador */}

       <div className="h-2 w-full bg-[#232323]" aria-hidden='true' />


       {/* 4 seccion */}

       <div className="py-10 bg-black text-white">
           <div className="flex max-w-6xl mx-auto items-center justify-center flex-col md:flex-row px-4 md:px-2">
                {/*izquierda*/}
                <div className="flex-1 relative">
                        <img src="/kids.png" alt="mira por tv" className="mt-4"/>
                </div>
                {/* right */}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Crea perfil para niños
                    </h2>
                    <p className="text-lg md:text-xl">
                    envía a los niños a vivir aventuras con sus personajes favoritos en un espacio creado exclusivamente para ese momento y gratis con tu membresía

                    </p>
                </div>
           </div>
       </div>




      
    </div>

    
  )
}

export default AuthScreen