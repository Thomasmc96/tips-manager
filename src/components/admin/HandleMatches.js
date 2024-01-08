import React, { useState, useEffect } from "react";
import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
import environment from "../../environment";
import Coupon from "./Coupon";

const HandleMatches = () => {
  const [loading, setLoading] = useState(true);
  const [matches2, setMatches2] = useState([]);
  const [newMatch, setNewMatch] = useState({
    homeTeam: '',
  });

  const saveMatch = () => {

  }

  return (
    <div className="container mx-auto flex flex-col my-2 px-2 flex-wrap">
        <form className="container mx-auto mt-2" onSubmit={saveMatch}>
            <input
            type="text"
            placeholder="Hjemmebanehold"
            name="homeTeam"
            className="flex mx-auto my-2 w-80 h-9 rounded-md p-1 text-black"
            required
            value={newMatch.homeTeam}
            onChange={(e) => {
                setNewMatch(e.target.value);
            }}
            />
        </form>
    </div>
  )
}

export default HandleMatches;