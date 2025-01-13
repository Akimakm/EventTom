package com.eventtom.eventtom.persistence.handlers;

import com.eventtom.eventtom.application.model.Client;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Component
public class ClientJsonHandler implements DataPersistence<Client>{
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final File file = new File("backend/src/main/java/com/eventtom/eventtom/persistence/storage/clients.json");

    @Override
    public List<Client> readAll() {
        try {
            if (!file.exists()) {
                return new ArrayList<>();
            }
            return List.of(objectMapper.readValue(file, Client[].class));
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }    }

    @Override
    public void writeAll(List<Client> clients) {
        try {
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
            objectMapper.writeValue(file, clients);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
