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
  }, [])

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
    <div className="container flex flex-col my-2 px-2 flex-wrap w-full sm:w-80">
      <h3 className="text-2xl mb-5 mt-5">Opdater kamp #{id}</h3>
      <form className="container mt-2" onSubmit={updateMatch}>
        <label className="flex w-full rounded-md text-white">Hjemmebanehold</label>
        <select
          className="flex my-2 w-full h-9 rounded-md p-1 text-black mb-4"
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

        <label className="flex w-full rounded-md text-white">Udebanehold</label>
        <select
          className="flex my-2 w-full h-9 rounded-md p-1 text-black mb-4"
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

        <label className="flex w-full rounded-md text-white">Kickoff</label>
        <input
          type="datetime-local"
          placeholder="Kick off"
          name="kickOff"
          className="flex my-2 w-full h-9 rounded-md p-1 text-black mb-4"
          required
          value={match.kickoff_dtm}
          onChange={e => setMatch(prev => {
            let copy = Object.assign({}, prev)
            copy.kickoff_dtm = e.target.value;
            return copy
          })}
        />
        <label className="flex w-full rounded-md text-white">Hjemmebaneholds mål</label>
        <input
          type="number"
          placeholder="Mål"
          name="homeTeamGoals"
          className="flex my-2 w-full h-9 rounded-md p-1 text-black mb-4"
          value={match.home_team_goals === null ? '' : match.home_team_goals}
          onChange={e => setMatch(prev => {
            let copy = Object.assign({}, prev)
            copy.home_team_goals = e.target.value;
            return copy
          })}
        />
        <label className="flex w-full rounded-md text-white">Udebaneholds mål</label>
        <input
          type="number"
          placeholder="Mål"
          name="awayTeamGoals"
          className="flex my-2 w-full h-9 rounded-md p-1 text-black mb-4"
          value={match.away_team_goals === null ? '' : match.away_team_goals}
          onChange={e => setMatch(prev => {
            let copy = Object.assign({}, prev)
            copy.away_team_goals = e.target.value;
            return copy
          })}
        />
        <button
          type="submit"
          className="bg-sandBeige rounded-md w-full h-10 text-black text-lg hover:cursor-pointer hover:scale-110 duration-200 mb-3 flex justify-center items-center"
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
        <button
          type="button"
          className="border border-red-500 rounded-md w-full h-10 text-white text-lg hover:cursor-pointer hover:scale-110 duration-200 mb-7 flex justify-center items-center"
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
      </form>
    </div>
  )
}

export default EditMatch;