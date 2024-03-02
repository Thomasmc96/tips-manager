import React, { useState, useEffect } from "react";
import axios from "axios";
import environment from "../../environment";
import Coupon from "./Coupon";
import AdminMenu from "./AdminMenu";
import { sortByUpdated } from "../Utils";
import Loader from "../utils/Loader";

const Overview = () => {
  return (
    <div className="overview container">
      <div>
        <AdminMenu />
        <Coupons />
      </div>
    </div>
  );
};

const Coupons = () => {
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
    if (coupon.paid == '1') {

      let copy = coupons;

      copy = copy.filter((c) => {
        return c.coupons_id !== coupon.coupons_id
      });

      setCoupons(copy);
    } else {
      let copy = couponsNotApproved;

      copy = copy.filter((c) => {
        return c.coupons_id !== coupon.coupons_id
      });

      setCouponsNotApproved(copy);
    }

  }

  const changeCouponState = (coupon, isApproved) => {
    coupon.updated_dtm = new Date().toISOString();

    if (isApproved) {
      let copy = coupons;
      coupon.paid = "1";
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

      let copy2 = coupons;
      copy2 = copy2.filter((c) => {
        return c.coupons_id !== coupon.coupons_id
      });
      setCoupons(copy2);
    }
  }

  if (loading) {
    return (
      <div className="flex mx-auto justify-center h-40 items-center">
        <Loader/>
      </div>
    );
  }

  return (
    <>
      <h2 className="apporvedHeadline"><span className="yellowText">Godkendte</span> tilmeldinger</h2>
      {coupons.length === 0 && <p className=" normal-case">Ingen godkendte tilmeldinger</p>}
      {sortByUpdated(coupons).map((coupon) => {
        return <Coupon key={coupon.coupons_id} coupon={coupon} removeCoupon={removeCoupon} changeCouponState={changeCouponState} />;
      })}

      <h2 className="notApprovedHeadline"><span className="yellowText">Ikke</span> Godkendte tilmeldinger</h2>
      {couponsNotApproved.length === 0 && <p className=" normal-case">Ingen ikke-godkendte tilmeldinger</p>}
      {sortByUpdated(couponsNotApproved).map((coupon) => {
        return <Coupon key={coupon.coupons_id} coupon={coupon} removeCoupon={removeCoupon} changeCouponState={changeCouponState}/>;
      })}
    </>
  )
}

export default Overview;
