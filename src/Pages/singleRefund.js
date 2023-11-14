import { Box, Button, Container, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useLocation } from 'react-router-dom'
import { axiosInstance } from "../axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const RefundContainer = (state) => {

    return (
        <>
            <Grid item xs={6} className="refundcontainer refundcontainer1">
                <Typography >
                    NFT Name
                </Typography>
                <Typography>
                    Full Name
                </Typography>
                <Typography>
                    Contact No.
                </Typography>
                <Typography>
                    Email
                </Typography>
                <Typography>
                    Wallet Address
                </Typography>
                <Typography>
                    Residential Addrence
                </Typography>
            </Grid>
            <Grid item xs={6} className="refundcontainer refundcontainer2">
                <Typography sx={{ fontWeight: 'bold' }}>
                    {state?.state?.ProductName}
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }}>
                    {state?.state?.FullName}
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }}>
                    {state?.state?.ContactNo}
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }}>
                    {state?.state?.Email}
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }}>
                    {state?.state?.WalletAddress}
                </Typography>
                <Typography sx={{ fontWeight: 'bold !important' }}>
                    {state?.state?.Residental}
                </Typography>
            </Grid>

            {/* </Box> */}
        </>
    )
}
const SingleRefund = () => {
    const { state } = useLocation();
    const history = useHistory();

    const resolvedHandler = async () => {
        try {
            const response = await axiosInstance.put(`admin/refundapprove?refundId=${state?._id}`, {})
            // console.log(response)
            history.push({ pathname: "/dashboard/Sale Requests" })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <React.Fragment>
            {/* <Helmet title="Orders" /> */}
            <Grid
                style={{ marginBottom: "10px" }}
                justify="space-between"
                container
                spacing={24}
            >
                <Grid item>
                    <Typography variant="h4" gutterBottom display="inline">
                        Sale Requests
                    </Typography>
                </Grid>

                <Grid item>
                    <Button
                        variant="outlined"
                        // bor
                        style={{
                            textTransform: 'capitalize', borderRadius: '15px', fontSize: "15px",
                            fontWeight: 600,
                            padding: "4px 20px",
                            borderRadius: "30px",
                            backgroundColor: '#fff',
                            color: '#000',
                            border: '2px solid #000',
                            display: state?.Resolved ? 'none' : 'block',
                        }}
                        onClick={resolvedHandler}
                    >
                        Mark As Resolved
                    </Button>
                </Grid>
            </Grid>

            <Container maxWidth='md' sx={{
                height: "75vh",
                display: "flex",
                alignItems: "center",
            }}>



                <Grid container spacing={12} style={{ justifyContent: 'center', alignItems: "center", backgroundColor: "#fff", borderRadius: "15px", marginTop: "50px", border: '1px solid #EAEAEA' }}>

                    <RefundContainer state={state} />
                    {/* <EnhancedTable /> */}

                </Grid>

            </Container>



        </React.Fragment>

    )
}
export default SingleRefund;