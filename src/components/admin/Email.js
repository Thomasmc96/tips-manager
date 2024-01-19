import React, { useState } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
import environment from "../../environment";

const Email = () => {
    return (
        <div className="container mx-auto flex flex-col my-2 flex-wrap px-2">
            <div>
                <h1 className="text-3xl mb-3 mt-5">
                    Hej {localStorage.getItem("name")}
                </h1>
                <AdminMenu />
                <EmailStandingsForm />
            </div>
        </div>
    )
}

const EmailStandingsForm = () => {

    const [emailText,setEmailText] = useState('');
    const [isCustom, setIsCustom] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendMail = (e) => {
        e.preventDefault();

    axios
      .post(`${environment[0]}/server/endpoints/email/sendStandings.php`, {
        message: isCustom ? emailText : ''
      })
      .then((response) => {
        if (response.data.code === 200) {
          console.log(response)
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

    return (
        <div className="container flex flex-col my-2 px-2 flex-wrap w-full">
            <h2 className="text-2xl mb-3 mt-5">Send mail med stillingen</h2>
            <div className="flex items-center mt-2 w-full mb-2">
                <input
                    id="isCustomCheckbox"
                    type="checkbox"
                    value={isCustom}
                    onClick={() => {
                        setIsCustom(!isCustom);
                    }}
                    className="w-8 h-8 rounded"
                />
                <label htmlFor="isCustomCheckbox" className="ml-2 text-md font-medium">
                    Skriv selv en besked
                </label>
            </div>
            <form className="container mt-2" onSubmit={sendMail}>
                {isCustom && 
                    <textarea 
                        className="text-black w-full p-2 rounded-md h-48"
                        type="textarea"
                        placeholder="Her er nuværende stilling for EM 2024 tipskonkurrencen."
                        value={emailText}
                        onChange={(e) => setEmailText(e.target.value)}
                    />
                }
                <button 
                    type="submit"
                    className="bg-sandBeige rounded-md sm:w-80 w-full h-10 text-black text-lg hover:cursor-pointer hover:scale-105 duration-200 mb-7 flex justify-center items-center"
                    >
                    {!loading ? (
                        <>Send</>
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

export default Email;