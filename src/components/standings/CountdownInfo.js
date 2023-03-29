import React from "react";

const CountdownInfo = ({ coupons, days, hours, minutes, seconds }) => {
  days = days < 100 ? ("0" + days).slice(-2) : days;
  hours = ("0" + hours).slice(-2);
  minutes = ("0" + minutes).slice(-2);
  seconds = ("0" + seconds).slice(-2);

  return (
    <div className="container mx-auto flex flex-col mt-4">
      <h1 className="text-center text-3xl">EM tips konkurrence ⚽</h1>
      <p className="text-center mt-2">- Arrangeret af René</p>
      <h3 className="flex mx-auto text-3xl mt-20">
        📜 Tilmeldinger: {coupons.length}
      </h3>
      <section className="flex justify-center text-3xl mt-5">
        <span>
          {days}:{hours}:{minutes}:{seconds}
        </span>
        <span className="ml-1">⏰</span>
      </section>
    </div>
  );
};

export default CountdownInfo;
