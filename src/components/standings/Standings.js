import React, {useState, useEffect} from "react";
import axios from "axios";
import environment from "../../environment";

const Standings = () => {

  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios.get(`${environment[0]}/server/endpoints/all.php`)
    .then((response) => {
      console.log(response);
      if(response.data.code === 200) {
        setCoupons(response.data.coupons)
      }
    }).catch((error) => {
      console.log(error)
    }).finally(()=> {
      setLoading(false)
    })

  }, [])

  return <div className="container mx-auto flex flex-wrap flex-row justify-between">
    <section className="text-left text-lg">
      <h3>Med i kampen!</h3>
      {coupons.map(({name, paid}) => {
        if(paid === 1) {
            return <p>{name}</p>
          }
      })}
      <p>asdsadasdsadasdasds</p>
    </section>
    <section className="text-left text-lg">
      <h3>Næsten med...</h3>
      {coupons.map(({name, paid}) => {
        if(paid === 0) {
            return <p>{name}</p>
          }
      })}
    </section>
  </div>;
};

export default Standings;
