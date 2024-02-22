import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FidgetSpinner } from 'react-loader-spinner';
import Match from './Match';
import environment from '../../environment';
import { sortByKickOff } from '../Utils';
import './TipsBuilder.css';

const TipsBuilder = () => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
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
          setError('Noget gik galt');
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
      setError('Du mangler ' + diff + (diff > 1 ? ' kampe' : ' kamp'));
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
          window.location.replace('/kvittering');
        } else {
          setError('Der skete desværre en fejl. Prøv igen.');
        }
      })
      .catch((error) => {
        setError('Der skete desværre en fejl. Prøv igen.');
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
          ballColors={['#003e21', '#067242', '#098b54']}
          backgroundColor="#f8d098"
        />
      </div>
    );
  }

  return (
    <form className="TipsBuilderForm" onSubmit={submitForm}>
      <div className="detailsContainer">
        <h1 className="">
          Udfyld din <span className="yellowText">kupon</span>
        </h1>
        <label className="label">Navn</label>
        <input
          type="text"
          placeholder="Dit navn"
          name="name"
          className="input"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label className="label">Mail</label>
        <input
          type="email"
          placeholder="Din mail"
          name="mail"
          className="input"
          required
          value={mail}
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />
        <div className="divCheckbox">
          <label htmlFor="link-checkbox" className="labelCheckbox container">
            <input
              id="link-checkbox"
              type="checkbox"
              value={subscribeToMails}
              onClick={() => {
                setSubscribeToMails(!subscribeToMails);
              }}
              className="inputCheckbox"
            />{' '}
            <span class="checkmark"></span>
            Ja tak, jeg vil gerne modtage mails omkring stillingen!* <br />
            <span>*Stillingen kan også ses her på siden.</span>
          </label>
        </div>
      </div>
      <section className="matchSection">
        <h2 className="">Vælg dine tips herunder:</h2>
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
      {error && <p className="text-red-500 text-center mb-5 ">{error}</p>}
      <button type="submit" className="submitBtn">
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
            ballColors={['#003e21', '#067242', '#098b54']}
            backgroundColor="#f8d098"
          />
        )}
      </button>
    </form>
  );
};

export default TipsBuilder;
