import React from "react";
import matchesJson from "../../assets/json/matchesTesting.json";
// import matchesJson from "../../assets/json/matchesDK.json";

const Table = ({ coupons }) => {
  return (
    <div className="container mx-auto flex flex-col mt-4">
      <div className="overflow-x-auto sm:rounded-lg">
        <table className="table-auto overflow-x-auto w-full">
          <thead>
            {/* <tr className="bg-darkGreen">
              <th className="text-left px-2">Navn</th>
              {matchesJson.map(({ id, name, participants }) => (
                <th className="p-2">
                  {participants[0].name}-{participants[1].name}
                </th>
              ))}
            </tr> */}
            <tr className="bg-darkGreen">
              <th>Kampe</th>
              {coupons.map(({ coupons_id, name }) => (
                <th key={coupons_id}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matchesJson.map(({ id, name, participants }, i) => (
              <tr key={id}>
                <td
                  className={`p-6 text-center ${
                    i % 2 === 0 ? "bg-lightGreen" : "bg-transparent"
                  }`}
                >
                  {participants[0].name}-{participants[1].name}
                </td>
                {coupons.map(({ coupons_id, predictions }, j) => (
                  <td
                    key={coupons_id}
                    className={`p-6 text-center ${
                      i % 2 === 0 ? "bg-lightGreen" : "bg-transparent"
                    }`}
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
