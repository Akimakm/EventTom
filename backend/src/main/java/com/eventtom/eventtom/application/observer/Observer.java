package com.eventtom.eventtom.application.observer;
import com.eventtom.eventtom.application.model.Notification;

public interface Observer {
    void update(Notification notification);
}
