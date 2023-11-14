import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DashboardRoutes from "../Pages/DashboardRoutes";
import Login from "../Pages/Login";
import ProtectedRoute from "../utils/ProtectedRoute";
import ForgetPassword from "../Pages/ForgetPassword";
import VerifyCode from "../Pages/VerifyCode";
import NewPassword from "../Pages/NewPassword";

const Routes = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path={"/forget"} component={ForgetPassword} />
          <Route exact path={"/verify"} component={VerifyCode} />
          <Route exact path={"/newpassword"} component={NewPassword} />

          <Route path="/dashboard/">
            <DashboardRoutes />
          </Route>

          {/* <ProtectedRoute>
            <Route path="/dashboard/">
              <DashboardRoutes />
            </Route>
          </ProtectedRoute> */}

          <Route path="/dashboard/">
            <DashboardRoutes />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
