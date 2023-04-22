import {LoggedUser, LoginDTO, RegisterUserDTO} from "../models/model";
import axios from "axios";
import {apiConfig} from "./common";

export const loginUser = async (userName: string, password: string): Promise<LoggedUser> => {
    const requestUrl = apiConfig.apiUrl + "/login";
    const requestBody: LoginDTO = {
        login: userName,
        password: password
    };
    const response = await axios.post(requestUrl, requestBody);
    console.log(response.data);
    console.log(response.headers);

    const accessToken = response.data.access_token;
    // @ts-ignore
    const userId = response.headers["user-id"] as number;
    const userNameResponse = response.headers["user-name"] as string;
    return Promise.resolve({
        userId: userId,
        userName: userNameResponse,
        accessToken: accessToken,
    });
}

export const registerUser = async (userName: string, password: string): Promise<number> => {
    const requestUrl = apiConfig.apiUrl + "/user";
    const requestBody: RegisterUserDTO = {
        userName: userName,
        password: password
    };
    const response = await axios.post(requestUrl, requestBody);

    return response.data;
}