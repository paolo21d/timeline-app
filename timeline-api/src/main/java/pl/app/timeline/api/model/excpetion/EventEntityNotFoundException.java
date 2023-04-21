package pl.app.timeline.api.model.excpetion;

import javax.persistence.EntityNotFoundException;

public class EventEntityNotFoundException extends EntityNotFoundException {
    public EventEntityNotFoundException(Long eventId) {
        super("Not found event with id=" + eventId);
    }
}
