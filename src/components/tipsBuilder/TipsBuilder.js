import React, { useState } from "react";
import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
// import matchesJson from "../../assets/json/matchesDK.json";
import matchesJson from "../../assets/json/matchesTesting.json";
import Match from "./Match";
import environment from "../../environment";

/**https://match.uefa.com/v5/matches?competitionId=3&seasonYear=2024&phase=QUALIFYING&fromDate=2023-03-01&toDate=2023-03-31&utcOffset=2&order=ASC&offset=0&limit=500 */
/**https://appservicesport.tv2api.dk/tournaments/18308/events */ /**https://sport.tv2.dk/fodbold/em/kampprogram */

const TipsBuilder = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("null");
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const matches = matchesJson.sort((a, b) => {
    if (a.startDate < b.startDate) {
      return -1;
    }
    if (a.startDate > b.startDate) {
      return 1;
    }

    return 0;
  });

  const submitForm = (e) => {
    e.preventDefault();
    let diff = matchesJson.length - predictions.length;

    if (diff > 0) {
      setError("Du mangler " + diff + (diff > 1 ? " kampe" : " kamp"));
      return;
    }

    setLoading(true);
    axios
      .post(`${environment[0]}/server/endpoints/save.php`, {
        name: name,
        mail: mail,
        predictions: JSON.stringify(predictions),
      })
      .then((response) => {
        if (response.data.code === 200) {
          window.location.replace("/kvittering");
        } else {
          console.log(response);
          setError("Der skete desværre en fejl. Prøv igen.");
        }
      })
      .catch((error) => {
        setError("Der skete desværre en fejl. Prøv igen.");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="container mx-auto mt-2" onSubmit={submitForm}>
      <h1 className="text-3xl text-center mb-9 mt-5">Udfyld din kupon</h1>
      <input
        type="text"
        placeholder="Dit navn"
        name="name"
        className="flex mx-auto my-2 w-80 h-9 rounded-md p-1 text-black"
        required
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {/* <input
        type="email"
        placeholder="Din mail"
        name="mail"
        className="flex mx-auto my-2 w-80 h-9 rounded-md p-1 text-black"
        required
        value={mail}
        onChange={(e) => {
          setMail(e.target.value);
        }}
      /> */}
      <section className="mt-10">
        {matches.map(({ id, startDate, participants }) => (
          <Match
            key={id}
            id={id}
            startDate={startDate}
            participants={participants}
            setPredictions={setPredictions}
            predictions={predictions}
            setError={setError}
          />
        ))}
      </section>
      {error && <p className="text-red-500 text-center mb-5">{error}</p>}

      <button
        type="submit"
        className="bg-sandBeige rounded-md w-4/5 h-10 text-black text-lg hover:cursor-pointer hover:scale-110 duration-200 mb-7 mx-auto flex justify-center items-center"
      >
        {!loading ? (
          <>Indsend</>
        ) : (
          <FidgetSpinner
            visible={true}
            height="30"
            width="30"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            ballColors={["#003e21", "#067242", "#098b54"]}
            backgroundColor="#f8d098"
          />
        )}
      </button>
    </form>
  );
};

export default TipsBuilder;
