package com.eventtom.eventtom.persistence;

import java.util.List;

public interface DataPersistence<T> {
    void save(Object object);
    void delete(Object object);
    void update(Object object);
    Object get(Long id);
    List<T> readAll();
    void writeAll(List<T> data);
}
