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
              {coupons.map(({ name }) => (
                <th>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matchesJson.map(({ id, name, participants }, i) => (
              <tr>
                <td
                  className={`p-6 text-center ${
                    i % 2 === 0 ? "bg-lightGreen" : "bg-transparent"
                  }`}
                >
                  {participants[0].name}-{participants[1].name}
                </td>
                {coupons.map(({ predictions }) => (
                  <>
                    {JSON.parse(predictions).map((prediction) => {
                      if (prediction.id === id) {
                        return (
                          <td
                            className={`p-6 text-center ${
                              i % 2 === 0 ? "bg-lightGreen" : "bg-transparent"
                            }`}
                          >
                            {prediction.prediction}
                          </td>
                        );
                      }
                    })}
                  </>
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
