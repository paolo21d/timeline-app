package pl.app.timeline.api.service;

import org.springframework.stereotype.Service;
import pl.app.timeline.api.repository.EventTypeRepository;
import pl.app.timeline.api.model.dto.ManageEventTypeDTO;
import pl.app.timeline.api.model.entity.EventType;
import pl.app.timeline.api.model.excpetion.EventTypeAlreadyExistsException;
import pl.app.timeline.api.model.excpetion.EventTypeEntityNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
class EventTypeServiceImpl implements EventTypeService {
    EventTypeRepository eventTypeRepository;

    public EventTypeServiceImpl(EventTypeRepository eventTypeRepository) {
        this.eventTypeRepository = eventTypeRepository;
    }

    @Override
    public EventType createEventType(ManageEventTypeDTO manageEventTypeDTO) {
        Optional<EventType> existingEventType = eventTypeRepository.findByName(manageEventTypeDTO.name());
        if (existingEventType.isPresent()) {
            throw new EventTypeAlreadyExistsException(manageEventTypeDTO.name());
        }

        EventType eventType = EventType.builder()
                .name(manageEventTypeDTO.name())
                .colour(manageEventTypeDTO.colour())
                .build();
        return eventTypeRepository.save(eventType);
    }

    @Override
    public Optional<EventType> getEventTypeById(Long eventTypeId) {
        return eventTypeRepository.findById(eventTypeId);
    }

    @Override
    public List<EventType> getAllEventTypes() {
        return eventTypeRepository.findAll();
    }

    @Override
    public EventType updateEventType(Long eventTypeId, ManageEventTypeDTO manageEventTypeDTO) {
        EventType eventType = eventTypeRepository.findById(eventTypeId)
                .orElseThrow(() -> new EventTypeEntityNotFoundException(eventTypeId));
        eventType.setName(manageEventTypeDTO.name());
        eventType.setColour(manageEventTypeDTO.colour());
        return eventTypeRepository.save(eventType);
    }

    @Override
    public void deleteEventType(Long eventTypeId) {
        EventType eventType = eventTypeRepository.findById(eventTypeId)
                .orElseThrow(() -> new EventTypeEntityNotFoundException(eventTypeId));
        eventTypeRepository.delete(eventType);
    }
}
