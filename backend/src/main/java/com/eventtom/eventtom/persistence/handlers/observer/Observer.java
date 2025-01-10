package com.eventtom.eventtom.persistence.handlers.observer;
import com.eventtom.eventtom.application.model.Notification;

public interface Observer {
    void update(Notification notification);
}
