package com.eventtom.eventtom.persistence;

import com.eventtom.eventtom.application.model.Employee;
import com.eventtom.eventtom.persistence.DataPersistence;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Component
public class EmployeeJsonHandler implements DataPersistence<Employee> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final File file = new File("employees.json");

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
            objectMapper.writeValue(file, employees);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
