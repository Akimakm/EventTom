package com.eventtom.eventtom.persistence.handlers;

import com.eventtom.eventtom.application.model.Ticket;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Component
public class TicketJsonHandler implements DataPersistence<Ticket> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final File file = new File("src/main/java/com/eventtom/eventtom/persistence/storage/tickets.json");


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
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
            objectMapper.writeValue(file, tickets);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
