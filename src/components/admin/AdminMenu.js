import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {

  const LinkButton = ({ to, children }) => (
    <Link
      to={to}
      className="rounded-lg shadow-md border bg-lightGreen border-lightGreen border-2 inline-flex flex-col my-2 mr-2 p-2"
    >
      {children}
    </Link>
  );

  return (
    <div >
      <LinkButton to="/tilmeldinger">Tilmeldinger</LinkButton>
      <LinkButton to="/kampe">Kampe</LinkButton>
    </div>
  )

}

export default AdminMenu;