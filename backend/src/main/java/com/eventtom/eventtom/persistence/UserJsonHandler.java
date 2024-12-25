package com.eventtom.eventtom.persistence;

import com.eventtom.eventtom.application.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Component
public class UserJsonHandler implements DataPersistence<User> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final File file = new File("backend/src/main/java/com/eventtom/eventtom/persistence/users.json");

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
            objectMapper.writeValue(file, users);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
