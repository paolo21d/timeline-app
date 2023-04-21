package pl.app.timeline.api.model.excpetion;

public class EventTypeAlreadyExistsException extends RuntimeException {
    public EventTypeAlreadyExistsException(String eventTypeName) {
        super("Event type name " + eventTypeName + " already exists");
    }
}
