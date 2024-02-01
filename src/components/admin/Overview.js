import React, { useState, useEffect } from "react";
import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
import environment from "../../environment";
import Coupon from "./Coupon";
import AdminMenu from "./AdminMenu";
import { sortByUpdated } from "../Utils";

const Overview = () => {
  const [coupons, setCoupons] = useState([]);
  const [couponsNotApproved, setCouponsNotApproved] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    axios
      .get(`${environment[0]}/server/endpoints/coupon/all.php`)
      .then((response) => {
        if (response.data.code === 200) {
          console.log(response.data)
          setCoupons(response.data.coupons.filter((coupon) => coupon.paid === 1));
          setCouponsNotApproved(response.data.coupons.filter((coupon) => coupon.paid === 0));
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const removeCoupon = (coupon) => {
      let copy = coupons;

      copy = copy.filter((c) => {
        return c.coupons_id !== coupon.coupons_id
      });

      setCoupons(copy);
  }

  const changeCouponState = (coupon, isApproved) => {
    coupon.updated_dtm = new Date().toISOString();

    if (isApproved) {
      let copy = coupons;
      coupon.paid = "1";
      // coupon.updated_dtm = new
      console.log(new Date().toISOString())
      copy.push(coupon);
      setCoupons(coupons);

      let copy2 = couponsNotApproved;
      copy2 = copy2.filter((c) => {
        return c.coupons_id !== coupon.coupons_id
      });
      setCouponsNotApproved(copy2);
      
    } else {
      let copy = couponsNotApproved;
      coupon.paid = "0";
      copy.push(coupon);
      setCouponsNotApproved(copy);
      removeCoupon(coupon);
      
    }
  }

  if (loading) {
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

  return (
    <div className="overview container">
      <div>
        <AdminMenu />
        <h2 className="apporvedHeadline"><span className="yellowText">Godkendte</span> tilmeldinger</h2>
        {sortByUpdated(coupons).map((coupon) => {
          return <Coupon key={coupon.coupons_id} coupon={coupon} removeCoupon={removeCoupon} changeCouponState={changeCouponState} />;
        })}
        <h2 className="notApprovedHeadline"><span className="yellowText">Ikke</span> Godkendte tilmeldinger</h2>
        {sortByUpdated(couponsNotApproved).map((coupon) => {
          return <Coupon key={coupon.coupons_id} coupon={coupon} removeCoupon={removeCoupon} changeCouponState={changeCouponState}/>;
        })}
      </div>
    </div>
  );
};

export default Overview;
