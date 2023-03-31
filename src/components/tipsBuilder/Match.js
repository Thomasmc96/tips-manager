import React from "react";
import { getDateString } from "../Utils";

const Match = ({
  id,
  participants,
  startDate,
  setPredictions,
  predictions,
  setError
}) => {


  const handlePrediction = (e, id) => {
    e.preventDefault();
    setError(false);


    let oPrediction = predictions.find((prediction) => prediction.id === id)

    if(!oPrediction) {
      setPredictions((currentPredictions) => [
        ...currentPredictions,
        { id: id, prediction: e.target.value },
      ]);
    } else {
      oPrediction.prediction = e.target.value;
    }

  };

  return (
    <div key={id} className="bg-lightGreen mb-10 p-2 rounded-md">
      <h3 className="text-xl text-center">
        <div className="flex space-x-5 justify-center">
          <div className="flex items-center space-x-3">
            <img
              src={`https://flags.tv2a.dk/tv2football/${participants[0].countryCode.toLocaleLowerCase()}.svg`}
              alt={participants[0].countryCode.toLocaleLowerCase()}
              className="w-12"
            />
            <p>{participants[0].name}</p>
          </div>
          <span>-</span>
          <div className="flex items-center space-x-3">
            <p>{participants[1].name}</p>
            <img
              src={`https://flags.tv2a.dk/tv2football/${participants[1].countryCode.toLocaleLowerCase()}.svg`}
              alt={participants[1].countryCode.toLocaleLowerCase()}
              className="w-12"
            />
          </div>
        </div>
      </h3>
      <p className="text-center">
        {getDateString(startDate)}
      </p>
      <div className="flex space-x-3 justify-center pt-5">
        <div>
          <input
            type="radio"
            name={id + "_radio"}
            id={id + "_radio" + "_1"}
            className="hidden peer"
            value={"1"}
            onInput={(e) => handlePrediction(e, id)}
          />
          <label
            htmlFor={id + "_radio" + "_1"}
            className="w-20 h-10 flex justify-center items-center rounded-md bg-normalGreen hover:cursor-pointer hover:scale-110 duration-200 peer-checked:bg-darkGreen"
          >
            1
          </label>
        </div>
        <div>
          <input
            type="radio"
            name={id + "_radio"}
            id={id + "_radio" + "_x"}
            className="hidden peer"
            value={"x"}
            onInput={(e) => handlePrediction(e, id)}
          />
          <label
            htmlFor={id + "_radio" + "_x"}
            className="w-20 h-10 flex justify-center items-center rounded-md bg-normalGreen hover:cursor-pointer hover:scale-110 duration-200 peer-checked:bg-darkGreen"
          >
            x
          </label>
        </div>
        <div>
          <input
            type="radio"
            name={id + "_radio"}
            id={id + "_radio" + "_2"}
            className="hidden peer"
            value={"2"}
            onInput={(e) => handlePrediction(e, id)}
          />
          <label
            htmlFor={id + "_radio" + "_2"}
            className="w-20 h-10 flex justify-center items-center rounded-md bg-normalGreen hover:cursor-pointer hover:scale-110 duration-200 peer-checked:bg-darkGreen"
          >
            2
          </label>
        </div>
      </div>
    </div>
  );
};

export default Match;
