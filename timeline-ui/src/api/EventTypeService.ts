import {EventType, ManageEventTypeDTO} from "../models/model";
import {apiConfig, authHeader} from "./common";
import axios from "axios";

export const createEventType = async (token: string, eventType: ManageEventTypeDTO): Promise<EventType> => {
    const requestUrl = apiConfig.apiUrl + "/event-type";
    const response = await axios.post(requestUrl, eventType, authHeader(token));
    return Promise.resolve(response.data);
};

export const updateEventType = async (token: string, eventTypeId: number, eventType: ManageEventTypeDTO): Promise<EventType> => {
    const requestUrl = apiConfig.apiUrl + "/event-type/" + eventTypeId;
    const response = await axios.put(requestUrl, eventType, authHeader(token));
    return Promise.resolve(response.data);
};

export const deleteEventType = async (token: string, eventTypeId: number): Promise<void> => {
    const requestUrl = apiConfig.apiUrl + "/event-type/" + eventTypeId;
    await axios.delete(requestUrl, authHeader(token));
};

export const getAllEventTypes = async (): Promise<EventType[]> => {
    const requestUrl = apiConfig.apiUrl + "/event-type";
    const response = await axios.get(requestUrl);
    return response.data as EventType[];
};