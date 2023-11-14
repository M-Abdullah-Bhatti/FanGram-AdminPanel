import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const ProtectedRoute = (props) => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    // const Info = window.sessionStorage.getItem('info');
    // const userToken=JSON.parse(Info).token
    // if (!userToken || userToken === 'undefined') {
    //     setIsLoggedIn(false);
    //     return history.push({pathname:'/'});
    // }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};
export default ProtectedRoute;
