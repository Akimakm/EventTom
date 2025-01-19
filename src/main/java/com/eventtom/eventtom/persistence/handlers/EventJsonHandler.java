package com.eventtom.eventtom.persistence.handlers;

import com.eventtom.eventtom.application.model.Event;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.io.File;

@Component
public class EventJsonHandler implements DataPersistence<Event> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final File file = new File(getClass().getClassLoader().getResource("storage/events.json").getFile());

    @Override
    public List<Event> readAll() {
        try {
            if (!file.exists()) {
                return new ArrayList<>();
            }
            return List.of(objectMapper.readValue(file, Event[].class));
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @Override
    public void writeAll(List<Event> events) {
        try {
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
            objectMapper.writeValue(file, events);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
