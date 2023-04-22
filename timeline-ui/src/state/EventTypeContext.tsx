import React, {useContext, useEffect, useState} from "react";
import {EventType, ManageEventTypeDTO} from "../models/model";
import {createEventType, deleteEventType, getAllEventTypes, updateEventType} from "../api/EventTypeService";
import {UserContext} from "./UserContext";
import {SnackbarContext} from "./SnackbarContext";
import {AxiosError} from "axios";
import {EventContext} from "./EventContext";

type EventTypeContextType = {
    eventTypes: EventType[]
    createEventType: (eventType: ManageEventTypeDTO) => Promise<void>,
    updateEventType: (eventTypeId: number, eventType: ManageEventTypeDTO) => Promise<void>,
    deleteEventType: (eventTypeId: number) => Promise<void>
};

export const EventTypeContext = React.createContext<EventTypeContextType>({
    eventTypes: [],
    createEventType(eventType: ManageEventTypeDTO): Promise<void> {
        return Promise.resolve();
    },
    deleteEventType(eventTypeId: number): Promise<void> {
        return Promise.resolve();
    },
    updateEventType(eventTypeId: number, eventType: ManageEventTypeDTO): Promise<void> {
        return Promise.resolve();
    }
});

const EventTypeContextProvider: React.FC<{ children?: React.ReactNode }> = (props) => {
    const userContext = useContext(UserContext);
    const eventContext = useContext(EventContext);
    const snackbarContext = useContext(SnackbarContext);

    const [eventTypes, setEventTypes] = useState<EventType[]>([]);

    useEffect(() => {
        fetchAllEventTypesAndSetState();
    }, []);

    const fetchAllEventTypesAndSetState = async () => {
        try {
            const fetchedEventTypes = await getAllEventTypes();
            setEventTypes(fetchedEventTypes);
        } catch (err) {
            const axiosError = err as AxiosError;
            snackbarContext.openErrorSnack(`Failed fetching event types: ${JSON.stringify(axiosError.response?.data)}`);
        }
    }

    const createEventTypeHandler = async (eventType: ManageEventTypeDTO) => {
        try {
            await createEventType(userContext.loggedUser!.accessToken, eventType);
        } catch (err) {
            const axiosError = err as AxiosError;
            snackbarContext.openErrorSnack(`Failed creating event type: ${JSON.stringify(axiosError.response?.data)}`);
        }

        // TODO change it
        await fetchAllEventTypesAndSetState();
    }
    const updateEventTypeHandler = async (eventTypeId: number, eventType: ManageEventTypeDTO) => {
        try {
            await updateEventType(userContext.loggedUser!.accessToken, eventTypeId, eventType);
        } catch (err) {
            const axiosError = err as AxiosError;
            snackbarContext.openErrorSnack(`Failed updating event type: ${JSON.stringify(axiosError.response?.data)}`);
        }

        // TODO change it
        await fetchAllEventTypesAndSetState();

        eventContext.refreshEvents();
    }
    const deleteEventTypeHandler = async (eventTypeId: number) => {
        try {
            await deleteEventType(userContext.loggedUser!.accessToken, eventTypeId);
        } catch (err) {
            const axiosError = err as AxiosError;
            snackbarContext.openErrorSnack(`Failed deleting event type: ${JSON.stringify(axiosError.response?.data)}`);
        }

        // TODO change it
        await fetchAllEventTypesAndSetState();
    }

    const contextValue: EventTypeContextType = {
        eventTypes,
        createEventType: createEventTypeHandler,
        updateEventType: updateEventTypeHandler,
        deleteEventType: deleteEventTypeHandler
    };

    return (
        <EventTypeContext.Provider value={contextValue}>
            {props.children}
        </EventTypeContext.Provider>
    );
};

export default EventTypeContextProvider;
