import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getAuth } from "firebase/auth";
import {
  Box,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  Paper as MuiPaper,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { useHistory } from "react-router-dom";
import CheckboxLabels from "../Components/Checkbox";
import { updateAdmin } from "../NetworkCalls/Admin/ServerReq";
import InputField from "../Components/inputfield";
import ButtonComponent from "../Components/buttton";


const Divider = styled(MuiDivider)(spacing);

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

function BasicBreadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={"/dashboard/nfts"} underline="hover" color="#000" style={{ color: "#000" }}>
          Admins
        </Link>
        <Typography color="text.primary" style={{ fontWeight: '500' }}>Edit Admin</Typography>
      </Breadcrumbs>
    </div>
  );
}

const EditUser = () => {

  const { state } = useLocation();

  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const auth = getAuth();

  const [data, setData] = useState({ ...state });

  console.log('state', data);



  const boxes = [
    { Label: "Admins", Check: true },
    { Label: "NFTs", Check: true },
    // { Label: "Offers", Check: false },
    { Label: "Refund Requests", Check: true },
    { Label: "Purchase History", Check: true },
    // { Label: "Order Tracking", Check: false },
    // { Label: "E-Tags", Check: false },
  ];

  const boxesUpdate = data?.Permission ? boxes.map(item => data.Permission.includes(item.Label) ? item : { ...item, Check: false }) : [];

  const [Checkboxes, setCheckboxes] = useState(boxesUpdate);
  const [Error, setError] = useState("")


  useEffect(() => {
    if (!state) {
      return history.push({ pathname: "/dashboard/users" });
    }
    console.log(state)
    return () => {
      setError("")
    }
  }, [])


  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  // console.log(Checkboxes);

  const addCheckboxes = (e) => {
    const { name } = e.target;

    const update = Checkboxes.map(item => (item.Label === name) ? { ...item, Check: !item.Check } : item);
    setCheckboxes(update);
  }


  async function handleClick(event) {
    event.preventDefault();

    // if (data.rePassword !== data.password) return setError("Password didn't matched!")

    // if (data.password.split("").length < 6) return setError('Password should be at least 6 characters!')
    const permissions = Checkboxes.filter(item => item.Check);

    if (permissions.length == 0) return setError('Please select atleast 1 permission!')



    try {

      setLoader(true);
      setError("");
      const { AdminId, ...rest } = data
      console.log(rest)
      const res = await updateAdmin(data._id, {
        ...rest,
        Permission: permissions.map(item => item.Label),
      })
      console.log(res);
      if (res.status == 200) {
        setLoader(false);
        history.push({ pathname: "/dashboard/admins" });

      } else {
        setError(res.error.message);
        setLoader(false);

      }

    } catch (err) {
      console.log("err", err);
      setError("Something went wrong!");
      setLoader(false);

    } finally {
      setLoader(false);
    }
  }

  return (
    <React.Fragment>
      <Grid
        style={{ marginBottom: "10px" }}
        justify="space-between"
        container
        spacing={24}
      >
        <Grid item>
          <Typography variant="h4" gutterBottom display="inline">
            Edit Admin
          </Typography>
        </Grid>
      </Grid>

      <Divider my={6} style={{ marginTop: "20px", marginBottom: "20px", backgroundColor: "#fafafa" }} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <BasicBreadcrumbs />
        </Grid>
      </Grid>

      <Divider my={6} style={{ marginTop: "20px", marginBottom: "20px", backgroundColor: "#fafafa" }} />
      <div className='dashboard_container'>
        <form onSubmit={handleClick} style={{ width: "97%" }}>
          <Grid
            style={{ marginBottom: "10px", marginTop: "35px" }}
            container
            spacing={2}
          >
            <Grid item xs={12} xl={6} lg={6} md={6}>
              <InputField
                type='text'
                name='FullName'
                placeholder={"Full Name"}
                onChange={handleOnchange}
                defaultValue={data.FullName}
              />

            </Grid>

            <Grid item xs={12} xl={6} lg={6} md={6}>
              <InputField
                type='email'
                name='Email'
                placeholder={"Email"}
                onChange={handleOnchange}
                defaultValue={data.Email}
              />
            </Grid>
          </Grid>

          <Grid>
            <Box mt={5}>
              <Typography color="text.primary">
                Permissions *
              </Typography>
            </Box>
          </Grid>

          {Checkboxes.map(item => <CheckboxLabels
            onClick={addCheckboxes}
            check={item.Check}
            Label={item.Label} />)}



          <Box mt={2}>
            <Typography style={{ color: "#E12F2F" }}>
              {Error}
            </Typography>
          </Box>
          {/* <button>hdsdsu</button> */}
          <Grid container justifyContent="center" sx={{ marginTop: "30px", width: '50%' }}>
            <ButtonComponent loader={loader} name='Update' dashboard={true} />
          </Grid>

        </form>
      </div>
    </React.Fragment>
  );
};

export default EditUser;
