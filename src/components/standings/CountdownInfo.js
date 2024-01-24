import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './Standings.css';

const CountdownInfo = ({ coupons, days, hours, minutes, seconds }) => {
  days = days < 100 ? ("0" + days).slice(-2) : days;
  hours = ("0" + hours).slice(-2);
  minutes = ("0" + minutes).slice(-2);
  seconds = ("0" + seconds).slice(-2);

  return (
    <div className="countdownInfo container">
      <h1>Tips konkurrencen - <span>EM 2024</span></h1>
      <p className='undertitle'>- Arrangeret af René</p>
      <section>
        <h3>
        Antal tilmeldinger:
        </h3>
        <span> <span>{coupons.length}</span>          
         <span>
            <FontAwesomeIcon icon={faUser} />
          </span></span>
      </section>
      <section>
        <h3>Vi begynder om:</h3>
        <span>
          {days}:{hours}:{minutes}:{seconds} ⏰
        </span>
      </section>
      <section>
        <h3>Når tiden løber ud, vil stillingen blive vist her 🏆</h3>
      </section>
    </div>
  );
};

export default CountdownInfo;
