import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import InputField from "../inputfield";
import { useState } from "react";
import { axiosInstance } from "../../axios";
import { toast } from "react-toastify";

// import { EtagValidation } from "../utils/Validation";

const style = {
  position: "absolute",
  top: { xs: "40%", md: "53%" },
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  backgroundColor: "#fff",
  // border: '2px solid #000',
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
  pt: 4,
  px: "16px",
  pb: 2,
  borderRadius: "4px",
  color: "#fff",
};

const EtagModal = ({ handleClose, open, }) => {
  const history = useHistory();
  const [data, setData] = useState()
  let params = useParams();

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.put(
        `admin/setOrderCompleted?orderId=${params.orderid}`,
        { EtagId: data }
      );
      if (response) {
        history.push({ pathname: "/dashboard/purchase%20history" });
        handleClose()
      }

    } catch (error) {
      toast.error(error?.message);
      console.log(error, "error");
    }

  }
  const handleOnchange = (e) => {
    setData(e.target.value)
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        "& .css-18otly1": { border: "1px solid #252934 !important" },
      }}
    >
      <Box sx={style}>
        <Box
          sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}
        >
          <Typography
            textAlign="center"
            variant="p"
            sx={{
              fontSize: "24px",
              lineHeight: "21px",
              letterSpacing: ".4px",
              fontWeight: 600,
              color: "#000",
            }}
          >
            Assign E-Tag ID
          </Typography>

          <Formik
            initialValues={{ Etag: "" }}
            onSubmit={handleSubmit}
          // validationSchema={EtagValidation}
          >
            {(Formik) => (
              <form onSubmit={Formik.handleSubmit} id="refund">
                {/* {console.log(data)} */}
                <Grid item md={12} xs={12} sx={{ margin: "10px 0px" }}>
                  <InputField
                    type='text'
                    name='Etag'
                    placeholder={"E-tag"}
                    onChange={handleOnchange}
                  />
                  {/* <Input
                        // label={"E-tag"}
                        placeholder={"e.g 123456789"}
                        name={"Etag"}
                        onChange={Formik.handleChange}
                        value={Formik.values.Etag}
                      /> */}

                </Grid>
              </form>
            )}
          </Formik>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              type={"submit"}
              form={"refund"}
              textAlign="center"
              sx={{
                backgroundColor: "#000 !important",
                color: "#fff !important",
                paddingY: "8px",
                paddingX: "20px",
                textTransform: "none",
                fontSize: "16px !important",
                borderRadius: "20px !important",
                fontWeight: 500,
                marginBottom: "10px",
                width: "50%",
                "&:hover": {
                  backgroundColor: "#000 !important",
                  boxShadow: "none !important",
                },
                boxShadow: "none",
              }}
            >
              Submit
            </Button>
          </Grid>
        </Box>
      </Box>
    </Modal>

  )
}
export default EtagModal;