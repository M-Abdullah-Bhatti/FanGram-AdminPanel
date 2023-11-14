import { Box, Modal } from "@mui/material";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 700,
	bgcolor: "background.paper",
	borderRadius: "10px",
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
	height: "95%",
	overflowY: "scroll",
};

const AddNewAssetModal = ({ open, handleClose, children }) => {
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby='parent-modal-title'
			aria-describedby='parent-modal-description'>
			<Box sx={{ ...style }}>{children}</Box>
		</Modal>
	);
};

export default AddNewAssetModal;
