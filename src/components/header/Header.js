import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-lightGreen p-3">
      <nav className="container mx-auto flex space-x-6">
        <Link to={"/"} className="hover:text-sandBeige">
          Resultater
        </Link>
        <Link to={"/tipskupon"} className="hover:text-sandBeige">
          Ny kupon
        </Link>
      </nav>
    </header>
  );
};

export default Header;
