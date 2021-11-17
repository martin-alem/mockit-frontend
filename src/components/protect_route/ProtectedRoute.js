import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { httpAgent } from "./../../util/util";

function ProtectedRoute({ component: Component, ...rest }) {
  const userContext = React.useContext(UserContext);
  React.useEffect(() => {
    const { _id } = userContext.loggedInUser.user || "";
    const url = `http://localhost:5000/api/v1/user/${_id}`;
    const method = "GET";
    const data = {};
    httpAgent(url, method, data)
      .then(response => {
        if (!response.ok) {
          window.localStorage.removeItem("logged_in_user");
          window.location.replace("/");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [rest.path]);
  return (
    <Route
      {...rest}
      render={props => {
        if (
          JSON.parse(localStorage.getItem("logged_in_user")) &&
          Object.keys(JSON.parse(localStorage.getItem("logged_in_user"))).length > 0
        ) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ path: "/", state: { from: props.location } }} />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
