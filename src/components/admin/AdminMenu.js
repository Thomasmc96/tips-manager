import React from "react";
import { Link } from "react-router-dom";
import './Admin.css';
import { useLocation } from "react-router-dom";

const AdminMenu = () => {
  const {pathname} = useLocation();

  const LinkButton = ({ to, children }) => (
    <Link
      to={to}
      className={'adminLink ' + (pathname === to ? 'active ' : '')}
    >
      {children}
    </Link>
  );

  return (
    <div className="adminMenu">
      <h2>
        Hej <span className="yellowText">{localStorage.getItem("name")}</span>, dette er dit dashboard!
      </h2>
      <hr />
    <div className="adminLinks">
      <LinkButton to="/tilmeldinger">Tilmeldinger</LinkButton>
      <LinkButton to="/kampe">Kampe</LinkButton>
      <LinkButton to="/email">Send email</LinkButton>
    </div>
    <hr />
    </div>
  )

}

export default AdminMenu;