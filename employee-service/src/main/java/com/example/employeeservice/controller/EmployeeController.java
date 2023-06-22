package com.example.employeeservice.controller;

import com.example.employeeservice.exception.EmployeeNotFoundException;
import com.example.employeeservice.model.Employee;
import com.example.employeeservice.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

// @RestController
// @RequestMapping(value = "/employees")
// @Api(value = "Employee API")
@RestController
@RequestMapping(value = "/employees")
public class EmployeeController {

    EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }


    @GetMapping("/getAllEmployee")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = this.employeeService.getAllEmployees();
        if (employees.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(employees, HttpStatus.OK);
        }
    }
    @GetMapping(value ="{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") UUID id) {
        Optional<Employee> employee = this.employeeService.getEmployeeById(id);
        if (employee.isPresent()) {
            return new ResponseEntity<>(employee.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/createEmployee")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employeeDto) {
        System.out.println("emplyee m" + employeeDto);
        System.out.println("test: " + employeeService);
        Employee employee = this.employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(employee, HttpStatus.CREATED);

    }

    @PutMapping(value ="updateEmployee/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable("id") UUID id, @RequestBody Employee employeeDto) {
        try {
            return new ResponseEntity<>(this.employeeService.updateEmployee(employeeDto, id), HttpStatus.OK);
        } catch (EmployeeNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(value ="deleteEmployee/{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable("id") UUID id) {
        try {
            this.employeeService.deleteEmployee(id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
