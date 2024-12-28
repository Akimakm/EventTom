package com.eventtom.eventtom.application.controller;

import com.eventtom.eventtom.persistence.handlers.TicketJsonHandler;
import com.eventtom.eventtom.application.model.Ticket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    @Autowired
    private TicketJsonHandler ticketJsonHandler;

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
}
