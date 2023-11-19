import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { spacing } from "@material-ui/system";
import { useHistory } from "react-router-dom";
import upload from "../Assets/drag.svg";
import cross from "../Assets/cross.svg";
import DummyImage from "../Assets/product_img.svg";
import CheckboxLabels from "../Components/Checkbox";
import ButtonComponent from "../Components/buttton";
import {
  Box,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Paper as MuiPaper,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

import Drag from "../Components/draganddrop";

import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
} from "@mui/material";
import ButtonIconComponent from "../Components/ButtonIcons";
import { EditData, GetSingleData, PostData } from "../NetworkCalls/Admin/ServerReq";
import { toast } from "react-toastify";
import UploadImage from "../Components/uploadimage";
import { useParams } from "react-router-dom";

const Divider = styled(MuiDivider)(spacing);

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

function BasicBreadcrumbs() {
  const params = useParams();
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          to={`/dashboard/edit_celebrity/${params?.celebrityid}`}
          underline="hover"
          color="#000"
          style={{ color: "#000" }}
        >
          Celebrity Details
        </Link>
        <Typography color="text.primary" style={{ fontWeight: "500" }}>
          Add New Celebrity Video
        </Typography>
      </Breadcrumbs>
    </div>
  );
}

const EditRecentVideo = () => {
  const params = useParams();
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [imgweb, setImgweb] = useState("");
  const [tempimg, setTempimg] = useState("");
  const [data, setData] = useState({});

 

  const { setDragOver, onDragOver, onDragLeave, setFileDropError } = Drag();

  const onDrop = (e) => {
    e.preventDefault();

    setDragOver(false);

    const selectedFile = e?.dataTransfer?.files[0];

    if (selectedFile.type.split("/")[0] !== "image") {
      return setFileDropError("Please provide an image file to upload!");
    }

    setTempimg(selectedFile);
  };

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


  useEffect(()=>{

    const getData=async()=>{
        const response = await GetSingleData(`api/video/${params?.videoid}`)
        setData(response)
    }

    getData()

  }, [])

  const handleEditCelebrityVideo = async (e) => {
    e.preventDefault();

    setLoader(true);

      UploadImage({ img: tempimg }).then(async (res) => {
        setImgweb(res);


         

    const response = await EditData(
      `api/video/edit/${params?.videoid}`,
      {...data, celebrityVideo:res}
    );

    if (response?.status) {
      toast.success(response?.message);

      setLoader(false);
    
    } else {
      toast.error(response?.message);
    }


      })

  
  };

  return (
    <React.Fragment>
      <Grid
        style={{ marginBottom: "10px" }}
        justify="space-between"
        container
        spacing={24}
      >
        <Grid item>
          <Typography
            gutterBottom
            variant="h3"
            display="inline"
            style={{
              fontWeight: "700",
              letteSpacing: "0.2px",
              fontSize: "25px",
            }}
          >
            Add Celebrity Recent Video
          </Typography>
        </Grid>
      </Grid>

      <Divider
        my={4}
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

      <div className="dashboard_container">
        <Grid item xs={12} xl={12} lg={12} md={12} style={{ width: "97%" }}>
          <Grid
            style={{ marginBottom: "10px", marginTop: "15px" }}
            justify="space-around"
            container
            spacing={2}
          >
            <Grid item xs={12} xl={12} lg={12} md={12}>
              <p style={{ fontSize: "20px", marginBottom: "10px" }}>Image</p>

              {/* ======= */}

             {imgweb == null && tempimg == null  ? (
                <div className="addImage">
                  <div className="imagebody">
                    <img
                      src={upload}
                      style={{ marginBottom: "20px" }}
                      alt="logo"
                    />
                    <p>
                      Drag and drop an image, or{" "}
                      <label
                        for="upload-photo"
                        className="upload-label"
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                      >
                        Browse{" "}
                      </label>
                      <input
                        type="file"
                        name="WebImage"
                        // accept="image/*"
                        // onChange={(e) => {
                        //   setTempimg(e.target.files[0]);
                        // }}
                        onChange={(e) => {
														setTempimg(e.target.files[0]);
													}}
                        id="upload-photo"
                        style={{ display: "none" }}
                        // required={true}
                      />
                      <br /> 1600x1200 or higher recommended. Max 10MB.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="addImage">
                  <>
                    <label
                      for="upload-photo"
                      className="upload-label"
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                      }}
                      onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      onDrop={onDrop}
                    >
                      <input
                        type="file"
                        name="WebImage"
                       onChange={(e) => {
														// UploadImage({img:e.target.files[0]})
														// .then((res)=>{
														//   setImgweb(res);
														// })
														setTempimg(e.target.files[0]);
													}}
                        id="upload-photo"
                        style={{ display: "none" }}
                      />

                      <img
                        alt="logo"
                        src={cross}
                        style={{
                          width: "35px",
                          top: "-25px",
                          position: "absolute",
                          right: "-25px",
                        }}
                        onClick={() => {
                          tempimg == "" ? setImgweb(null) : setTempimg(null);
                        }}
                      />
                      {tempimg == "" ? (
                        <img
                          alt="logo"
                          src={imgweb || data?.celebrityVideo}
                          style={{ width: "100%", height: "100%" }}
                        />
                      ) : (
                        <img
                          alt="logo"
                            src={URL.createObjectURL(tempimg)}
                          style={{ width: "100%", height: "100%" }}
                        />
                      )}
                    </label>
                  </>
                </div>
              )}

              {/* ======== */}
            </Grid>
          </Grid>
        </Grid>

        <form style={{ width: "97%" }}>
          <Grid
            style={{ marginBottom: "10px", marginTop: "35px" }}
            container
            spacing={2}
          >
            <Grid item xs={12} xl={6} lg={6} md={6}>
              <TextField
                id="outlined-basic"
                type="number"
                  InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                name="ratings"
                label="Ratings"
                variant="outlined"
                required
                value={data?.ratings}
                onChange={handleOnchange}
                fullWidth={true}
              />
            </Grid>

            <Grid item xs={12} xl={6} lg={6} md={6}>
              <TextField
                id="outlined-basic"
                label="Occasion"
                variant="outlined"
                required
                type="text"
                  InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                value={data?.occasion}
                name="occasion"
                onChange={handleOnchange}
                fullWidth={true}
              />
            </Grid>


             <Grid item xs={12} xl={6} lg={6} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-label">
                 Show Public?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Show Public?"
                  name="showPublic"
                  required
                  value={data?.showPublic}
                    InputLabelProps={{ shrink: true }}
                  onChange={handleOnchange}
                >
                  {["Yes", "No"].map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Description */}

            <Grid item xs={12} xl={12} lg={12} md={12}>
              <TextareaAutosize
                minRows={8}
                name="message"
                required
                  value={data?.message}
                onChange={handleOnchange}
                placeholder="Message"
                style={{
                  border: "1px solid #c4c4c4",
                  width: "100%",
                  fontSize: "16px",
                  padding: "15px",
                  outline: "none",
                }}
              />
            </Grid>
          </Grid>

          <Box mt={2}>
            <Typography style={{ color: "#E12F2F" }}>{Error}</Typography>
          </Box>

          <Grid
            container
            justifyContent="center"
            sx={{ marginTop: "30px", width: "50%" }}
          >
            <ButtonComponent
              loader={loader}
              name="Save Video"
              dashboard={true}
              onClick={handleEditCelebrityVideo}
            />
          </Grid>
        </form>
      </div>
    </React.Fragment>
  );
};

export default EditRecentVideo;
