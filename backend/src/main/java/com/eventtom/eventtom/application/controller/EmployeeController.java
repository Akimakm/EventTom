package com.eventtom.eventtom.application.controller;

import com.eventtom.eventtom.persistence.EmployeeJsonHandler;
import com.eventtom.eventtom.application.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    @Autowired
    private EmployeeJsonHandler employeeJsonHandler;

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeJsonHandler.readAll();
    }

    @PostMapping
    public void createEmployee(@RequestBody Employee employee) {
        List<Employee> employees = employeeJsonHandler.readAll();
        employees.add(employee);
        employeeJsonHandler.writeAll(employees);
    }

    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return employeeJsonHandler.readAll().stream()
                .filter(employee -> employee.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    @PutMapping("/{id}")
    public void updateEmployee(@PathVariable Long id, @RequestBody Employee updatedEmployee) {
        List<Employee> employees = employeeJsonHandler.readAll();
        for (int i = 0; i < employees.size(); i++) {
            if (employees.get(i).getId().equals(id)) {
                employees.set(i, updatedEmployee);
                break;
            }
        }
        employeeJsonHandler.writeAll(employees);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        List<Employee> employees = employeeJsonHandler.readAll();
        employees.removeIf(employee -> employee.getId().equals(id));
        employeeJsonHandler.writeAll(employees);
    }
}
