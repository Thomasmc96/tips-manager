import React, { useState, useEffect } from "react";
import axios from "axios";
import environment from "../../environment";
import { FidgetSpinner } from "react-loader-spinner";
import { countryName, getDateString, sortByKickOff } from "../Utils";
import { sortByDate } from "../Utils";

const Table = ({ coupons }) => {
  const [zoom, setZoom] = useState(100);
  const [matches, setMatches] = useState([]);
  const [matches2, setMatches2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

  useEffect(() => {
    axios
      .get(`${environment[0]}/server/endpoints/matches2/getAll.php`)
      // .get(
      //   `${environment[0]}/server/endpoints/matches/getLimitedMatches.php?limit=7`
      // )
      .then((response) => {
        if (response.data.code === 200) {
          console.log(response);
          setMatches2(sortByKickOff(response.data.matches2));
        } else {
          setError("Noget gik galt");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          console.log(matches2)
        }, 1000);
      });
  }, []);

  const isFinished = (match) => {
    if (match.home_team_goals !== null && match.away_team_goals !== null) {
      return true
    }
    return false;
  }

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

  return (
    <div className="container mx-auto flex flex-col my-4">
      {!isFirefox && (
        <section className="container mx-auto flex">
          <button
            type="button"
            className="bg-darkGreen w-10 rounded-sm mb-1 mr-1 text-lg"
            onClick={() => setZoom(zoom - 5)}
          >
            -
          </button>
          <button
            type="button"
            className="bg-darkGreen w-10 rounded-sm mb-1 mr-1 text-lg"
            onClick={() => setZoom(zoom + 5)}
          >
            +
          </button>
        </section>
      )}

      <div className="overflow-x-auto">
        <table className="table-fixed relative " style={{ zoom: zoom + "%" }}>
          <thead className="sticky top-0 z-50">
            <tr className="bg-darkGreen border-[1px] border-black ">
              <th className="min-w-[12rem]"></th>
              {coupons.map(({ coupons_id, name, amountCorrect }) => (
                <th
                  key={coupons_id}
                  className="border-[1px] border-black w-40 px-1 text-xs"
                >
                  <div className="flex flex-col h-auto w-full justify-between">
                    <span>{name}</span>
                    <span className="mt-1">{amountCorrect} ✔</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* {matches.map(({ id, participants, startDate, state }, i) => ( */}
            {matches2.map((match, i) => (
              <tr key={i}>
                <td className={`p-2 text-center border-[1px] border-black`}>
                  <div className="flex flex-col">
                    <span>
                      {countryName(match.home_team)} - {countryName(match.away_team)}
                    </span>
                    <span>
                      {!isFinished(match)
                        ? getDateString(match.kickoff_dtm)
                        : match.home_team_goals +
                        " - " +
                        match.away_team_goals}
                    </span>
                  </div>
                </td>
                {coupons.map(({ coupons_id, predictions }, j) =>
                  predictions.map((prediction, j) => {
                    if (prediction.id === match.matches2_id) {
                      return (
                        <td
                          key={coupons_id}
                          className={
                            `p-6 text-center border-[1px] border-black ` +
                            (prediction.won && isFinished(match)
                              ? "bg-lightGreen"
                              : !prediction.won && isFinished(match)
                                ? "bg-red-500"
                                : "")
                          }
                        >
                          <span key={prediction.id}>
                            {prediction.prediction}
                          </span>
                        </td>
                      );
                    }
                  })
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
