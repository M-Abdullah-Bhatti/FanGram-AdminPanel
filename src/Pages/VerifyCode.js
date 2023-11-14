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



const VerifyCode = () => {
    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const [Error, setError] = useState("");
    const [data, setData] = useState({
        Email: "",
        Code: "",
    });

    const auth = getAuth();

    useEffect(() => {

    }, []);

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
            // console.log(window.sessionStorage.getItem("email"), "email");
            // setData({ ...data, Email: window.sessionStorage.getItem("email") })
            const response = await axiosInstance.post("admin/verifycode", {
                Email: window.sessionStorage.getItem("email"),
                Code: Number(data.Code),
            })
            history.push({ pathname: "/newpassword" });
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
                        <h1>Code Verification</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='textfields_div'>

                            <InputField
                                type='number'
                                name='Code'
                                value={data.Code}
                                placeholder={"Enter Code"}
                                onChange={handleChange}
                            />
                        </div>



                        <div>
                            <ButtonComponent loader={loader} name='Verify' />

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

export default VerifyCode;
