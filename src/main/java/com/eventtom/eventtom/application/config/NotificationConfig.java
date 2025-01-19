package com.eventtom.eventtom.application.config;

import com.eventtom.eventtom.application.observer.ClientObserver;
import com.eventtom.eventtom.application.observer.EventManagerObserver;
import com.eventtom.eventtom.application.observer.NotificationSubject;
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
