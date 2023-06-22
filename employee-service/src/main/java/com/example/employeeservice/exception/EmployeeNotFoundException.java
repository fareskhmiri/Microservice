package com.example.employeeservice.exception;

import java.util.UUID;

public class EmployeeNotFoundException extends Throwable {
    public EmployeeNotFoundException(UUID id) {
        super("Cannot found employee number [" + id + "]");
    }
}
