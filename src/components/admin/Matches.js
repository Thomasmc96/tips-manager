import React, { useState, useEffect } from "react";
import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
import environment from "../../environment";
import AdminMenu from "./AdminMenu";
import { countries, countryName, sortByKickOff, getDateString } from "../Utils";
import { useNavigate } from "react-router-dom";
import Loader from "../utils/Loader";

const Matches = () => {
  const [matches2, setMatches2] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${environment[0]}/server/endpoints/matches2/getAll.php`
      )
      .then((response) => {
        if (response.data.code === 200) {
          setMatches2(response.data.matches2);
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
  }, [])

  const addNewMatch = (match) => {
    setMatches2(current => [...current, match]);
  }

  return (
    <div className="container matches">
      <div>
        <AdminMenu />
        <CreateMatch addNewMatch={addNewMatch} />
        <ShowMatches matches2={matches2} />
      </div>
    </div>
  )

}

const ShowMatches = ({ matches2 }) => {
  const navigate = useNavigate();

  const seeMatch = (id) => {
    navigate("/kampe/" + id);
  }

  if (matches2.length === 0) {
    return (
      <div className="flex mx-auto justify-center h-40 items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container showMatches">
      <table>
        <thead>
          <tr>
            <th className="">Hjemmebane</th>
            <th className="">Udebane</th>
            <th className="hidden sm:table-cell">HB. Mål</th>
            <th className="hidden sm:table-cell">UB. Mål</th>
            <th className="hidden sm:table-cell">Kickoff</th>
          </tr>
        </thead>
        <tbody>
          {matches2.length > 0 &&
            sortByKickOff(matches2).map((match) => (
              <tr key={match.matches2_id} onClick={() => seeMatch(match.matches2_id)} className="cursor-pointer">
                <td>
                  <span>{countryName(match.home_team)}</span>
                  <img
                    src={`https://flags.tv2a.dk/tv2football/${match.home_team}.svg`}
                    alt={match.home_team}
                    className="w-8 ml-2 inline"
                  />
                </td>

                <td>
                  <span>{countryName(match.away_team)}</span>
                  <img
                    src={`https://flags.tv2a.dk/tv2football/${match.away_team}.svg`}
                    alt={match.away_team}
                    className="w-8 ml-2 inline"
                  />
                </td>

                <td className="hidden sm:table-cell">{match.home_team_goals}</td>
                <td className="hidden sm:table-cell">{match.away_team_goals}</td>
                <td className="hidden sm:table-cell">{getDateString(match.kickoff_dtm)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}


const CreateMatch = ({ addNewMatch }) => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [kickOff, setKickOff] = useState('');
  const [loading, setLoading] = useState(false);

  const saveMatch = (e) => {
    e.preventDefault()
    setLoading(true);
    axios
      .post(`${environment[0]}/server/endpoints/matches2/save.php`, {
        homeTeam: homeTeam,
        awayTeam: awayTeam,
        kickOff: new Date(kickOff).addHours(1).toISOString().slice(0, 19).replace('T', ' '),
        homeTeamGoals: null,
        awayTeamGoals: null
      })
      .then((response) => {
        if (response.data.code === 200) {
          setHomeTeam('')
          setAwayTeam('')
          setKickOff('')

          const newMatch = response.data.data;

          addNewMatch({
            matches2_id: Number(response.data.id),
            home_team: newMatch.homeTeam,
            away_team: newMatch.awayTeam,
            home_team_goals: newMatch.homeTeamGoals,
            away_team_goals: newMatch.awayTeamGoals,
            kickoff_dtm: newMatch.kickOff
          })
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
  return (
    <div className="container createMatch">
      <h2 className="">Tilføj en <span className="yellowText">kamp</span></h2>
      <form className="createMatchForm" onSubmit={saveMatch}>
        <label>Hjemmebanehold</label>
        <div className="countryContainer">
          <select
            onChange={e => setHomeTeam(e.target.value)}
            required
            name="homeTeam"
            value={homeTeam}
          >
            <option key={'-1'} value={''}>Vælg hold</option>
            {countries.sort((a, b) => {
              if (a.name < b.name) { return -1; }
              if (a.name > b.name) { return 1; }
              return 0;
            }).map((country) => {
              return <option key={country.code} value={country.code}>{country.name}</option>
            })}cover
          </select>
          {homeTeam !== '' && (
            <img
              src={`https://flags.tv2a.dk/tv2football/${homeTeam}.svg`}
              alt={homeTeam}
            />)}
        </div>
        <label>Udebanehold</label>
        <div className="countryContainer">
          <select
            onChange={e => setAwayTeam(e.target.value)}
            required
            name="awayTeam"
            value={awayTeam}
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
          {awayTeam !== '' && (
            <img
              src={`https://flags.tv2a.dk/tv2football/${awayTeam}.svg`}
              alt={awayTeam}
            />)}
        </div>
        <label>Kickoff</label>
        <input
          type="datetime-local"
          placeholder="Kick off"
          name="kickOff"
          required
          value={kickOff}
          onChange={(e) => setKickOff(e.target.value)}
        />
        <button
          type="submit"
          className="submitBtn"
        >
          {!loading ? (
            <>Opret kamp</>
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
    </div>
  )
}

export default Matches;