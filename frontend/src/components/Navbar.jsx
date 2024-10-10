import { LogOut, Menu, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, logout } = useAuthStore();
  const { contentType, setContentType } = useContentStore();

  const botonMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="max-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50">
        {/* logo de netflixy */}
        <Link to={"/"}>
          <img
            src="/netflix-logo.png"
            alt="netflix logo"
            className="w-32 sm:w-40"
          />
        </Link>

        {/* desktop navbar */}
        <div className="hidden sm:flex gap-2 items-center">
          <Link
            to="/"
            className="hover:underline"
            onClick={() => setContentType("movie")}
          >
            Peliculas
          </Link>

          <Link
            to="/"
            className="hover:underline"
            onClick={() => setContentType("tv")}
          >
            tv y series
          </Link>

          <Link to="/historial" className="hover:underline">
            Historial
          </Link>
        </div>
      </div>

      <div className="flex gap-2 items-center z-50">
        <Link to={"/buscar"}>
          <Search className="size-6 cursor-pointer" />
        </Link>

        <img
          src={user?.image || "/default-avatar.png"}
          alt="avatar"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />

        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={botonMobileMenu} />
        </div>
      </div>

      {/* mobile navbar */}
      {mobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800 ">
          <Link
            to={"/"}
            className="block hover:underline p-2 text-white"
            onClick={() => setContentType("movie")}
          >
            Peliculas
          </Link>

          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={() => setContentType("tv")}
          >
            tv y series
          </Link>

          <Link
            to={"/historial"}
            className="block hover:underline p-2"
            onClick={botonMobileMenu}
          >
            historial
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
