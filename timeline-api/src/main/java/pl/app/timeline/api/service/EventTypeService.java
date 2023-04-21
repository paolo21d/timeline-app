package pl.app.timeline.api.service;

import pl.app.timeline.api.model.dto.ManageEventTypeDTO;
import pl.app.timeline.api.model.entity.EventType;

import java.util.List;
import java.util.Optional;

public interface EventTypeService {
    EventType createEventType(ManageEventTypeDTO manageEventTypeDTO);

    Optional<EventType> getEventTypeById(Long eventTypeId);

    List<EventType> getAllEventTypes();

    EventType updateEventType(Long eventTypeId, ManageEventTypeDTO manageEventTypeDTO);

    void deleteEventType(Long eventTypeId);
}
