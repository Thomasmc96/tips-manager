import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
import environment from "../../environment";
import { countryName, countries } from "../Utils";
import { useNavigate } from "react-router-dom";

const EditMatch = () => {
  return (
    <div className="container mx-auto flex flex-col my-2 flex-wrap px-2">
      <div>
        <AdminMenu />
        <Match />
      </div>
    </div>
  )
}

const Match = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [match, setMatch] = useState('');
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios
      .get(
        `${environment[0]}/server/endpoints/matches2/getById.php?id=${id}`
      )
      .then((response) => {
        if (response.data.code === 200) {
          setMatch(response.data.match2);
        } else {
          alert("Noget gik galt");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
        }, 1000);
      });
  }, [id])

  const updateMatch = (e) => {
    e.preventDefault()
    setLoading(true)
    axios
      .post(`${environment[0]}/server/endpoints/matches2/update.php`, {
        matches2_id: match.matches2_id,
        homeTeam: match.home_team,
        awayTeam: match.away_team,
        kickOff: new Date(match.kickoff_dtm).addHours(1).toISOString().slice(0, 19).replace('T', ' '),
        homeTeamGoals: ['', null].includes(match.home_team_goals) ? null : Number(match.home_team_goals),
        awayTeamGoals: ['', null].includes(match.away_team_goals) ? null : Number(match.away_team_goals),
        updatedDtm: new Date().addHours(1).toISOString().slice(0, 19).replace('T', ' ')
      })
      .then((response) => {
        if (response.data.code === 200) {
          navigate('/kampe')
        } else {
          alert("Der skete desværre en fejl. Prøv igen.");
        }
      })
      .catch((error) => {
        alert("Der skete desværre en fejl. Prøv igen.");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const deleteMatch = (e) => {
    e.preventDefault();
    if (window.confirm("Er du sikker på, at du vil slette kampen mellen " + countryName(match.home_team) + " og " + countryName(match.away_team) + "?")) {
      setLoading(true)
      axios
        .get(
          `${environment[0]}/server/endpoints/matches2/delete.php?id=${id}`
        )
        .then((response) => {
          if (response.data.code === 200) {
            navigate('/kampe')
          } else {
            alert("Noget gik galt");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setTimeout(() => {
          }, 1000);
        });
    }
  }

  if (match === '') {
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
    <div className="container editMatch">
      <h2>Opdater <span className="yellowText">kamp #{id}</span></h2>
      <form className="editMatchForm" onSubmit={updateMatch}>
        <label>Hjemmebanehold</label>
        <div className="countryContainer">

          <select
            onChange={e => setMatch(prev => {
              let copy = Object.assign({}, prev)
              copy.home_team = e.target.value;
              return copy
            })}
            required
            name="homeTeam"
            value={match.home_team}
          >
            <option key={'-1'} value={''}>Vælg hold</option>s
            {countries.sort((a, b) => {
              if (a.name < b.name) { return -1; }
              if (a.name > b.name) { return 1; }
              return 0;
            }).map((country) => {
              return <option key={country.code} value={country.code}>{country.name}</option>
            })}
          </select>
          {match.home_team !== '' && (
            <img
              src={`https://flags.tv2a.dk/tv2football/${match.home_team}.svg`}
              alt={match.home_team}
              className="w-12 mb-5"
            />)}
        </div>
        <label>Udebanehold</label>
        <div className="countryContainer">
          <select
            onChange={e => setMatch(prev => {
              let copy = Object.assign({}, prev)
              copy.away_team = e.target.value;
              return copy
            })}
            required
            name="awayTeam"
            value={match.away_team}
          >
            <option key={'-1'} value={''}>Vælg hold</option>
            {countries.sort((a, b) => {
              if (a.name < b.name) { return -1; }
              if (a.name > b.name) { return 1; }
              return 0;
            }).map((country) => {
              return <option key={country.code} value={country.code}>{country.name}</option>
            })}
          </select>
          {match.away_team !== '' && (
            <img
              src={`https://flags.tv2a.dk/tv2football/${match.away_team}.svg`}
              alt={match.away_team}
              className="w-12 mb-5"
            />)}
        </div>
        <label>Kickoff</label>
        <input
          type="datetime-local"
          placeholder="Kick off"
          name="kickOff"
          required
          value={match.kickoff_dtm}
          onChange={e => setMatch(prev => {
            let copy = Object.assign({}, prev)
            copy.kickoff_dtm = e.target.value;
            return copy
          })}
        />
        <label>Hjemmebaneholds mål</label>
        <input
          type="number"
          placeholder="Mål"
          name="homeTeamGoals"
          value={match.home_team_goals === null ? '' : match.home_team_goals}
          onChange={e => setMatch(prev => {
            let copy = Object.assign({}, prev)
            copy.home_team_goals = e.target.value;
            return copy
          })}
        />
        <label>Udebaneholds mål</label>
        <input
          type="number"
          placeholder="Mål"
          name="awayTeamGoals"
          value={match.away_team_goals === null ? '' : match.away_team_goals}
          onChange={e => setMatch(prev => {
            let copy = Object.assign({}, prev)
            copy.away_team_goals = e.target.value;
            return copy
          })}
        />
        <div className="actionBtns">
          <button
            type="button"
            className="deleteBtn"
            onClick={deleteMatch}
          >
            {!loading ? (
              <>Slet kamp</>
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
          <button
            type="submit"
            className="submitBtn"
            >
            {!loading ? (
              <>Gem</>
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
        </div>
      </form>
    </div>
  )
}

export default EditMatch;