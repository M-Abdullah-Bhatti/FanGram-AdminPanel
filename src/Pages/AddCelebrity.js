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

const Divider = styled(MuiDivider)(spacing);

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

function BasicBreadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          to={"/dashboard/celebrities"}
          underline="hover"
          color="#000"
          style={{ color: "#000" }}
        >
          Celebrity
        </Link>
        <Typography color="text.primary" style={{ fontWeight: "500" }}>
          Add New Celebrity
        </Typography>
      </Breadcrumbs>
    </div>
  );
}

const AddCelebrity = () => {
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

  const boxesTags = [
    { Label: "Celebrity Of the Week", Check: false },
    { Label: "Valentine's Days Gifts", Check: false },
    { Label: "Baby Doll", Check: false },
    { Label: "Model", Check: false },
    { Label: "TV Star", Check: false },
  ];

  const boxesCategories = [
    { Label: "Celebrities", Check: false },
    { Label: "Movies", Check: false },
    { Label: "Tv Shows", Check: false },
    { Label: "Web Series", Check: false },
    { Label: "Sports Events", Check: false },
    { Label: "Events", Check: false },
    { Label: "Wishes", Check: false },
    { Label: "Gifts", Check: false },
    { Label: "Quotes", Check: false },
    { Label: "Invitations", Check: false },
    { Label: "Captions", Check: false },
    { Label: "Aarti", Check: false },
  ];

  const boxesOffers = [
    { Label: "Buy For", price: "", Check: false },
    { Label: "Members Only", price: "", Check: false },
    { Label: "Full HD", price: "", Check: false },
    { Label: "Instagram Dm", price: "", Check: false },
  ];

  const boxesExtras = [
    { Label: "Remove the FanRang logo", price: "", Check: false },
    { Label: "Gifting Experience", price: "", Check: false },
    { Label: "Full HD", price: "", Check: false },
    { Label: "Dm On Instagram", price: "", Check: false },
  ];

  const [CheckboxesTags, setCheckboxesTags] = useState(boxesTags);
  const [CheckboxesCategories, setCheckboxesCategories] =
    useState(boxesCategories);
  const [CheckboxesExtras, setCheckboxesExtras] = useState(boxesExtras);
  const [CheckboxesOffers, setCheckboxesOffers] = useState(boxesOffers);
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




const handleCheckboxChange = (checkboxes, index, value) => {
  const updatedCheckboxes = [...checkboxes];

  if (value) {
    updatedCheckboxes[index].price = value;
  }
  else if(!value){
	updatedCheckboxes[index].Check = !updatedCheckboxes[index].Check;
  }
  return updatedCheckboxes;
};




 const addCheckboxes = (e, checkboxes, setter) => {
    const { name } = e.target;
    const updatedCheckboxes = handleCheckboxChange(
      checkboxes,
      checkboxes.findIndex((item) => item.Label === name)
    );
    setter(updatedCheckboxes);
  };



const handlePriceChange = (e, checkboxes, setter) => {
  const { name, value } = e.target;
  const itemName = name.split('_')[1];  
  const index = checkboxes.findIndex((item) => item.Label === itemName);
  const updatedCheckboxes = handleCheckboxChange(checkboxes, index, value);
  setter(updatedCheckboxes);
};






const handleAddNewCelebrity = async(e)=>{
	e.preventDefault()

	const formData = new FormData();

	console.log("tempimg")
	console.log(tempimg)

	console.log("imgweb")
	console.log(imgweb)

	 if (tempimg) {
    formData.append("celebrityImage", tempimg);
  }

	const requestBody = {
  name: data.name, 
  description: data.description,
  celebrityImage: tempimg,
  videoPrice: parseInt(data.videoPrice),
  meetAndGreetPrice: parseInt(data.meetAndGreetPrice),
  fanDiscount: data.fanDiscount,
  tags: CheckboxesTags.filter((item) => item.Check).map((item) => item.Label),
  categories: CheckboxesCategories.filter((item) => item.Check).map(
    (item) => item.Label
  ),
  responseInDays: parseInt(data.responseInDays),
  isFeatured: data.isFeatured === "Yes" ? true : false , 
  offers: CheckboxesOffers.filter((item) => item.Check).map((item) => ({
    title: item.Label,
    price: item.price, 
  })),
   extras: CheckboxesExtras.filter((item) => item.Check).map((item) => ({
    title: item.Label,
    price: item.price, 
  })),
};

console.log("requestBody")
console.log(requestBody)

}









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
            Add Celebrity
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

              {imgweb == "" && tempimg == "" ? (
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
						 accept="image/*"
                        // onChange={(e) => {
                        //   setTempimg(e.target.files[0]);
                        // }}
						 onChange={(e) => {
							
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setTempimg(reader.result);
        }
      }

      reader.readAsDataURL(e.target.files[0])

                        //   setTempimg(e.target.files[0]);
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
						 accept="image/*"
                        name="WebImage"
                        onChange={(e) => {
							
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setTempimg(reader.result);
        }
      }

      reader.readAsDataURL(e.target.files[0])

                        //   setTempimg(e.target.files[0]);
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
                          tempimg == "" ? setImgweb("") : setTempimg("");
                        }}
                      />
                      {tempimg == "" ? (
                        <img
                          alt="logo"
                          src={DummyImage}
                          style={{ width: "100%", height: "100%" }}
                        />
                      ) : (
                        <img
                          alt="logo"
                        //   src={URL.createObjectURL(tempimg)}
						src={tempimg}
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
                type="text"
                name="name"
                label="Celebrity Name"
                variant="outlined"
                required
                onChange={handleOnchange}
                fullWidth={true}
              />
            </Grid>

            <Grid item xs={12} xl={6} lg={6} md={6}>
              <TextField
                id="outlined-basic"
                type="number"
                name="responseInDays"
                label="Respond In Days"
                variant="outlined"
                required
                onChange={handleOnchange}
                fullWidth={true}
              />
            </Grid>

            <Grid item xs={12} xl={6} lg={6} md={6}>
              <TextField
                id="outlined-basic"
                label="Video Price"
                variant="outlined"
                required
                type="number"
                placeholder="Video Price"
                name="videoPrice"
                onChange={handleOnchange}
                fullWidth={true}
              />
            </Grid>

            <Grid item xs={12} xl={6} lg={6} md={6}>
              <TextField
                id="outlined-basic"
                label="Meet And Greet Price"
                variant="outlined"
                required
                type="number"
                name="meetAndGreetPrice"
                onChange={handleOnchange}
                fullWidth={true}
              />
            </Grid>

            <Grid item xs={12} xl={6} lg={6} md={6}>
              <TextField
                id="outlined-basic"
                label="Fan Discount"
                variant="outlined"
                required
                type="number"
                name="fanDiscount"
                onChange={handleOnchange}
                fullWidth={true}
              />
            </Grid>

            <Grid item xs={12} xl={6} lg={6} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-label">
                  Make it featured
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Enter menu category"
                  name="isFeatured"
                  required
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
                name="description"
                required
                onChange={handleOnchange}
                placeholder="Celebrity Description"
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

          {/* Tags */}

          <Grid>
            <Box mt={5} mb={1}>
              <Typography color="text.primary" variant="h6">
                Select Celebrity Tags *
              </Typography>
            </Box>
          </Grid>

          <Box
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {CheckboxesTags.map((item) => (
              <CheckboxLabels
                // onClick={addCheckboxesTags}
				 onClick={(e) => addCheckboxes(e, CheckboxesTags, setCheckboxesTags)}
                check={item.Check}
                Label={item.Label}
              />
            ))}
          </Box>

          {/* Categories */}

          <Grid>
            <Box mt={5} mb={1}>
              <Typography color="text.primary" variant="h6">
                Select Celebrity Categories *
              </Typography>
            </Box>
          </Grid>

          <Box
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {CheckboxesCategories.map((item) => (
              <CheckboxLabels
                // onClick={addCheckboxesCategories}
				onClick={(e) => addCheckboxes(e, CheckboxesCategories, setCheckboxesCategories)}
                check={item.Check}
                Label={item.Label}
              />
            ))}
          </Box>

          {/* Offers */}

          <Box mt={5}>
            
              <Typography variant="h6" color="text.primary">
                Select Celebrity Offers *
              </Typography>


			    <Box mt={1}>
              {CheckboxesOffers.map((item, index) => (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                  }}
                >
                  <CheckboxLabels
                    // onClick={() => addCheckboxOffers(index)}
					onClick={(e) => addCheckboxes(e, CheckboxesOffers, setCheckboxesOffers)}
                    check={item.Check}
                    Label={item.Label}
					 />

                  <Grid item xs={12} xl={4} lg={4} md={4}>
                    <TextField
                      id="outlined-basic"
                      label={`Enter ${item.Label} price`}
                      variant="outlined"
                      required
                      type="number"
                   
					name={`price_${item.Label}`}
                    
					onChange={(e) => handlePriceChange(e, CheckboxesOffers, setCheckboxesOffers)}
                      fullWidth={true}
                    />
                  </Grid>
                </Box>
              ))}
            </Box>


            
          </Box>

          


          {/* Extras */}
          <Box mt={5}>
            <Typography variant="h6" color="text.primary" mb={2}>
              Select Celebrity Extras *
            </Typography>

            <Box>
              {CheckboxesExtras.map((item, index) => (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                  }}
                >
                  <CheckboxLabels
                    // onClick={() => addCheckboxExtras(index)}
					onClick={(e) => addCheckboxes(e, CheckboxesExtras, setCheckboxesExtras)}
                    check={item.Check}
                    Label={item.Label}
                  />

                  <Grid item xs={12} xl={4} lg={4} md={4}>
                    <TextField
                      id="outlined-basic"
                      label={`Enter ${item.Label} price`}
                      variant="outlined"
                      required
                      type="number"
                      name={`price_${item.Label}`}
					onChange={(e) => handlePriceChange(e, CheckboxesExtras, setCheckboxesExtras)}
                      fullWidth={true}
                    />
                  </Grid>
                </Box>
              ))}
            </Box>
          </Box>

          <Box mt={2}>
            <Typography style={{ color: "#E12F2F" }}>{Error}</Typography>
          </Box>

          <Grid
            container
            justifyContent="center"
            sx={{ marginTop: "30px", width: "50%" }}
          >
            <ButtonComponent loader={loader} name="Save" dashboard={true} onClick={handleAddNewCelebrity} />
          </Grid>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddCelebrity;
