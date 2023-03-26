import React from "react";

const Match = ({
  id,
  participants,
  startDate,
  setPredictions,
  predictions,
}) => {
  const getDate = (timestamp) => {
    let date = new Date(timestamp);
    return date.getDate() + ". " + getMonthName(date.getMonth() + 1);
  };

  const getTime = (timestamp) => {
    let date = new Date(timestamp);
    let time = date.toLocaleTimeString();
    return time.substring(0, time.length - 3);
  };

  const getMonthName = (monthNumber) => {
    switch (monthNumber) {
      case 1:
        return "Januar";
      case 2:
        return "Februar";
      case 3:
        return "Marts";
      case 4:
        return "April";
      case 5:
        return "Maj";
      case 6:
        return "Juni";
      case 7:
        return "Juli";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "Oktober";
      case 11:
        return "November";
      case 12:
        return "December";
    }
  };

  const handlePrediction = (e, id) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log(id);

    console.log(predictions.find((prediction) => prediction.id === id));

    // let in

    setPredictions((currentPredictions) => [
      ...currentPredictions,
      { id: id, prediction: e.target.value },
    ]);
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
        {getDate(startDate)} {getTime(startDate)}
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
