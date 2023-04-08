import React, { useState, useEffect } from "react";
import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
import matchesJson from "../../assets/json/matchesTesting.json";
import Match from "./Match";
import environment from "../../environment";
import { sortByDate } from "../Utils";

const TipsBuilder = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [subscribeToMails, setSubscribeToMails] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [matches, setMatches] = useState([]);

  // const matches = sortByDate(matchesJson);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${environment[0]}/server/endpoints/matches/getMatches.php`)
      .then((response) => {
        if (response.data.code === 200) {
          console.log(response);
          setMatches(sortByDate(JSON.parse(response.data.matches.data)));
          setMatches(matchesJson);
        } else {
          setError("Noget gik galt");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    let diff = matches.length - predictions.length;
    console.log(subscribeToMails);

    if (diff > 0) {
      setError("Du mangler " + diff + (diff > 1 ? " kampe" : " kamp"));
      return;
    }

    setLoadingSubmit(true);
    axios
      .post(`${environment[0]}/server/endpoints/coupon/save.php`, {
        name: name,
        mail: mail,
        predictions: JSON.stringify(predictions),
        subscribeToMails: subscribeToMails,
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
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  if (loading) {
    return (
      <div className="flex mx-auto justify-center h-40 items-center">
        <FidgetSpinner
          visible={true}
          height="100"
          width="100"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
          ballColors={["#003e21", "#067242", "#098b54"]}
          backgroundColor="#f8d098"
        />
      </div>
    );
  }

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
      <input
        type="email"
        placeholder="Din mail"
        name="mail"
        className="flex mx-auto my-2 w-80 h-9 rounded-md p-1 text-black"
        required
        value={mail}
        onChange={(e) => {
          setMail(e.target.value);
        }}
      />
      <div className="flex items-center justify-center mx-auto mt-2 w-80">
        <input
          id="link-checkbox"
          type="checkbox"
          value={subscribeToMails}
          onClick={() => {
            setSubscribeToMails(!subscribeToMails);
          }}
          className="w-8 h-8 rounded"
        />
        <label htmlFor="link-checkbox" className="ml-2 text-sm font-medium">
          Ja, jeg vil gerne modtage mails omkring stillingen. (Stillingen kan
          også ses her på siden)
        </label>
      </div>
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
        {!loadingSubmit ? (
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
