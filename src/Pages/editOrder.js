import {
	Box,
	Button,
	Container,
	Divider,
	Grid,
	Typography,
} from "@material-ui/core";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { axiosInstance } from "../axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import EtagModal from "../Components/modals/E-tag";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductInfo = ({ state }) => {

	return (
		<>
			<Grid item xs={6} className='refundcontainer refundcontainer1'>
				<Typography>NFT Name</Typography>
				<Typography>Artist</Typography>
				<Typography>Material</Typography>
				<Typography>Size</Typography>
			</Grid>
			<Grid item xs={6} className='refundcontainer refundcontainer2'>
				<Typography style={{ fontWeight: "bold" }}>{state?.Name}</Typography>
				<Typography style={{ fontWeight: "bold" }}>{state?.Artist}</Typography>
				<Typography style={{ fontWeight: "bold" }}>
					{state?.Material}
				</Typography>
				<Typography style={{ fontWeight: "bold" }}>{state?.Size}</Typography>
			</Grid>

			{/* </Box> */}
		</>
	);
};

const OrderInfo = ({ data }) => {
	return (
		<>
			<Grid
				style={{ flexDirection: "column" }}
				container
				xs={6}
				spacing={24}
				className='refundcontainer refundcontainer1'>
				<Typography variant='h5'>Shipping Details</Typography>

				<Grid xs={12} container style={{ marginTop: "40px" }}>
					<Grid
						item
						xs={6}
						className='refundcontainer2'
						style={{ marginBottom: "1.5rem" }}>
						<Typography variant='h6'>
							First Name
							<br />
							<Typography
								variant='p'
								style={{ fontWeight: 300, fontSize: "15px" }}>
								{data.ShippingFirstName}
							</Typography>
						</Typography>
					</Grid>

					<Grid
						item
						xs={6}
						className='refundcontainer2'
						style={{ marginBottom: "1.5rem" }}>
						<Typography variant='h6'>
							Last Name
							<br />
							<Typography
								variant='p'
								style={{ fontWeight: 300, fontSize: "15px" }}>
								{data.ShippingLastName}
							</Typography>
						</Typography>
					</Grid>

					<Grid
						item
						xs={12}
						className='refundcontainer2'
						style={{ marginBottom: "1.5rem" }}>
						<Typography variant='h6'>
							Residential Address
							<br />
							<Typography
								variant='p'
								style={{ fontWeight: 300, fontSize: "15px" }}>
								{data.ShippingAddress}
							</Typography>
						</Typography>
					</Grid>

					<Grid
						item
						xs={6}
						className='refundcontainer2'
						style={{ marginBottom: "1.5rem" }}>
						<Typography variant='h6'>
							Country
							<br />
							<Typography
								variant='p'
								style={{ fontWeight: 300, fontSize: "15px" }}>
								{data.ShippingCountry}
							</Typography>
						</Typography>
					</Grid>

					<Grid
						item
						xs={6}
						className='refundcontainer2'
						style={{ marginBottom: "1.5rem" }}>
						<Typography variant='h6'>
							City
							<br />
							<Typography
								variant='p'
								style={{ fontWeight: 300, fontSize: "15px" }}>
								{data.ShippingCity}
							</Typography>
						</Typography>
					</Grid>

					<Grid
						item
						xs={12}
						className='refundcontainer2'
						style={{ marginBottom: "1.5rem" }}>
						<Typography variant='h6'>
							Email
							<br />
							<Typography
								variant='p'
								style={{ fontWeight: 300, fontSize: "15px" }}>
								{data.ShippingEmail}
							</Typography>
						</Typography>
					</Grid>

					<Grid
						item
						xs={12}
						className='refundcontainer2'
						style={{ marginBottom: "1.5rem" }}>
						<Typography variant='h6'>
							Contact No.
							<br />
							<Typography
								variant='p'
								style={{ fontWeight: 300, fontSize: "15px" }}>
								{data.ShippingContact}
							</Typography>
						</Typography>
					</Grid>
				</Grid>
			</Grid>

			<Grid
				style={{ flexDirection: "column" }}
				container
				xs={6}
				spacing={24}
				className='refundcontainer refundcontainer1'>
				<Typography variant='h5'>Billing Details</Typography>

				<Grid xs={12} container style={{ marginTop: "40px" }}>
					<Grid
						item
						xs={6}
						className='refundcontainer2'
						style={{ marginBottom: "1.5rem" }}>
						<Typography variant='h6'>
							First Name
							<br />
							<Typography
								variant='p'
								style={{ fontWeight: 300, fontSize: "15px" }}>
								{data.BillingFirstName}
							</Typography>
						</Typography>
					</Grid>

					<Grid
						item
						xs={6}
						className='refundcontainer2'
						style={{ marginBottom: "1.5rem" }}>
						<Typography variant='h6'>
							Last Name
							<br />
							<Typography
								variant='p'
								style={{ fontWeight: 300, fontSize: "15px" }}>
								{data.BillingLastName}
							</Typography>
						</Typography>
					</Grid>

					<Grid
						item
						xs={12}
						className='refundcontainer2'
						style={{ marginBottom: "1.5rem" }}>
						<Typography variant='h6'>
							Residential Address
							<br />
							<Typography
								variant='p'
								style={{ fontWeight: 300, fontSize: "15px" }}>
								{data.BillingAddress}
							</Typography>
						</Typography>
					</Grid>

					<Grid
						item
						xs={6}
						className='refundcontainer2'
						style={{ marginBottom: "1.5rem" }}>
						<Typography variant='h6'>
							Country
							<br />
							<Typography
								variant='p'
								style={{ fontWeight: 300, fontSize: "15px" }}>
								{data.BillingCountry}
							</Typography>
						</Typography>
					</Grid>

					<Grid
						item
						xs={6}
						className='refundcontainer2'
						style={{ marginBottom: "1.5rem" }}>
						<Typography variant='h6'>
							City
							<br />
							<Typography
								variant='p'
								style={{ fontWeight: 300, fontSize: "15px" }}>
								{data.BillingCity}
							</Typography>
						</Typography>
					</Grid>

					<Grid
						item
						xs={12}
						className='refundcontainer2'
						style={{ marginBottom: "1.5rem" }}>
						<Typography variant='h6'>
							Email
							<br />
							<Typography
								variant='p'
								style={{ fontWeight: 300, fontSize: "15px" }}>
								{data.BillingEmail}
							</Typography>
						</Typography>
					</Grid>

					<Grid
						item
						xs={12}
						className='refundcontainer2'
						style={{ marginBottom: "1.5rem" }}>
						<Typography variant='h6'>
							Contact No.
							<br />
							<Typography
								variant='p'
								style={{ fontWeight: 300, fontSize: "15px" }}>
								{data.BillingContact}
							</Typography>
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

const EditOrder = () => {
	const { state } = useLocation();
	const history = useHistory();
	const [data, setData] = React.useState({});
	const [open, setOpen] = useState(false);
	const closeSuccess = () => {
		setOpen(false);
	};
	let params = useParams();

	const resolvedHandler = async () => {
		try {
			const response = await axiosInstance.put(
				`admin/setOrderCompleted?orderId=${params.orderid}`,
				{ EtagId: data }
			);
			if (response) {
				history.push({ pathname: "/dashboard/purchase%20history" });
				// handleClose()
			}

		} catch (error) {
			toast.error(error?.message);
			console.log(error, "error");
		}
	};

	React.useEffect(() => {
		getOrderDetails();
	}, []);

	const getOrderDetails = async () => {
		try {
			const response = await axiosInstance.get(
				`admin/getSingleOrder?orderId=${params.orderid}`,
				{}
			);
			setData(response.data);
			console.log(response?.data?.EtagId)
			// history.push({ pathname: "/dashboard/Refund Requests" })
		} catch (error) {
			console.log(error);
		}
	};

	return (
		Object.keys(data).length != 0 && (
			<React.Fragment>
				{/* <Helmet title="Orders" /> */}
				<Grid justify='space-between' container spacing={24}>
					<Grid item>
						<Typography variant='h4' gutterBottom display='inline'>
							Order Details
						</Typography>
					</Grid>
					{data.OrderCompleted == false && (
						<Grid item>
							<Button
								variant='outlined'
								// bor
								style={{
									textTransform: "capitalize",
									borderRadius: "15px",
									fontSize: "15px",
									fontWeight: 600,
									padding: "4px 20px",
									borderRadius: "30px",
									backgroundColor: "#fff",
									color: "#000",
									border: "2px solid #000",
									display: state?.Resolved ? "none" : "block",
								}}
								onClick={resolvedHandler}>
								Mark As Completed
							</Button>
						</Grid>
					)}
				</Grid>

				<Container
					//   maxWidth="md"
					style={{
						display: "flex",
						alignItems: "center",
						flexDirection: "column",
					}}>
					{data?.Products.map((item, index) => {
						return (
							<Grid
								container
								spacing={12}
								style={{
									justifyContent: "center",
									alignItems: "center",
									backgroundColor: "#fff",
									borderRadius: "15px",
									marginTop: "50px",
									border: "1px solid #EAEAEA",
									flexDirection: "row",
								}}>
								<ProductInfo state={item} />
							</Grid>
						);
					})}
					<Grid
						container
						spacing={1}
						style={{
							justifyContent: "center",
							alignItems: "flex-start",
							backgroundColor: "#fff",
							borderRadius: "15px",
							marginTop: "50px",
							border: "1px solid #EAEAEA",
							flexDirection: "row",
						}}>
						<OrderInfo data={data} />
					</Grid>
				</Container>
				<EtagModal
					handleClose={closeSuccess}
					open={open}
				/>
			</React.Fragment>
		)
	);
};
export default EditOrder;
