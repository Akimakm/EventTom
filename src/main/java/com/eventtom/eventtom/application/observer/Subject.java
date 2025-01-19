package com.eventtom.eventtom.application.observer;
import com.eventtom.eventtom.application.model.Notification;

public interface Subject {
    void addObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers(Notification notification);
}
