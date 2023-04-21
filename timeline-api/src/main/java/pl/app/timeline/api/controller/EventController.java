package pl.app.timeline.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import pl.app.timeline.api.model.dto.ManageEventDTO;
import pl.app.timeline.api.model.entity.Event;
import pl.app.timeline.api.model.excpetion.EventEntityNotFoundException;
import pl.app.timeline.api.model.excpetion.InvalidRequestException;
import pl.app.timeline.api.service.EventService;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/event", produces = MediaType.APPLICATION_JSON_VALUE)
public class EventController {
    EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Event createEvent(@Valid @RequestBody ManageEventDTO manageEventDTO) {
        validateIfStartDateIsBeforeEndDate(manageEventDTO.startDate(), manageEventDTO.endDate());

        return eventService.createEvent(manageEventDTO);
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{eventId}")
    public Event getEventById(@PathVariable Long eventId) {
        return eventService.getEventById(eventId)
                .orElseThrow(() -> new EventEntityNotFoundException(eventId));
    }

    @PutMapping("/{eventId}")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public Event updateEvent(@PathVariable Long eventId, @Valid @RequestBody ManageEventDTO manageEventDTO) {
        validateIfStartDateIsBeforeEndDate(manageEventDTO.startDate(), manageEventDTO.endDate());

        return eventService.updateEvent(eventId, manageEventDTO);
    }

    @DeleteMapping("/{eventId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteEvent(@PathVariable Long eventId) {
        eventService.deleteEvent(eventId);
    }

    private void validateIfStartDateIsBeforeEndDate(LocalDate startDate, LocalDate endDate) {
        if (endDate.isBefore(startDate)) {
            throw new InvalidRequestException("endDate can not be before startDate");
        }
    }
}
