import React from "react";
import { TextField, IconButton } from "@material-ui/core";
import { Search, CancelOutlined } from "@material-ui/icons";

const SearchBar = (props) => {
  // console.log(props);
  const [value, setValue] = React.useState(props.value);
  return (
    <div
      style={{ display: "flex", alignItems: "flex-end", marginBottom: "20px" }}
    >
      <TextField
        name="search"
        label={props.label}
        value={value}
        fullWidth
        inputProps={{ style: { fontSize: "12px" } }}
        InputLabelProps={{ style: { fontSize: "12px" } }}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange(e.target.value);
        }}
        variant="standard"
      />
      {props.value ? (
        <IconButton
          onClick={() => {
            setValue("");
            props.onChange("");
          }}
          style={{ padding: 1 }}
        >
          <CancelOutlined />
        </IconButton>
      ) : (
        <IconButton style={{ padding: 1 }}>
          <Search />
        </IconButton>
      )}
    </div>
  );
};

export default SearchBar;
