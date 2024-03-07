import React, { useEffect, useState } from "react";
import { getDateString, countryName } from "../Utils";

const Match = ({
  setPredictions,
  predictions,
  setError,
  match,
  isMissingPredictions
}) => {

  const [isMissingPrediction, setIsMissingPrediction] = useState(false);

  useEffect(() => {
    setIsMissingPrediction(isMissingPredictions && !predictions.find((prediction) => prediction.id === match.matches2_id));

  }, [isMissingPredictions, match.matches2_id, predictions])

  const handlePrediction = (e, id) => {
    e.preventDefault();
    setError(false);
    setIsMissingPrediction(false);

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
    <div className={"match " + (isMissingPrediction ? 'missingPrediction ' : '')}>
      <img
        src={`https://flags.tv2a.dk/tv2football/${match.home_team}.svg`}
        alt={match.home_team}
        className="flagHome"
      />
      <div>

        <h3 className="text-xl text-center">
          <div className="flex space-x-5 justify-center">
            <div className="flex items-center space-x-3">
              <img
                src={`https://flags.tv2a.dk/tv2football/${match.home_team}.svg`}
                alt={match.home_team}
                className="flagHomeMobile"
              />
              <p className="countryName">{countryName(match.home_team)}</p>
            </div>
            <span>-</span>
            <div className="flex items-center space-x-3">
              <p className="countryName">{countryName(match.away_team)}</p>
              <img
                src={`https://flags.tv2a.dk/tv2football/${match.away_team}.svg`}
                alt={match.away_team}
                className="flagAwayMobile"
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
              id={`${match.matches2_id}_radio_1`}
              className="hidden peer"
              value={"1"}
              onInput={(e) => handlePrediction(e, match.matches2_id)}
            />
            <label
              htmlFor={`${match.matches2_id}_radio_1`}
              className="w-20 h-10 flex justify-center items-center rounded-md bg-lightGreenNew hover:cursor-pointer hover:scale-110 duration-200 peer-checked:bg-darkGreen peer-checked:text-gold peer-checked:border-gold peer-checked:border-[1px]"
            >
              1
            </label>
          </div>
          <div>
            <input
              type="radio"
              name={match.matches2_id + "_radio"}
              id={`${match.matches2_id}_radio_x`}
              className="hidden peer"
              value={"x"}
              onInput={(e) => handlePrediction(e, match.matches2_id)}
            />
            <label
              htmlFor={`${match.matches2_id}_radio_x`}
              className="w-20 h-10 flex justify-center items-center rounded-md bg-lightGreenNew hover:cursor-pointer hover:scale-110 duration-200 peer-checked:bg-darkGreen peer-checked:text-gold peer-checked:border-gold peer-checked:border-[1px]"
            >
              x
            </label>
          </div>
          <div>
            <input
              type="radio"
              name={`${match.matches2_id}_radio`}
              id={`${match.matches2_id}_radio_2`}
              className="hidden peer"
              value={"2"}
              onInput={(e) => handlePrediction(e, match.matches2_id)}
            />
            <label
              htmlFor={`${match.matches2_id}_radio_2`}
              className="w-20 h-10 flex justify-center items-center rounded-md bg-lightGreenNew hover:cursor-pointer hover:scale-110 duration-200 peer-checked:bg-darkGreen peer-checked:text-gold peer-checked:border-gold peer-checked:border-[1px]"
            >
              2
            </label>
          </div>
        </div>
      </div>
      <img
        src={`https://flags.tv2a.dk/tv2football/${match.away_team}.svg`}
        alt={match.away_team}
        className="flagAway"
      />
    </div>
  );
};

export default Match;
