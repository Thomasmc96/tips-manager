import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock } from '@fortawesome/free-solid-svg-icons';
import './Standings.css';
import jubler from '../../assets/json/graphic/jubler.svg';
import jublerMobile from '../../assets/json/graphic/jubler_mobile.svg'

const CountdownInfo = ({ coupons, days, hours, minutes, seconds }) => {
  days = days < 100 ? ('0' + days).slice(-2) : days;
  hours = ('0' + hours).slice(-2);
  minutes = ('0' + minutes).slice(-2);
  seconds = ('0' + seconds).slice(-2);

  return (
    <div>
      <div className="countdownInfo container">
        <h1>
          Tips konkurrencen - <span className="yellowText">EM 2024</span>
        </h1>
        <p className="undertitle">Arrangeret af René</p>
        <div className="sectionsContainer">
          <section>
            <h3>
              Antal tilmeldinger{' '}
              <span className="detailsIcon">
                <FontAwesomeIcon icon={faUser} />
              </span>
            </h3>
            <span className="yellowText infoDetails">
              <span>{coupons.length}</span>
            </span>
          </section>
          <section>
            <h3>
              Vi begynder om{' '}
              <span className="detailsIcon">
                <FontAwesomeIcon icon={faClock} />
              </span>
            </h3>
            <span className="yellowText infoDetails">
              {days}:{hours}:{minutes}:{seconds}
            </span>
          </section>
        </div>
        <section>
          <h3 className="lastH3">
            Når tiden løber ud, vil stillingen af konkurrencen blive vist her!
          </h3>
        </section>
      </div>
      <img className="footerImg" src={jubler} alt="Fodboldspiller der jubler" />
      <img className="footerImgMobile" src={jublerMobile} alt="Fodboldspiller der jubler" />
    </div>
  );
};

export default CountdownInfo;
