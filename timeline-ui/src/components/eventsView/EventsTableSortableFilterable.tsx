import React, {useContext, useEffect, useState} from "react";
import {EventContext} from "../../state/EventContext";
import {Event} from "../../models/model";
import {UserContext} from "../../state/UserContext";
import {Box, IconButton, Popper, Typography} from "@mui/material";
import {DataGrid, GridColDef, GridRenderCellParams, GridToolbar} from '@mui/x-data-grid';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {ManageEventDialogContext} from "../../state/ManageEventDialogContext";
import Paper from "@mui/material/Paper";


const EventsTableSortableFilterable: React.FC = () => {
    const eventContext = useContext(EventContext);
    const userContext = useContext(UserContext);
    const manageEventDialogContext = useContext(ManageEventDialogContext);

    const [displayedEvents, setDisplayedEvents] = useState<Event[]>([])

    useEffect(() => {
        // setDisplayedEvents(sortByStartDate(eventContext.events, SortingOrder.ASC));
        setDisplayedEvents(eventContext.events);
    }, [eventContext.events]);

    const editEventHandler = (eventId: number) => {
        const eventToEdit = displayedEvents.find(e => e.eventId === eventId);
        manageEventDialogContext.openToUpdateEvent(eventToEdit!);
    };

    const deleteEventHandler = async (eventId: number) => {
        await eventContext.deleteEvent(eventId);
    }

    return (
        <>
            <Box sx={{height: 500, width: '100%'}}>
                <DataGrid
                    rows={displayedEvents.map(e =>
                        mapEventToEventGridRowType(e, editEventHandler, deleteEventHandler)
                    )}
                    columns={columns(userContext.loggedUser != null)}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    experimentalFeatures={{newEditingApi: true}}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </Box>
        </>
    );
};

type EventGridRowType = {
    id: number,
    eventName: string;
    eventTypeName: string,
    startDate: string,
    endDate: string,
    shortDescription: string,
    longDescription: string,
    imageURL?: string;
};

const mapEventToEventGridRowType = (event: Event, editEvent: (eventId: number) => void, deleteEvent: (eventId: number) => void) => {
    return {
        id: event.eventId,
        eventName: event.name,
        eventTypeName: event.eventType.name,
        startDate: event.startDate,
        endDate: event.endDate,
        shortDescription: event.shortDescription,
        longDescription: event.longDescription,
        imageURL: event.imageURL,
        actions: {
            editEvent: () => editEvent(event.eventId!),
            deleteEvent: () => deleteEvent(event.eventId!)
        }
    } as EventGridRowType;
}

const columns = (isUserLogged: boolean): GridColDef[] => {
    const definedColumns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Event ID',
            hideable: false,
            flex: 2
        },
        {
            field: 'eventName',
            headerName: 'Name',
            renderCell: renderCellExpand,
            flex: 4
        },
        {
            field: 'eventTypeName',
            headerName: 'Event Type',
            flex: 4
        },
        {
            field: 'startDate',
            headerName: 'Start date',
            // type: "date",
            // valueGetter: ({ value }) => value && new Date(value),
            sortable: true,
            flex: 3
        },
        {
            field: 'endDate',
            headerName: 'End date',
            // type: "date",
            // valueGetter: ({ value }) => value && new Date(value),
            sortable: true,
            flex: 3
        },
        {
            field: 'shortDescription',
            headerName: 'Short Description',
            sortable: false,
            filterable: false,
            flex: 5,
            renderCell: renderCellExpand,
        },
        {
            field: 'longDescription',
            headerName: 'Long Description',
            sortable: false,
            filterable: false,
            flex: 5,
            renderCell: renderCellExpand,
            // renderCell: (params: GridRenderCellParams<string>) => (
            //     <Typography width={"inherit"}>
            //         {params.value}
            //     </Typography>
            // )
        },
        {
            field: 'imageURL',
            headerName: 'Image URL',
            sortable: false,
            filterable: false,
            flex: 5,
            renderCell: renderCellExpand,
        },

    ]

    if (isUserLogged) {
        definedColumns.push({
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            filterable: false,
            hideable: false,
            disableExport: true,
            renderCell: (params: GridRenderCellParams<any>) => (
                <>
                    <IconButton onClick={params.value.editEvent}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton onClick={params.value.deleteEvent}>
                        <DeleteIcon/>
                    </IconButton>
                </>
            )
        })
    }

    return definedColumns;
};

interface GridCellExpandProps {
    value: string;
    width: number;
}

function isOverflown(element: Element): boolean {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

const GridCellExpand = React.memo(function GridCellExpand(
    props: GridCellExpandProps,
) {
    const {width, value} = props;
    const wrapper = React.useRef<HTMLDivElement | null>(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current!);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    React.useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown(nativeEvent: KeyboardEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                setShowFullCell(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                alignItems: 'center',
                lineHeight: '24px',
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: '100%',
                    width,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            <Box
                ref={cellValue}
                sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
            >
                {value}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{width, marginLeft: -17}}
                >
                    <Paper
                        elevation={1}
                        style={{minHeight: wrapper.current!.offsetHeight - 3}}
                    >
                        <Typography variant="body2" style={{padding: 8}}>
                            {value}
                        </Typography>
                    </Paper>
                </Popper>
            )}
        </Box>
    );
});

function renderCellExpand(params: GridRenderCellParams<string>) {
    return (
        <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth}/>
    );
}


export default EventsTableSortableFilterable;
