import React, { useState, useEffect } from "react";
import axios from "axios";
import environment from "../../environment";
import { FidgetSpinner } from "react-loader-spinner";
import Countdown from "react-countdown";
// import matchesJson from "../../assets/json/matchesDK.json";
import matchesJson from "../../assets/json/matchesTesting.json";

const Standings = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [begin, setBegin] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${environment[0]}/server/endpoints/all.php`)
      .then((response) => {
        console.log(response);
        if (response.data.code === 200) {
          setCoupons(response.data.coupons);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex mx-auto justify-center h-40 items-center">
        <FidgetSpinner
          visible={true}
          height="100"
          width="100"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
          ballColors={["#003e21", "#067242", "#098b54"]}
          backgroundColor="#f8d098"
        />
      </div>
    );
  }

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    days = days < 100 ? ("0" + days).slice(-2) : days;
    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);
    seconds = ("0" + seconds).slice(-2);

    if (!completed) {
      return (
        <div className="container mx-auto flex flex-col mt-4">
          <div className="overflow-x-auto sm:rounded-lg">
            <table className="table-auto overflow-x-auto w-full">
              <thead>
                <tr className="bg-darkGreen">
                  <th className="text-left px-2">Navn</th>
                  {/* {coupons.map(({ name }) => (
                  <th>{name}</th>
                ))} */}
                  {matchesJson.map(({ id, name }) => (
                    <th>{name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* {matchesJson.map(({id, name}) => (
                <tr></tr>
              ))} */}
                {coupons.map(({ name, predictions }, i) => (
                  <tr
                    className={`p-6 ${
                      i % 2 === 0 ? "bg-lightGreen" : "bg-transparent"
                    }`}
                  >
                    <td className="p-2">{name}</td>
                    {JSON.parse(predictions).map(({ id, prediction }) => (
                      <td className="text-center">{prediction}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
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
    }
  };

  return (
    <Countdown date={new Date("Jun 14, 2024 00:00:00")} renderer={renderer} />
  );
};

export default Standings;
