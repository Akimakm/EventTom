// NotificationConfig.java
package com.eventtom.eventtom.persistence.handlers.config;

import com.eventtom.eventtom.persistence.handlers.observer.ClientObserver;
import com.eventtom.eventtom.persistence.handlers.observer.EventManagerObserver;
import com.eventtom.eventtom.persistence.handlers.observer.NotificationSubject;
import org.springframework.context.annotation.Configuration;

@Configuration
public class NotificationConfig {

    public NotificationConfig(
            NotificationSubject notificationSubject,
            ClientObserver clientObserver,
            EventManagerObserver eventManagerObserver
    ) {
        notificationSubject.addObserver(clientObserver);
        notificationSubject.addObserver(eventManagerObserver);
    }
}
