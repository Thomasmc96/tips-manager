import React, { useState, useEffect } from "react";
import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
import environment from "../../environment";
import Coupon from "./Coupon";
import AdminMenu from "./AdminMenu";

const Overview = () => {
  const [coupons, setCoupons] = useState([]);
  const [couponsNotApproved, setCouponsNotApproved] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    axios
      .get(`${environment[0]}/server/endpoints/coupon/all.php`)
      .then((response) => {
        if (response.data.code === 200) {
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
        <h2><span className="yellowText">Godkendte</span> tilmeldinger</h2>
        {coupons.map((coupon) => {
          return <Coupon key={coupon.coupons_id} coupon={coupon} removeCoupon={removeCoupon} />;
        })}
        <h2 className="notApproved"><span className="yellowText">Ikke</span> Godkendte tilmeldinger</h2>
        {couponsNotApproved.map((coupon) => {
          return <Coupon key={coupon.coupons_id} coupon={coupon} removeCoupon={removeCoupon} />;
        })}
      </div>
    </div>
  );
};

export default Overview;
