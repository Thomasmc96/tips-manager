import React, { useState } from "react";
import AdminMenu from "./AdminMenu";

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

    const sendMail = (e) => {
        e.preventDefault();

    }

    return (
        <div className="container flex flex-col my-2 px-2 flex-wrap w-full">
            <h2 className="text-2xl mb-3 mt-5">Send mail med stillingen</h2>
            <form className="container mt-2" onSubmit={sendMail}>
                <textarea 
                    className="text-black w-full p-2 rounded-sm"
                    type="textarea"
                    placeholder="Her er nuværende stilling for EM 2024 tipskonkurrencen."
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                />
                <button 
                    type="submit"
                    className="bg-sandBeige rounded-md w-full h-10 text-black text-lg hover:cursor-pointer hover:scale-105 duration-200 mb-7 flex justify-center items-center"
                    >Send</button>
                
            </form>
        </div>
    )
}

export default Email;