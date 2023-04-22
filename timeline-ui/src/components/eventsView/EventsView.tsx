import EventsTimeline from "./EventsTimeline";
import {ChangeEvent, useState} from "react";
import {EventsViewType} from "./EventsViewType";
import EventsTable from "./EventsTable";
import {Box, Stack, Switch, Typography} from "@mui/material";
import EventsTableSortableFilterable from "./EventsTableSortableFilterable";

const EventsView = () => {
    const [eventViewType, setEventViewType] = useState<EventsViewType>(EventsViewType.TIMELINE_VIEW);

    const handleEventViewTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("Changing to" + event.target.checked)
        if (event.target.checked) {
            setEventViewType(EventsViewType.TIMELINE_VIEW);
        } else {
            setEventViewType(EventsViewType.TABLE_VIEW);
        }
    }

    return (
        <Box sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center'
        }}>

            <Typography variant="h6"
                        component="p"
                        sx={{
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}>
                Events
            </Typography>

            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{flexGrow: 1}}
                   displayPrint="none">
                <Typography>{EventsViewType.TABLE_VIEW.valueOf()}</Typography>
                <Switch
                    checked={eventViewType === EventsViewType.TIMELINE_VIEW}
                    onChange={handleEventViewTypeChange}
                />
                <Typography>{EventsViewType.TIMELINE_VIEW.valueOf()}</Typography>
            </Stack>


            {eventViewType === EventsViewType.TABLE_VIEW &&
                // <EventsTable/>}
                <EventsTableSortableFilterable/>}
            {eventViewType === EventsViewType.TIMELINE_VIEW &&
                <EventsTimeline/>}
        </Box>
    )
}

export default EventsView;