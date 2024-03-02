import React, { useState, useEffect } from "react";
import axios from "axios";
import environment from "../../environment";
import { getPodium } from "../Utils";
import PodiumPart from "./PodiumPart";
import Countdown from "react-countdown";
import { verify } from "../Utils";
import "./Prize.css";
import Loader from "../utils/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

const Prize = () => {
  const [authorized, setAuthorized] = useState();

  useEffect(() => {
    verify().then((response) => setAuthorized(response));
  }, []);

  const renderer = ({ completed }) => {
    if (completed || authorized) {
      return <Podium />;
    } else {
      return (
        <h3 className="text-xl text-center mt-10 wait-text">
          Se præmiepuljen og podium her når konkurrencen går i gang{" "}
          <span className="trophyIcon">
            <FontAwesomeIcon icon={faTrophy} />
          </span>
        </h3>
      );
    }
  };

  return (
    <Countdown date={new Date("Jun 13, 2024 21:00:00")} renderer={renderer} />
  );
};

const Podium = () => {
  const [loading, setLoading] = useState(true);
  const [podium, setPodium] = useState({
    first: { names: [], totalPrize: 0, sharedPrize: 0 },
    second: { names: [], totalPrize: 0, sharedPrize: 0 },
    third: { names: [], totalPrize: 0, sharedPrize: 0 },
  });

  useEffect(() => {
    axios
      .get(`${environment[0]}/server/endpoints/coupon/getResults.php`)
      .then((response) => {
        if (response.data.code === 200) {
          setPodium(getPodium(response.data.coupons));
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
        <Loader />
      </div>
    );
  }

  return (
    <div className="prize container mx-auto flex flex-col items-center min-h-[80vh]">
      <h1>
        <span className="yellowText">Præmie</span>fordeling
      </h1>
      <div className="flex flex-col justify-around flex-wrap sm:flex-row w-full mx-auto gap-14 sm:gap-0 mt-10">
        <PodiumPart placement={podium.first} number={"1st"} />
        {podium.second.names.length > 0 && (
          <PodiumPart placement={podium.second} number={"2nd"} />
        )}
        {podium.third.names.length > 0 && (
          <PodiumPart placement={podium.third} number={"3rd"} />
        )}
      </div>
      <PrizeRules podium={podium} />
    </div>
  );
};

const PrizeRules = ({ podium }) => {
  return (
    <div className="rules">
      <h4>
        Hvordan udregnes <span className="yellowText">præmien</span>?
      </h4>
      <ul>
        <li>
          Puljen består af{" "}
          {podium.first.totalPrize +
            podium.second.totalPrize +
            podium.third.totalPrize}{" "}
          kr.
        </li>
        <li>
          Førstepladsen tager 70 %, andenpladsen tager 20 % og tredjepladsen
          tager 10 %.
        </li>
        <li>
          Er der to personer på førstepladsen, så deler de to både første- og
          andenpræmien.
        </li>
        <li>Er der tre personer på førstepladsen, så deler de hele puljen.</li>
      </ul>
    </div>
  );
};

export default Prize;
