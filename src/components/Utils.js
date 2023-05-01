import axios from "axios";
import environment from "../environment";

const getDate = (timestamp) => {
  let date = new Date(timestamp);
  return date.getDate() + ". " + getMonthName(date.getMonth() + 1);
};

const getTime = (timestamp) => {
  let date = new Date(timestamp);
  let time = date.toTimeString();
  return time.substring(0, 5);
};

const getMonthName = (monthNumber) => {
  switch (monthNumber) {
    case 1:
      return "Januar";
    case 2:
      return "Februar";
    case 3:
      return "Marts";
    case 4:
      return "April";
    case 5:
      return "Maj";
    case 6:
      return "Juni";
    case 7:
      return "Juli";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "Oktober";
    case 11:
      return "November";
    case 12:
      return "December";
  }
};

export const getDateString = (timestamp) => {
  return getDate(timestamp) + " " + getTime(timestamp);
};

export const sortByDate = (matches) => {
  const matchesSorted = matches.sort((a, b) => {
    if (a.startDate < b.startDate) {
      return -1;
    }
    if (a.startDate > b.startDate) {
      return 1;
    }

    return 0;
  });
  return matchesSorted;
};

export const sortByWins = (coupons) => {
  const couponsSorted = coupons.sort((a, b) => {
    if (a.amountCorrect < b.amountCorrect) {
      return 1;
    }
    if (a.amountCorrect > b.amountCorrect) {
      return -1;
    }

    return 0;
  });
  return couponsSorted;
};

export const verify = async () => {
  let verified = false;

  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    return false;
  }
  
  await axios
    .post(
      `${environment[0]}/server/endpoints/admin/verify.php`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
      }
    )
    .then((response) => {
      if (response.data.code === 200) {
        console.log(response);
        verified = true;
      } else {
        console.log(response);
        localStorage.removeItem("jwt");
        localStorage.removeItem("name");
        verified = false;
      }
    })
    .catch((error) => {
      console.log(error);
      verified = false;
    });

  return verified;
};
