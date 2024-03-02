import React, { useState, useEffect } from "react";
import axios from "axios";
import environment from "../../environment";
import Countdown from "react-countdown";
import Table from "./Table";
import CountdownInfo from "./CountdownInfo";
import { verify } from "../Utils";
import Loader from "../utils/Loader";

const Standings = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [authorized, setAuthorized] = useState();

  useEffect(() => {
    axios
      .get(`${environment[0]}/server/endpoints/coupon/total.php`)
      .then((response) => {
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

    verify().then((response) => setAuthorized(response));
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed || showTable) {
      return <Table coupons={coupons} />;
    } else {
      return (
        <>
          <CountdownInfo
            coupons={coupons}
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            />

          {authorized && !showTable && (
            <button
              className="mt-20 mx-auto flex bg-sandBeige p-2 rounded text-black font-semibold z-10"
              onClick={(e) => {
                setShowTable(true);
              }}
            >
              Vis tips
            </button>
          )}
          </>
      );
    }
  };

  return (
    <Countdown date={new Date("Jun 13, 2024 21:00:00")} renderer={renderer} />
  );
};

export default Standings;
