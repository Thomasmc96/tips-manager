import React, { useState, useEffect } from "react";
import axios from "axios";
import environment from "../../environment";
import { FidgetSpinner } from "react-loader-spinner";
import Countdown from "react-countdown";
import Table from "./Table";
import CountdownInfo from "./CountdownInfo";
import { sortByWins } from "../Utils";
import { verify } from "../Utils";

const Standings = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [authorized, setAuthorized] = useState();

  useEffect(() => {
    axios
      .get(`${environment[0]}/server/endpoints/coupon/getResults.php`)
      .then((response) => {
        console.log(response);
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

    verify().then((response) => setAuthorized(response));
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
    if (completed || showTable) {
      return <Table coupons={coupons} />;
    } else {
      return (
        <CountdownInfo
          coupons={coupons}
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      );
    }
  };

  return (
    <>
      <Countdown date={new Date("Jun 14, 2024 00:00:00")} renderer={renderer} />
      {authorized && !showTable && (
        <button
          className="mt-20 mx-auto flex bg-sandBeige p-2 rounded text-black font-semibold"
          onClick={(e) => {
            setShowTable(true);
          }}
        >
          Vis tips
        </button>
      )}
    </>
  );
};

export default Standings;
