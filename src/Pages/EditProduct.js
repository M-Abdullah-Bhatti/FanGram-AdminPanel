import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import styled from "styled-components/macro";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";

import {
	Chip as MuiChip,
	CircularProgress,
	Divider as MuiDivider,
	Grid,
	Paper as MuiPaper,
	Typography,
	Box,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import UploadImage from "../Components/uploadimage";
import cross from "../Assets/cross.svg";
import Drag from "../Components/draganddrop";
import DummyImage from "../Assets/product_img.svg";
import upload from "../Assets/drag.svg";
import Successmodal from "../Components/modals/successmodal";
import { updateProduct } from "../NetworkCalls/Products/ServerReq";
import { uploadImage } from "../NetworkCalls/firebaseCalls";
import InputField from "../Components/inputfield";
import { SelectInput } from "../Components/SelectInput";
import ButtonComponent from "../Components/buttton";

const Divider = styled(MuiDivider)(spacing);

function BasicBreadcrumbs() {
	return (
		<div role='presentation'>
			<Breadcrumbs aria-label='breadcrumb'>
				<Link
					to={"/dashboard/nfts"}
					underline='hover'
					color='#000'
					style={{ color: "#000" }}>
					{" "}
					NFTs
				</Link>
				<Typography color='text.primary' style={{ fontWeight: "500" }}>
					Edit NFT
				</Typography>
			</Breadcrumbs>
		</div>
	);
}

const EditProduct = () => {
	const { id } = useParams();
	const history = useHistory();
	const [loader, setLoader] = useState(false);
	const [mainLoader, setMainLoader] = useState(true);
	const [blogdata, setBlogdata] = useState({});
	const [imgweb, setImgweb] = useState(DummyImage);
	const [tempimg, setTempimg] = useState("");
	const { state } = useLocation();
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(!open);
		history.push({ pathname: "/dashboard/nfts" });
		// setUpdate(!dataupdate)
	};
	// console.log(state);
	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			setMainLoader(true);
			setBlogdata(state);
			// setImgweb(response?.imageURI);
		} catch (err) {
			console.log(err);
		} finally {
			setMainLoader(false);
		}
	};

	const handleOnchange = (e) => {
		const { name, value } = e.target;
		console.log(value, name)
		setBlogdata((preValue) => {
			return {
				...preValue,
				[name]: value,
			};
		});
	};

	async function handleClick(event) {
		event.preventDefault();
		setOpen(true);

		try {
			setLoader(true);
			if (
				blogdata.title == "<p><br></p>" ||
				(blogdata.date == "" &&
					blogdata.description == "<p><br></p>" &&
					(imgweb == "" || tempimg == ""))
			) {
				alert("Please Input All Fields");
				setLoader(false);
			} else {
				try {
					if (tempimg === "") {
						const response = await updateProduct(blogdata, blogdata._id);
						if (response.code >= 400) {
							setLoader(false);
						} else {
							setOpen(true);
							setLoader(false);
						}
					} else {
						uploadImage(tempimg)
							.then(async (res) => {
								const response = await updateProduct(
									{
										...blogdata,
										ProductImage: res,
									},
									blogdata._id
								);
								setLoader(false);
							})
							.catch((e) => {
								console.log(e);
								setLoader(false);
							});
					}
				} catch (error) {
					console.log(error);
					setLoader(false);
				}
			}
		} catch (err) {
			console.log(err);
			setLoader(false);
		}
		//  finally {
		//   setLoader(false);
		// }
	}

	// console.log(blogdata?.blogimg)
	const { setDragOver, onDragOver, onDragLeave, setFileDropError } = Drag();

	const onDrop = (e) => {
		e.preventDefault();

		setDragOver(false);

		const selectedFile = e?.dataTransfer?.files[0];

		if (selectedFile.type.split("/")[0] !== "image") {
			return setFileDropError("Please provide an image file to upload!");
		}

		setTempimg(selectedFile);
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
						{" "}
						{blogdata.Name}
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

			{mainLoader ? (
				<div
					style={{
						marginTop: "100px",
						display: "flex",
						justifyContent: "center",
					}}>
					<CircularProgress />
				</div>
			) : (
				<div className='dashboard_container'>
					<form onSubmit={handleClick} style={{ width: "97%" }}>
						<Grid
							style={{ marginBottom: "10px", marginTop: "35px" }}
							justify='space-around'
							container
							spacing={2}>
							<Grid item xs={12} xl={12} lg={12} md={12}>
								<p style={{ fontSize: "11px", marginBottom: "20px" }}>
									Upload Image*
								</p>

								{imgweb == "" && tempimg == "" ? (
									<div className='addImage'>
										<div className='imagebody'>
											<img src={upload} style={{ marginBottom: "20px" }} />
											<p>
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
														setTempimg(e.target.files[0]);
													}}
													id='upload-photo'
													style={{ display: "none" }}
												// required={true}
												/>
												<br /> 1600x1200 or higher recommended. Max 10MB.
											</p>
										</div>
									</div>
								) : (
									<div className='addImage'>
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
												<input
													type='file'
													name='WebImage'
													onChange={(e) => {
														// UploadImage({img:e.target.files[0]})
														// .then((res)=>{
														//   setImgweb(res);
														// })
														setTempimg(e.target.files[0]);
													}}
													id='upload-photo'
													style={{ display: "none" }}
												/>

												<img
													src={cross}
													style={{
														width: "35px",
														top: "-25px",
														position: "absolute",
														right: "-25px",
													}}
													onClick={() => {
														tempimg == "" ? setImgweb("") : setTempimg("");
													}}
												/>
												{tempimg == "" ? (
													<img
														src={blogdata.ProductImage}
														style={{ width: "100%", height: "100%" }}
													/>
												) : (
													<img
														src={URL.createObjectURL(tempimg)}
														style={{ width: "100%", height: "100%" }}
													/>
												)}
											</label>
										</>
									</div>
								)}
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
									value={blogdata.Name}
								/>
							</Grid>

							<Grid item xs={12} xl={6} lg={6} md={6}>
								<Box sx={{ minWidth: 120 }}>
									{/* <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native" required>
                    Category
                  </InputLabel>
                  <NativeSelect
                    defaultValue="Antique"
                    inputProps={{
                      name: "Category",
                      id: "uncontrolled-native",
                    }}
                    onChange={handleOnchange}
                  >
                    <option value="none" style={{ display: "none" }}></option>
                    <option value="Antique">Antique</option>
                    <option value="Artwork">Artwork</option>
                    <option value="Collections">Collections</option>
                  </NativeSelect>
                </FormControl> */}
									<SelectInput
										options={[
											{ name: "Artwork" },
											{ name: "Antique" },
											{ name: "Collections" },
											{ name: "Digital Artist" },
										]}
										placeholder={"Category"}
										selecthandle={handleOnchange}
										value={blogdata.Category}
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
									value={blogdata.Price}
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
									value={blogdata.Material}
								/>
							</Grid>

							<Grid item xs={12} xl={6} lg={6} md={6}>
								<InputField
									type='text'
									name='Artist'
									placeholder={"Artist"}
									onChange={handleOnchange}
									value={blogdata.Artist}
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
									value={blogdata.ProductionTime}
								/>
							</Grid>

							<Grid item xs={12} xl={6} lg={6} md={6}>
								<InputField
									type='text'
									name='Size'
									placeholder={"Size"}
									onChange={handleOnchange}
									value={blogdata.Size}
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
									value={blogdata.Description}
									multiline={true}
								/>
							</Grid>
						</Grid>

						<Grid
							container
							justifyContent='center'
							sx={{ marginTop: "30px", width: "50%" }}>
							<ButtonComponent loader={loader} name='Update' dashboard={true} />
						</Grid>
					</form>
				</div>
			)}
			<Successmodal
				handleClose={handleClose}
				open={open}
				data={"Your Product has been updated successfully."}
			/>
		</React.Fragment>
	);
};

export default EditProduct;
