import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./Login.css";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { Link } from "@mui/material";
import { axiosInstance } from "../axios"
import logo from '../Assets/riwa-admin-logo.svg'
import InputField from "../Components/inputfield";
import ButtonComponent from "../Components/buttton";


const ForgetPassword = () => {
    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const [Error, setError] = useState("");
    const [data, setData] = useState({
        Email: "",
    });



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

    // const handleSubmit=(event)=>{

    // }

    const handleSubmit = async (event) => {

        try {
            event.preventDefault();
            setError("")
            setLoader(true);
            console.log(data);
            const response = await axiosInstance.post("admin/forgetpassword", data)
            // console.log(response);
            window.sessionStorage.setItem("email", data.Email)
            history.push({ pathname: "/verify" });
        } catch (err) {
            setError(err.response.data.message)
            console.log(err);
            setLoader(false);
        }
        finally {
            setLoader(false);
        }
    };

    return (
        <>
            <div className="main_container">

                <div className='header'>
                    <img src={logo} />
                </div>

                <div className='login_container'>
                    <div style={{ margin: "40px 20px 10px 20px", width: '100%', textAlign: "center" }}>
                        <h1>Forgot Password</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='textfields_div'>
                            <InputField
                                type='email'
                                name='Email'
                                value={data.Email}
                                placeholder={"Email"}
                                onChange={handleChange}
                            />
                        </div>



                        <div>
                            <ButtonComponent loader={loader} name='Forgot' />
                            <div
                                style={{
                                    color: "#E12F2F",
                                    fontWeight: 500,
                                    textAlign: "center",
                                    fontSize: "14px",
                                }}>
                                {Error}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgetPassword;
