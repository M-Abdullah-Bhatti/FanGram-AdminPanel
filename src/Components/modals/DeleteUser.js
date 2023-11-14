import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import WarningIcon from '@mui/icons-material/Warning';
import Vector from "../../Assets/error.svg";
// import { deleteUser } from '../../NetworkCalls/firestoreCalls';
import { deleteAdmin } from '../../NetworkCalls/Admin/ServerReq';

const style = {
    position: 'absolute',
    top: '53%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
    pt: 4,
    px: 4,
    pb: 5,
    textAlign: "center",
    "& .MuiBox-root": {
        padding: "0px",
        background: "red"
    },
    borderRadius: "8px"

};

const style2 = {
    padding: "0px",
    "& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
        backgroundColor: "#000",
        opacity: '0.2 !important',
    },
    "& .MuiBox-root": {
        paddingLeft: "0px",
        paddingRight: "0px",
        backgroundColor: "#fff",
        border: 'none !important',
    },
    border: 'none !important',
    "&:focus": {
        border: 'none !important',
    }
};


const Head = styled("h2")({

})

const Name = styled("h2")({
    color: "#1A212C",
    fontSize: '24px',
    marginLeft: '10px',
})

const Paragraph = styled("div")({
    color: "#1A212C",
    fontSize: '22px',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: "Poppins",
    padding: '0px 35px',
});


const Discard = styled(Button)({
    fontFamily: "Poppins !important",
    fontWeight: "unset",
    fontSize: "20px",
    borderRadius: "25px",
    height: "55px",
    textTransform: "capitalize",
    width: "200px",
    color: "#000",
    backgroundColor: "#fff",
    marginRight: "5px",
    border: '1px solid #000',

    "&:hover": {
        backgroundColor: "#fff",
        color: "#000",
    },
});

const Delete = styled(Button)({
    color: "#fff",
    fontSize: "20px",
    width: "200px",
    borderRadius: "25px",
    // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
    height: "55px",
    marginLeft: "5px",
    fontFamily: "Poppins !important",
    fontWeight: "unset",
    textTransform: "capitalize",
    backgroundColor: "#DD2E35",
    border: '1px solid red',
    "&:hover": {
        background: "#DD2E35",
    }
});

const Row = styled('div')({
    display: 'flex',
    marginTop: '30px',
    justifyContent: 'center',
})




export default function DeleteUser({ handleClose, open, data, setRefresh, setData }) {

    const [Loading, setLoading] = React.useState(false)
    const [Open2, setOpen] = React.useState(false);


    const _DeleteUser = async (uid) => {

        setData(items => items.filter(it => it?._id != uid))
        setLoading(true);
        const api = await deleteAdmin(uid);
        if (api.status === 200) {
            setLoading(false);
            handleClose()
            handleModal2();

        } else {
            setLoading(false);
            alert("user deletion failed")
            handleClose();
        }
    }
    const handleModal2 = () => {
        setOpen(!Open2);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                sx={style2}
            >
                <Box sx={{ ...style, width: 470 }}>
                    {/* <Head id="parent-modal-title">Text in a modal</Head> */}
                    <img src={Vector} style={{ marginBottom: '30px', height: "75px" }} />

                    <Paragraph>
                        Are you sure you want to delete this admin
                    </Paragraph>
                    {/* <Paragraph>
                        delete user  <Name> “{data.name}”</Name>?
                    </Paragraph> */}
                    <Row>
                        <Discard disabled={Loading} onClick={handleClose}>Discard</Discard>
                        <Delete disabled={Loading} onClick={() => _DeleteUser(data.uid)}>Delete</Delete>
                    </Row>
                </Box>
            </Modal>


            <Deleted
                handleClose={handleModal2}
                open={Open2}
                setRefresh={setRefresh} />
        </div>
    );
}

function Deleted({ handleClose, open, setRefresh }) {

    function close() {
        handleClose();
        // setRefresh(refresh => !refresh)
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                sx={style2}
            >
                <Box sx={{ ...style, width: 450 }}>
                    <img src={Vector} style={{ marginBottom: '30px', height: "75px" }} />

                    <Paragraph>
                        User Deleted
                    </Paragraph>
                    <Row>
                        <Discard onClick={close}>Done</Discard>
                    </Row>
                </Box>
            </Modal>
        </div>
    );
}
