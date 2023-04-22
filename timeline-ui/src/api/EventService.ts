import {Event, ManageEventDTO} from "../models/model";
import {apiConfig, authHeader} from "./common";
import axios from "axios";

export const createEvent = async (token: string, event: ManageEventDTO): Promise<Event> => {
    const requestUrl = apiConfig.apiUrl + "/event";
    const response = await axios.post(requestUrl, event, authHeader(token));
    return Promise.resolve(response.data);
};

export const updateEvent = async (token: string, eventId: number, event: ManageEventDTO): Promise<Event> => {
    const requestUrl = apiConfig.apiUrl + "/event/" + eventId;
    const response = await axios.put(requestUrl, event, authHeader(token));
    return Promise.resolve(response.data);
};

export const deleteEvent = async (token: string, eventId: number): Promise<void> => {
    const requestUrl = apiConfig.apiUrl + "/event/" + eventId;
    await axios.delete(requestUrl, authHeader(token));
};

export const getAllEvents = async (): Promise<Event[]> => {
    const requestUrl = apiConfig.apiUrl + "/event";
    const response = await axios.get(requestUrl);
    return response.data as Event[];
};