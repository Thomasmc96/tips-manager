import React, { useState, useEffect } from "react";
import axios from "axios";
import environment from "../../environment";
import { FidgetSpinner } from "react-loader-spinner";
import { sortByWins, getPodium } from "../Utils";
import PodiumPart from "./PodiumPart";

const Prize = () => {
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [podium, setPodium] = useState({
    first: { names: [], totalPrize: 0, sharedPrize: 0 },
    second: { names: [], totalPrize: 0, sharedPrize: 0 },
    third: { names: [], totalPrize: 0, sharedPrize: 0 },
  });

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${environment[0]}/server/endpoints/coupon/getResults.php`)
      .then((response) => {
        console.log(response);
        if (response.data.code === 200) {
          setCoupons(sortByWins(response.data.coupons));
          console.log(getPodium(response.data.coupons));
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

  return (
    <div className="container mx-auto mt-20 flex flex-col items-center justify-between min-h-[80vh]">
      {/* <h1 className="text-3xl mb-9">Præmie</h1> */}
      <div className="flex flex-col justify-around flex-wrap sm:flex-row w-full mx-auto">
        <PodiumPart placement={podium.first} number={"1st"}/>
        {podium.second.names.length > 0 && (
          <PodiumPart placement={podium.second} number={"2nd"}/>
          // <section className="flex flex-col justify-center items-center gap-4 my-2">
          //   <p className="font-bold">2nd: ({podium.second.totalPrize} kr.)</p>
          //   <p>
          //     {podium.second.names.map((second, i) => {
          //       return podium.second.names.length === i + 1 ? (
          //         <span key={i}>{second}</span>
          //       ) : (
          //         <span key={i}>{second}, </span>
          //       );
          //     })}
          //   </p>
          // </section>
        )}
        {podium.third.names.length > 0 && (
          <section className="flex flex-col justify-center items-center gap-4 my-2">
            <p className="font-bold">3rd: ({podium.third.totalPrize} kr.)</p>
            <p>
              {podium.third.names.map((third, i) => {
                return podium.third.names.length === i + 1 ? (
                  <span key={i}>{third}</span>
                ) : (
                  <span key={i}>{third}, </span>
                );
              })}
            </p>
          </section>
        )}
      </div>
      <div className="my-6">
        <p className="text-center">
          Puljen består af {podium.first.totalPrize + podium.second.totalPrize + podium.third.totalPrize} kr.
        </p>
        <p className="text-center">
          Førstepladsen tager 70 %, andenpladsen tager 20 % og tredjepladsen
          tager 10 %.
        </p>
        <p className="text-center">
          Er der to personer på førstepladsen, så deler de to både første- og
          andenpræmien.
        </p>
        <p className="text-center">
          Er der tre personer på førstepladsen, så deler de hele puljen.
        </p>
      </div>
    </div>
  );
};

export default Prize;
