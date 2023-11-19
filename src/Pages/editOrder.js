import React, { useState, useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { axiosInstance } from "../axios";
import { toast } from "react-toastify";
import { Grid, Typography, Paper, Box } from "@material-ui/core";
import ButtonComponent from "../Components/buttton";
import { EditData } from "../NetworkCalls/Admin/ServerReq";
import AddRecentVideo from "./AddRecentVideo";
import DeliverOrder from "./DeliverOrder";

const EditOrder = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    getOrderDetails();
  }, []);

  const getOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `api/order/orderDetails?orderId=${params.orderid}`
      );
      setData(response.data.data);
      console.log("response: ", response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.message);
      console.log(error);
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!data) {
    return <Typography>No order details available.</Typography>;
  }

  const handleApproveOrDisApprove = async (decision) => {
    console.log("decision: ", decision, params.orderid);

    const requestBody = {
      orderId: params?.orderid,
      decision: decision,
    };

    try {
      const response = await EditData(`api/order/orderApproval`, requestBody);

      if (response?.status) {
        toast.success(response?.message);
        // Call getOrderDetails again to refresh the data
        getOrderDetails();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating the order.");
      console.error(error);
    }
  };

  const handleOrderStatus = async (status) => {
    console.log("decision: ", status, params.orderid);

    const requestBody = {
      orderId: params?.orderid,
      orderStatus: status,
    };

    try {
      const response = await EditData(`api/order/orderStatus`, requestBody);

      if (response?.status) {
        toast.success(response?.message);
        // Call getOrderDetails again to refresh the data
        getOrderDetails();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating the order.");
      console.error(error);
    }
  };

  return (
    <Box padding={3}>
      <Paper elevation={3}>
        <Box padding={3}>
          <Typography variant="h4" gutterBottom>
            Order Details
          </Typography>
          {/* <Divider /> */}

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Booking Information</Typography>

              <Box paddingBottom={2} paddingTop={2}>
                <Typography>
                  <b>From:</b> {data.bookingBy.name} <b>Gender:</b> (
                  {data.bookingBy.gender})
                </Typography>
              </Box>

              {data.bookingTo && (
                <Box paddingBottom={2}>
                  <Typography>
                    <b>To:</b> {data.bookingTo.name} <b>Gender:</b> (
                    {data.bookingTo.gender})
                  </Typography>
                </Box>
              )}

              <Box paddingBottom={2}>
                <Typography>
                  <b>Occasion:</b> {data.occasion}
                </Typography>
              </Box>

              <Box paddingBottom={2}>
                <Typography>
                  <b>Message:</b> {data.customMessage}
                </Typography>
              </Box>

              <Box paddingBottom={2}>
                <Typography>
                  <b>Language:</b> {data.language}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6">Payment and Delivery</Typography>

              <Box paddingBottom={2} paddingTop={2}>
                <Typography>
                  <b>Price:</b> {data.price}
                </Typography>
              </Box>

              <Box paddingBottom={2}>
                <Typography>
                  <b>Fast Delivery:</b> {data.fastDelivery ? "Yes" : "No"}
                </Typography>
              </Box>

              <Box paddingBottom={2}>
                <Typography>
                  <b>Billing Number:</b> {data.billingNumber}
                </Typography>
              </Box>

              <Box paddingBottom={2}>
                <Typography>
                  <b>Email:</b> {data.bookingEmail}
                </Typography>
              </Box>
            </Grid>

            {data.image && (
              <Grid item xs={6}>
                <Typography variant="h6">Order Image</Typography>
                <img
                  src={data.image.url}
                  alt="Order"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Grid>
            )}

            <Grid item xs={6}>
              <Typography variant="h6">Edit Order Details</Typography>
              {/* If it is not approved */}
              {data?.userAwarded == false && (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <ButtonComponent
                      name="Approve Order"
                      // Additional props
                      onClick={() => handleApproveOrDisApprove("approve")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <ButtonComponent
                      name="Disapprove Order"
                      // Additional props
                      onClick={() => handleApproveOrDisApprove("discard")}
                    />
                  </Grid>
                </Grid>
              )}

              {/* If it is approved then select the order state */}

              <Typography variant="h6" style={{ marginTop: 10 }}>
                Order Next Step
              </Typography>

              {data?.bookingStatus === 0 && (
                <Grid item xs={6}>
                  <ButtonComponent
                    name="Send to Celebrity"
                    onClick={() => handleOrderStatus(1)}
                  />
                </Grid>
              )}

              {data?.bookingStatus === 1 && (
                <Grid item xs={6}>
                  <ButtonComponent
                    name="Celebrity Accepted"
                    onClick={() => handleOrderStatus(2)}
                  />
                </Grid>
              )}

              {data?.bookingStatus === 2 && (
                <Grid item xs={6}>
                  <ButtonComponent
                    name="See Below to deliver order "
                    // onClick={() => handleOrderStatus(3)}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Add Video */}

      {data?.bookingStatus === 2 && (
        <DeliverOrder
          celebrityID={data?.celebrityID?._id}
          billingEmail={data?.bookingEmail}
          orderId={data?._id}
        />
      )}
    </Box>
  );
};

export default EditOrder;
