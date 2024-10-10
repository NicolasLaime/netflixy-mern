import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import WatchPage from "./pages/WatchPage";
import BuscarPage from "./pages/BuscarPage";
import HistorialPage from "./pages/HistorialPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 h-10 size-10" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to={'/'} />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to="/login" />} />
        
        <Route path="/buscar" element={user ? <BuscarPage /> : <Navigate to="/login" />} />
        <Route path="/historial" element={user ? <HistorialPage /> : <Navigate to="/login" />} />
        <Route path="/*" element={<NotFoundPage/>} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
