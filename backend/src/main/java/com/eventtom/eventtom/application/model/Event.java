package com.eventtom.eventtom.application.model;
import lombok.Data;

@Data
public class Event {
    private Long id;
    private String title;
    private int numberOfTickets;
    private double ticketBasePrice;
    private double ticketTotalPrice;
    private String date;
    private String time;
    private String location;
    private String description;
    private double threshold;
}
