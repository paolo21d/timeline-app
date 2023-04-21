package pl.app.timeline.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import pl.app.timeline.api.model.dto.ManageEventTypeDTO;
import pl.app.timeline.api.model.entity.EventType;
import pl.app.timeline.api.service.EventTypeService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/event-type", produces = MediaType.APPLICATION_JSON_VALUE)
public class EventTypeController {
    EventTypeService eventTypeService;

    public EventTypeController(EventTypeService eventTypeService) {
        this.eventTypeService = eventTypeService;
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public EventType createEventType(@Valid @RequestBody ManageEventTypeDTO manageEventTypeDTO) {
        return eventTypeService.createEventType(manageEventTypeDTO);
    }

    @GetMapping
    public List<EventType> getAllEventTypes() {
        return eventTypeService.getAllEventTypes();
    }

    @PutMapping(path = "/{eventTypeId}")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public EventType updateEventType(@PathVariable Long eventTypeId, @Valid @RequestBody ManageEventTypeDTO manageEventTypeDTO) {
        return eventTypeService.updateEventType(eventTypeId, manageEventTypeDTO);
    }

    @DeleteMapping("/{eventTypeId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteEventType(@PathVariable Long eventTypeId) {
        eventTypeService.deleteEventType(eventTypeId);
    }
}
