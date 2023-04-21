package pl.app.timeline.api.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.app.timeline.api.model.dto.ManageEventDTO;
import pl.app.timeline.api.repository.EventRepository;
import pl.app.timeline.api.model.entity.Event;
import pl.app.timeline.api.model.entity.EventType;
import pl.app.timeline.api.model.excpetion.EventEntityNotFoundException;
import pl.app.timeline.api.model.excpetion.EventTypeEntityNotFoundException;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
class EventServiceImpl implements EventService {
    EventRepository eventRepository;
    EventTypeService eventTypeService;

    public EventServiceImpl(EventRepository eventRepository, EventTypeService eventTypeService) {
        this.eventRepository = eventRepository;
        this.eventTypeService = eventTypeService;
    }

    @Override
    public Event createEvent(ManageEventDTO manageEventDTO) {
        EventType eventType = eventTypeService.getEventTypeById(manageEventDTO.eventTypeId())
                .orElseThrow(() -> new EventTypeEntityNotFoundException(manageEventDTO.eventTypeId()));
        Event event = Event.builder()
                .name(manageEventDTO.name())
                .eventType(eventType)
                .startDate(manageEventDTO.startDate())
                .endDate(manageEventDTO.endDate())
                .shortDescription(manageEventDTO.shortDescription())
                .longDescription(manageEventDTO.longDescription())
                .imageURL(manageEventDTO.imageURL())
                .createDateTime(Instant.now())
                .build();
        return eventRepository.save(event);
    }

    @Override
    public Optional<Event> getEventById(Long eventId) {
        return eventRepository.findById(eventId);
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public Event updateEvent(Long eventId, ManageEventDTO manageEventDTO) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventEntityNotFoundException(eventId));

        EventType eventType = eventTypeService.getEventTypeById(manageEventDTO.eventTypeId())
                .orElseThrow(() -> new EventTypeEntityNotFoundException(manageEventDTO.eventTypeId()));

        event.setName(manageEventDTO.name());
        event.setEventType(eventType);
        event.setStartDate(manageEventDTO.startDate());
        event.setEndDate(manageEventDTO.endDate());
        event.setShortDescription(manageEventDTO.shortDescription());
        event.setLongDescription(manageEventDTO.longDescription());
        event.setImageURL(manageEventDTO.imageURL());

        return eventRepository.save(event);
    }

    @Override
    public void deleteEvent(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventEntityNotFoundException(eventId));
        eventRepository.delete(event);
    }
}
