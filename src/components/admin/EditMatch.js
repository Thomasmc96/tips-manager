import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
import environment from "../../environment";
import { countryName } from "../Utils";

const EditMatch = () => {
    return (
        <div className="container mx-auto flex flex-col my-2 px-2 flex-wrap">
          <div>
            <h1 className="text-3xl mb-3 mt-5 mx-2">
              Hej {localStorage.getItem("name")}
            </h1>
            <AdminMenu />
            <Match />
          </div>
        </div>
      )
}

const Match = () => {
    const {id} = useParams();

    const [match, setMatch] = useState('');

    useEffect(() => {
        axios
        .get(
          `${environment[0]}/server/endpoints/matches2/getById.php?id=${id}`
        )
        .then((response) => {
          if (response.data.code === 200) {
            console.log(response.data)
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

    return(
        <div className="container mx-auto flex flex-col my-2 px-2 flex-wrap">
        <h2 className="text-3xl mb-5 mt-5 mx-auto">Opdater kamp #{id}</h2>
            <div className="flex row mx-auto">
                <img
                    src={`https://flags.tv2a.dk/tv2football/${match.home_team}.svg`}
                    alt={match.home_team}
                    className="w-8 ml-2 inline mr-2"
                />
                <p>{countryName(match.home_team)} vs. {countryName(match.away_team)}</p>
                <img
                    src={`https://flags.tv2a.dk/tv2football/${match.away_team}.svg`}
                    alt={match.home_team}
                    className="w-8 ml-2 inline"
                />
            </div>
        </div>
    )
}

export default EditMatch;