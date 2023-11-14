import { Button, CircularProgress, Typography } from "@mui/material";
import plus from "../Assets/tabler_plus.svg";

const ButtonIconComponent = ({
	loader,
	name,
	onClick,
	dashboard,
	styles,
	imageBool,
	type,
	disabled,
}) => {
	return (
		<>
			<Button
				type={type || "button"}
				style={{
					border: `1px solid #000`,
					color: "#fff",
					borderRadius: "60px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: "0.5rem",
					textTransform: "capitalize",
					marginTop: "10px",
					padding: "7px 16px",
					fontWeight: 500,
					fontSize: "14px",
					color: "#FDC564",
					textOverflow: "ellipsis",
					overflow: "hidden",
					whiteSpace: "nowrap",
					backgroundColor: "#000",
					cursor: "pointer",
					...styles,
				}}
				onClick={onClick}
				disabled={disabled}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}>
					{imageBool ? (
						<img
							src={plus}
							alt='type img'
							style={{
								width: "17px",
								height: "17px",
							}}
						/>
					) : (
						""
					)}

					{loader ? (
						<CircularProgress size={23} color='primary' />
					) : (
						<Typography sx={{ paddingLeft: "10px", color: "#fff" }}>
							{name}
						</Typography>
					)}
				</div>
			</Button>
			{/* <Button
                variant='contained'
                color='primary'
                type='submit'
                className='login-submit'
                // style={{
                //     padding: "10px 40px",
                //     margin: "20px auto",
                //     backgroundColor: "#000",
                //     borderRadius: "25px",
                //     textTransform: 'capitalize',
                //     color: "white",
                //     "&:hover": {
                //         border: "none",
                //         backgroundColor: "#000",
                //     },
                //     width: dashboard ? '15%' : '100%',
                //     // height: '25px'
                // }}
                disabled={loader}
                onClick={onClick}>
                {loader ? (
                    <CircularProgress size={23} color='primary' />
                ) : (
                    name
                )}
            </Button> */}
		</>
	);
};

export default ButtonIconComponent;
