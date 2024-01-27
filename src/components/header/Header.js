import React from "react";
import { Link } from "react-router-dom";
import './Header.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import football from '../../assets/graphic/football1.svg';


const Header = () => {
  const {pathname} = useLocation();

  return (
    <header className="header">
      <nav className="">
        <div className=" headerLinks">
          <Link to={"/"}>
            <img className="footballLogo" src={football} alt="Fodbold" />
          </Link>
          <Link to={"/"} className={'headerLink ' + (pathname === '/' ? 'active ' : '')}>
            Stillingen
          </Link>
          <Link to={"/tipskupon"} className={'headerLink ' + (pathname === '/tipskupon' ? 'active' : '')}>
            Opret kupon
          </Link>
          <Link to={"/praemie"} className={"headerLink " + (pathname === '/praemie' ? 'active' : '')}>
            Præmien
          </Link>
        </div>
          <Link to={"/tilmeldinger"} className="lockLink">
            <FontAwesomeIcon icon={faLock}/>
          </Link>
      </nav>
      <hr />
    </header>
  );
};

export default Header;
