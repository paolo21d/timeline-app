package pl.app.timeline.api.model.excpetion;

public class EventTypeDeleteException extends RuntimeException {
    public EventTypeDeleteException(Long eventTypeId) {
        super("Can not remove eventType with id=" + eventTypeId + ", because there are events with this event type");
    }
}
