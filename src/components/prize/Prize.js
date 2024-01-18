import React, { useState, useEffect } from "react";
import axios from "axios";
import environment from "../../environment";
import { FidgetSpinner } from "react-loader-spinner";
import { getPodium } from "../Utils";
import PodiumPart from "./PodiumPart";
import Countdown from "react-countdown";
import { verify } from "../Utils";

const Prize = () => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState();
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
        verify().then((response) => setAuthorized(response));
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

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed || authorized) {
      return (
        <div className="container mx-auto mt-5 flex flex-col items-center justify-between min-h-[80vh]">
          <h1 className="text-3xl mb-5 sm:mb-0">Præmiefordeling 💰</h1>
          <div className="flex flex-col justify-around flex-wrap sm:flex-row w-full mx-auto gap-14 sm:gap-0">
            <PodiumPart placement={podium.first} number={"1st"} />
            {podium.second.names.length > 0 && (
              <PodiumPart placement={podium.second} number={"2nd"} />
            )}
            {podium.third.names.length > 0 && (
              <PodiumPart placement={podium.third} number={"3rd"} />
            )}
          </div>
          <div className="mt-20 sm:my-6 p-2 pl-6 rounded-lg shadow-md border-lightGreen border-2">
            <h4 className="text-lg font-bold mb-1">
              Hvordan udregnes præmien?
            </h4>
            <ul className="list-disc">
              <li className="text-left">
                Puljen består af{" "}
                {podium.first.totalPrize +
                  podium.second.totalPrize +
                  podium.third.totalPrize}{" "}
                kr.
              </li>
              <li className="text-left">
                Førstepladsen tager 70 %, andenpladsen tager 20 % og tredjepladsen
                tager 10 %.
              </li>
              <li className="text-left">
                Er der to personer på førstepladsen, så deler de to både første-
                og andenpræmien.
              </li>
              <li className="text-left">
                Er der tre personer på førstepladsen, så deler de hele puljen.
              </li>
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <h3 className="text-xl text-center mt-10">
          Se præmiepuljen og podium her når konkurrence går i gang 💰
        </h3>
      );
    }
  };

  return (
    <Countdown date={new Date("Jun 14, 2024 00:00:00")} renderer={renderer} />
  );
};

export default Prize;
