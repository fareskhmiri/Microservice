package com.example.employeeservice.service;

import com.example.employeeservice.exception.EmployeeNotFoundException;
import com.example.employeeservice.model.Employee;
import com.example.employeeservice.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Optional<Employee> getEmployeeById(UUID id) {
         return employeeRepository.findById(id);
    }

    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployee(Employee candidateDto, UUID id) throws EmployeeNotFoundException {
        Optional<Employee> candidate = this.employeeRepository.findById(id);
        if (candidate.isPresent()) {
            candidateDto.setId(id);
            return this.employeeRepository.save(candidateDto);
        } else {
            throw new EmployeeNotFoundException(id);
        }
    }

    @Override
    public void deleteEmployee(UUID id) {
        employeeRepository.deleteById(id);
    }
}
