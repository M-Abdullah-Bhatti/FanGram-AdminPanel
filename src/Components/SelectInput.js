import { makeStyles } from "@material-ui/core";
import { MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";

const usePlaceholderStyles = makeStyles((theme) => ({
	placeholder: {
		color: "#8E8E8E",
	},
}));

const Placeholder = ({ children }) => {
	const classes = usePlaceholderStyles();
	return <div className={classes.placeholder}>{children}</div>;
};

export const SelectInput = ({
	options,
	placeholder,
	selecthandle,
	value,
	name,
	styles,
	onBlur,
}) => {
	return (
		<>
			<Select
				labelId='demo-simple-select-label'
				id='demo-simple-select'
				onChange={selecthandle}
				placeholder={placeholder}
				displayEmpty
				value={value}
				name={name}
				onBlur={onBlur}
				renderValue={
					value == ""
						? () => <Placeholder>{placeholder}</Placeholder>
						: undefined
				}
				sx={{
					//   backgroundColor: "red",
					width: "100%",
					marginTop: "5px",
					height: "50px",
					border: "1px solid #EAEAEA !important",
					color: "#000",
					"& .MuiInputBase-input": {
						padding: "6px",
						textOverflow: "ellipsis",
					},
					"&::placeholder": {
						color: "#000",
						fontSize: "14px",
						fontWeight: " 400 !important",
					},
					"& .MuiOutlinedInput-root": {
						color: "#000",
						fontSize: "14px",
					},
					"& .css-1o6z5ng": {
						padding: "6px",
						textOverflow: "ellipsis",
					},
					"&:hover fieldset": {
						border: "none",
						outline: "none",
					},
					"&:focus fieldset": {
						border: "none",
						outline: "none",
					},
					"& fieldset": {
						border: "none",
					},
					"&:hover": {
						border: `1px solid "#000"`,
					},
					...styles,
				}}>
				<MenuItem sx={{ width: "100%", display: "none" }} value=''>
					{placeholder}
				</MenuItem>
				{options.map((i) => (
					<MenuItem sx={{ width: "100%" }} value={i.name}>
						{i.name}
					</MenuItem>
				))}
			</Select>
		</>
	);
};
