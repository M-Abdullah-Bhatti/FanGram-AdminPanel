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

import { TextareaAutosize } from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { EditData, GetSingleData } from "../NetworkCalls/Admin/ServerReq";

const Divider = styled(MuiDivider)(spacing);

const EditFAQ = () => {
  const params = useParams();
  const [loader, setLoader] = useState(false);

  const [data, setData] = useState({});

 
  useEffect(() => {
    const getData = async () => {
      const response = await GetSingleData(`api/faq/${params?.id}`);
      setData(response);
    };

    getData();
  }, []);

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

  const handleEditFAQ = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      

      const response = EditData(`api/faq/edit/${params?.id}`, data);
      
      console.log("response")
      console.log(response)

      if (response?.status) {
        toast.success(response?.message);
        setLoader(false);
      } else {
        toast.error(response?.message);
      }
    } catch (err) {
      toast.error(err);
    }
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
            Edit FAQs
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

      <Divider
        my={6}
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          backgroundColor: "#fafafa",
        }}
      />

      <div className="dashboard_container">
        <form onSubmit={handleEditFAQ} style={{ width: "97%" }}>
          <Grid
            style={{ marginBottom: "10px", marginTop: "35px" }}
            container
            spacing={2}
          >
            <Grid item xs={12} xl={12} lg={12} md={12}>
              <TextField
                id="outlined-basic"
                label="Question"
                variant="outlined"
                required
                type="text"
                name="question"
                InputLabelProps={{ shrink: true }}
                value={data?.question}
                onChange={handleOnchange}
                fullWidth={true}
              />
            </Grid>

            {/* Description */}

            <Grid item xs={12} xl={12} lg={12} md={12}>
              <TextareaAutosize
                minRows={8}
                name="answer"
                required
                value={data?.answer}
                onChange={handleOnchange}
                placeholder="Answer"
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
              name="Save FAQ"
              dashboard={true}
              type="submit"
            />
          </Grid>
        </form>
      </div>
    </React.Fragment>
  );
};

export default EditFAQ;
