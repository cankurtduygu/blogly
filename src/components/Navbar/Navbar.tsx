import { useEffect, useState } from "react";
import type { iNavLink } from "./Navbar.types";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navLinks: iNavLink[] = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/" },
    { name: "Contact", path: "/" },
    { name: "About", path: "/" },
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
        className={`fixed top-0 left-0 bg-slate-900 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-slate-50/80 shadow-md text-slate-900 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}
      >
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
              Blog<tspan className="fill-indigo-500">ly</tspan>
            </text>
          </svg>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.path}
              className={`group flex flex-col gap-0.5 ${isScrolled ? "text-slate-900" : "text-white"}`}
            >
              {link.name}
              <div
                className={`${isScrolled ? "bg-indigo-500" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`}
              />
            </a>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          {/* <svg
            className={`h-6 w-6 text-white transition-all duration-500 ${isScrolled ? "invert" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg> */}
          <Link
            to={"/sign-in"}
            className={`ml-4 transition-all duration-500 ${isScrolled ? "text-slate-900" : "text-white"}`}
          >
            Sign In
          </Link>
          <Link
            to={"/sign-up"}
            className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled ? "text-white bg-indigo-500 hover:bg-indigo-600" : "bg-white text-slate-900"}`}
          >
            Get Started
          </Link>
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
            <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </a>
          ))}

          <Link
            to={"/sign-in"}
            className="transition-all duration-500 text-slate-500 hover:text-indigo-500"
          >
            Sign In
          </Link>

          <Link
            to={"/sign-up"}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-2.5 rounded-full transition-all duration-500"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
