package com.eventtom.eventtom.application.model;

import lombok.Data;
import java.util.List;

@Data
public class Client extends User{
    private String name;
    private List<Discount> discountList;
    private List<Ticket> ticketList;
}
