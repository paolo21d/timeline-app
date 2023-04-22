import React from 'react';
import UserContextProvider from "../state/UserContext";
import EventTypeContextProvider from "../state/EventTypeContext";
import EventContextProvider from "../state/EventContext";
import {Container, CssBaseline, Stack} from '@mui/material';
import Header from "./Header";
import EventTypesSimpleView from "./EventTypesSimpleView";
import {SnackbarContextProvider} from "../state/SnackbarContext";
import ManageEventDialogContextProvider from "../state/ManageEventDialogContext";
import ManageEventTypeDialogContextProvider from "../state/ManageEventTypeDialogContext";
import EventsView from "./eventsView/EventsView";

function App() {
    return (
        <SnackbarContextProvider>
            <UserContextProvider>
                <EventContextProvider>
                    <EventTypeContextProvider>
                        <ManageEventTypeDialogContextProvider>
                            <ManageEventDialogContextProvider>
                                <Container component="main">
                                    <CssBaseline/>
                                    <Stack direction="column">
                                        <Header/>
                                        <EventsView/>
                                        <EventTypesSimpleView/>
                                    </Stack>
                                </Container>
                            </ManageEventDialogContextProvider>
                        </ManageEventTypeDialogContextProvider>
                    </EventTypeContextProvider>
                </EventContextProvider>
            </UserContextProvider>
        </SnackbarContextProvider>
    );
}

export default App;
