import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-lightGreen p-3">
      <nav className="container mx-auto flex space-x-6 justify-between">
        <div className="space-x-6">
          <Link to={"/"} className="hover:text-sandBeige">
            Tavle
          </Link>
          <Link to={"/tipskupon"} className="hover:text-sandBeige">
            Ny kupon
          </Link>
          <Link to={"/praemie"} className="hover:text-sandBeige">
            Præmie
          </Link>
        </div>
        <div>
          <Link to={"/tilmeldinger"} className="">
            🔒
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
