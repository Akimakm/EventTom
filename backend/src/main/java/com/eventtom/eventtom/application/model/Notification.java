// model/Notification.java
package com.eventtom.eventtom.application.model;

import lombok.Data;

@Data
public class Notification {
    private String type;
    private String message;
    private String timestamp;
    private Event event;
    private int ticketsSold;
}
