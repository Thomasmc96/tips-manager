import React, { useState, useEffect } from "react";
import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
import environment from "../../environment";
import AdminMenu from "./AdminMenu";
import { countries } from "../Utils";

const HandleMatches = () => {
  const [loading, setLoading] = useState(true);
  const [matches2, setMatches2] = useState([]);


  return (
    <div className="container mx-auto flex flex-col my-2 px-2 flex-wrap">
      <div>
        <h1 className="text-3xl mb-3 mt-5 mx-2">
          Hej {localStorage.getItem("name")}
        </h1>
        <AdminMenu />
        <CreateMatch />
      </div>
    </div>
  )

}



const CreateMatch = () => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [kickOff, setKickOff] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const saveMatch = (e) => {
    e.preventDefault()
    setLoadingSubmit(true);
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
        setLoadingSubmit(false);
      });
  }
  return(
    <div className="container mx-auto flex flex-col my-2 px-2 flex-wrap w-80">
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
          {!loadingSubmit ? (
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

export default HandleMatches;