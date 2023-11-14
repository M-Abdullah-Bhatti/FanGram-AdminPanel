import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import upload from "../Assets/drag.svg";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import {
	Box,
	Chip as MuiChip,
	Divider as MuiDivider,
	Grid,
	Paper as MuiPaper,
	Typography,
} from "@material-ui/core";
import { green, orange, red } from "@material-ui/core/colors";
import { spacing } from "@material-ui/system";
import "quill/dist/quill.snow.css";
import cross from "../Assets/cross.svg";
import Drag from "../Components/draganddrop";
import Successmodal from "../Components/modals/successmodal";
import { uploadImage } from "../NetworkCalls/firebaseCalls";
import { addProduct } from "../NetworkCalls/Products/ServerReq";
import InputField from "../Components/inputfield";
import { SelectInput } from "../Components/SelectInput";
import ButtonComponent from "../Components/buttton";
import { toast } from "react-toastify";

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

const Paper = styled(MuiPaper)(spacing);

const Chip = styled(MuiChip)`
	${spacing};
	background: ${(props) => props.shipped && green[500]};
	background: ${(props) => props.processing && orange[700]};
	background: ${(props) => props.cancelled && red[500]};
	color: #fff;
`;

const Spacer = styled.div`
	flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
	min-width: 150px;
`;

function BasicBreadcrumbs() {
	return (
		<div
			role='presentation'
			onClick={() => {
				console.log("u clicked breadcrumb");
			}}>
			<Breadcrumbs aria-label='breadcrumb'>
				<Link
					to={"/dashboard/nfts"}
					underline='hover'
					color='#000'
					style={{ color: "#000" }}>
					NFTs
				</Link>
				<Typography color='text.primary' style={{ fontWeight: "500" }}>
					Add New NFT
				</Typography>
			</Breadcrumbs>
		</div>
	);
}

const AddProduct = () => {
	const history = useHistory();
	const [loader, setLoader] = useState(false);
	const [Productdata, setProductdata] = useState({
		Name: "",
		Category: "",
		Material: "",
		Price: "",
		Status: "",
		ProductionTime: "",
		Description: "",
		Artist: "",
		Size: "",
	});
	const [imgweb, setImgweb] = useState("");
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(!open);
		history.push({ pathname: "/dashboard/nfts" });
		// setUpdate(!dataupdate)
	};
	const handleOnchange = (e) => {
		const { name, value } = e.target;
		setProductdata((preValue) => {
			return {
				...preValue,
				[name]: value,
			};
		});
	};

	async function handleClick(event) {
		event.preventDefault();
		setLoader(true);
		try {
			if (
				Productdata.Name == "" ||
				Productdata.Description == "" ||
				imgweb == ""
			) {
				alert("Please Input All Fields");
				setLoader(false);
			} else {
				uploadImage(imgweb)
					.then(async (url) => {
						try {
							const Product = await addProduct({
								...Productdata,
								Price: parseInt(Productdata.Price),
								ProductImage: url,
							});
							if (Product == undefined) {
								toast.error("Product name is already registered");
								setLoader(false);
							} else {
								setOpen(true);
								setLoader(false);
							}
						} catch (error) {
							console.log(error);
							setLoader(false);
						}

						// Use the URL value in your code
					})
					.catch((error) => {
						console.log("Error:", error);
						// Handle the error if necessary
						setLoader(false);
					});
			}
		} catch (err) {
			console.log(err);
			setLoader(false);
		}
	}

	const { setDragOver, onDragOver, onDragLeave, setFileDropError } = Drag();

	const onDrop = (e) => {
		e.preventDefault();

		setDragOver(false);

		const selectedFile = e?.dataTransfer?.files[0];

		if (selectedFile.type.split("/")[0] !== "image") {
			return setFileDropError("Please provide an image file to upload!");
		}

		setImgweb(selectedFile);
		console.log(selectedFile);
	};

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
						Add NFT
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
						justify='space-around'
						container
						spacing={2}>
						<Grid item xs={12} xl={12} lg={12} md={12}>
							<p style={{ fontSize: "11px", marginBottom: "20px" }}>
								Upload File
							</p>

							<div className='addImage'>
								{imgweb == "" ? (
									<div className='imagebody'>
										<img
											src={upload}
											style={{ marginBottom: "20px", objectFit: "cover" }}
											alt='uploadImg'
										/>
										<p style={{ textAlign: "center" }}>
											Drag and drop an image, or{" "}
											<label
												for='upload-photo'
												className='upload-label'
												onDragOver={onDragOver}
												onDragLeave={onDragLeave}
												onDrop={onDrop}>
												Browse{" "}
											</label>
											<input
												type='file'
												name='WebImage'
												onChange={(e) => {
													setImgweb(e.target.files[0]);
												}}
												id='upload-photo'
												style={{ display: "none" }}
												required={true}
											/>
											<br /> 1600x1200 or higher recommended. Max 10MB.
										</p>
									</div>
								) : (
									<>
										<label
											for='upload-photo'
											className='upload-label'
											style={{
												width: "100%",
												height: "100%",
												position: "relative",
											}}
											onDragOver={onDragOver}
											onDragLeave={onDragLeave}
											onDrop={onDrop}>
											<img
												src={cross}
												style={{
													width: "35px",
													top: "-20px",
													position: "absolute",
													right: "-15px",
												}}
												onClick={() => setImgweb("")}
											/>
											<input
												type='file'
												name='WebImage'
												onChange={(e) => {
													setImgweb(e.target.files[0]);
												}}
												id='upload-photo'
												style={{ display: "none" }}
											// required={true}
											/>
											{/* <img/> */}
											<img
												src={URL.createObjectURL(imgweb)}
												style={{
													width: "100%",
													height: "100%",
													objectFit: "cover",
												}}
												alt='uploadedImg'
											/>
										</label>
									</>
								)}
							</div>
						</Grid>
					</Grid>

					<Grid
						style={{ marginBottom: "10px", marginTop: "35px" }}
						justify='space-around'
						container
						spacing={2}>
						<Grid item xs={12} xl={6} lg={6} md={6}>
							<InputField
								type='text'
								name='Name'
								placeholder={"NFT Name"}
								onChange={handleOnchange}
							/>
						</Grid>

						<Grid item xs={12} xl={6} lg={6} md={6}>
							<Box sx={{ minWidth: 120 }}>
								<SelectInput
									options={[
										{ name: "Artwork" },
										{ name: "Antique" },
										{ name: "Collections" },
										{ name: "Digital Artist" },
									]}
									placeholder={"Category"}
									selecthandle={handleOnchange}
									name='Category'
									value={Productdata?.Category}
								/>
							</Box>
						</Grid>
					</Grid>

					<Grid
						style={{ marginBottom: "10px", marginTop: "35px" }}
						// justify="space-around"
						container
						spacing={2}>
						<Grid item xs={6} xl={6} lg={6} md={6}>
							<InputField
								type='text'
								name='Price'
								placeholder={"Price(USDT)"}
								onChange={handleOnchange}
							/>
						</Grid>
					</Grid>

					<Grid
						style={{ marginBottom: "10px", marginTop: "35px" }}
						justify='space-around'
						container
						spacing={2}>
						<Grid item xs={12} xl={6} lg={6} md={6}>
							<InputField
								type='text'
								name='Material'
								placeholder={"Material"}
								onChange={handleOnchange}
								require={false}
							/>
						</Grid>

						<Grid item xs={12} xl={6} lg={6} md={6}>
							<InputField
								type='text'
								name='Artist'
								placeholder={"Artist"}
								onChange={handleOnchange}
								require={false}
							/>
						</Grid>
					</Grid>

					<Grid
						style={{ marginBottom: "10px", marginTop: "35px" }}
						justify='space-around'
						container
						spacing={2}>
						<Grid item xs={12} xl={6} lg={6} md={6}>
							<InputField
								type='text'
								name='ProductionTime'
								placeholder={"Production time"}
								onChange={handleOnchange}
								require={false}
							/>
						</Grid>

						<Grid item xs={12} xl={6} lg={6} md={6}>
							<InputField
								type='text'
								name='Size'
								placeholder={"Size"}
								onChange={handleOnchange}
								require={false}
							/>
						</Grid>
					</Grid>

					<Grid
						style={{ marginBottom: "10px", marginTop: "35px" }}
						container
						spacing={2}>
						<Grid item xs={12} xl={6} lg={6} md={6}>
							<InputField
								type='text'
								name='Description'
								placeholder={"Description"}
								onChange={handleOnchange}
								multiline={true}
							/>
						</Grid>
					</Grid>

					<Grid
						style={{ marginBottom: "10px", marginTop: "35px" }}
						container
						spacing={2}>
						<Grid item xs={12} xl={6} lg={6} md={6}>
							<FormControl>
								<FormLabel id='demo-radio-buttons-group-label'>
									Status
								</FormLabel>
								<RadioGroup
									aria-labelledby='demo-radio-buttons-group-label'
									// defaultValue="female"
									onChange={handleOnchange}
									name='Status'>
									<FormControlLabel
										value='Enabled'
										control={<Radio />}
										label='Enabled'
										sx={{ marginBottom: "10px", marginTop: "10px" }}
									/>
									<FormControlLabel
										value='Disabled'
										control={<Radio />}
										label='Disabled'
									/>
								</RadioGroup>
							</FormControl>
						</Grid>
					</Grid>
					<Grid
						container
						justifyContent='center'
						sx={{ marginTop: "30px", width: "50%" }}>
						<ButtonComponent loader={loader} name='Save' dashboard={true} />
						{/* </Grid> */}
					</Grid>
				</form>
			</div>
			<Successmodal
				handleClose={handleClose}
				open={open}
				data={"Your Product has been added successfully."}
			/>
		</React.Fragment>
	);
};

export default AddProduct;
