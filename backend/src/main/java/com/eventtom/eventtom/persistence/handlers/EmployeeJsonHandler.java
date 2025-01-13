package com.eventtom.eventtom.persistence.handlers;

import com.eventtom.eventtom.application.model.Employee;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Component
public class EmployeeJsonHandler implements DataPersistence<Employee> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final File file = new File("backend/src/main/java/com/eventtom/eventtom/persistence/storage/employees.json");


    @Override
    public List<Employee> readAll() {
        try {
            if (!file.exists()) {
                return new ArrayList<>();
            }
            return List.of(objectMapper.readValue(file, Employee[].class));
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @Override
    public void writeAll(List<Employee> employees) {
        try {
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
            objectMapper.writeValue(file, employees);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
