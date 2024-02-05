import React, { useState } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
import environment from "../../environment";

const Email = () => {
    return (
        <div className="container email">
            <AdminMenu />
            <EmailStandingsForm />
        </div>
    )
}

const EmailStandingsForm = () => {

    const [emailText, setEmailText] = useState('');
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
        <div className="container emailContainer">
            <h2>Send <span className="yellowText">mails</span> til alle med stillingen</h2>

            <form className="emailForm" onSubmit={sendMail}>
                <div className="checkboxContainer">
                    <input
                        id="isCustomCheckbox"
                        type="checkbox"
                        value={isCustom}
                        onClick={() => {
                            setIsCustom(!isCustom);
                        }}
                        className="w-8 h-8 rounded"
                    />
                    <label className="checkboxLabel" htmlFor="isCustomCheckbox">
                        Jeg vil selv skrive en besked
                    </label>
                </div>
                {isCustom &&
                    <>
                        <label>Min besked</label>
                        <textarea
                            className="text-black w-full p-2 rounded-md h-48"
                            type="textarea"
                            placeholder="Her er nuværende stilling for EM 2024 tipskonkurrencen."
                            value={emailText}
                            onChange={(e) => setEmailText(e.target.value)}
                        />
                    </>
                }
                <button
                    type="submit"
                    className="submitBtn"
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