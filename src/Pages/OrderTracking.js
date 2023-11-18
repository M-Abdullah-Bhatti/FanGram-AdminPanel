import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import Button from "@mui/material/Button";
import updloadIcon from "../Assets/upload-vector.svg";

import {
	Box,
	Chip as MuiChip,
	Divider as MuiDivider,
	Grid,
	IconButton,
	Paper as MuiPaper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Toolbar,
	Tooltip,
	Typography,
	CircularProgress,
	useMediaQuery,
} from "@mui/material";

import { green, orange, red } from "@material-ui/core/colors";
import dummyProdImg from "@assets/products.jpg";

import {
	RemoveRedEye as RemoveRedEyeIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
	Delete,
} from "@material-ui/icons";
import StarIcon from "@mui/icons-material/Star";
import { spacing } from "@material-ui/system";
import DeleteUser from "../Components/modals/DeleteUser";
import DeleteProduct from "../Components/modals/DeleteProduct";
import {
	AddAsset,
	GetAllAssets,
	HighlightProduct,
	getProducts,
} from "../NetworkCalls/ServerReq";
import { toast } from "react-toastify";
import plus from "../Assets/tabler_plus.svg";
import ButtonIconComponent from "../Components/ButtonIcons";
import star_fill from "../Assets/star-icon.svg";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Card } from "@mui/material";
import AddNewAssetModal from "../Components/modals/AddNewAssetModal";
import { uploadImage } from "../NetworkCalls/firebaseCalls";
import Drag from "../Components/draganddrop";
import InputField from "../Components/inputfield";
import { SelectInput } from "../Components/SelectInput";
import { Formik } from "formik";
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

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{ id: "id", alignment: "left", label: "S.No" },
	{ id: "AssestImage", alignment: "left", label: "Asset Image" },
	{ id: "ProductId", alignment: "left", label: "Product ID" },
	{ id: "AssestName", alignment: "left", label: "Asset Name" },
	{ id: "AssestCategory", alignment: "left", label: "Asset Category" },
	{ id: "AssestCondition", alignment: "left", label: "Asset Condition" },
	{ id: "AssestCode", alignment: "left", label: "Asset Code" },
	{ id: "AssestSource", alignment: "left", label: "Asset Source" },
	{ id: "Location", alignment: "left", label: "Location" },
	{ id: "Specifications", alignment: "left", label: "Specifications" },
	{ id: "Characteristics", alignment: "left", label: "Asset Characteristics" },
	{ id: "Links", alignment: "left", label: "Links" },
	{
		id: "BlockchainRegistration",
		alignment: "left",
		label: "Blockchain Registration Records",
	},
	{ id: "Notes", alignment: "left", label: "Notes" },
	{ id: "EtagId", alignment: "left", label: "E-tag ID" },
];

function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.alignment}
						padding={headCell.disablePadding ? "none" : "default"}
						sortDirection={orderBy === headCell.id ? order : false}>
						<Box>
							<TableSortLabel
								active={orderBy === headCell.id}
								direction={orderBy === headCell.id ? order : "asc"}
								onClick={createSortHandler(headCell.id)}
								style={{ color: "#969696", fontWeight: 600 }}>
								{headCell.label}
							</TableSortLabel>
						</Box>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

function EnhancedTable({ EtagData, setETagData, getEtagData }) {
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("customer");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [loader, setLoader] = React.useState(false);
	let [data, setData] = React.useState([]);
	const [fixedData, setFixedData] = React.useState([]);
	const [Refresh, setRefresh] = React.useState(false);

	const isMatch2000px = useMediaQuery("(max-width:2000px)");

	const getData = async () => {
		try {
			setLoader(true);
			const response = await getProducts();

			setData(response.data);
			setFixedData(response.data);
		} catch (err) {
			console.log(err);
		} finally {
			setLoader(false);
		}
	};

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = data.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, id) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (id) => selected.indexOf(id) !== -1;

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

	const handleSearch = (val) => {
		console.log(val);
		if (!val) {
			setData(fixedData);
			return;
		}
		const filteredRows = fixedData.filter((row) => {
			return row.title?.toLowerCase().includes(val?.toLowerCase());
		});
		console.log(filteredRows);
		setData(filteredRows);
	};
	const history = useHistory();

	const [open, setOpen] = React.useState(false);

	const [DeleteUid, setDeleteUid] = useState("");
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			{loader ? (
				<div style={{ display: "flex", justifyContent: "center" }}>
					<CircularProgress />
				</div>
			) : (
				<>
					<Paper
						style={{
							boxShadow: "none !important",
							border: "1px solid rgba(76, 78, 100, 0.25)",
							borderRadius: "10px",
						}}>
						<TableContainer style={{ height: "47vh" }}>
							<Table
								aria-labelledby='tableTitle'
								size={"medium"}
								aria-label='enhanced table'
								sx={{
									"& .css-1ygcj2i-MuiTableCell-root": {
										minWidth: isMatch2000px ? "200px" : "intial",
									},
								}}>
								<EnhancedTableHead
									numSelected={selected.length}
									order={order}
									orderBy={orderBy}
									onSelectAllClick={handleSelectAllClick}
									onRequestSort={handleRequestSort}
									rowCount={data.length}
								/>
								<TableBody>
									{stableSort(EtagData, getComparator(order, orderBy))
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row, index) => {
											const isItemSelected = isSelected(row?.ProductId?._id);
											return (
												<TableRow
													hover
													role='checkbox'
													aria-checked={isItemSelected}
													tabIndex={-1}
													// key={`${row.id}-${index}`}
													key={row?.ProductId?._id}
													selected={isItemSelected}>
													<TableCell align='left'>
														<Typography
															style={{ fontWeight: "600", fontSize: "16px" }}>
															{index + 1}.
														</Typography>{" "}
													</TableCell>
													<TableCell align='left'>
														<Box
															sx={{
																width: "90px",
																height: "90px",
																borderRadius: "8px",
															}}>
															<img
																src={row?.AssestImage}
																alt={row?.AssestImage}
																style={{
																	width: "100%",
																	height: "100%",
																	objectFit: "cover",
																	borderRadius: "8px",
																}}
															/>
														</Box>
													</TableCell>
													<TableCell align='left'>
														{" "}
														<Typography
															style={{ fontWeight: "600", fontSize: "16px" }}>
															{row?.ProductId?._id}
														</Typography>{" "}
													</TableCell>
													<TableCell align='left'>
														{" "}
														<Typography
															style={{ fontWeight: "600", fontSize: "16px" }}>
															{row?.AssestName}
														</Typography>{" "}
													</TableCell>
													<TableCell align='left'>
														{" "}
														<Typography
															style={{ fontWeight: "600", fontSize: "16px" }}>
															{row?.AssestCategory}
														</Typography>{" "}
													</TableCell>
													<TableCell align='left'>
														{" "}
														<Typography
															style={{ fontWeight: "600", fontSize: "16px" }}>
															{row?.AssestCondition}
														</Typography>{" "}
													</TableCell>
													<TableCell align='left'>
														{" "}
														<Typography
															style={{ fontWeight: "600", fontSize: "16px" }}>
															{row?.AssestCode}
														</Typography>{" "}
													</TableCell>
													<TableCell align='left'>
														{" "}
														<Typography
															style={{ fontWeight: "600", fontSize: "16px" }}>
															{row?.AssestSource}
														</Typography>{" "}
													</TableCell>
													<TableCell align='left'>
														{" "}
														<Typography
															style={{ fontWeight: "600", fontSize: "16px" }}>
															{row?.Location}
														</Typography>{" "}
													</TableCell>
													<TableCell align='left'>
														{" "}
														<Typography
															style={{ fontWeight: "600", fontSize: "16px" }}>
															{row?.Specifications}
														</Typography>{" "}
													</TableCell>
													<TableCell align='left'>
														{" "}
														<Typography
															style={{ fontWeight: "600", fontSize: "16px" }}>
															{row?.Characteristics}
														</Typography>{" "}
													</TableCell>

													<TableCell align='left'>
														{" "}
														<Typography
															style={{ fontWeight: "600", fontSize: "16px" }}>
															{row?.Links}
														</Typography>{" "}
													</TableCell>
													<TableCell align='left'>
														{" "}
														<Typography
															style={{ fontWeight: "600", fontSize: "16px" }}>
															{row?.BlockchainRegistration}
														</Typography>
													</TableCell>
													<TableCell align='left'>
														{" "}
														<Typography
															style={{ fontWeight: "600", fontSize: "16px" }}>
															{row?.Notes}
														</Typography>{" "}
													</TableCell>
													<TableCell align='left'>
														{" "}
														<Typography
															style={{ fontWeight: "600", fontSize: "16px" }}>
															{row?.EtagId}
														</Typography>{" "}
													</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component='div'
							count={data.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					</Paper>
				</>
			)}
		</div>
	);
}



const Product = () => {
	const history = useHistory();
	const [open, setOpen] = React.useState(false);
	const { setDragOver, onDragOver, onDragLeave, setFileDropError } = Drag();
	const [imgUpload, setImgUpload] = useState({});
	const [imgToUpload, setimgToUpload] = useState({});
	const [EtagData, setETagData] = React.useState([]);


	useEffect(() => {
		getEtagData();
	}, []);

	const getEtagData = async () => {
		await GetAllAssets().then((res) => {
			setETagData(res);
		})
			.catch((e) => console.log(e))

	};
	const totalCalculations = [
		{
			id: 1,
			name: "Total Assets",
			value: EtagData?.length,
		},
		{
			id: 1,
			name: "Total Artworks",
			value: EtagData?.filter((i) => i?.ProductId?.Category == 'Artwork')?.length,
		},
		{
			id: 1,
			name: "Total Antiques",
			value: EtagData?.filter((i) => i?.ProductId?.Category == 'Antique')?.length,
		},
		{
			id: 1,
			name: "Total Collections",
			value: EtagData?.filter((i) => i?.ProductId?.Category == 'Collections')?.length,
		},
	];
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onDrop = (e) => {
		e.preventDefault();

		setDragOver(false);

		const selectedFile = e?.dataTransfer?.files[0];

		if (selectedFile.type.split("/")[0] !== "image") {
			return setFileDropError("Please provide an image file to upload!");
		}

		setimgToUpload(selectedFile);
		setImgUpload(URL.createObjectURL(selectedFile));
	};

	const handleFileChange = (e) => {
		const selectedFile = e?.target?.files[0];

		setimgToUpload(selectedFile);
		setImgUpload(URL.createObjectURL(selectedFile));
	};

	return (
		<React.Fragment>
			<AddNewAssetModal
				open={open}
				handleOpen={handleOpen}
				handleClose={handleClose}>
				<Typography
					gutterBottom
					variant='h1'
					style={{
						fontWeight: "600",
						fontSize: "30px",
						textAlign: "center",
					}}>
					Add a New Asset
				</Typography>

				<Formik
					initialValues={{
						AssestImage: "",
						ProductId: "",
						AssestName: "",
						AssestCategory: "",
						AssestCondition: "",
						AssestCode: "",
						AssestSource: "",
						Links: "",
						Characteristics: "",
						Location: "",
						Specifications: "",
						BlockchainRegistration: "",
						Notes: "",
						EtagId: "",
					}}
					validate={(values) => {
						const errors = {};
						if (!values.AssestImage) {
							errors.AssestImage = "Asset Image is Required";
						}
						if (!values.ProductId) {
							errors.ProductId = "Product ID is Required";
						}
						if (!values.AssestName) {
							errors.AssestName = "Assest Name is Required";
						}
						if (!values.AssestCategory) {
							errors.AssestCategory = "Assest Category is Required";
						}
						if (!values.AssestCondition) {
							errors.AssestCondition = "Assest Condition is Required";
						}
						if (!values.AssestCode) {
							errors.AssestCode = "Assest Code is Required";
						}
						if (!values.AssestSource) {
							errors.AssestSource = "Assest Source is Required";
						}
						if (!values.Links) {
							errors.Links = "Link is Required";
						}
						if (!values.Characteristics) {
							errors.Characteristics = "Characteristics is Required";
						}
						if (!values.Location) {
							errors.Location = "Location is Required";
						}
						if (!values.Specifications) {
							errors.Specifications = "Specifications is Required";
						}
						if (!values.BlockchainRegistration) {
							errors.BlockchainRegistration =
								"Blockchain Registration is Required";
						}
						if (!values.Notes) {
							errors.Notes = "Notes is Required";
						}
						if (!values.EtagId) {
							errors.EtagId = "Etag ID is Required";
						}
						console.log(errors)
						return errors;
					}}
					onSubmit={(values, { resetForm }) => {
						uploadImage(imgToUpload)
							.then(async (url) => {
								try {
									let res = await AddAsset({
										...values,
										AssestImage: url,
									});

									if (!res) {
										toast.error("Product is not ordered!");

										resetForm({ values: "" });
										setImgUpload({});
										handleClose();
									} else {
										toast.success("Asset added!");

										resetForm({ values: "" });
										setImgUpload({});
										handleClose();
										getEtagData();
									}
								} catch (error) {
									console.log({ error }, "error");
								}
							})
							.catch((error) => {
								console.log("Error:", error);
							});
					}}>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
						/* and other goodies */
					}) => {
						return (
							<form onSubmit={handleSubmit}>
								<Grid container spacing={2}>
									{/* Asset Image */}
									<Grid item xs={12}>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "400",
												fontSize: "20px",
												textAlign: "left",
											}}>
											Asset Image
										</Typography>
									</Grid>

									<Grid item sm={8} xs={12}>
										{values.AssestImage ? (
											<Box
												style={{
													background: "#FAFAFA",
													borderRadius: "10px",
													border: "1px solid rgba(0, 0, 0, 0.20)",
													minHeight: "250px",

													display: "flex",
													alignItems: "center",
													justifyContent: "center",

													cursor: "pointer",
												}}>
												<img
													src={imgUpload}
													alt={values.AssestImage}
													style={{
														width: "100%",
														height: "100%",
														objectFit: "cover",
														borderRadius: "10px",
													}}
												/>
											</Box>
										) : (
											<>
												<label
													htmlFor='my_file'
													onDragOver={onDragOver}
													onDragLeave={onDragLeave}
													onDrop={(e) => onDrop(e)}>
													<Box
														style={{
															background: "#FAFAFA",
															borderRadius: "10px",
															border: "1px solid rgba(0, 0, 0, 0.20)",
															minHeight: "250px",

															display: "flex",
															alignItems: "center",
															justifyContent: "center",

															cursor: "pointer",
														}}>
														<input
															type='file'
															id='my_file'
															style={{ display: "none" }}
															name='AssestImage'
															onChange={(e) => {
																handleChange(e);
																handleFileChange(e);
															}}
															onBlur={handleBlur}
															value={values.AssestImage}
														/>

														<Box
															style={{
																display: "flex",
																alignItems: "center",
																justifyContent: "center",
																flexDirection: "column",
																gap: "2rem",
															}}>
															<img src={updloadIcon} alt='updloadIcon' />

															<Typography
																variant='p'
																id='tableTitle'
																fontSize={"15px"}
																color={"#4E4E4E"}
																textAlign={"center"}>
																Drag and drop an image, or
																<p style={{ color: "#000" }}>
																	Browse 1024x1024 size Recommended.
																</p>
															</Typography>
														</Box>
													</Box>
												</label>
												<Typography
													gutterBottom
													variant='h1'
													style={{
														fontWeight: "700",
														fontSize: "14px",
														textAlign: "left",
														color: "red",
														marginTop: "0.25rem",
													}}>
													{errors.AssestImage &&
														touched.AssestImage &&
														errors.AssestImage}
												</Typography>
											</>
										)}
									</Grid>
									{/* Asset Image */}

									<Grid item sm={6} xs={12}>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "400",
												fontSize: "20px",
												textAlign: "left",
											}}>
											Product ID
										</Typography>
										<InputField
											type='text'
											name='ProductId'
											placeholder={"Description"}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.ProductId}
											multiline={false}
										/>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "700",
												fontSize: "14px",
												textAlign: "left",
												color: "red",
												marginTop: "0.25rem",
											}}>
											{errors.ProductId &&
												touched.ProductId &&
												errors.ProductId}
										</Typography>
									</Grid>

									<Grid item sm={6} xs={12}>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "400",
												fontSize: "20px",
												textAlign: "left",
											}}>
											Asset Name
										</Typography>
										<InputField
											type='text'
											name='AssestName'
											placeholder={"Asset name"}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.AssestName}
											multiline={false}
										/>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "700",
												fontSize: "14px",
												textAlign: "left",
												color: "red",
												marginTop: "0.25rem",
											}}>
											{errors.AssestName &&
												touched.AssestName &&
												errors.AssestName}
										</Typography>
									</Grid>

									<Grid item sm={6} xs={12}>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "400",
												fontSize: "20px",
												textAlign: "left",
											}}>
											Asset Category
										</Typography>
										<SelectInput
											options={[
												{ name: "Art" },
												{ name: "Antiques" },
												{ name: "collectables" },
												{ name: "Digital Art" },
											]}
											selecthandle={handleChange}
											onBlur={handleBlur}
											name='AssestCategory'
											value={values.AssestCategory}
											placeholder={"Select Category"}
											styles={{
												border: "2px solid #EAEAEA !important",
												borderRadius: "8px",
											}}
										/>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "700",
												fontSize: "14px",
												textAlign: "left",
												color: "red",
												marginTop: "0.25rem",
											}}>
											{errors.AssestCategory &&
												touched.AssestCategory &&
												errors.AssestCategory}
										</Typography>
									</Grid>

									<Grid item sm={6} xs={12}>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "400",
												fontSize: "20px",
												textAlign: "left",
											}}>
											Asset Condition
										</Typography>
										<SelectInput
											options={[
												{ name: "In-Sale" },
												{ name: "sold" },
												{ name: "Mortgaged" },
												{ name: "Leased" },
												{ name: "Scrapped" },
											]}
											selecthandle={handleChange}
											onBlur={handleBlur}
											value={values.AssestCondition}
											name='AssestCondition'
											placeholder={"Select Condition"}
											styles={{
												border: "2px solid #EAEAEA !important",
												borderRadius: "8px",
											}}
										/>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "700",
												fontSize: "14px",
												textAlign: "left",
												color: "red",
												marginTop: "0.25rem",
											}}>
											{errors.AssestCondition &&
												touched.AssestCondition &&
												errors.AssestCondition}
										</Typography>
									</Grid>

									<Grid item sm={6} xs={12}>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "400",
												fontSize: "20px",
												textAlign: "left",
											}}>
											Asset Code
										</Typography>
										<InputField
											type='text'
											name='AssestCode'
											placeholder={"Enter Code"}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.AssestCode}
											multiline={false}
										/>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "700",
												fontSize: "14px",
												textAlign: "left",
												color: "red",
												marginTop: "0.25rem",
											}}>
											{errors.AssestCode &&
												touched.AssestCode &&
												errors.AssestCode}
										</Typography>
									</Grid>

									<Grid item sm={6} xs={12}>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "400",
												fontSize: "20px",
												textAlign: "left",
											}}>
											Asset Source
										</Typography>
										<InputField
											type='text'
											name='AssestSource'
											placeholder={"Enter Source"}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.AssestSource}
											multiline={false}
										/>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "700",
												fontSize: "14px",
												textAlign: "left",
												color: "red",
												marginTop: "0.25rem",
											}}>
											{errors.AssestSource &&
												touched.AssestSource &&
												errors.AssestSource}
										</Typography>
									</Grid>

									<Grid item sm={6} xs={12}>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "400",
												fontSize: "20px",
												textAlign: "left",
											}}>
											Links
										</Typography>
										<InputField
											type='text'
											name='Links'
											placeholder={"Enter Link"}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.Links}
											multiline={false}
										/>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "700",
												fontSize: "14px",
												textAlign: "left",
												color: "red",
												marginTop: "0.25rem",
											}}>
											{errors.Links && touched.Links && errors.Links}
										</Typography>
									</Grid>

									<Grid item sm={6} xs={12}>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "400",
												fontSize: "20px",
												textAlign: "left",
											}}>
											Characteristics
										</Typography>
										<InputField
											type='text'
											name='Characteristics'
											placeholder={"Enter Characteristics"}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.Characteristics}
											multiline={false}
										/>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "700",
												fontSize: "14px",
												textAlign: "left",
												color: "red",
												marginTop: "0.25rem",
											}}>
											{errors.Characteristics &&
												touched.Characteristics &&
												errors.Characteristics}
										</Typography>
									</Grid>

									<Grid item xs={12}>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "400",
												fontSize: "20px",
												textAlign: "left",
											}}>
											Location
										</Typography>
										<InputField
											type='text'
											name='Location'
											placeholder={"Enter Location"}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.Location}
											multiline={false}
										/>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "700",
												fontSize: "14px",
												textAlign: "left",
												color: "red",
												marginTop: "0.25rem",
											}}>
											{errors.Location && touched.Location && errors.Location}
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "400",
												fontSize: "20px",
												textAlign: "left",
											}}>
											Specifications
										</Typography>
										<InputField
											type='text'
											name='Specifications'
											placeholder={"Write here"}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.Specifications}
											multiline={true}
										/>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "700",
												fontSize: "14px",
												textAlign: "left",
												color: "red",
												marginTop: "0.25rem",
											}}>
											{errors.Specifications &&
												touched.Specifications &&
												errors.Specifications}
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "400",
												fontSize: "20px",
												textAlign: "left",
											}}>
											Blockchain Registration Records
										</Typography>
										<InputField
											type='text'
											name='BlockchainRegistration'
											placeholder={"Enter Link"}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.BlockchainRegistration}
										/>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "700",
												fontSize: "14px",
												textAlign: "left",
												color: "red",
												marginTop: "0.25rem",
											}}>
											{errors.BlockchainRegistration &&
												touched.BlockchainRegistration &&
												errors.BlockchainRegistration}
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "400",
												fontSize: "20px",
												textAlign: "left",
											}}>
											Notes
										</Typography>
										<InputField
											type='text'
											name='Notes'
											placeholder={"Write here"}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.Notes}
											multiline={true}
										/>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "700",
												fontSize: "14px",
												textAlign: "left",
												color: "red",
												marginTop: "0.25rem",
											}}>
											{errors.Notes && touched.Notes && errors.Notes}
										</Typography>
									</Grid>

									<Grid item sm={6} xs={12}>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "400",
												fontSize: "20px",
												textAlign: "left",
											}}>
											Etag ID
										</Typography>
										<InputField
											type='text'
											name='EtagId'
											placeholder={"Insert Etag ID"}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.EtagId}
											multiline={false}
										/>
										<Typography
											gutterBottom
											variant='h1'
											style={{
												fontWeight: "700",
												fontSize: "14px",
												textAlign: "left",
												color: "red",
												marginTop: "0.25rem",
											}}>
											{errors.EtagId && touched.EtagId && errors.EtagId}
										</Typography>
									</Grid>

									<Grid item xs={12} display='flex' justifyContent={"center"}>
										<ButtonIconComponent
											type='submit'
											loader={false}
											name='Add New Asset'
											// onClick={handleOpen}
											icon={plus}
											imageBool={true}
											// disabled={isSubmitting}
											styles={{ width: "30%" }}
										/>
									</Grid>
								</Grid>
							</form>
						);
					}}
				</Formik>
			</AddNewAssetModal>

			{/* Total Calculation Cards */}
			<Grid
				style={{ marginBottom: "30px", alignItems: "center" }}
				container
				spacing={2}>
				{totalCalculations.map((item) => (
					<Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
						<Card variant='outlined' sx={{ borderRadius: "10px" }}>
							<Box
								display='flex'
								flexDirection='column'
								height='90px'
								alignItems='center'
								justifyContent='center'>
								<Typography
									gutterBottom
									variant='h3'
									display='inline'
									style={{
										fontWeight: "400",
										letteSpacing: "0.2px",
										fontSize: "20px",
									}}>
									{item.name}
								</Typography>
								<Typography
									gutterBottom
									variant='h4'
									display='inline'
									style={{
										fontWeight: "300",
										letteSpacing: "0.2px",
										fontSize: "18px",
									}}>
									{item.value}
								</Typography>
							</Box>
						</Card>
					</Grid>
				))}
			</Grid>
			{/* Total Calculation Cards */}

			{/* Asset List */}
			<Grid
				style={{
					alignItems: "center",
					marginBottom: "20px",
				}}
				justifyContent='space-between'
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
						Assets List
					</Typography>
				</Grid>

				<Grid item>
					<ButtonIconComponent
						loader={false}
						name='Add New Asset'
						onClick={handleOpen}
						icon={plus}
						imageBool={true}
					/>
				</Grid>
			</Grid>

			<Grid container spacing={6} sx={{ marginTop: "20px" }}>
				<Grid item xs={12}>
					<EnhancedTable EtagData={EtagData} setETagData={setETagData} />
				</Grid>
			</Grid>
			{/* Asset List */}
		</React.Fragment>
	);
};

export default Product;
