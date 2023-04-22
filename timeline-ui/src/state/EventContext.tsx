import React, {useContext, useEffect, useState} from "react";
import {Event, ManageEventDTO} from "../models/model";
import {createEvent, deleteEvent, getAllEvents, updateEvent} from "../api/EventService";
import {UserContext} from "./UserContext";
import {SnackbarContext} from "./SnackbarContext";
import {AxiosError} from "axios";

type EventContextType = {
    events: Event[]
    createEvent: (event: ManageEventDTO) => void,
    updateEvent: (eventId: number, event: ManageEventDTO) => void,
    deleteEvent: (eventId: number) => void,
    refreshEvents: () => void
};

export const EventContext = React.createContext<EventContextType>({
    events: [],
    createEvent(event: ManageEventDTO): void {
    },
    deleteEvent(eventId: number): void {
    },
    updateEvent(eventId: number, event: ManageEventDTO): void {
    },
    refreshEvents(): void {
    }
});

const EventContextProvider: React.FC<{ children?: React.ReactNode }> = (props) => {
    const userContext = useContext(UserContext);
    const snackbarContext = useContext(SnackbarContext);

    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        fetchAllEventsAndSetState();
    }, []);

    const fetchAllEventsAndSetState = async () => {
        try {
            const fetchedEvents = await getAllEvents();
            setEvents(fetchedEvents);
        } catch (err) {
            const axiosError = err as AxiosError;
            snackbarContext.openErrorSnack(`Failed fetching events: ${JSON.stringify(axiosError.response?.data)}`);
        }
    }

    const createEventHandler = async (event: ManageEventDTO) => {
        try {
            await createEvent(userContext.loggedUser!.accessToken, event);
        } catch (err) {
            const axiosError = err as AxiosError;
            snackbarContext.openErrorSnack(`Failed creating event: ${JSON.stringify(axiosError.response?.data)}`);
        }

        // TODO change it
        await fetchAllEventsAndSetState();
    }
    const updateEventHandler = async (eventId: number, event: ManageEventDTO) => {
        try {
            await updateEvent(userContext.loggedUser!.accessToken, eventId, event);
        } catch (err) {
            const axiosError = err as AxiosError;
            snackbarContext.openErrorSnack(`Failed updating event: ${JSON.stringify(axiosError.response?.data)}`);
        }

        // TODO change it
        await fetchAllEventsAndSetState();
    }
    const deleteEventHandler = async (eventId: number) => {
        try {
            await deleteEvent(userContext.loggedUser!.accessToken, eventId);
        } catch (err) {
            const axiosError = err as AxiosError;
            snackbarContext.openErrorSnack(`Failed deleting event: ${JSON.stringify(axiosError.response?.data)}`);
        }

        // TODO change it
        await fetchAllEventsAndSetState();
    }

    const refreshEventsHandler = () => {
        fetchAllEventsAndSetState();
    }

    const contextValue: EventContextType = {
        events,
        createEvent: createEventHandler,
        updateEvent: updateEventHandler,
        deleteEvent: deleteEventHandler,
        refreshEvents: refreshEventsHandler
    };

    return (
        <EventContext.Provider value={contextValue}>
            {props.children}
        </EventContext.Provider>
    );
};

export default EventContextProvider;
