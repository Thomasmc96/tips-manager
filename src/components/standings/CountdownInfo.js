import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from "@fortawesome/free-solid-svg-icons";

const CountdownInfo = ({ coupons, days, hours, minutes, seconds }) => {
  days = days < 100 ? ("0" + days).slice(-2) : days;
  hours = ("0" + hours).slice(-2);
  minutes = ("0" + minutes).slice(-2);
  seconds = ("0" + seconds).slice(-2);

  return (
    <div className="countdownInfo container mx-auto px-2 flex flex-col mt-4">
      <h1 className="text-center text-3xl">EM 2024 tips konkurrence ⚽</h1>
      <p className="text-center mt-2">- Arrangeret af René</p>
      <section className="flex justify-center align-center flex-col text-3xl mt-20">
        <h3 className="text-center">
        Antal tilmeldinger:
        </h3>
        <span className="text-center"> <span>{coupons.length}</span>          
         <span className="text-xl2 ml-1 hover:cursor-pointer p-1">
            <FontAwesomeIcon icon={faUser} />
          </span></span>
      </section>
      <section className="flex justify-center align-center flex-col text-3xl mt-20">
        <h3 className="text-center">Vi begynder om:</h3>
        <span className="text-center">
          {days}:{hours}:{minutes}:{seconds} ⏰
        </span>
      </section>
      <section className="flex justify-center align-center flex-col text-3xl mt-20">
        <h3 className="text-center">Når tiden løber ud, vil stillingen blive vist her 🏆</h3>
      </section>
    </div>
  );
};

export default CountdownInfo;
