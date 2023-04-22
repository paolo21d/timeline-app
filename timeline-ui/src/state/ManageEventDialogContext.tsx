import React, {useState} from "react";
import ManageEventDialog from "../components/ManageEventDialog";
import {Event, getEmptyManageEventDTO, ManageEventDTO} from "../models/model"

type ManageEventDialogContextType = {
    openToCreateEvent(): void,
    openToUpdateEvent(event: Event): void

};

export const ManageEventDialogContext = React.createContext<ManageEventDialogContextType>({
    openToCreateEvent() {
    },
    openToUpdateEvent(event: Event) {
    }
});

const ManageEventDialogContextProvider: React.FC<{ children?: React.ReactNode }> = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const [managingEventId, setManagingEventId] = useState<number | undefined>(undefined);
    const [managingEvent, setManagingEvent] = useState<ManageEventDTO>(getEmptyManageEventDTO());

    const handleCreateEvent = () => {
        setManagingEventId(undefined);
        setManagingEvent(getEmptyManageEventDTO());
        setIsVisible(true);
    };

    const handleUpdateEvent = (event: Event) => {
        setManagingEventId(event.eventId);
        setManagingEvent({
            endDate: event.endDate,
            eventTypeId: event.eventType.typeId!,
            imageURL: event.imageURL,
            longDescription: event.longDescription,
            name: event.name,
            shortDescription: event.shortDescription,
            startDate: event.startDate
        });
        setIsVisible(true);
    }

    const contextValue: ManageEventDialogContextType = {
        openToCreateEvent: handleCreateEvent,
        openToUpdateEvent: handleUpdateEvent
    };

    return (
        <ManageEventDialogContext.Provider value={contextValue}>
            {props.children}
            {isVisible &&
                <ManageEventDialog managingEventId={managingEventId} managingEvent={managingEvent} isVisible={isVisible}
                                   onClose={() => setIsVisible(false)}/>}
        </ManageEventDialogContext.Provider>
    );
};

export default ManageEventDialogContextProvider;