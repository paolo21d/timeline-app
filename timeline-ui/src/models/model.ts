export interface Event {
    eventId?: number;
    name: string;
    eventType: EventType;
    startDate: string;
    endDate: string;
    shortDescription: string;
    longDescription: string;
    imageURL?: string;
    createDateTime?: string;
}

export interface EventType {
    typeId?: number;
    name?: string;
    colour?: string;
}

export interface ManageEventDTO {
    name: string;
    eventTypeId: number;
    startDate: string;
    endDate: string;
    shortDescription: string;
    longDescription: string;
    imageURL?: string;
}

export const getEmptyManageEventDTO = (): ManageEventDTO => {
    return {
        endDate: "", eventTypeId: 0, imageURL: "", longDescription: "", name: "", shortDescription: "", startDate: ""
    };
};

export interface ManageEventTypeDTO {
    name: string;
    colour: string;
}

export const getEmptyManageEventTypeDTO = (): ManageEventTypeDTO => {
    return {
        colour: "", name: ""

    };
};

export interface RegisterUserDTO {
    userName: string;
    password: string;
}

export interface LoginDTO {
    login: string;
    password: string;
}

export interface LoggedUser {
    userId: number,
    userName: string,
    accessToken: string,
}