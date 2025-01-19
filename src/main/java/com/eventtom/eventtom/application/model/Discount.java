package com.eventtom.eventtom.application.model;

import lombok.Data;

@Data
public class Discount {
    private Long id;
    private String code;
    private double discount;
    private Client client;
}
