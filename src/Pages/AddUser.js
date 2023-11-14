import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import {
	getAuth,
	onAuthStateChanged,
} from "firebase/auth";

import {
	Box,
	Chip as MuiChip,
	Divider as MuiDivider,
	Grid,
	IconButton,
	Paper as MuiPaper,
	Toolbar,
	Tooltip,
	Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import { useHistory } from "react-router-dom";
import CheckboxLabels from "../Components/Checkbox";
import { createAdmin } from "../NetworkCalls/Admin/ServerReq";
import InputField from "../Components/inputfield";
import ButtonComponent from "../Components/buttton";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const Divider = styled(MuiDivider)(spacing);

function handleClick(event) {
	event.preventDefault();
	console.info("You clicked a breadcrumb.");
}

function BasicBreadcrumbs() {
	return (
		<div role='presentation' onClick={handleClick}>
			<Breadcrumbs aria-label='breadcrumb'>
				<Link
					to={"/dashboard/nfts"}
					underline='hover'
					color='#000'
					style={{ color: "#000" }}>
					Admins
				</Link>
				<Typography color='text.primary' style={{ fontWeight: "500" }}>
					Add New Admin
				</Typography>
			</Breadcrumbs>
		</div>
	);
}

const AddUser = () => {
	const history = useHistory();
	const [loader, setLoader] = useState(false);
	const auth = getAuth();
	const [data, setData] = useState({
		FullName: "",
		Email: "",
		Password: "",
		Permission: [],
		rePassword: "",
	});

	const boxes = [
		{ Label: "Admins", Check: false },
		{ Label: "NFTs", Check: false },
		// { Label: "Offers", Check: false },
		{ Label: "Refund Requests", Check: false },
		{ Label: "Purchase History", Check: false },
		// { Label: "Order Tracking", Check: false },
		// { Label: "E-Tags", Check: false },
	];
	const [Checkboxes, setCheckboxes] = useState(boxes);
	const [Error, setError] = useState("");
	const handleOnchange = (e) => {
		const { name, value } = e.target;
		setData((preValue) => {
			return {
				...preValue,
				[name]: value,
			};
		});
	};

	const addCheckboxes = (e) => {
		const { name } = e.target;

		const update = Checkboxes.map((item) =>
			item.Label === name ? { ...item, Check: !item.Check } : item
		);
		setCheckboxes(update);
		console.log(update);
		// setCheckboxes(preValue => {
		//   return {
		//     ...preValue,
		//     [name]: value
		//   }
		// })
	};

	useEffect(() => {
		return () => {
			setError("");
		};
	}, []);

	async function handleClick(event) {
		event.preventDefault();

		if (data.rePassword !== data.Password)
			return setError("Password didn't matched!");

		const permissions = Checkboxes.filter((item) => item.Check);
		if (data.Password.split("").length < 6)
			return setError("Password should be at least 6 characters!");
		if (permissions.length == 0)
			return setError("Please select atleast 1 permission!");

		try {
			setLoader(true);
			setError("");

			const { rePassword, ...rest } = data;
			const res = await createAdmin({
				...rest,
				Permission: permissions.map((item) => item.Label),
			});
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
		} finally {
			setLoader(false);
		}
	}

	return (
		<React.Fragment>
			<Grid
				style={{ marginBottom: "10px" }}
				justify='space-between'
				container
				spacing={24}>
				<Grid item>
					<Typography
						gutterBottom
						variant='h3'
						display='inline'
						style={{
							fontWeight: "700",
							letteSpacing: "0.2px",
							fontSize: "25px",
						}}>
						Add Admin
					</Typography>
				</Grid>
			</Grid>

			<Divider
				my={6}
				style={{
					marginTop: "20px",
					marginBottom: "20px",
					backgroundColor: "#fafafa",
				}}
			/>

			<Grid container spacing={6}>
				<Grid item xs={12}>
					<BasicBreadcrumbs />
				</Grid>
			</Grid>

			<Divider
				my={6}
				style={{
					marginTop: "20px",
					marginBottom: "20px",
					backgroundColor: "#fafafa",
				}}
			/>
			<div className='dashboard_container'>
				<form onSubmit={handleClick} style={{ width: "97%" }}>
					<Grid
						style={{ marginBottom: "10px", marginTop: "35px" }}
						container
						spacing={2}>
						<Grid item xs={12} xl={6} lg={6} md={6}>
							<InputField
								type='text'
								name='FullName'
								placeholder={"Full Name"}
								onChange={handleOnchange}
							/>
						</Grid>

						<Grid item xs={12} xl={6} lg={6} md={6}>
							<InputField
								placeholder={"Email"}
								type='email'
								name='Email'
								required
								onChange={handleOnchange}
							/>
						</Grid>

						<Grid item xs={12} xl={6} lg={6} md={6}>
							<InputField
								type='password'
								placeholder='Password'
								name='Password'
								required
								onChange={handleOnchange}
							/>
						</Grid>

						<Grid item xs={12} xl={6} lg={6} md={6}>
							<InputField
								type='password'
								placeholder='Re Enter Password'
								name='rePassword'
								required
								onChange={handleOnchange}
							/>
						</Grid>

						{/* <Grid item xs={12} xl={12} lg={12} md={12}>
            <TextField
              className="input_fields"
              variant="standard"
              id="desc"
              multiline
              type="text"
              label="Insert Text Here"
              color="primary"
              name="description"
              onChange={handleOnchange}
            />
          </Grid> */}
					</Grid>

					<Grid>
						<Box mt={5}>
							<Typography color='text.primary'>Permissions *</Typography>
						</Box>
					</Grid>

					{Checkboxes.map((item) => (
						<CheckboxLabels
							onClick={addCheckboxes}
							check={item.Check}
							Label={item.Label}
						/>
					))}

					<Box mt={2}>
						<Typography style={{ color: "#E12F2F" }}>{Error}</Typography>
					</Box>

					<Grid
						container
						justifyContent='center'
						sx={{ marginTop: "30px", width: "50%" }}>
						<ButtonComponent loader={loader} name='Save' dashboard={true} />
					</Grid>
				</form>
			</div>
		</React.Fragment>
	);
};

export default AddUser;
