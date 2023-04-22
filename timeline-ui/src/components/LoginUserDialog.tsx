import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useContext, useState} from "react";
import {UserContext} from "../state/UserContext";

type PropsType = {
    isVisible: boolean,
    onClose: () => void
}

const LoginUserDialog: React.FC<PropsType> = ({isVisible, onClose}) => {
    const userContext = useContext(UserContext);

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogIn = async () => {
        await userContext.logIn(login, password);
        onClose();
    }

    return (
        <Dialog open={isVisible} onClose={onClose}>
            <DialogTitle>
                Login user
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
                <Button onClick={handleLogIn}>Log in</Button>
            </DialogActions>
        </Dialog>
    );
}

export default LoginUserDialog;