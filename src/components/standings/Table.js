import React from "react";
import matchesJson from "../../assets/json/matchesTesting.json";
// import matchesJson from "../../assets/json/matchesDK.json";
import { getDateString } from "../Utils";

const Table = ({ coupons }) => {
  return (
    <div className="mx-auto flex flex-col my-4 overflow-x-auto">
      <div className="sm:rounded-lg overflow-x">
        <table className="table-auto overflow-x-auto ">
          <thead className="">
            <tr className="bg-darkGreen border-2 border-black">
              <th className="w-50"></th>
              {coupons.map(({ coupons_id, name }) => (
                <th key={coupons_id} className="border-2 border-black w-40">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matchesJson.map(({ id, name, participants, startDate }, i) => (
              <tr key={id}>
                <td className={`p-6 text-center border-2 border-black`}>
                  <div className="flex flex-col">
                    <span>
                      {participants[0].name} - {participants[1].name}
                    </span>
                    <span>{getDateString(startDate)}</span>
                  </div>
                </td>
                {coupons.map(({ coupons_id, predictions }, j) => (
                  <td
                    key={coupons_id}
                    className={`p-6 text-center border-2 border-black `}
                  >
                    {JSON.parse(predictions).map((prediction, j) => {
                      if (prediction.id === id) {
                        return (
                          <span key={prediction.id}>
                            {prediction.prediction}
                          </span>
                        );
                      }
                    })}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
