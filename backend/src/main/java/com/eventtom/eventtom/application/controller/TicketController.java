package com.eventtom.eventtom.application.controller;

import com.eventtom.eventtom.application.model.*;
import com.eventtom.eventtom.persistence.handlers.ClientJsonHandler;
import com.eventtom.eventtom.persistence.handlers.DiscountJsonHandler;
import com.eventtom.eventtom.persistence.handlers.EventJsonHandler;
import com.eventtom.eventtom.persistence.handlers.TicketJsonHandler;
import com.eventtom.eventtom.persistence.handlers.observer.EventManagerObserver;
import com.eventtom.eventtom.persistence.handlers.observer.NotificationSubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*")
public class TicketController {
    @Autowired
    private TicketJsonHandler ticketJsonHandler;

    @Autowired
    private EventJsonHandler eventJsonHandler;

    @Autowired
    private DiscountJsonHandler discountJsonHandler;

    @Autowired
    private ClientJsonHandler clientJsonHandler;

    @Autowired
    private NotificationSubject notificationSubject;

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketJsonHandler.readAll();
    }

    @PostMapping
    public void createTicket(@RequestBody Ticket ticket) {
        List<Ticket> tickets = ticketJsonHandler.readAll();
        tickets.add(ticket);
        ticketJsonHandler.writeAll(tickets);
    }

    @GetMapping("/{id}")
    public Ticket getTicketById(@PathVariable Long id) {
        return ticketJsonHandler.readAll().stream()
                .filter(ticket -> ticket.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    @PutMapping("/{id}")
    public void updateTicket(@PathVariable Long id, @RequestBody Ticket updatedTicket) {
        List<Ticket> tickets = ticketJsonHandler.readAll();
        for (int i = 0; i < tickets.size(); i++) {
            if (tickets.get(i).getId().equals(id)) {
                tickets.set(i, updatedTicket);
                break;
            }
        }
        ticketJsonHandler.writeAll(tickets);
    }

    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable Long id) {
        List<Ticket> tickets = ticketJsonHandler.readAll();
        tickets.removeIf(ticket -> ticket.getId().equals(id));
        ticketJsonHandler.writeAll(tickets);
    }

    @PostMapping("/buy")
    public ResponseEntity<Map<String, String>> buyTicket(@RequestBody Map<String, Object> payload) {
        Long voucherId = null;
        Long eventId = Long.valueOf(payload.get("eventId").toString());
        int quantity = Integer.parseInt(payload.get("quantity").toString());
        if (payload.containsKey("voucherId") && payload.get("voucherId") != null) {
            voucherId = Long.valueOf(payload.get("voucherId").toString());
        }
        Long clientId = Long.valueOf(payload.get("clientId").toString());

        // Fetch the event
        Event event = eventJsonHandler.readAll().stream()
                .filter(e -> e.getId().equals(eventId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Event not found"));

        // Fetch the client
        Client client = clientJsonHandler.readAll().stream()
                .filter(c -> c.getId().equals(clientId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Client not found"));

        // Check if enough tickets are available
        if (event.getNumberOfTickets() < quantity) {
            return ResponseEntity.badRequest().body(Map.of("message", "Not enough tickets available"));
        }

        // Calculate price
        double totalPrice = event.getTicketBasePrice() * quantity + event.getFee();
        if (voucherId != null) {
            // Find the voucher
            final Long finalVoucherId = voucherId;
            Discount voucher = discountJsonHandler.readAll().stream()
                    .filter(d -> d.getId().equals(finalVoucherId))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Voucher not found"));

            // Apply voucher
            double discountAmount = totalPrice * (voucher.getDiscount() / 100);
            double priceAfterDiscount = totalPrice - discountAmount;

            // Ensure base price is not undercut
            if (priceAfterDiscount < event.getTicketBasePrice() * quantity) {
                return ResponseEntity.badRequest().body(Map.of("message", "Voucher cannot undercut base price"));
            }

            totalPrice = priceAfterDiscount;
        }

        // Deduct tickets from the event
        event.setNumberOfTickets(event.getNumberOfTickets() - quantity);

        // Save updated event
        List<Event> events = new ArrayList<>(eventJsonHandler.readAll());
        for (int i = 0; i < events.size(); i++) {
            if (events.get(i).getId().equals(event.getId())) {
                events.set(i, event);
                break;
            }
        }
        eventJsonHandler.writeAll(events);

        // Optionally, create ticket records (if applicable)
        List<Ticket> tickets = new ArrayList<>(ticketJsonHandler.readAll());
        for (int i = 0; i < quantity; i++) {
            Ticket ticket = new Ticket();
            ticket.setId((long) (tickets.size() + 1));
            ticket.setClient(client);
            ticket.setEvent(event);
            tickets.add(ticket);
        }
        ticketJsonHandler.writeAll(tickets);

        // Notify observers
        Notification notification = new Notification();
        notification.setType("TICKET_PURCHASE");
        notification.setMessage(quantity+" tickets have been purchased for event: " + event.getTitle());
        notification.setEvent(event);
        notification.setTimestamp(LocalDateTime.now().toString());
        notificationSubject.notifyObservers(notification);
        notification.setType("EVENT_UPDATE");
        notification.setMessage("Event: " + event.getTitle() + " has been updated");
        notification.setEvent(event);
        notification.setTicketsSold(calculateTicketsSold(event));
        notification.setTimestamp(LocalDateTime.now().toString());
        notificationSubject.notifyObservers(notification);


        // Return success message
        return ResponseEntity.ok(Map.of(
                "message", "Purchase successful",
                "totalPrice", String.valueOf(totalPrice)
        ));
    }
    private int calculateTicketsSold(Event event) {
        List<Ticket> tickets = ticketJsonHandler.readAll();
        return (int) tickets.stream()
                .filter(ticket -> ticket.getEvent().getId().equals(event.getId()))
                .count();
    }

}
