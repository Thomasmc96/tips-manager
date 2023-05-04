import React from "react";

const Prize = () => {
    return (
        <div className="container flex mx-auto justify-center flex-col">
            <h1 className="text-3xl text-center mb-9 mt-5">Præmie</h1>
            <div className="flex items-center flex-col">
                <div className="flex flex-row justify-between w-28 mt-2">
                    <p>1st:</p>
                    <p>...</p>
                </div>
                <div className="flex flex-row justify-between w-28 mt-2">
                    <p>2nd:</p>
                    <p>...</p>
                </div>
                <div className="flex flex-row justify-between w-28 mt-2">
                    <p>3rd:</p>
                    <p>...</p>
                </div>
            </div>
            <div>
                <p>Puljen består af x kr.</p>
                <p>Førstepladsen tager 65 %, andenpladsen tager 20 % og tredjepladsen tager 15 %.</p>
                <p>Er der to personen på førstepladsen, så deler de to både første- og andenpræmien.</p>
                <p>Er der hele tre personer på førstepladsen, så deler de hele puljen.</p>
            </div>
        </div>
    );
}

export default Prize;