package com.eventtom.eventtom.persistence.handlers;

import com.eventtom.eventtom.application.model.Discount;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Component
public class DiscountJsonHandler implements DataPersistence<Discount> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final File file = new File("backend/src/main/java/com/eventtom/eventtom/persistence/storage/discounts.json");

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
    public List<Discount> readAll() {
        try {
            if (!file.exists()) {
                return new ArrayList<>();
            }
            return List.of(objectMapper.readValue(file, Discount[].class));
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @Override
    public void writeAll(List<Discount> discounts) {
        try {
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
            objectMapper.writeValue(file, discounts);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
