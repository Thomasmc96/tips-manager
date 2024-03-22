import React, { useState, useEffect } from "react";
import axios from "axios";
import environment from "../../environment";
import { countryName, getDateString, sortByKickOff } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Loader from "../utils/Loader";
import {
  sortByWins,
  sortByLeastWins,
  sortByNameAsc,
  sortByNameDesc,
} from "../Utils";

const Table = () => {
  const [zoom, setZoom] = useState(100);
  const [matches2, setMatches2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchesLoading, setMatchesLoading] = useState(true);
  const [error, setError] = useState(false);
  const [coupons, setCoupons] = useState([]);

  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

  useEffect(() => {
    axios
      .get(`${environment[0]}/server/endpoints/coupon/getResults.php`)
      .then((response) => {
        if (response.data.code === 200) {
          setCoupons(sortByWins(response.data.coupons));
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

    axios
      .get(`${environment[0]}/server/endpoints/matches2/getAll.php`)
      .then((response) => {
        if (response.data.code === 200) {
          setMatches2(sortByKickOff(response.data.matches2));
        } else {
          setError("Noget gik galt! Prøv at reload siden.");
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Noget gik galt! Prøv at reload siden.");
      })
      .finally(() => {
        setTimeout(() => {
          setMatchesLoading(false);
        }, 1000);
      });
  }, []);

  const isFinished = (match) => {
    if (match.home_team_goals !== null && match.away_team_goals !== null) {
      return true;
    }
    return false;
  };

  const filterCoupons = (e) => {
    let couponsCopy = coupons;
    const filterText = e.target.value.toUpperCase();

    for (let i = 0; i < couponsCopy.length; i++) {
      let coupon = couponsCopy[i];
      if (coupon.name.toUpperCase().includes(filterText)) {
        coupon.isHidden = false;
      } else {
        coupon.isHidden = true;
      }
    }

    setCoupons(couponsCopy);
  };

  const sortCoupons = (e) => {
    let sorting = e.target.value;

    switch (sorting) {
      case "mostWins":
        setCoupons(sortByWins(coupons));
        break;
      case "leastWins":
        setCoupons(sortByLeastWins(coupons));
        break;
      case "nameAsc":
        setCoupons(sortByNameAsc(coupons));
        break;
      case "nameDesc":
        setCoupons(sortByNameDesc(coupons));
        break;
      default:
        setCoupons(sortByWins(coupons));
        break;
    }
  };

  if (loading || matchesLoading) {
    return (
      <div className="flex mx-auto justify-center h-40 items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex mx-auto justify-center h-40 items-center">
        <p className="normal-case">{error}</p>
      </div>
    );
  }

  return (
    <div className="tableContainer container mx-auto flex flex-col my-4">
      <section className="container mx-auto flex">
        {!isFirefox && (
          <>
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
          </>
        )}
        <div className=" block sm:inline sm:ml-2 mt-1 sm:mt-0">
          <input
            type="text"
            placeholder="Søg efter navn"
            className="rounded-sm pl-1 text-black  w-48"
            id="filterInput"
            // onKeyUp={filterCoupons}
            onChange={filterCoupons}
            autoComplete="off"
          />
          <select
            onChange={sortCoupons}
            className="ml-2 p-[0.1rem] text-black rounded-sm bg-white"
          >
            <option value="mostWins">Sortér efter</option>
            <option value="mostWins">Flest rigtige</option>
            <option value="leastWins">Mindst rigtige</option>
            <option value="nameAsc">Navn A-Z</option>
            <option value="nameDesc">Navn Z-A</option>
          </select>
        </div>
      </section>

      <div className="mt-1 overflow-x-auto">
        <table
          className="table-fixed relative border-[2px] border-solid border-white rounded-lg "
          style={{ zoom: zoom + "%" }}
          id="tipsTable"
        >
          <thead className="sticky top-0 z-50">
            <tr className="bg-darkestGreenNew border-[1px] border-white ">
              <th className="min-w-[12rem]"></th>
              {coupons.map(({ coupons_id, name, amountCorrect, isHidden }) => {
                if (isHidden) {
                  return "";
                }
                return (
                  <th
                    key={coupons_id}
                    className="border-[1px] border-white w-40 px-1 text-xs"
                  >
                    <div className="flex flex-col h-auto w-full justify-between py-1 px-2">
                      <span className="couponName">{name}</span>
                      <span className="mt-1">
                        {amountCorrect}
                        <FontAwesomeIcon
                          className="ml-1"
                          icon={faCheck}
                        ></FontAwesomeIcon>
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {matches2.map((match, i) => (
              <tr key={i}>
                <td className={`p-2 text-center border-[1px] border-white`}>
                  <div className="flex flex-col">
                    <span className="countryNames">
                      {countryName(match.home_team)} -{" "}
                      {countryName(match.away_team)}
                    </span>
                    <span className="yellowText matchInfo">
                      {!isFinished(match)
                        ? getDateString(match.kickoff_dtm)
                        : match.home_team_goals + " - " + match.away_team_goals}
                    </span>
                  </div>
                </td>
                {coupons.map(({ coupons_id, predictions, isHidden }, j) =>
                  predictions.map((prediction, j) => {
                    if (prediction.id === match.matches2_id && !isHidden) {
                      return (
                        <td
                          key={coupons_id}
                          className={
                            `p-2 text-center border-[1px] border-white ` +
                            (prediction.won && isFinished(match)
                              ? "bg-lightGreenNew"
                              : !prediction.won && isFinished(match)
                              ? "bg-red"
                              : "")
                          }
                        >
                          <span className="prediction" key={prediction.id}>
                            {prediction.prediction}
                          </span>
                        </td>
                      );
                    }
                    return "";
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
