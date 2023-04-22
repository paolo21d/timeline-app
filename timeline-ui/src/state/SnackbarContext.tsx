import {Alert, AlertColor, Snackbar} from "@mui/material";
import {createContext, useState} from "react";

class Snack {
    message?: string;
    color?: AlertColor;
    autoHideDuration?: number;
    open: boolean;

    constructor(open: boolean, message = "", color = "info" as AlertColor, autoHideDuration = 5000) {
        this.message = message;
        this.color = color;
        this.autoHideDuration = autoHideDuration;
        this.open = open;
    }
}

export {Snack};

type SnackbarContextType = {
    snack: Snack;
    openInfoSnack: (message: string) => Promise<void>;
    openSuccessSnack: (message: string) => Promise<void>;
    openErrorSnack: (message: string) => Promise<void>;
};

export const SnackbarContext = createContext<SnackbarContextType>({
    snack: new Snack(false),
    openInfoSnack(message: string): Promise<void> {
        return Promise.resolve();
    },
    openSuccessSnack(message: string): Promise<void> {
        return Promise.resolve();
    },
    openErrorSnack(message: string): Promise<void> {
        return Promise.resolve();
    },
});

export const SnackbarContextProvider: React.FC<{ children?: React.ReactNode }> = (props) => {
    const [snack, setSnack] = useState(new Snack(false));

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSnack(new Snack(false));
    };

    const openInfoSnackHandler = async (message: string) => {
        setSnack(new Snack(true, message, "info"));
    };
    const openSuccessSnackHandler = async (message: string) => {
        setSnack(new Snack(true, message, "success"));
    };
    const openErrorSnackHandler = async (message: string) => {
        setSnack(new Snack(true, message, "error"));
    };

    const contextValue: SnackbarContextType = {
        snack,
        openInfoSnack: openInfoSnackHandler,
        openErrorSnack: openErrorSnackHandler,
        openSuccessSnack: openSuccessSnackHandler,
    };

    return (
        <SnackbarContext.Provider value={contextValue}>
            {props.children}
            <Snackbar open={snack.open} autoHideDuration={snack.autoHideDuration} onClose={handleClose}>
                <Alert severity={snack.color}>{snack.message || ""}</Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};
