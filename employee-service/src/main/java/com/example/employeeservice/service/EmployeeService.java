package com.example.employeeservice.service;

import com.example.employeeservice.exception.EmployeeNotFoundException;
import com.example.employeeservice.model.Employee;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EmployeeService {
    List<Employee> getAllEmployees();

    Optional<Employee> getEmployeeById(UUID id);

    Employee createEmployee(Employee employee);

    Employee updateEmployee(Employee employee, UUID id) throws EmployeeNotFoundException;

    void deleteEmployee(UUID id);

}
