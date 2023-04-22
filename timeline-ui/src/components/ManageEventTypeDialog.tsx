import {useContext, useState} from "react";
import {ManageEventTypeDTO} from "../models/model";
import {EventTypeContext} from "../state/EventTypeContext";
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
    TextField,
    Typography
} from "@mui/material";
import Select, {SelectChangeEvent} from "@mui/material/Select";

type PropsType = {
    managingEventTypeId?: number,
    managingEventType: ManageEventTypeDTO,
    isVisible: boolean,
    onClose: () => void
}

const ManageEventTypeDialog: React.FC<PropsType> = ({managingEventTypeId, managingEventType, isVisible, onClose}) => {
    const eventTypeContext = useContext(EventTypeContext);

    // full list of colours: https://www.w3.org/wiki/CSS/Properties/color/keywords
    const availableColours = ["black", "silver", "gray", "maroon", "red", "purple", "fuchsia", "green", "lime", "gold", "navy", "blue", "teal", "aqua"];

    const [name, setName] = useState<string>(managingEventType.name);
    const [nameError, setNameError] = useState<string | undefined>(undefined);
    const [colour, setColour] = useState<string>(managingEventType.colour);
    const [colourError, setColourError] = useState<string | undefined>(undefined);

    const handleSaveEventType = async () => {
        if (!validate()) {
            if (managingEventTypeId) {
                await eventTypeContext.updateEventType(managingEventTypeId, {name, colour});
                onClose();
            } else {
                await eventTypeContext.createEventType({name, colour});
                handleClose();
            }
        }
    }

    const areErrors = () => {
        return nameError !== undefined
            || colourError !== undefined;
    }

    const validate = () => {
        const isErrorName = validateName();
        const isErrorColour = validateColour();

        return isErrorName || isErrorColour;
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

    const validateColour = () => {
        let isError = false;

        if (colour === "") {
            setColourError("Colour must be chosen");
            isError = true;
        } else if (!availableColours.includes(colour)) {
            setColourError("Chosen colour does not exists in available colour list");
            isError = true;
        } else {
            setColourError(undefined);
        }
        return isError;
    }

    const handleClose = () => {
        setName("");
        setColour("");

        setNameError(undefined);
        setColourError(undefined);
        onClose();
    }

    return (
        <Dialog fullWidth open={isVisible} onClose={() => managingEventTypeId ? onClose() : handleClose()}>
            <DialogTitle>
                {managingEventTypeId ? `Update event type with id ${managingEventTypeId}` : "Create event type"}
            </DialogTitle>
            <DialogContent>
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

                <FormControl
                    required
                    margin="dense"
                    fullWidth
                    error={colourError !== undefined}
                >
                    <InputLabel id="colour-label">Colour</InputLabel>
                    <Select
                        labelId="colour-label"
                        id="eventType"
                        value={colour}
                        label="Colour"
                        onChange={(event: SelectChangeEvent) => {
                            setColour(event.target.value);
                        }}
                    >
                        {availableColours.map(col =>
                            <MenuItem value={col} key={col}>
                                <Typography color={col}>{col}</Typography>
                            </MenuItem>
                        )}
                    </Select>
                    {colourError !== undefined &&
                        <FormHelperText>{colourError}</FormHelperText>}
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => managingEventTypeId ? onClose() : handleClose()}>Close</Button>
                {/*<Button onClick={handleSaveEventType}>Save</Button>*/}
                <Button variant="contained" onClick={handleSaveEventType}
                        color={areErrors() ? "error" : "primary"}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ManageEventTypeDialog;