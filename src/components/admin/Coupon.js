import React from "react";

const Coupon = ({coupon}) => {

    const {name, mail, paid} = coupon;

    return(
        <div className="rounded-lg shadow-md p-6 border-2 border-lightGreen inline-block m-2">
        <h2 className="text-lg font-medium mb-2 text-white">{name}</h2>
        <p className="text-white text-sm mb-4">{mail}</p>
        {!paid && (
          <button className="bg-sandBeige hover:bg-green-700 text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Godkend
          </button>
        )}
      </div>
    )
}

export default Coupon;