package com.eventtom.eventtom.persistence.handlers;

import java.util.List;

public interface DataPersistence<T> {
    List<T> readAll();
    void writeAll(List<T> data);
}
