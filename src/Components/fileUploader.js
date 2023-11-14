import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import import_icon from "../Assets/Icon - Import.svg";
import Papa from "papaparse";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

const App = () => {
  const [data, setData] = useState([]);

  const [error, setError] = useState("");

  const [file, setFile] = useState("");

  const handleFileChange = (e) => {
    setError("");

    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }
      console.log("---------------------");

      // code of another function

      const reader = new FileReader();

      reader.onload = async ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        const parsedData = csv?.data;
        const columns = Object.keys(parsedData[0]);
        setData(columns);
        console.log("mydata", parsedData);
      };
      reader.readAsText(inputFile);

      // setFile(inputFile);
    }
  };
  // const handleParse = () => {
  //   if (!file) return setError("Enter a valid file");

  //   const reader = new FileReader();

  // reader.onload = async ({ target }) => {
  //   const csv = Papa.parse(target.result, { header: true });
  //   const parsedData = csv?.data;
  //   const columns = Object.keys(parsedData[0]);
  //   setData(columns);
  //   console.log("mydata", parsedData);
  // };
  // reader.readAsText(file);
  // };

  return (
    <>
      <Typography variant='p' gutterBottom display='inline' component={"p"}>
        <label for='import-csv'>
          <img src={import_icon} style={{ marginRight: "10px" }} alt='' />
          Import CSV
          {/* <input type="file" /> */}
          <input
            onChange={handleFileChange}
            id='csvInput'
            name='file'
            type='File'
          />
        </label>
      </Typography>
    </>

    // <div>
    //   <label htmlFor="csvInput" style={{ display: "block" }}>
    //     Enter CSV File
    //   </label>
    // <input
    //   onChange={handleFileChange}
    //   id="csvInput"
    //   name="file"
    //   type="File"
    // />
    //   <div>{/* <button onClick={handleParse}>Parse</button> */}</div>
    // {/* <div style={{ marginTop: "3rem" }}>
    //   {error ? error : data.map((col, idx) => <div key={idx}>{col}</div>)}
    // </div> */}
    // </div>
  );
};

export default App;
