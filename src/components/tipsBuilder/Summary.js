import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Summary = () => {
  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-center text-3xl">Så du med i kampen! ⚽</h1>
      <p className="text-center mt-2">...næsten</p>
      <p className="text-center mt-10 text-xl">
        Husk at overføre
      </p>

        <div className="flex justify-center">
        <p className="text-center text-xl">

        <span className="text-sandBeige text-lg mx-2">100 kr.</span>
        til
        <span className="text-sandBeige text-lg mx-2">30 32 12 12</span>
        💰
        </p>
        </div>

      <p className="text-center mt-5 text-xl">
        Du har også modtaget en mail med dine tips
        <span className="text-xl ml-2">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
      </p>
      <p className="text-center mt-5 text-xl">
        Når konkurrencen går i gang kan du se stillingen <Link to={'/'} className="text-sandBeige">her</Link>.
      </p>
    </div>
  );
};
export default Summary;
