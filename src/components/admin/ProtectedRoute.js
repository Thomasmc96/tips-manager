import React, {useState, useEffect} from "react";
import { Navigate } from 'react-router-dom';
import axios from "axios";
import environment from "../../environment";

const ProtectedRoute = ({
    children,
  }) => {

    const [authorized, setAuthorized] = useState()

    useEffect(() =>{
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
        return setAuthorized(false);
      }
        axios.post(
            `${environment[0]}/server/endpoints/admin/verify.php`, {},
            {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
                }
            }).then((response) => {
              console.log(response)
              if(response.data.code === 200) {
               setAuthorized(true);
               return authorized;
              } else {
                setAuthorized(false)
              }
            }).catch((error)=> {
              console.log(error)
            })
    }, []);

    if (authorized === undefined) return null;

    return authorized ? children : <Navigate to="/login" replace/>;
  };

  export default ProtectedRoute;