import React, { useState, useEffect } from "react";
import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
import environment from "../../environment";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    axios.post(
      `${environment[0]}/server/endpoints/admin/login.php`,
      {
        mail: mail,
        password: password
      }).then((response) => {
        console.log(response)
        if(response.data.code === 200) {
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("name", response.data.name);
          navigate('/overblik');
        } else {
          setError("Forkert login")
        }
      }).catch((error)=> {
        console.log(error)
      }).finally(() => {
        setLoading(false);
      })
  };

  const handleMail = (e) => {
    setMail(e.target.value);
    if(error !== "") {
      setError("");
    }
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if(error !== "") {
      setError("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="container mx-auto mt-10">
      <div className="mb-4 w-80 mx-auto">
        <label htmlFor="mail" className="block font-bold mb-2">
          Mail
        </label>
        <input
          type="email"
          id="mail"
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
          value={mail}
          onChange={handleMail}
        />
      </div>
      <div className="mb-4 w-80 mx-auto">
        <label htmlFor="password" className="block font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
          value={password}
          onChange={handlePassword}
        />
      </div>
      <div className="mb-4 w-80 mx-auto">
        <p className="text-red-500">{error}</p>
        </div>
      <div className="flex items-center justify-between w-80 mx-auto">
        <button
          type="submit"
          className="bg-sandBeige text-black py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline flex justify-center"
        >
          {!loading ? (
          <>Login</>
        ) : (
          <FidgetSpinner
            visible={true}
            height="24"
            width="24"
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
  );
}
export default Login;