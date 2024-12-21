package com.eventtom.eventtom.application.controller;

import com.eventtom.eventtom.persistence.EventJsonHandler;
import com.eventtom.eventtom.application.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    private EventJsonHandler eventJsonHandler;

    @GetMapping
    public List<Event> getAllEvents() {
        return eventJsonHandler.readAll();
    }

    @PostMapping
    public void createEvent(@RequestBody Event event) {
        List<Event> events = eventJsonHandler.readAll();
        events.add(event);
        eventJsonHandler.writeAll(events);
    }

    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
        return eventJsonHandler.readAll().stream()
                .filter(event -> event.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    @PutMapping("/{id}")
    public void updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        List<Event> events = eventJsonHandler.readAll();
        for (int i = 0; i < events.size(); i++) {
            if (events.get(i).getId().equals(id)) {
                events.set(i, updatedEvent);
                break;
            }
        }
        eventJsonHandler.writeAll(events);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        List<Event> events = eventJsonHandler.readAll();
        events.removeIf(event -> event.getId().equals(id));
        eventJsonHandler.writeAll(events);
    }
}
