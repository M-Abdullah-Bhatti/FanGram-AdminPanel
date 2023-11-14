import { Button, CircularProgress } from "@mui/material";
import plus from '../Assets/tabler_plus.svg'

const ButtonComponent = ({ loader, name, onClick, dashboard }) => {
    return (
        <>
            <Button
                variant='contained'
                color='primary'
                type='submit'
                className='login-submit'
                style={{
                    padding: "10px 40px",
                    margin: "20px auto",
                    backgroundColor: "#000",
                    borderRadius: "25px",
                    textTransform: 'capitalize',
                    color: "white",
                    "&:hover": {
                        border: "none",
                        backgroundColor: "#000",
                    },
                    width: dashboard ? '15%' : '100%',
                    // height: '25px'
                }}
                disabled={loader}
                onClick={onClick}>
                {loader ? (
                    <CircularProgress size={23} color='primary' />
                ) : (
                    name
                )}
            </Button>
        </>
    )
}
export default ButtonComponent;