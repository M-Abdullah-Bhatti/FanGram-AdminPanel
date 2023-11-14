import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Vector from "../../Assets/success.svg";
import { styled, Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
const Successmodal = ({ handleClose, open, data }) => {
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
        borderRadius: "8px",

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
        fontWeight: '600',
        padding: '0px 20px'

    });


    const Discard = styled(Button)({
        fontFamily: "Poppins !important",
        fontWeight: 'unset',
        backgroundColor: '#000 !important',
        fontSize: '20px',
        borderRadius: "25px !important",
        height: "45px",
        textTransform: 'capitalize !important',
        width: '200px',
        color: 'white !important',
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
        marginRight: '5px',
        border: '1px solid #000',
        "&:hover": {
            background: "white !important'",
            color: "#102B4B !important'",
        }
    })


    const Row = styled('div')({
        display: 'flex',
        marginTop: '30px',
        justifyContent: 'center',
    })

    return (
        <>
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
                        {data}
                    </Paragraph>
                    <Row>
                        <Discard onClick={handleClose}>Done</Discard>
                    </Row>
                </Box>
            </Modal>

        </>
    )
}
export default Successmodal;