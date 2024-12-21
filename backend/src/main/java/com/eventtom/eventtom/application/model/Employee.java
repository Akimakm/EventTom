package com.eventtom.eventtom.application.model;
import lombok.Data;

@Data
public class Employee {
    private Long id;
    private String personalNumber;
    private Position position;
}
