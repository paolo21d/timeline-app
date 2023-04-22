import {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {EventContext} from "../../state/EventContext";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Event} from "../../models/model";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {UserContext} from "../../state/UserContext";
import {ManageEventDialogContext} from "../../state/ManageEventDialogContext";
import {IconButton, TableSortLabel} from "@mui/material";

enum SortingOrder {
    ASC = 1,
    DESC = -1
}

const EventsTable: React.FC = () => {
    const eventContext = useContext(EventContext);
    const userContext = useContext(UserContext);

    const [displayedEvents, setDisplayedEvents] = useState<Event[]>([])

    const [eventIdOrder, setEventIdOrder] = useState<SortingOrder | undefined>(SortingOrder.ASC);
    const [nameOrder, setNameOrder] = useState<SortingOrder | undefined>(undefined);
    const [eventTypeIdOrder, setEventTypeIdOrder] = useState<SortingOrder | undefined>(undefined);
    const [startDateOrder, setStartDateOrder] = useState<SortingOrder | undefined>(undefined);

    useEffect(() => {
        // setDisplayedEvents(sortByStartDate(eventContext.events, SortingOrder.ASC));
        setDisplayedEvents(sortBaseOnState(eventContext.events));
    }, [eventContext.events]);

    const sortBaseOnState = (events: Event[]) => {
        if (eventIdOrder !== undefined) {
            return sortByEventId(events, eventIdOrder);
        } else if (nameOrder !== undefined) {
            return sortByName(events, nameOrder);
        } else if (eventTypeIdOrder !== undefined) {
            return sortByEventTypeId(events, eventTypeIdOrder);
        } else if (startDateOrder !== undefined) {
            return sortByStartDate(events, startDateOrder);
        } else {
            return sortByEventId(events, SortingOrder.ASC);
        }
    }

    const sortByEventId = (events: Event[], sortingOrder: SortingOrder) => {
        return events.sort((e1, e2) => {
            if (e1.eventId! > e2.eventId!) {
                return sortingOrder.valueOf();
            } else {
                return -sortingOrder.valueOf();
            }
        })
    }

    const sortByName = (events: Event[], sortingOrder: SortingOrder) => {
        return events.sort((e1, e2) => {
            if (e1.name > e2.name) {
                return sortingOrder.valueOf();
            } else {
                return -sortingOrder.valueOf();
            }
        })
    }

    const sortByEventTypeId = (events: Event[], sortingOrder: SortingOrder) => {
        return events.sort((e1, e2) => {
            if (e1.eventType.typeId! > e2.eventType.typeId!) {
                return sortingOrder.valueOf();
            } else {
                return -sortingOrder.valueOf();
            }
        })
    }

    const sortByStartDate = (events: Event[], sortingOrder: SortingOrder) => {
        return events.sort((e1, e2) => {
            if (e1.startDate > e2.startDate) {
                return sortingOrder.valueOf();
            } else {
                return -sortingOrder.valueOf();
            }
        })
    }

    const clearAllOrderingState = () => {
        setEventIdOrder(undefined);
        setNameOrder(undefined);
        setEventTypeIdOrder(undefined);
        setStartDateOrder(undefined);
    }

    const setOrdering = (ordering: SortingOrder | undefined, setOrdering: Dispatch<SetStateAction<SortingOrder | undefined>>) => {
        clearAllOrderingState();
        if (ordering === SortingOrder.ASC) {
            setOrdering(SortingOrder.DESC);
        } else {
            setOrdering(SortingOrder.ASC);
        }

        setDisplayedEvents(sortBaseOnState(displayedEvents));
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="events table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={eventIdOrder !== undefined}
                                    direction={eventIdOrder === SortingOrder.ASC ? "asc" : "desc"}
                                    onClick={() => setOrdering(eventIdOrder, setEventIdOrder)}
                                >
                                    Event ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={nameOrder !== undefined}
                                    direction={nameOrder === SortingOrder.ASC ? "asc" : "desc"}
                                    onClick={() => setOrdering(nameOrder, setNameOrder)}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={eventTypeIdOrder !== undefined}
                                    direction={eventTypeIdOrder === SortingOrder.ASC ? "asc" : "desc"}
                                    onClick={() => setOrdering(eventTypeIdOrder, setEventTypeIdOrder)}
                                >
                                    Event type
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={startDateOrder !== undefined}
                                    direction={startDateOrder === SortingOrder.ASC ? "asc" : "desc"}
                                    onClick={() => setOrdering(startDateOrder, setStartDateOrder)}
                                >
                                    Start date
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">End date</TableCell>
                            <TableCell align="right">Short description</TableCell>
                            <TableCell align="right">Long description</TableCell>
                            <TableCell align="right">Image URL</TableCell>
                            {userContext.loggedUser && <TableCell align="right">Actions</TableCell>}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedEvents.map((event) => (
                            <EventTableRow event={event} key={event.eventId}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};


type EventTableType = {
    event: Event
}

const EventTableRow: React.FC<EventTableType> = ({event}) => {
    const eventContext = useContext(EventContext);
    const userContext = useContext(UserContext);
    const manageEventDialogContext = useContext(ManageEventDialogContext);


    const editEventHandler = () => {
        manageEventDialogContext.openToUpdateEvent(event);
    };

    const deleteEventHandler = async () => {
        await eventContext.deleteEvent(event.eventId!);
    }

    return (
        <>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell component="th" scope="row">
                    {event.eventId}
                </TableCell>
                <TableCell align="right">{event.name}</TableCell>
                <TableCell align="right">{event.eventType.name}</TableCell>
                <TableCell align="right">{event.startDate}</TableCell>
                <TableCell align="right">{event.endDate}</TableCell>
                <TableCell align="right">{event.shortDescription}</TableCell>
                <TableCell align="right">{event.longDescription}</TableCell>
                <TableCell align="right">{event.imageURL}</TableCell>
                {userContext.loggedUser &&
                    <TableCell align="right">
                        <IconButton onClick={editEventHandler}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={deleteEventHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </TableCell>
                }
            </TableRow>
        </>
    );
};

export default EventsTable;
