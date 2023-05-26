import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import environment from "../../environment";
import { FidgetSpinner } from "react-loader-spinner";

const Coupon = ({ coupon }) => {
  const { coupons_id, name, mail, paid, subscribeToMails } = coupon;
  
  const [approved, setApproved] = useState(paid == "1");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newSavedName, setNewSavedName] = useState(name);
  const [showingNameInput, setShowingNameInput] = useState(false);
  const [inputWidth, setInputWidth] = useState(0);

  const inputNewNameRef = useRef(null);


  const hideInput = (event) => {
      if(
        event.target.id !== "nameInput" + coupons_id && 
        event.target.id !== "name" + coupons_id
      ) {
        setShowingNameInput(false);
        if(newSavedName !== newName && newName !== "") {
          saveNewName()
        } else if(newName === "") {
          setNewName(newSavedName);
        }
      };
    }
    
  useEffect(() => {
    window.addEventListener("click", hideInput);

    return () => {
      window.removeEventListener("click", hideInput);
    };
  }, [hideInput]);

  const approve = (e, coupons_id) => {
    e.preventDefault();
    setLoadingSubmit(true);
    axios
      .post(`${environment[0]}/server/endpoints/coupon/approve.php`, {
        coupons_id: coupons_id,
      })
      .then((response) => {
        console.log(response);
        if (response.data.code === 200) {
          setApproved(true);
        }
      })
      .catch((error) => {})
      .finally(() => {
        setLoadingSubmit(false);
      });
  };

  const onNameClick = (e) => {
    setInputWidth(e.target.offsetWidth);
    setShowingNameInput(!showingNameInput);
  }

  const saveNewName = () => {
    axios
    .post(`${environment[0]}/server/endpoints/coupon/update.php`, {
      coupons_id: coupons_id,
      name: newName
    })
    .then((response) => {
      console.log(response);
      if (response.data.code === 200) {
        setNewSavedName(newName);
      }
    })
    .catch((error) => {
      console.log (error)
    })

  }

  return (
    <div
      className={
        "rounded-lg shadow-md  border-2 inline-flex flex-col m-2 " +
        (approved ? "border-lightGreen" : "border-red-500")
      }
    >
      {subscribeToMails == "1" ? 
        <div className="ml-auto mr-1">
          <span title="Modtager mails">📧</span>
        </div>
        : <div className="invisible">📧</div>
      }
      <div className="px-6 pb-6">
      
      {!showingNameInput ? 
      <h2
      id={"name" + coupons_id}
        className="text-lg font-medium mb-2 text-white" 
        onClick={onNameClick}
        >
          {newName}
        </h2>
        :
      <input
        id={"nameInput" + coupons_id}
        type="text" 
        value={newName} 
        ref={inputNewNameRef}
        className="bg-transparent border-solid border-2 rounded-md p-1 box-border"
        style={{width: inputWidth + "px"}}
        onInput={(e) => {setNewName(e.target.value)}}
        />
      }
      <p className="text-white text-sm mb-4">{mail}</p>
      <div className="flex flex-row gap-5 items-center h-10">
        {!approved ? (
          <button
            className="bg-sandBeige hover:bg-green-700 text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={(e) => approve(e, coupons_id)}
          >
            {loadingSubmit ? (
              <div className="flex mx-auto justify-center items-center w-16">
                <FidgetSpinner
                  visible={true}
                  height="20"
                  width="20"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                  ballColors={["#003e21", "#067242", "#098b54"]}
                />
              </div>
            ) : (
              <>Godkend</>
            )}
          </button>
        ) : (
          <p className="text-lightGreen  rounded focus:outline-none focus:shadow-outline">
            Godkendt
          </p>
        )}
        {/* <button className="bg-transparent border-2 border-lightGreen hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Se tips</button> */}
          {/* <TipsModal data={[
  { label: "Name", value: "John Smith" },
  { label: "Age", value: "30" },
  { label: "Location", value: "New York" },
]}/> */}
      </div>
      </div>

    </div>
  );
};

export default Coupon;
