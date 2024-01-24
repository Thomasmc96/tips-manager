import React from "react";
import { Link } from "react-router-dom";
import './Header.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import football from '../../assets/json/graphic/football1.svg';


const Header = () => {
  const {pathname} = useLocation();
  console.log(pathname)

  return (
    <header className="header">
      <img className="footballLogo" src={football} alt="Fodbold" />
      <nav className="container">
        <div className="space-x-6">
          <Link to={"/"} className={'headerLink ' + (pathname === '/' ? 'active ' : '')}>
            Stilling
          </Link>
          <Link to={"/tipskupon"} className={"headerLink " + pathname === '/tipskupon' ? 'active' : ''}>
            Opret kupon
          </Link>
          <Link to={"/praemie"} className={"headerLink " + pathname === '/praemie' ? 'active' : ''}>
            Præmie
          </Link>
        </div>
        <div>
          <Link to={"/tilmeldinger"} className="lockLink">
            <FontAwesomeIcon icon={faLock}/>
          </Link>
        </div>
      </nav>
      <hr />
    </header>
  );
};

export default Header;
