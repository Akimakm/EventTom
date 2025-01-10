// persistence.handlers.observer.EventManagerObserver.java
package com.eventtom.eventtom.persistence.handlers.observer;

import com.eventtom.eventtom.application.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class EventManagerObserver implements Observer {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Override
    public void update(Notification notification) {
        if ("TICKET_PURCHASE".equals(notification.getType())) {
            messagingTemplate.convertAndSend("/topic/eventManagers", notification);
        }
    }
}
