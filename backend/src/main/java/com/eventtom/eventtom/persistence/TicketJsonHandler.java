package com.eventtom.eventtom.persistence;

import com.eventtom.eventtom.application.model.Ticket;
import com.eventtom.eventtom.persistence.DataPersistence;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Component
public class TicketJsonHandler implements DataPersistence<Ticket> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final File file = new File("tickets.json");

    @Override
    public void save(Object object) {

    }

    @Override
    public void delete(Object object) {

    }

    @Override
    public void update(Object object) {

    }

    @Override
    public Object get(Long id) {
        return null;
    }

    @Override
    public List<Ticket> readAll() {
        try {
            if (!file.exists()) {
                return new ArrayList<>();
            }
            return List.of(objectMapper.readValue(file, Ticket[].class));
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @Override
    public void writeAll(List<Ticket> tickets) {
        try {
            objectMapper.writeValue(file, tickets);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
