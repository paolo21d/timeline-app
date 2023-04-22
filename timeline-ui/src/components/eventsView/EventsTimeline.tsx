import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {EventContext} from "../../state/EventContext";
import {UserContext} from "../../state/UserContext";
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent, {timelineOppositeContentClasses} from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import {ManageEventDialogContext} from "../../state/ManageEventDialogContext";
import {Event} from "../../models/model";
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventIcon from '@mui/icons-material/Event';
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    Divider,
    IconButton,
    IconButtonProps,
    styled
} from "@mui/material";
import {Timeline} from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EventsTimeline: React.FC = () => {
    const eventContext = useContext(EventContext);
    const [displayedEvents, setDisplayedEvents] = useState<Event[]>([])

    useEffect(() => {
        setDisplayedEvents(sortEvents(eventContext.events));
    }, [eventContext.events]);

    const sortEvents = (events: Event[]) => {
        return events.sort((e1, e2) => {
            if (e1.startDate > e2.startDate)
                return 1;
            else if (e1.startDate < e2.startDate)
                return -1;
            else
                return e1.eventId! > e2.eventId! ? 1 : -1;
        });
    }

    return (
        <Timeline
            position="right"
            sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.2,
                },
            }}
        >
            {displayedEvents.map((event) => (
                <EventTimelineItem event={event} key={event.eventId}/>
            ))}
        </Timeline>
    );
}

type Props = {
    event: Event
}

const EventTimelineItem: React.FC<Props> = ({event}) => {
    return (
        <>
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{m: 'auto 0'}}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                >
                    {event.startDate === event.endDate ? `${event.startDate}` : `${event.startDate} - ${event.endDate}`}
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector/>
                    <TimelineDot>
                        {event.startDate === event.endDate ?
                            <EventIcon sx={{color: event.eventType.colour}}/>
                            : <DateRangeIcon sx={{color: event.eventType.colour}}/>
                        }
                    </TimelineDot>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent sx={{py: '12px', px: 2}}>
                    <EventCard event={event}/>
                </TimelineContent>
            </TimelineItem>
        </>
    );
};

const EventCard: React.FC<Props> = ({event}) => {
    const eventContext = useContext(EventContext);
    const userContext = useContext(UserContext);
    const manageEventDialogContext = useContext(ManageEventDialogContext);

    const [expanded, setExpanded] = React.useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const editEventHandler = () => {
        manageEventDialogContext.openToUpdateEvent(event);
    };

    const deleteEventHandler = async () => {
        await eventContext.deleteEvent(event.eventId!);
    }

    return (
        <Card sx={{minWidth: 500, maxWidth: 500}}>
            <CardHeader
                title={event.name}
                subheader={
                    <Typography color="text.secondary">
                        type: <Chip label={event.eventType.name} sx={{
                        color: event.eventType.colour,
                        fontWeight: 900,
                        fontSize: 20,
                        textShadow: "2px 2px black"
                    }} variant="filled"/>
                    </Typography>
                }
                action={
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon/>
                    </ExpandMore>
                }
            />
            {expanded && <>
                {event.imageURL &&
                    <CardMedia sx={{maxWidth: "inherit"}} component="img" image={event.imageURL} alt="Event Image"/>
                }
                <CardContent>
                    <Typography variant="body1">
                        {event.shortDescription}
                    </Typography>

                    <Divider sx={{marginTop: 1, marginBottom: 1}}/>
                    <Typography variant="body2">
                        {event.longDescription}
                    </Typography>
                </CardContent>

                {userContext.loggedUser &&
                    <CardActions>
                        <IconButton onClick={editEventHandler}><EditIcon/></IconButton>
                        <IconButton onClick={deleteEventHandler}><DeleteIcon/></IconButton>

                    </CardActions>
                }
            </>
            }
        </Card>
    );
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default EventsTimeline;