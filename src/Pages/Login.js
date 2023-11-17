import React, { useEffect, useState } from "react";
import { TextField, Typography } from "@mui/material";
import "./Login.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../Assets/riwa-admin-logo.svg";
import InputField from "../Components/inputfield";
import ButtonComponent from "../Components/buttton";
import axios from "axios";

const LoginScreen = () => {
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [Error, setError] = useState("");
  const [data, setData] = useState({
    Email: "",
  });

  const auth = getAuth();

  useEffect(() => {}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    //  console.log("e.target",e.target.value)
    setData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handlePermissions = (arr) => {
    console.log(arr);
    return arr.includes("Admin") || arr.includes("Admins");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoader(true);
    try {
      window.sessionStorage.setItem("info", JSON.stringify("response"));

      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        data
      );
      console.log("response", response);
      window.sessionStorage.setItem("info", JSON.stringify(response?.data));

      history.push({ pathname: "/dashboard/admins" });
    } catch (err) {
      setError(err?.response?.data?.message);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div className="main_container">
        <div className="header">
          <img src={logo} />
        </div>

        <div className="login_container">
          <div
            style={{
              margin: "40px 20px 10px 20px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <h1>Welcome</h1>
            <Typography sx={{ color: "#757575" }}>Riwa Dashboard</Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="textfields_div">
              <InputField
                type="email"
                name="Email"
                value={data.Email}
                placeholder={"Email"}
                onChange={handleChange}
              />
            </div>

            <div className="textfields_div">
              <InputField
                type="password"
                name="Password"
                value={data.Password}
                placeholder={"Password"}
                onChange={handleChange}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "10px",
              }}
            >
              <Link
                to={{
                  pathname: "forget",
                  // state: row,
                }}
                // onClick={(e) => e.preventDefault()}
                style={{
                  color: "#000",
                  textDecoration: "none",
                  fontWeight: "400",
                }}
              >
                Forgot Password?
              </Link>
            </div>

            <div>
              <ButtonComponent loader={loader} name="Login" />
              <div
                style={{
                  color: "#E12F2F",
                  fontWeight: 500,
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                {Error}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
