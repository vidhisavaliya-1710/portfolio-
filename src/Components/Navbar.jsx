import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen(!navOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-[#C78665]">
          Vidhi.dev
        </Link>

        <div className="md:hidden">
          <button onClick={toggleNav}>
            {navOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <ul className="hidden md:flex space-x-6 font-medium">
          <li><Link to="/" className="hover:text-[#C78665]">Home</Link></li>
          <li><Link to="/about" className="hover:text-[#C78665]">About</Link></li>
          <li><Link to="/projects" className="hover:text-[#C78665]">Projects</Link></li>
          <li><Link to="/contact" className="hover:text-[#C78665]">Contact</Link></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {navOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-4 font-medium">
          <li><Link to="/" onClick={toggleNav}>Home</Link></li>
          <li><Link to="/about" onClick={toggleNav}>About</Link></li>
          <li><Link to="/projects" onClick={toggleNav}>Projects</Link></li>
          <li><Link to="/contact" onClick={toggleNav}>Contact</Link></li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;