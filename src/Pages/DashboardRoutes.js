import React, { useEffect } from "react";
import { useLocation, Switch, Route, useHistory } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { Addroutes, Editroutes, routes } from "../Routes/RoutesName";

function DashboardRoutes(props) {
  const [Loading, setLoading] = React.useState(false);
  const Info = window.sessionStorage.getItem("info");
  return (
    <div>
      <Sidebar
        Loading={Loading}
        // Permissions={JSON.parse(Info)?.res.Permission}
      />
      <div className="table">
        <Switch>
          {routes.map((route, ind) => {
            return (
              <Route
                exact
                path={"/dashboard/" + route.name.toLocaleLowerCase()}
                component={route.component}
              />
            );
          })}
          {Editroutes.map((route, ind) => {
            return (
              <Route
                exact
                path={"/dashboard/" + route.name.toLocaleLowerCase()}
                component={route.component}
              />
            );
          })}
          {Addroutes.map((route, ind) => {
            return (
              <Route
                exact
                path={"/dashboard/" + route.name.toLocaleLowerCase()}
                component={route.component}
              />
            );
          })}
        </Switch>
      </div>
    </div>
  );
}

export default DashboardRoutes;
