import React from "react";
import matchesJson from "../../assets/json/matchesTesting.json";
// import matchesJson from "../../assets/json/matchesDK.json";

const Table = ({ coupons }) => {
  return (
    <div className="container mx-auto flex flex-col my-4 overflow-x-auto">
      <div className="overflow-x-auto sm:rounded-lg">
        <table className="table-fixed overflow-x-auto min-w-full">
          <thead className="">
            {/* <tr className="bg-darkGreen">
              <th className="text-left px-2">Navn</th>
              {matchesJson.map(({ id, name, participants }) => (
                <th className="p-2">
                  {participants[0].name}-{participants[1].name}
                </th>
              ))}
            </tr> */}
            <tr className="bg-darkGreen border-2 border-black">
              <th colSpan={2}>Kampe</th>
              {coupons.map(({ coupons_id, name }) => (
                <th key={coupons_id} colSpan={1} className="border-2 border-black">{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matchesJson.map(({ id, name, participants, startDate }, i) => (
              <tr key={id}>
                <td
                colSpan={2}
                  className={`p-6 text-center border-2 border-black`}
                >
                  <div className="flex flex-col">
                    <span>{participants[0].name}-{participants[1].name}</span>
                    <span>{startDate}</span>
                  </div>
                </td>
                {coupons.map(({ coupons_id, predictions }, j) => (
                  <td
                    key={coupons_id}
                    colSpan={1}
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
            {/* {coupons.map(({ name, predictions }, i) => (
              <tr
                className={`p-6 ${
                  i % 2 === 0 ? "bg-lightGreen" : "bg-transparent"
                }`}
              >
                <td className="p-2 first-letter:capitalize">{name}</td>
                {JSON.parse(predictions).map(({ id, prediction }) => (
                  <td className="text-center">{prediction}</td>
                ))}
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
