import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuth(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  const NavLinks = () => (
    <>
      <Link
        to="/"
        className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
      >
        Home
      </Link>
      <Link
        to="/films"
        className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
      >
        Films
      </Link>
      <Link
        to="/about"
        className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
      >
        About
      </Link>
    </>
  );

  const AuthButtons = () =>
    !isAuth ? (
      <>
        <Link
          to="/register"
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Login
        </Link>
      </>
    ) : (
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop layout */}
          <div className="hidden md:flex w-full items-center justify-between">
            <div className="w-[180px]"></div>

            <nav className="flex items-center space-x-8">
              <NavLinks />
            </nav>

            <div className="flex items-center space-x-4 w-[180px] justify-end">
              <AuthButtons />
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4 px-2">
              <NavLinks />
              <div className="pt-4 flex flex-col space-y-3">
                {!isAuth ? (
                  <>
                    <Link
                      to="/register"
                      className="px-4 py-2 text-center text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-center text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
