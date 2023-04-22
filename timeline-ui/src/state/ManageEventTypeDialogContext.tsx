import React, {useState} from "react";
import {EventType, getEmptyManageEventTypeDTO, ManageEventTypeDTO} from "../models/model"
import ManageEventTypeDialog from "../components/ManageEventTypeDialog";

type ManageEventTypeDialogContextType = {
    openToCreateEventType(): void,
    openToUpdateEventType(eventType: EventType): void

};

export const ManageEventTypeDialogContext = React.createContext<ManageEventTypeDialogContextType>({
    openToCreateEventType() {
    },
    openToUpdateEventType(eventType: EventType) {
    }
});

const ManageEventTypeDialogContextProvider: React.FC<{ children?: React.ReactNode }> = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const [managingEventTypeId, setManagingEventTypeId] = useState<number | undefined>(undefined);
    const [managingEventType, setManagingEventType] = useState<ManageEventTypeDTO>(getEmptyManageEventTypeDTO());

    const handleCreateEventType = () => {
        setManagingEventTypeId(undefined);
        setManagingEventType(getEmptyManageEventTypeDTO());
        setIsVisible(true);
    };

    const handleUpdateEventType = (eventType: EventType) => {
        setManagingEventTypeId(eventType.typeId);
        setManagingEventType({
            name: eventType.name!,
            colour: eventType.colour!
        });
        setIsVisible(true);
    }

    const contextValue: ManageEventTypeDialogContextType = {
        openToCreateEventType: handleCreateEventType,
        openToUpdateEventType: handleUpdateEventType
    };

    return (
        <ManageEventTypeDialogContext.Provider value={contextValue}>
            {props.children}
            {isVisible &&
                <ManageEventTypeDialog managingEventTypeId={managingEventTypeId} managingEventType={managingEventType}
                                       isVisible={isVisible}
                                       onClose={() => setIsVisible(false)}/>}
        </ManageEventTypeDialogContext.Provider>
    );
};

export default ManageEventTypeDialogContextProvider;