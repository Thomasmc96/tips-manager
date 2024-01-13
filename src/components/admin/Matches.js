import React, { useState, useEffect } from "react";
import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
import environment from "../../environment";
import AdminMenu from "./AdminMenu";
import { countries, countryName, sortByKickOff } from "../Utils";
import { useNavigate } from "react-router-dom";

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
    <div className="container mx-auto flex flex-col my-2 px-2 flex-wrap">
      <div>
        <h1 className="text-3xl mb-3 mt-5 mx-2">
          Hej {localStorage.getItem("name")}
        </h1>
        <AdminMenu />
        <CreateMatch addNewMatch={addNewMatch}/>
        <ShowMatches matches2={matches2}/>
      </div>
    </div>
  )

}

const ShowMatches = ({matches2}) => {
  const navigate = useNavigate();

  const seeMatch = (id) => {
      navigate("/kampe/" + id);
  }

  if (matches2.length === 0) {
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
    <div className="container flex flex-col my-2 px-2 flex-wrap">
       <h2 className="text-2xl mb-3 mt-5">Kampe</h2>    
       <table className="min-w-full border border-gray-300 shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 text-center">Hjemmebanehold</th>
            <th className="py-2 px-4 border-b border-gray-300 text-center">Udebanehold</th>
            <th className="py-2 px-4 border-b border-gray-300 text-center hidden sm:table-cell">Mål (1)</th>
            <th className="py-2 px-4 border-b border-gray-300 text-center hidden sm:table-cell">Mål (2)</th>
            <th className="py-2 px-4 border-b border-gray-300 text-center hidden sm:table-cell">Kickoff</th>
          </tr>
        </thead>
        <tbody>
          {matches2.length > 0 &&
            sortByKickOff(matches2).map((match) => (
              <tr key={match.matches2_id} onClick={() => seeMatch(match.matches2_id)} className="cursor-pointer">
                <td className="py-2 px-4 border-b border-gray-300 text-center">
                  <span>{countryName(match.home_team)}</span>
                  <img
                    src={`https://flags.tv2a.dk/tv2football/${match.home_team}.svg`}
                    alt={match.home_team}
                    className="w-8 ml-2 inline"
                  />
                </td>

                <td className="py-2 px-4 border-b border-gray-300 text-center">
                  <span>{countryName(match.away_team)}</span>
                  <img
                    src={`https://flags.tv2a.dk/tv2football/${match.away_team}.svg`}
                    alt={match.away_team}
                    className="w-8 ml-2 inline"
                  />
                </td>
                
                <td className="py-2 px-4 border-b border-gray-300 text-center hidden sm:table-cell">{match.home_team_goals}</td>
                <td className="py-2 px-4 border-b border-gray-300 text-center hidden sm:table-cell">{match.away_team_goals}</td>
                <td className="py-2 px-4 border-b border-gray-300 text-center hidden sm:table-cell">{match.kickoff_dtm}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}


const CreateMatch = ({addNewMatch}) => {
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
        kickOff: new Date(kickOff).toISOString().slice(0, 19).replace('T', ' '),
        homeTeamGoals: 0,
        awayTeamGoals: 0
      })
      .then((response) => {
        if (response.data.code === 200) {
          console.log(response)
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
          console.log(response);
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
  return(
    <div className="container mx-auto flex flex-col my-2 px-2 flex-wrap w-80">
       <h2 className="text-2xl mb-3 mt-5">Tilføj en kamp</h2>
        <form className="container mx-auto mt-2" onSubmit={saveMatch}>
          <label className="flex mx-auto w-80 rounded-md text-white">Hjemmebanehold</label>
          <select 
            className="flex mx-auto my-2 w-80 h-9 rounded-md p-1 text-black mb-4"
            onChange={e => setHomeTeam(e.target.value)}
            required
            name="homeTeam"
            value={homeTeam}
            >
            <option key={'-1'} value={''}>Vælg hold</option>
              {countries.sort((a,b) =>{
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
              }).map((country) => {
                return <option key={country.code} value={country.code}>{country.name}</option>
              })}
          </select>
          {homeTeam !== '' && (
          <img
            src={`https://flags.tv2a.dk/tv2football/${homeTeam}.svg`}
            alt={homeTeam}
            className="w-12 mb-5"
          />)}
          <label className="flex mx-auto w-80 rounded-md text-white">Udebanehold</label>
          <select 
            className="flex mx-auto my-2 w-80 h-9 rounded-md p-1 text-black mb-4"
            onChange={e => setAwayTeam(e.target.value)}
            required
            name="awayTeam"
            value={awayTeam}
            >
            <option key={'-1'} value={''}>Vælg hold</option>
              {countries.sort((a,b) =>{
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
              }).map((country) => {
                return <option key={country.code} value={country.code}>{country.name}</option>
              })}
          </select>
          {awayTeam !== '' && (
          <img
            src={`https://flags.tv2a.dk/tv2football/${awayTeam}.svg`}
            alt={awayTeam}
            className="w-12 mb-5"
          />)}
          <label className="flex mx-auto w-80 rounded-md text-white">Kickoff</label>
          <input
            type="datetime-local"
            placeholder="Kick off"
            name="kickOff"
            className="flex mx-auto my-2 w-80 h-9 rounded-md p-1 text-black mb-4"
            required
            value={kickOff}
            onChange={(e) => setKickOff(e.target.value)}
          />
          <button
            type="submit"
            className="bg-sandBeige rounded-md w-80 h-10 text-black text-lg hover:cursor-pointer hover:scale-110 duration-200 mb-7 mx-auto flex justify-center items-center"
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