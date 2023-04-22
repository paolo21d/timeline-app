import React, {useContext, useState} from "react";
import {LoggedUser} from "../models/model";
import {loginUser} from "../api/UserService";
import {SnackbarContext} from "./SnackbarContext";
import {AxiosError} from "axios";

type UserContextType = {
    loggedUser: LoggedUser | null;
    logIn: (userName: string, password: string) => Promise<void>;
    logOut: () => void;
};

export const UserContext = React.createContext<UserContextType>({
    loggedUser: null,
    logIn(userName: string, password: string): Promise<void> {
        return Promise.resolve();
    },
    logOut(): void {
    }
});

const UserContextProvider: React.FC<{ children?: React.ReactNode }> = (props) => {
    const snackbarContext = useContext(SnackbarContext);
    const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);

    const logInHandler = async (userName: string, password: string) => {
        try {
            const response = await loginUser(userName, password);
            setLoggedUser(response);
        } catch (err) {
            const axiosError = err as AxiosError;
            snackbarContext.openErrorSnack(`Login failed: ${JSON.stringify(axiosError.response?.data)}`);
        }
    }

    const logOutHandler = () => {
        setLoggedUser(null);
    }

    const contextValue: UserContextType = {
        loggedUser,
        logIn: logInHandler,
        logOut: logOutHandler
    };

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;