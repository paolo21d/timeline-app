import {Box, IconButton, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {EventTypeContext} from "../state/EventTypeContext";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {EventType} from "../models/model";
import {UserContext} from "../state/UserContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {ManageEventTypeDialogContext} from "../state/ManageEventTypeDialogContext";

const EventTypesSimpleView: React.FC = () => {
    const userContext = useContext(UserContext);
    const eventTypeContext = useContext(EventTypeContext);
    const [displayedEventTypes, setDisplayedEventTypes] = useState<EventType[]>([]);

    useEffect(() => {
        setDisplayedEventTypes(sortEventTypes(eventTypeContext.eventTypes));
    }, [eventTypeContext.eventTypes]);

    const sortEventTypes = (eventTypes: EventType[]) => {
        return eventTypes.sort((e1, e2) => {
            if (e1.typeId! > e2.typeId!)
                return 1;
            else if (e1.typeId! < e2.typeId!)
                return -1;
            else
                return 0;
        });
    }

    return (
        <Box sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center'
        }} displayPrint="none">
            <Typography variant="h6"
                        sx={{
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}>
                Event types
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography sx={{fontWeight: "bold"}}>
                                    Type ID
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography sx={{fontWeight: "bold"}}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography sx={{fontWeight: "bold"}}>
                                    Colour
                                </Typography>
                            </TableCell>
                            {userContext.loggedUser &&
                                <TableCell align="right">
                                    <Typography sx={{fontWeight: "bold"}}>
                                        Actions
                                    </Typography>
                                </TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedEventTypes.map((eventType) => (
                            <EventTypeTableRow eventType={eventType} key={eventType.typeId}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );

};

type EventTypeTableType = {
    eventType: EventType
}
const EventTypeTableRow: React.FC<EventTypeTableType> = ({eventType}) => {
    const eventTypeContext = useContext(EventTypeContext);
    const userContext = useContext(UserContext);
    const manageEventTypeDialogContext = useContext(ManageEventTypeDialogContext);

    const editEventTypeHandler = () => {
        manageEventTypeDialogContext.openToUpdateEventType(eventType);
    };

    const deleteEventTypeHandler = async () => {
        await eventTypeContext.deleteEventType(eventType.typeId!);
    }

    return (
        <>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell component="th" scope="row">
                    {eventType.typeId}
                </TableCell>
                <TableCell align="right">
                    {eventType.name}
                </TableCell>
                <TableCell align="right">
                    <Typography color={eventType.colour}>
                        {eventType.colour}
                    </Typography>
                </TableCell>
                {userContext.loggedUser &&
                    <TableCell align="right">
                        <IconButton onClick={editEventTypeHandler}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={deleteEventTypeHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </TableCell>
                }
            </TableRow>
        </>
    );
};

export default EventTypesSimpleView;
