import React from "react";
import matchesJson from "../../assets/json/matchesDK.json";
import Match from "./Match";

/**https://match.uefa.com/v5/matches?competitionId=3&seasonYear=2024&phase=QUALIFYING&fromDate=2023-03-01&toDate=2023-03-31&utcOffset=2&order=ASC&offset=0&limit=500 */
/**https://appservicesport.tv2api.dk/tournaments/18308/events */ /**https://sport.tv2.dk/fodbold/em/kampprogram */

const TipsBuilder = () => {
  const matches = matchesJson.sort((a, b) => {
    if (a.startDate < b.startDate) {
      return -1;
    }
    if (a.startDate > b.startDate) {
      return 1;
    }

    return 0;
  });

  console.log(matches);

  return (
    <div className="container mx-auto mt-2">
      <h1 className="text-4xl text-center mb-9 mt-5">Udfyld din kupon</h1>
      <input
        type="text"
        placeholder="Dit navn"
        name="name"
        className="flex mx-auto my-2 w-80 h-9 rounded-md p-1 text-black"
        required
      />
      <input
        type="email"
        placeholder="Din mail"
        name="mail"
        className="flex mx-auto my-2 w-80 h-9 rounded-md p-1 text-black"
        required
      />
      <section className="mt-10">
        {matches.map(({ id, startDate, participants }) => (
          <Match id={id} startDate={startDate} participants={participants} />
        ))}
      </section>
    </div>
  );
};

export default TipsBuilder;
