package com.eventtom.eventtom.application.model;
import lombok.Data;

@Data
public class Ticket {
    private Long id;
    private Client client;
    private Event event;

}
