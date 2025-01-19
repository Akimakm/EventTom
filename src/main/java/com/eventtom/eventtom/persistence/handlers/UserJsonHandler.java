package com.eventtom.eventtom.persistence.handlers;

import com.eventtom.eventtom.application.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Component
public class UserJsonHandler implements DataPersistence<User> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final File file = new File(getClass().getClassLoader().getResource("storage/users.json").getFile());

    @Override
    public List<User> readAll() {
        try {
            if (!file.exists()) {
                return new ArrayList<>();
            }
            return List.of(objectMapper.readValue(file, User[].class));
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @Override
    public void writeAll(List<User> users) {
        try {
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
            objectMapper.writeValue(file, users);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
