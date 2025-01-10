package com.eventtom.eventtom.application.controller;

import com.eventtom.eventtom.application.model.Discount;
import com.eventtom.eventtom.application.model.Notification;
import com.eventtom.eventtom.application.model.Ticket;
import com.eventtom.eventtom.persistence.handlers.DiscountJsonHandler;
import com.eventtom.eventtom.persistence.handlers.EventJsonHandler;
import com.eventtom.eventtom.application.model.Event;
import com.eventtom.eventtom.persistence.handlers.TicketJsonHandler;
import com.eventtom.eventtom.persistence.handlers.observer.NotificationSubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {
    @Autowired
    private EventJsonHandler eventJsonHandler;
    @Autowired
    private TicketJsonHandler ticketJsonHandler;
    @Autowired
    private DiscountJsonHandler discountJsonHandler;
    @Autowired
    private NotificationSubject notificationSubject;

    @GetMapping
    public List<Event> getAllEvents() {
        return eventJsonHandler.readAll();
    }

    @PostMapping
    @ResponseBody
    public Map<String, String> createEvent(@RequestBody Event event) {
        List<Event> events = new ArrayList<>(eventJsonHandler.readAll());
        event.setId((long) (events.size() + 1));
        events.add(event);
        eventJsonHandler.writeAll(events);

        Notification notification = new Notification();
        notification.setType("NEW_EVENT");
        notification.setMessage("A new event has been created: " + event.getTitle());
        notification.setTimestamp(LocalDateTime.now().toString());
        notification.setEvent(event);
        notificationSubject.notifyObservers(notification);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Event created successfully");
        return response; // Directly return the map

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

    @GetMapping("/{id}/details")
    public Map<String, Object> getEventDetailsByRole(@PathVariable Long id, @RequestParam String role, @RequestParam String clientId) {
        Event event = eventJsonHandler.readAll().stream()
                .filter(e -> e.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Map<String, Object> response = new HashMap<>();
        response.put("id", event.getId());
        response.put("title", event.getTitle());
        response.put("description", event.getDescription());
        response.put("date", event.getDate());
        response.put("time", event.getTime());
        response.put("location", event.getLocation());
        response.put("price", event.getTicketBasePrice());
        response.put("ticketsAvailable", event.getNumberOfTickets());
        response.put("fee", event.getFee());

        switch (role.toLowerCase()) {
            case "customer":
                response.put("discounts", getAvailableDiscounts(clientId));
                break;
            case "eventmanager":
                response.put("ticketsSold", calculateTicketsSold(event));
                response.put("threshold", 10); // Example threshold
                response.put("progress", calculateProgress(event));
                break;
            case "eventcreator":
                // No additional data needed for event creators
                break;
            default:
                throw new RuntimeException("Invalid role");
        }

        return response;
    }

    private List<Map<String, Object>> getAvailableDiscounts(String clientId) {
        List<Discount> discounts = discountJsonHandler.readAll();
        List<Map<String, Object>> discountDetails = new ArrayList<>();
        for (Discount discount : discounts) {
            if (discount.getClient().getId().toString().equals(clientId)) {
                Map<String, Object> discountMap = new HashMap<>();
                discountMap.put("id", discount.getId());
                discountMap.put("code", discount.getCode());
                discountMap.put("discount", discount.getDiscount());
                discountDetails.add(discountMap);
            }
        }
        return discountDetails;
    }

    private int calculateTicketsSold(Event event) {
        List<Ticket> tickets = ticketJsonHandler.readAll();
        return (int) tickets.stream()
                .filter(ticket -> ticket.getEvent().getId().equals(event.getId()))
                .count();
    }

    private int calculateProgress(Event event) {
        int ticketsSold = calculateTicketsSold(event);
        return (int) ((ticketsSold / (double) event.getNumberOfTickets()) * 100);
    }
}
