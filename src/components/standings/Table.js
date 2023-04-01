import React, { useState } from "react";
import matchesJson from "../../assets/json/matchesTesting.json";
// import matchesJson from "../../assets/json/matchesDK.json";
import { getDateString } from "../Utils";

const Table = ({ coupons }) => {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="container mx-auto flex flex-col my-4">
      <section className="container mx-auto flex">
        <button type="button" onClick={() => setZoom(zoom - 5)}>
          -
        </button>
        <button type="button" onClick={() => setZoom(zoom + 5)}>
          +
        </button>
        <p>{zoom}</p>
      </section>
      <div className="overflow-x-auto">
        <table className="table-fixed relative " style={{ zoom: zoom + "%" }}>
          <thead className="sticky top-0 z-50">
            <tr className="bg-darkGreen border-[1px] border-black ">
              <th className="min-w-[12rem]"></th>
              {coupons.map(({ coupons_id, name }) => (
                <th
                  key={coupons_id}
                  className="border-[1px] border-black w-40 p-1 text-xs"
                >
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matchesJson.map(
              ({ id, name, participants, startDate, state }, i) => (
                <tr key={i}>
                  <td className={`p-2 text-center border-[1px] border-black`}>
                    <div className="flex flex-col">
                      <span>
                        {participants[0].name} - {participants[1].name}
                      </span>
                      <span>
                        {state !== "FINISHED"
                          ? getDateString(startDate)
                          : participants[0].finalResult +
                            " - " +
                            participants[1].finalResult}
                      </span>
                    </div>
                  </td>
                  {coupons.map(({ coupons_id, predictions }, j) => (
                    <td
                      key={coupons_id}
                      className={`p-6 text-center border-[1px] border-black `}
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
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
