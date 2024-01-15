import React from "react";
import { getDateString, countryName } from "../Utils";

const Match = ({
  // id,
  // participants,
  // startDate,
  setPredictions,
  predictions,
  setError,
  match
}) => {
  console.log(match)
  const handlePrediction = (e, id) => {
    e.preventDefault();
    setError(false);


    let oPrediction = predictions.find((prediction) => prediction.id === id)

    if (!oPrediction) {
      setPredictions((currentPredictions) => [
        ...currentPredictions,
        { id: id, prediction: e.target.value },
      ]);
    } else {
      oPrediction.prediction = e.target.value;
    }

  };

  return (
    <div className="bg-lightGreen mb-10 p-2">
      <h3 className="text-xl text-center">
        <div className="flex space-x-5 justify-center">
          <div className="flex items-center space-x-3">
            <img
              src={`https://flags.tv2a.dk/tv2football/${match.home_team}.svg`}
              alt={match.home_team}
              className="w-12"
            />
            <p>{countryName(match.home_team)}</p>
          </div>
          <span>-</span>
          <div className="flex items-center space-x-3">
            <p>{countryName(match.away_team)}</p>
            <img
              src={`https://flags.tv2a.dk/tv2football/${match.away_team}.svg`}
              alt={match.away_team}
              className="w-12"
            />
          </div>
        </div>
      </h3>
      <p className="text-center">
        {getDateString(match.kickoff_dtm)}
      </p>
      <div className="flex space-x-3 justify-center pt-5">
        <div>
          <input
            type="radio"
            name={match.matches2_id + "_radio"}
            id={match.matches2_id + "_radio" + "_1"}
            className="hidden peer"
            value={"1"}
            onInput={(e) => handlePrediction(e, match.matches2_id)}
          />
          <label
            htmlFor={match.matches2_id + "_radio" + "_1"}
            className="w-20 h-10 flex justify-center items-center rounded-md bg-normalGreen hover:cursor-pointer hover:scale-110 duration-200 peer-checked:bg-darkGreen"
          >
            1
          </label>
        </div>
        <div>
          <input
            type="radio"
            name={match.matches2_id + "_radio"}
            id={match.matches2_id + "_radio" + "_x"}
            className="hidden peer"
            value={"x"}
            onInput={(e) => handlePrediction(e, match.matches2_id)}
          />
          <label
            htmlFor={match.matches2_id + "_radio" + "_x"}
            className="w-20 h-10 flex justify-center items-center rounded-md bg-normalGreen hover:cursor-pointer hover:scale-110 duration-200 peer-checked:bg-darkGreen"
          >
            x
          </label>
        </div>
        <div>
          <input
            type="radio"
            name={match.matches2_id + "_radio"}
            id={match.matches2_id + "_radio" + "_2"}
            className="hidden peer"
            value={"2"}
            onInput={(e) => handlePrediction(e, match.matches2_id)}
          />
          <label
            htmlFor={match.matches2_id + "_radio" + "_2"}
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
