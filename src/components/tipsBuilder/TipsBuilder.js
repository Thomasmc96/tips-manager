import React, { useState } from "react";
import matchesJson from "../../assets/json/matchesDK.json";
import Match from "./Match";

/**https://match.uefa.com/v5/matches?competitionId=3&seasonYear=2024&phase=QUALIFYING&fromDate=2023-03-01&toDate=2023-03-31&utcOffset=2&order=ASC&offset=0&limit=500 */
/**https://appservicesport.tv2api.dk/tournaments/18308/events */ /**https://sport.tv2.dk/fodbold/em/kampprogram */

const TipsBuilder = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [predictions, setPredictions] = useState([]);

  const matches = matchesJson.sort((a, b) => {
    if (a.startDate < b.startDate) {
      return -1;
    }
    if (a.startDate > b.startDate) {
      return 1;
    }

    return 0;
  });

  const submitForm = (e) => {};

  console.log(predictions);

  return (
    <form className="container mx-auto mt-2" onSubmit={submitForm}>
      <h1 className="text-4xl text-center mb-9 mt-5">Udfyld din kupon</h1>
      <input
        type="text"
        placeholder="Dit navn"
        name="name"
        className="flex mx-auto my-2 w-80 h-9 rounded-md p-1 text-black"
        required
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder="Din mail"
        name="mail"
        className="flex mx-auto my-2 w-80 h-9 rounded-md p-1 text-black"
        required
        onChange={(e) => {
          setMail(e.target.value);
        }}
      />
      <input type="submit" value="Indsend" />

      <section className="mt-10">
        {matches.map(({ id, startDate, participants }) => (
          <Match
            key={id}
            id={id}
            startDate={startDate}
            participants={participants}
            setPredictions={setPredictions}
            predictions={predictions}
          />
        ))}
      </section>
    </form>
  );
};

export default TipsBuilder;
