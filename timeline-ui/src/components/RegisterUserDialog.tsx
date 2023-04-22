import {useContext, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {registerUser} from "../api/UserService";
import {SnackbarContext} from "../state/SnackbarContext";
import {AxiosError} from "axios";

type PropsType = {
    isVisible: boolean,
    onClose: () => void
}

const RegisterUserDialog: React.FC<PropsType> = ({isVisible, onClose}) => {
    const snackbarContext = useContext(SnackbarContext);

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleRegisterUser = async () => {
        try {
            await registerUser(login, password);
        } catch (err) {
            const axiosError = err as AxiosError;
            snackbarContext.openErrorSnack(`User register failed: ${JSON.stringify(axiosError.response?.data)}`);
        } finally {
            onClose();
        }
    }

    return (
        <Dialog open={isVisible} onClose={onClose}>
            <DialogTitle>
                Register user
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="login"
                    label="Login"
                    type="text"
                    value={login}
                    fullWidth
                    // variant="standard"
                    onChange={(event) => setLogin(event.target.value)}
                />
                <TextField
                    required
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    fullWidth
                    // variant="standard"
                    onChange={(event) => setPassword(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
                <Button onClick={handleRegisterUser}>Register</Button>
            </DialogActions>
        </Dialog>
    );
}

export default RegisterUserDialog;