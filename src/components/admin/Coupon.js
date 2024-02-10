import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import environment from "../../environment";
import { FidgetSpinner } from "react-loader-spinner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Coupon = ({ coupon, removeCoupon, changeCouponState={changeCouponState} }) => {
  let { coupons_id, name, mail, paid, subscribeToMails } = coupon;

  const [approved, setApproved] = useState(paid == "1");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newSavedName, setNewSavedName] = useState(name);
  const [showingNameInput, setShowingNameInput] = useState(false);
  const [inputWidth, setInputWidth] = useState(0);

  const inputNewNameRef = useRef(null);


  const hideInput = (event, enter = false) => {
    if (
      (event.target.id !== "nameInput" + coupons_id &&
        event.target.id !== "name" + coupons_id) ||
      enter
    ) {
      setShowingNameInput(false);
      if (newSavedName !== newName && newName !== "") {
        saveNewName()
      } else if (newName === "") {
        setNewName(newSavedName);
      }
    };
  }

  const enter = (event) => {
    if (event.key === 'Enter') {
      hideInput(event, true);
    }
  }

  useEffect(() => {
    window.addEventListener("click", hideInput);

    return () => {
      window.removeEventListener("click", hideInput);
    };
  }, [hideInput]);

  const approve = (e, coupons_id) => {
    e.preventDefault();
    axios
      .post(`${environment[0]}/server/endpoints/coupon/approve.php`, {
        coupons_id: coupons_id,
      })
      .then((response) => {
        if (response.data.code === 200) {
          setApproved(true);
          paid = "1";
          changeCouponState(coupon, true)
        }
      })
      .catch((error) => { 
        console.log(error)
      })
      .finally(() => {
        setLoadingSubmit(false);
      });
  };

  const unapprove = (coupons_id) => {
    setLoadingSubmit(true);
    axios
      .post(`${environment[0]}/server/endpoints/coupon/unapprove.php`, {
        coupons_id: coupons_id,
      })
      .then((response) => {
        if (response.data.code === 200) {
          setApproved(false);
          paid = "0";
          changeCouponState(coupon, false)
        }
      })
      .catch((error) => { })
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
        if (response.data.code === 200) {
          setNewSavedName(newName);
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteCoupon = (coupon) => {
    if (!window.confirm('Er du sikker på du vil slette kuponen af ' + coupon.name + '?')) {
      return;
    }

    axios
    .post(`${environment[0]}/server/endpoints/coupon/delete.php`, {
      coupons_id: coupons_id,
    })
    .then((response) => {
      if (response.data.code === 200) {
        removeCoupon(coupon)
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div
      className={
        "coupon " + (approved ? "approvedContainer" : "notApprovedContainer")
      }
    >
      {subscribeToMails == "1" ?
        <div className="ml-auto mr-1">
          <span title="Modtager mails"><FontAwesomeIcon icon={faEnvelope}/></span>
        </div>
        : <div className="invisible"><span title="Modtager mails"><FontAwesomeIcon icon={faEnvelope}/></span></div>
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
            style={{ width: inputWidth + "px" }}
            onInput={(e) => { setNewName(e.target.value) }}
            onKeyDown={enter}
          />
        }
        <p className="mail text-white text-sm mb-4">{mail}</p>
        <div className="flex flex-row justify-between items-center h-10">
          {!approved ? (
            <button
              className="approveBtn py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
            <div className="flex items-center">
              <p className="approvedBtn rounded focus:outline-none focus:shadow-outline">
                Godkendt
              </p>
              <span className="text-xl hover:cursor-pointer p-1 ml-1" onClick={() => {unapprove(coupon.coupons_id)}}>
                <FontAwesomeIcon icon={faRotateLeft} />
              </span>
            </div>
          )}
          <span className="text-xl hover:cursor-pointer p-1" onClick={() => deleteCoupon(coupon)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </span>
        </div>
      </div>

    </div>
  );
};

export default Coupon;
