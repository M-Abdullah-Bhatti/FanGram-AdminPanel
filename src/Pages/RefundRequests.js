import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components/macro";
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
} from "@material-ui/core";

import { green, orange, red } from "@material-ui/core/colors";

import {
	RemoveRedEye as RemoveRedEyeIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";
import { axiosInstance } from "../axios";
const Divider = styled(MuiDivider)(spacing);
const Paper = styled(MuiPaper)(spacing);
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
	{ id: "name", alignment: "left", label: "NFT Name" },
	{ id: "FullName", alignment: "left", label: "Full Name" },
	{ id: "Contact", alignment: "left", label: "Contact No." },
	{ id: "Status", alignment: "left", label: "Status" },
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

let EnhancedTableToolbar = (props) => {
	const { numSelected } = props;
	return (
		<Toolbar>
			<ToolbarTitle>
				{numSelected > 0 ? (
					<Typography color='primary' variant='subtitle1'>
						{numSelected} selected
					</Typography>
				) : (
					<div
						style={{
							display: "flex",
							width: "350px",
							alignItems: "center",
						}}>
						<div style={{ flex: 1 }}>
							<Typography variant='h6' id='tableTitle'>
								Sales Requests
							</Typography>
						</div>
						{/* <div style={{ flex: 2 }}>
              <SearchBar
                label="Search Name"
                value={searched}
                onChange={(val) => {
                  setSearched(val);
                  props.onSearch(val);
                }}
              />
            </div> */}
					</div>
				)}
			</ToolbarTitle>
			<Spacer />
			<div>
				{numSelected > 0 ? (
					<Tooltip title='Delete'>
						<IconButton aria-label='Delete'>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				) : null}
			</div>
		</Toolbar>
	);
};

function EnhancedTable() {
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("customer");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [loader, setLoader] = React.useState(false);
	const [data, setData] = React.useState([]);
	const [fixedData, setFixedData] = React.useState([]);
	const [Refresh, setRefresh] = React.useState(false);
	const history = useHistory();

	useEffect(() => {
		getData();
	}, [Refresh]);

	const getData = async (uid) => {
		try {
			setLoader(true);
			const response = await axiosInstance.get("admin/getRefund");
			setData(response?.data);
			setFixedData(response?.data);
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

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (id) => selected.indexOf(id) !== -1;
	const handleSearch = (val) => {
		console.log(val);
		if (!val) {
			setData(fixedData);
			return;
		}
		const filteredRows = fixedData.filter((row) => {
			return row.title?.toLowerCase().includes(val?.toLowerCase());
		});
		setData(filteredRows);
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
						<EnhancedTableToolbar
							onSearch={(val) => handleSearch(val)}
							numSelected={selected?.length}
						/>
						<TableContainer style={{ height: "47vh" }}>
							<Table
								aria-labelledby='tableTitle'
								size={"medium"}
								aria-label='enhanced table'>
								<EnhancedTableHead
									numSelected={selected?.length}
									order={order}
									orderBy={orderBy}
									onSelectAllClick={handleSelectAllClick}
									onRequestSort={handleRequestSort}
									rowCount={data?.length}
								/>
								<TableBody>
									{stableSort(data, getComparator(order, orderBy))
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row, index) => {
											const isItemSelected = isSelected(row.id);
											return (
												<TableRow
													hover
													role='checkbox'
													aria-checked={isItemSelected}
													tabIndex={-1}
													key={`${row.id}-${index}`}
													selected={isItemSelected}
													onClick={() => {
														history.push({
															pathname: "/dashboard/Edit_Sell_Request",
															state: row,
														});
													}}
													sx={{ cursor: "pointer" }}>
													<TableCell align='left'>
														<Typography
															style={{ fontWeight: "600", fontSize: "16px" }}>
															{" "}
															{index + 1}.
														</Typography>{" "}
													</TableCell>
													<TableCell align='left'>
														<Typography
															style={{ fontWeight: "600", fontSize: "16px" }}>
															{row.ProductName}
														</Typography>{" "}
													</TableCell>
													<TableCell align='left'>
														<Typography
															style={{ fontWeight: "600", fontSize: "16px" }}>
															{row.FullName}
														</Typography>{" "}
													</TableCell>
													<TableCell align='left'>
														<Typography
															style={{ fontWeight: "600", fontSize: "16px" }}>
															{row.ContactNo}
														</Typography>{" "}
													</TableCell>

													<TableCell align='left'>
														<Typography
															style={{
																backgroundColor: row.Resolved
																	? "#E6FDED"
																	: "#FDF4E2",
																borderRadius: "20px",
																textAlign: "center",
																padding: "5px 8px",
																width: "60%",
																color: row.Resolved ? "#36AC65" : "#F0A512",
																fontSize: "14px",
																fontWeight: "500",
															}}>
															{row.Resolved ? "Resolved" : "UnResolved"}
														</Typography>
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
							count={data?.length}
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

const RefundRequests = () => {
	return (
		<React.Fragment>
			{/* <Helmet title="Orders" /> */}

			<Grid
				style={{ marginBottom: "10px", alignItems: "center" }}
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
						Dashboard
					</Typography>
				</Grid>

				<Grid item>
					<Typography
						style={{
							padding: "10px 40px",
							margin: "20px auto",
						}}></Typography>
					{/* <ButtonComponent loader={false} name='+ ADD NEW NFTs' onClick={() => history.push("/dashboard/Add_Nft")} /> */}
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
					<EnhancedTable />
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default RefundRequests;
