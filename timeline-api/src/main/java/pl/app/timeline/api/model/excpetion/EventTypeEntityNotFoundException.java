package pl.app.timeline.api.model.excpetion;

import javax.persistence.EntityNotFoundException;

public class EventTypeEntityNotFoundException extends EntityNotFoundException {
    public EventTypeEntityNotFoundException(Long eventId) {
        super("Not found event-type with id=" + eventId);
    }
}
