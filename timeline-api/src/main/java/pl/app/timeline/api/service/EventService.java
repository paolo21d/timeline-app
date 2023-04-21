package pl.app.timeline.api.service;

import pl.app.timeline.api.model.dto.ManageEventDTO;
import pl.app.timeline.api.model.entity.Event;

import java.util.List;
import java.util.Optional;

public interface EventService {
    Event createEvent(ManageEventDTO manageEventDTO);

    Optional<Event> getEventById(Long eventId);

    List<Event> getAllEvents();

    Event updateEvent(Long eventId, ManageEventDTO manageEventDTO);

    void deleteEvent(Long eventId);
}
