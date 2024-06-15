import React from "react";
import { Link } from "react-router-dom";
import Image from "../assets/help_pet_logo.png";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img src={Image} alt="Logo" className="h-10 w-10 object-cover mr-2" />
        </div>
        <div className="flex space-x-6">
          <Link to="/">
            <a
              href="/"
              className="text-gray-700 hover:text-blue-500 transition-colors duration-300"
            >
              Home
            </a>
          </Link>
          <Link to="/adoption">
            <a
              href="/adoption-centers"
              className="text-gray-700 hover:text-blue-500 transition-colors duration-300"
            >
              Adoption Centers
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
