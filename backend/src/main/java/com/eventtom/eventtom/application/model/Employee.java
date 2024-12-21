package com.eventtom.eventtom.application.model;
import lombok.Data;

@Data
public class Employee extends User {
    private String personalNumber;
    private Position position;
}
