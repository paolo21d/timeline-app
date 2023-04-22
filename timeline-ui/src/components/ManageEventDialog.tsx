import {useContext, useState} from "react";
import {EventContext} from "../state/EventContext";
import {ManageEventDTO} from "../models/model";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    TextField
} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {EventTypeContext} from "../state/EventTypeContext";
import Select, {SelectChangeEvent} from '@mui/material/Select';

type PropsType = {
    managingEventId?: number,
    managingEvent: ManageEventDTO,
    isVisible: boolean,
    onClose: () => void
}

const ManageEventDialog: React.FC<PropsType> = ({managingEventId, managingEvent, isVisible, onClose}) => {
    const eventContext = useContext(EventContext);
    const eventTypeContext = useContext(EventTypeContext);

    const [name, setName] = useState<string>(managingEvent.name);
    const [nameError, setNameError] = useState<string | undefined>(undefined);
    const [eventTypeId, setEventTypeId] = useState<number>(managingEvent.eventTypeId);
    const [eventTypeIdError, setEventTypeIdError] = useState<string | undefined>(undefined);
    const [startDate, setStartDate] = useState<string>(!managingEvent.startDate || managingEvent.startDate.length === 0 ? new Date().toISOString().split('T')[0] : managingEvent.startDate);
    const [startDateError, setStartDateError] = useState<string | undefined>(undefined);
    const [endDate, setEndDate] = useState<string>(!managingEvent.endDate || managingEvent.endDate.length === 0 ? new Date().toISOString().split('T')[0] : managingEvent.endDate);
    const [endDateError, setEndDateError] = useState<string | undefined>(undefined);
    const [shortDescription, setShortDescription] = useState<string>(managingEvent.shortDescription);
    const [shortDescriptionError, setShortDescriptionError] = useState<string | undefined>(undefined);
    const [longDescription, setLongDescription] = useState<string>(managingEvent.longDescription);
    const [longDescriptionError, setLongDescriptionError] = useState<string | undefined>(undefined);
    const [imageURL, setImageURL] = useState<string | undefined>(managingEvent.imageURL);

    const handleSaveEvent = async () => {
        const savingEvent: ManageEventDTO = {
            name,
            eventTypeId,
            startDate,
            endDate,
            shortDescription,
            longDescription,
            imageURL
        };

        if (!validate()) {
            if (managingEventId) {
                eventContext.updateEvent(managingEventId, savingEvent);
                onClose();
            } else {
                eventContext.createEvent(savingEvent);
                handleClose();
            }
        }
    }

    const areErrors = () => {
        return nameError !== undefined
            || eventTypeIdError !== undefined
            || startDateError !== undefined
            || endDateError !== undefined
            || shortDescriptionError !== undefined
            || longDescriptionError !== undefined;
    }

    const validate = () => {
        const isErrorName = validateName();
        const isErrorEventType = validateEventType();
        const isErrorStartDate = validateStartDate();
        const isErrorEndDate = validateEndDate();
        const isErrorShortDescription = validateShortDescription();
        const isErrorLongDescription = validateLongDescription();

        return isErrorName || isErrorEventType || isErrorStartDate || isErrorEndDate || isErrorShortDescription || isErrorLongDescription;
    }

    const validateName = () => {
        let isError = false;

        if (name === "") {
            setNameError("Name must be provided");
            isError = true;
        } else if (name.length < 6) {
            setNameError("Minimum name length is 6");
            isError = true;
        } else {
            setNameError(undefined);
        }
        return isError;
    }

    const validateEventType = () => {
        let isError = false;

        if (eventTypeId === 0) {
            setEventTypeIdError("Event Type must be chosen");
            isError = true;
        } else if (!eventTypeContext.eventTypes.map(type => type.typeId).includes(eventTypeId)) {
            setEventTypeIdError("Chosen event type does not exists");
            isError = true;
        } else {
            setEventTypeIdError(undefined);
        }
        return isError;
    }
    const validateStartDate = () => {
        let isError = false;

        if (startDate === "") {
            setStartDateError("Start Date must be provided");
            isError = true;
        } else if (!dayjs(startDate).isValid()) {
            setStartDateError("Start Date has invalid date format");
            isError = true;
        } else {
            setStartDateError(undefined);
        }
        return isError;
    }

    const validateEndDate = () => {
        let isError = false;

        if (endDate === "") {
            setEndDateError("End Date must be provided");
            isError = true;
        } else if (!dayjs(endDate).isValid()) {
            setEndDateError("End Date has invalid date format");
            isError = true;
        } else if (dayjs(startDate).isValid() && dayjs(endDate).isBefore(dayjs(startDate))) {
            setEndDateError("End Date can not be before start day");
            isError = true;
        } else {
            setEndDateError(undefined);
        }
        return isError;
    }

    const validateShortDescription = () => {
        let isError = false;

        if (shortDescription === "") {
            setShortDescriptionError("Short Description must be provided");
            isError = true;
        } else if (shortDescription.length < 6) {
            setShortDescriptionError("Minimum short description length is 6");
            isError = true;
        } else {
            setShortDescriptionError(undefined);
        }
        return isError;
    }

    const validateLongDescription = () => {
        let isError = false;

        if (longDescription === "") {
            setLongDescriptionError("Long Description must be provided");
            isError = true;
        } else if (longDescription.length < 6) {
            setLongDescriptionError("Minimum long description length is 6");
            isError = true;
        } else {
            setLongDescriptionError(undefined);
        }
        return isError;
    }

    const clearErrorsState = () => {
        setNameError(undefined);
        setEventTypeIdError(undefined);
        setStartDateError(undefined);
        setEndDateError(undefined);
        setShortDescriptionError(undefined);
        setLongDescriptionError(undefined);
    }

    const clearInputsState = () => {
        setName("");
        setEventTypeId(0);
        setStartDate(new Date().toISOString().split('T')[0]);
        setEndDate(new Date().toISOString().split('T')[0]);
        setShortDescription("");
        setLongDescription("");
        setImageURL(undefined);
    }

    const handleClose = () => {
        clearErrorsState();
        clearInputsState();

        onClose();
    }

    return (
        <Dialog open={isVisible} onClose={() => managingEventId ? onClose() : handleClose()}>
            <DialogTitle>
                {managingEventId ? `Update event with id ${managingEventId}` : "Create event"}
            </DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/*NAME input*/}
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        value={name}
                        fullWidth
                        onChange={(event) => setName(event.target.value)}

                        error={nameError !== undefined}
                        helperText={nameError}
                    />

                    {/*EVENT TYPE input*/}
                    <FormControl
                        required
                        margin="dense"
                        fullWidth
                        error={eventTypeIdError !== undefined}
                    >
                        <InputLabel id="event-type-label">Event Type</InputLabel>
                        <Select
                            labelId="event-type-label"
                            id="eventType"
                            value={eventTypeId.toString()}
                            label="Event Type"
                            onChange={(event: SelectChangeEvent) => {
                                setEventTypeId(+event.target.value);
                            }}
                        >
                            {eventTypeContext.eventTypes.map(eventType =>
                                <MenuItem value={eventType.typeId} key={eventType.typeId}>
                                    {eventType.name}
                                </MenuItem>
                            )}
                        </Select>
                        {eventTypeIdError !== undefined &&
                            <FormHelperText>{eventTypeIdError}</FormHelperText>}
                    </FormControl>

                    {/*START DATE input*/}
                    <DesktopDatePicker
                        label="Start Date"
                        inputFormat="YYYY-MM-DD"
                        value={dayjs(startDate)}
                        onChange={(newValue: Dayjs | null) =>
                            setStartDate(newValue ? newValue.format("YYYY-MM-DD") : "")
                        }
                        renderInput={(params) =>
                            <TextField {...params}
                                       required margin="dense" fullWidth
                                       error={startDateError !== undefined}
                                       helperText={startDateError}
                            />}
                    />

                    {/*END DATE input*/}
                    <DesktopDatePicker
                        label="End Date"
                        inputFormat="YYYY-MM-DD"
                        value={dayjs(endDate)}
                        onChange={(newValue: Dayjs | null) =>
                            setEndDate(newValue ? newValue.format("YYYY-MM-DD") : "")
                        }
                        renderInput={(params) =>
                            <TextField {...params}
                                       required margin="dense" fullWidth
                                       error={endDateError !== undefined}
                                       helperText={endDateError}
                            />}
                    />

                    {/*SHORT DESCRIPTION input*/}
                    <TextField
                        required
                        margin="dense"
                        id="shortDescription"
                        label="Short Description"
                        type="text"
                        value={shortDescription}
                        fullWidth
                        onChange={(event) => setShortDescription(event.target.value)}

                        error={shortDescriptionError !== undefined}
                        helperText={shortDescriptionError}
                    />

                    {/*LONG DESCRIPTION input*/}
                    <TextField
                        required
                        margin="dense"
                        id="longDescription"
                        label="Long Description"
                        type="text"
                        value={longDescription}
                        fullWidth
                        onChange={(event) => setLongDescription(event.target.value)}

                        error={longDescriptionError !== undefined}
                        helperText={longDescriptionError}
                    />

                    {/*IMAGE URL input*/}
                    <TextField
                        margin="dense"
                        id="imageURL"
                        label="Image URL"
                        type="text"
                        value={imageURL}
                        fullWidth
                        onChange={(event) => setImageURL(event.target.value)}
                    />
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => managingEventId ? onClose() : handleClose()}>Close</Button>
                <Button variant="contained" onClick={handleSaveEvent}
                        color={areErrors() ? "error" : "primary"}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ManageEventDialog;