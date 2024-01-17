import axios from "axios";
import environment from "../environment";

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + (h * 60 * 60 * 1000));
  return this;
}

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

export const sortByKickOff = (matches) => {
  const matchesSorted = matches.sort((a, b) => {
    if (a.kickoff_dtm < b.kickoff_dtm) {
      return -1;
    }
    if (a.kickoff_dtm > b.kickoff_dtm) {
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
          "Authorization": `Bearer ${jwt}`,
        },
      }
    )
    .then((response) => {
      if (response.data.code === 200) {
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

export const getPodium = (coupons) => {
  let podium = {
    first: { names: [], totalPrize: 0, sharedPrize: 0 },
    second: { names: [], totalPrize: 0, sharedPrize: 0 },
    third: { names: [], totalPrize: 0, sharedPrize: 0 },
  };
  let sortedCoupons = sortByWins(coupons);

  podium = getPodiumNames(podium, sortedCoupons);

  let prizes = getPodiumPrizes(podium, sortedCoupons.length);
  podium.first.totalPrize = prizes.first.totalPrize;
  podium.second.totalPrize = prizes.second.totalPrize;
  podium.third.totalPrize = prizes.third.totalPrize;
  podium.first.sharedPrize = prizes.first.sharedPrize;
  podium.second.sharedPrize = prizes.second.sharedPrize;
  podium.third.sharedPrize = prizes.third.sharedPrize;

  return podium;
};

const getPodiumNames = (podium, sortedCoupons) => {
  let lastAmountCorrect = 9999;

  for (let i = 0; i < sortedCoupons.length; i++) {
    if (
      podium.first.names.length +
      podium.second.names.length +
      podium.third.names.length >
      2 &&
      sortedCoupons[i].amountCorrect !== lastAmountCorrect
    ) {
      break;
    }

    if (sortedCoupons[i].amountCorrect < lastAmountCorrect) {
      if (podium.first.names.length === 0) {
        podium.first.names.push(sortedCoupons[i].name);
      } else if (
        podium.second.names.length === 0 &&
        podium.first.names.length === 1
      ) {
        podium.second.names.push(sortedCoupons[i].name);
      } else if (podium.third.names.length === 0) {
        podium.third.names.push(sortedCoupons[i].name);
      }
    }

    if (sortedCoupons[i].amountCorrect === lastAmountCorrect) {
      if (podium.third.names.length > 0) {
        podium.third.names.push(sortedCoupons[i].name);
      } else if (podium.second.names.length > 0) {
        podium.second.names.push(sortedCoupons[i].name);
      } else if (podium.first.names.length > 0) {
        podium.first.names.push(sortedCoupons[i].name);
      }
    }

    lastAmountCorrect = sortedCoupons[i].amountCorrect;
  }
  return podium;
};
const getPodiumPrizes = (podium, totalCoupons) => {
  let firstTotalPrize = totalCoupons * 100 * 0.7;
  let secondTotalPrize = totalCoupons * 100 * 0.2;
  let thirdTotalPrize = totalCoupons * 100 * 0.1;

  if (podium.third.names.length === 0) {
    secondTotalPrize = secondTotalPrize + thirdTotalPrize;
    thirdTotalPrize = 0;
  }

  if (podium.second.names.length === 0) {
    firstTotalPrize = firstTotalPrize + secondTotalPrize;
    secondTotalPrize = 0;
  }

  let firstSharedPrize = firstTotalPrize / podium.first.names.length;
  let secondSharedPrize = secondTotalPrize / podium.second.names.length;
  let thirdSharedPrize = thirdTotalPrize / podium.third.names.length;

  return {
    first: {
      totalPrize: toFixedIfNecessary(firstTotalPrize, 2),
      sharedPrize: toFixedIfNecessary(firstSharedPrize, 2),
    },
    second: {
      totalPrize: toFixedIfNecessary(secondTotalPrize, 2),
      sharedPrize: toFixedIfNecessary(secondSharedPrize, 2),
    },
    third: {
      totalPrize: toFixedIfNecessary(thirdTotalPrize, 2),
      sharedPrize: toFixedIfNecessary(thirdSharedPrize, 2),
    },
  };
};

const toFixedIfNecessary = (value, dp) => {
  return +parseFloat(value).toFixed(dp);
}

export const countryName = (code) => {
  return countries.find((country) => country.code === code).name
}

export const countries = [
  {
    'code': 'ger',
    'name': 'Tyskland'
  },
  {
    'code': 'bel',
    'name': 'Belgien',
  },
  {
    'code': 'fra',
    'name': 'Frankrig'
  },
  {
    'code': 'por',
    'name': 'Portugal'
  },
  {
    'code': 'esp',
    'name': 'Spanien'
  },
  {
    'code': 'sco',
    'name': 'Skotland'
  },
  {
    'code': 'tur',
    'name': 'Tyrkiet'
  },
  {
    'code': 'aut',
    'name': 'Østrig'
  },
  {
    'code': 'eng',
    'name': 'England'
  },
  {
    'code': 'hun',
    'name': 'Ungarn'
  },
  {
    'code': 'svk',
    'name': 'Slovakiet'
  },
  {
    'code': 'alb',
    'name': 'Albanien'
  },
  {
    'code': 'den',
    'name': 'Danmark'
  },
  {
    'code': 'ned',
    'name': 'Holland'
  },
  {
    'code': 'rom',
    'name': 'Rumænien'
  },
  {
    'code': 'sui',
    'name': 'Schweiz'
  },
  {
    'code': 'srb',
    'name': 'Serbien'
  },
  {
    'code': 'slo',
    'name': 'Slovenien'
  },
  {
    'code': 'ita',
    'name': 'Italien'
  },
  {
    'code': 'cze',
    'name': 'Tjekkiet'
  },
  {
    'code': 'cro',
    'name': 'Kroatien'
  },
  {
    'code': 'plvinderA',
    'name': 'Play off vinder A'
  },
  {
    'code': 'plvinderB',
    'name': 'Play off vinder B'
  },
  {
    'code': 'plvinderC',
    'name': 'Play off vinder C'
  },
  {
    'code': 'pol',
    'name': 'Polen'
  },
  {
    'code': 'est',
    'name': 'Estland'
  },
  {
    'code': 'wal',
    'name': 'Wales'
  },
  {
    'code': 'fin',
    'name': 'Finland'
  },
  {
    'code': 'isr',
    'name': 'Israel'
  },
  {
    'code': 'ice',
    'name': 'Island'
  },
  {
    'code': 'bos',
    'name': 'Bosnien'
  },
  {
    'code': 'ukr',
    'name': 'Ukraine'
  },
  {
    'code': 'geo',
    'name': 'Georgien'
  },
  {
    'code': 'lux',
    'name': 'Luxembourg'
  },
  {
    'code': 'gre',
    'name': 'Grækenland'
  },
  {
    'code': 'kaz',
    'name': 'Kasakhstan'
  },
]
