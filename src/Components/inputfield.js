import { TextField } from "@mui/material";

const InputField = ({
	type,
	name,
	value,
	placeholder,
	onChange,
	defaultValue,
	multiline,
	require,
}) => { 
	return (
		<>
			<TextField
				// className='input_fields'
				id='filled-hidden-label-small'
				noWrap
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				defaultValue={defaultValue}
				required={require}
				onChange={onChange}
				multiline={multiline}
				InputProps={{ disableUnderline: true }}
				sx={{
					// border: `1px solid ${GlobalColor.RiwaLineColor}`,
					borderRadius: "4px",
					width: "100%",
					marginTop: "5px",
					height: multiline ? "auto" : "50px",
					color: "#000",
					justifyContent: "center",
					border: "2px solid #EAEAEA !important",
					borderRadius: "8px",
					padding: "10px 0px",
					"& .MuiInputBase-input": {
						padding: "6px",
						textOverflow: "ellipsis",
					},
					"&::placeholder": {
						color: "#8E8E8E",
					},
					"& .MuiOutlinedInput-root": {
						color: "#000",
						fontSize: "14px",
					},
					"& .css-1o6z5ng": {
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
					"& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root": {
						padding: "10px 0px !important",
					},
				}}
				// style={{ paddingInline: "10px" }}
			/>
		</>
	);
};
export default InputField;
