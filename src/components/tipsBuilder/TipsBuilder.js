import React, { useState, useEffect } from "react";
import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
import Match from "./Match";
import environment from "../../environment";
import { sortByKickOff } from "../Utils";

const TipsBuilder = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [subscribeToMails, setSubscribeToMails] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [matches2, setMatches2] = useState([]);

  useEffect(() => {
    axios
      .get(`${environment[0]}/server/endpoints/matches2/getAll.php`)
      .then((response) => {
        if (response.data.code === 200) {
          setMatches2(sortByKickOff(response.data.matches2));
        } else {
          setError("Noget gik galt");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    let diff = matches2.length - predictions.length;

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
        console.log(response)
        if (response.data.code === 200) {
          window.location.replace("/kvittering");
        } else {
          setError("Der skete desværre en fejl. Prøv igen.");
        }
      })
      .catch((error) => {
        setError("Der skete desværre en fejl. Prøv igen.");
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingSubmit(false);
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
    <form className="container mx-auto mt-2 px-2" onSubmit={submitForm}>
      <div className="sm:w-80 w-full">
      <h1 className="text-3xl mb-9 mt-5">Udfyld din kupon</h1>
      <label className="flex w-full rounded-md text-white">Navn</label>
      <input
        type="text"
        placeholder="Dit navn"
        name="name"
        className="flex my-2 w-full h-9 rounded-md p-1 text-black"
        required
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label className="flex w-full rounded-md text-white">Mail</label>
      <input
        type="email"
        placeholder="Din mail"
        name="mail"
        className="flex my-2 w-full h-9 rounded-md p-1 text-black"
        required
        value={mail}
        onChange={(e) => {
          setMail(e.target.value);
        }}
      />
      <div className="flex items-center mt-2 w-full">
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
      </div>
      <section className="mt-10">
      <h2 className="text-2xl mb-9 mt-5 mx-2">Vælg dine tips herunder:</h2>
        {matches2.map((match2) => (
          <Match
            key={match2.matches2_id}
            setPredictions={setPredictions}
            predictions={predictions}
            setError={setError}
            match={match2}
          />
        ))}
      </section>
      {error && <p className="text-red-500 text-center mb-5">{error}</p>}
      <button
        type="submit"
        className="bg-sandBeige rounded-md w-full h-10 text-black text-lg hover:cursor-pointer hover:scale-110 duration-200 mb-7 flex justify-center items-center"
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
