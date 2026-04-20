import { useEffect, useState } from "react";
import type { iNavLink } from "./Navbar.types";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/authSlice";
import useAuthCall from "../../hooks/useAuthCall";
import { toast } from "react-toastify";

const Navbar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { signOut } = useAuthCall();
  const navigate = useNavigate();
  const navLinks: iNavLink[] = [
    { name: "Home", path: "/" },
    { name: "Write", path: "/write" },
    { name: "About", path: "/about" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full transition-all duration-500 z-50 ${isScrolled ? "bg-slate-50/80 shadow-md text-slate-900 backdrop-blur-lg py-3 md:py-4" : "bg-slate-900 py-4 md:py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <svg
              width="120"
              height="36"
              viewBox="0 0 120 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <text
                x="0"
                y="28"
                className={`text-[28px] font-bold ${isScrolled ? "fill-slate-900" : "fill-white"}`}
              >
                Blog<tspan className="fill-slate-500">ly</tspan>
              </text>
            </svg>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                onClick={(e) => {
                  if (link.name === "Write" && !currentUser) {
                    e.preventDefault();
                    toast.info("Please sign in to write a blog");
                  }
                }}
                className={`group flex flex-col gap-0.5 ${isScrolled ? "text-slate-900" : "text-white"}`}
              >
                {link.name}
                <div
                  className={`${isScrolled ? "bg-slate-900" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`}
                />
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <>
                <button
                  onClick={async () => {
                    await signOut();
                    navigate("/");
                  }}
                  className={`ml-4 transition-all duration-500 cursor-pointer ${isScrolled ? "text-slate-900" : "text-white"}`}
                >
                  Sign Out
                </button>
                <Link
                  to="/profile"
                  className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled ? "text-white bg-slate-900 hover:bg-slate-800" : "bg-white text-slate-900"}`}
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className={`ml-4 transition-all duration-500 ${isScrolled ? "text-slate-900" : "text-white"}`}
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled ? "text-white bg-slate-900 hover:bg-slate-800" : "bg-white text-slate-900"}`}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <svg
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`h-6 w-6 cursor-pointer text-white ${isScrolled ? "text-slate-900" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 left-0 w-full h-screen bg-slate-50 text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-slate-900 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                onClick={(e) => {
                  if (link.name === "Write" && !currentUser) {
                    e.preventDefault();
                    toast.info("Please sign in to write a blog");
                  }
                  setIsMenuOpen(false);
                }}
              >
                {link.name}
              </Link>
            ))}

            {currentUser ? (
              <>
                <button
                  onClick={async () => {
                    await signOut();
                    setIsMenuOpen(false);
                    navigate("/");
                  }}
                  className="transition-all duration-500 text-slate-500 hover:text-slate-900"
                >
                  Sign Out
                </button>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-2.5 rounded-full transition-all duration-500"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="transition-all duration-500 text-slate-500 hover:text-slate-900"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-2.5 rounded-full transition-all duration-500"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
