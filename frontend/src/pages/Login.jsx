import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/authUser";

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  
  const {login} = useAuthStore();


  const handleLogin = (e) => {
    e.preventDefault();
    login({email, password})
  }




  return (
    <div className='h-screen w-full hero-bg'>
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">

        <Link to='/'>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">

        <div className="w-full max-w-md p-8 space-x-6 bg-black/60 rounded-lg shadow-md">

          <h1 className="text-center text-white text-2xl font-bold mb-4">Iniciar Sesión</h1>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="" className="text.sm font-medium text-gray-300 block">
                Email
              </label>
              <input 
              type="email"
              className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
              placeholder="Ingresa un email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
               />
            </div>

           


    

            <div>
              <label htmlFor="" className="text.sm font-medium text-gray-300 block">
                password
              </label>
              <input 
              type="password" 
              className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
              placeholder="Ingrese una contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              
              />
            </div>
            

            <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
              inicia sesión
            </button>
            

          </form>

          <div className="text-center text-gray-400 mt-4">
            no estas registrado?{'  '} 
            <Link to={'/login'} className="text-red-500 hover:underline">
               Registrate
            </Link>
            
          </div>

        </div>

      </div>

    </div>
  )
}

export default SignUp