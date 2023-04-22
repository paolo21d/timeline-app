import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {AddCircleRounded} from "@mui/icons-material";
import {useContext, useState} from "react";
import {UserContext} from "../state/UserContext";
import RegisterUserDialog from "./RegisterUserDialog";
import LoginUserDialog from "./LoginUserDialog";
import {ManageEventDialogContext} from "../state/ManageEventDialogContext";
import {ManageEventTypeDialogContext} from "../state/ManageEventTypeDialogContext";

const Header: React.FC = () => {
    const [isRegisterUserDialogVisible, setIsRegisterUserDialogVisible] = useState<boolean>(false);
    const [isLoginUserDialogVisible, setIsLoginUserDialogVisible] = useState<boolean>(false);

    const userContext = useContext(UserContext);
    const manageEventDialogContext = useContext(ManageEventDialogContext);
    const manageEventTypeDialogContext = useContext(ManageEventTypeDialogContext);

    return (
        <Box sx={{flexGrow: 1}} displayPrint="none">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6"
                                component="a"
                                sx={{
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none'
                                }}>
                        Timeline APP
                    </Typography>

                    {userContext.loggedUser != null ?
                        <>
                            <Button color="info"
                                    variant="contained"
                                    sx={{marginRight: 1}}
                                    startIcon={<AddCircleRounded/>}
                                    onClick={() => manageEventDialogContext.openToCreateEvent()}>
                                Add event
                            </Button>
                            <Button color="info"
                                    variant="contained"
                                    sx={{marginRight: 1}}
                                    startIcon={<AddCircleRounded/>}
                                    onClick={() => manageEventTypeDialogContext.openToCreateEventType()}>
                                Add event type
                            </Button>
                            <Button color="info"
                                    variant="contained"
                                    sx={{marginRight: 1}}
                                    startIcon={<AddCircleRounded/>}
                                    onClick={() => setIsRegisterUserDialogVisible(true)}>
                                Register user
                            </Button>
                            <Button color="inherit" onClick={userContext.logOut}>
                                Logout
                            </Button>
                        </>
                        :
                        <Button color="inherit" onClick={() => setIsLoginUserDialogVisible(true)}>
                            Login
                        </Button>
                    }
                </Toolbar>

                <RegisterUserDialog isVisible={isRegisterUserDialogVisible}
                                    onClose={() => setIsRegisterUserDialogVisible(false)}/>
                <LoginUserDialog isVisible={isLoginUserDialogVisible}
                                 onClose={() => setIsLoginUserDialogVisible(false)}/>
            </AppBar>
        </Box>
    );
}

export default Header;