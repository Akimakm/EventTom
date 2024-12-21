package com.eventtom.eventtom.application.model;

import lombok.Data;
import java.util.List;

@Data
public class Client {
    private String name;
    private List<Discount> discountList;
    private List<Ticket> ticketList;
}
